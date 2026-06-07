---
name: unit-testing
description: Write unit and integration tests using Vitest or Jest for web application components, utilities, hooks, and API handlers. Use this skill whenever the user needs to write tests, set up a testing framework, test React components, mock dependencies, or achieve good test coverage. Trigger for "write tests", "unit testing", "Vitest", "Jest", "test coverage", "mock function", "test component", "testing utilities", or "TDD".
---

# Unit Testing

Write comprehensive unit and integration tests using Vitest and React Testing Library.

## Setup

### Vitest (Recommended for Vite/Next.js)
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['node_modules', '.next', 'tests'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './') },
  },
});
```

```ts
// tests/setup.ts
import '@testing-library/jest-dom';
```

---

## Testing React Components

```tsx
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when isLoading', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

---

## Testing Custom Hooks

```tsx
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('respects initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });
});
```

---

## Testing Async / API Calls

```tsx
// lib/api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUser } from './api';

// Mock fetch
global.fetch = vi.fn();

describe('fetchUser', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns user data on success', async () => {
    const mockUser = { id: '1', name: 'Alice' };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockUser }),
    } as Response);

    const user = await fetchUser('1');
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  it('throws on error response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchUser('999')).rejects.toThrow('User not found');
  });
});
```

---

## Testing Next.js API Routes

```ts
// app/api/users/route.test.ts
import { GET, POST } from './route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findMany: vi.fn().mockResolvedValue([{ id: '1', name: 'Alice' }]),
      count: vi.fn().mockResolvedValue(1),
      create: vi.fn().mockResolvedValue({ id: '2', name: 'Bob' }),
    },
  },
}));

vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ user: { id: 'user-1', role: 'admin' } }),
}));

describe('GET /api/users', () => {
  it('returns user list', async () => {
    const req = new NextRequest('http://localhost/api/users');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data).toHaveLength(1);
    expect(body.meta.total).toBe(1);
  });
});
```

---

## Mocking Utilities

```ts
// Mock module
vi.mock('@/lib/email', () => ({ sendEmail: vi.fn().mockResolvedValue({ id: 'msg_1' }) }));

// Spy on existing function
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

// Mock timer
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();

// Mock environment
vi.stubEnv('NODE_ENV', 'test');
```

---

## Test Organization

```
tests/
├── setup.ts
├── utils/           # Test helpers
│   └── render.tsx   # Custom render with providers

__tests__/           # Co-locate with source
component.test.tsx   # Component tests
hook.test.ts         # Hook tests
route.test.ts        # API route tests
utils.test.ts        # Utility tests
```

### Custom Render with Providers
```tsx
// tests/utils/render.tsx
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={null}>{ui}</SessionProvider>
    </QueryClientProvider>
  );
}
```
