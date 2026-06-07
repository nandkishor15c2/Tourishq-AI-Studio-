---
name: e2e-testing
description: Write end-to-end tests using Playwright or Cypress for full user flow testing of web applications. Use this skill whenever the user wants to test complete user journeys, write browser automation tests, test authentication flows, form submissions, or multi-step interactions. Trigger for "Playwright", "Cypress", "E2E tests", "end-to-end testing", "browser testing", "test user flow", or "integration test".
---

# E2E Testing

Write end-to-end tests that simulate real user interactions in the browser.

## Playwright (Recommended)

### Setup
```bash
npm init playwright@latest
# or add to existing project:
npm install -D @playwright/test
npx playwright install
```

### Configuration
```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Writing Tests

### Basic Navigation Test
```ts
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads and shows hero', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/MyApp/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /get started/i })).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /pricing/i }).click();
  await expect(page).toHaveURL('/pricing');
  await expect(page.getByRole('heading', { name: /pricing/i })).toBeVisible();
});
```

### Authentication Flow
```ts
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('user can sign up', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByLabel(/password/i).fill('SecurePassword123!');
  await page.getByRole('button', { name: /create account/i }).click();
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText(/welcome/i)).toBeVisible();
});

test('user can log in and out', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('user@example.com');
  await page.getByLabel(/password/i).fill('password');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL('/dashboard');

  await page.getByRole('button', { name: /sign out/i }).click();
  await expect(page).toHaveURL('/');
});

test('protected routes redirect unauthenticated users', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/login');
});
```

### Form Submission
```ts
// e2e/contact.spec.ts
test('contact form submits successfully', async ({ page }) => {
  await page.goto('/contact');

  await page.getByLabel(/name/i).fill('John Doe');
  await page.getByLabel(/email/i).fill('john@example.com');
  await page.getByLabel(/message/i).fill('Hello, I have a question about your service.');

  await page.getByRole('button', { name: /send message/i }).click();

  await expect(page.getByText(/message sent/i)).toBeVisible();
});

test('shows validation errors on empty submit', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /send/i }).click();
  await expect(page.getByText(/email is required/i)).toBeVisible();
});
```

---

## Authenticated Test Fixture

```ts
// e2e/fixtures.ts
import { test as base, expect } from '@playwright/test';

type Fixtures = { authenticatedPage: Page };

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Set auth cookie/token before test
    await page.goto('/login');
    await page.getByLabel(/email/i).fill(process.env.TEST_USER_EMAIL!);
    await page.getByLabel(/password/i).fill(process.env.TEST_USER_PASSWORD!);
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('/dashboard');
    await use(page);
  },
});

// Usage
import { test } from './fixtures';

test('dashboard shows user data', async ({ authenticatedPage: page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText(/welcome back/i)).toBeVisible();
});
```

---

## Mocking API Calls

```ts
test('shows error when API fails', async ({ page }) => {
  await page.route('/api/users', route => {
    route.fulfill({ status: 500, body: JSON.stringify({ error: 'Server error' }) });
  });

  await page.goto('/users');
  await expect(page.getByText(/something went wrong/i)).toBeVisible();
});

test('loads users from API', async ({ page }) => {
  await page.route('/api/users', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [{ id: '1', name: 'Alice' }] }),
    });
  });

  await page.goto('/users');
  await expect(page.getByText('Alice')).toBeVisible();
});
```

---

## Useful Selectors

```ts
// Prefer accessible selectors (role-based)
page.getByRole('button', { name: /submit/i })
page.getByRole('link', { name: /home/i })
page.getByRole('heading', { level: 1 })
page.getByLabel(/email/i)           // form fields
page.getByPlaceholder(/search/i)
page.getByText(/welcome/i)
page.getByTestId('submit-btn')      // data-testid attribute (last resort)

// Locator chaining
page.getByRole('listitem').filter({ hasText: 'Alice' }).getByRole('button')
```

---

## Running Tests

```bash
npx playwright test           # all tests
npx playwright test auth      # filter by filename
npx playwright test --headed  # see browser
npx playwright test --debug   # pause on error
npx playwright show-report    # view HTML report
```
