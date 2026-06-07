---
name: accessibility
description: Implement web accessibility (a11y) standards including ARIA roles, keyboard navigation, screen reader support, color contrast, and WCAG compliance. Use this skill whenever the user wants to make their site accessible, fix accessibility issues, add ARIA attributes, ensure keyboard navigation, improve screen reader support, or check WCAG compliance. Trigger for "accessibility", "a11y", "ARIA", "screen reader", "keyboard navigation", "WCAG", or "color contrast".
---

# Accessibility (a11y)

Build inclusive web experiences that work for everyone, including users with disabilities.

## WCAG 2.1 Level AA Requirements (Summary)

| Principle | Key Requirements |
|-----------|-----------------|
| **Perceivable** | Alt text, captions, 4.5:1 contrast ratio, text resize |
| **Operable** | Keyboard accessible, no seizure risk, skip nav links |
| **Understandable** | Clear labels, error messages, consistent navigation |
| **Robust** | Valid HTML, ARIA used correctly, assistive tech compatible |

---

## ARIA Roles & Attributes

```tsx
// Landmark roles (use HTML elements, not ARIA when possible)
<header>        // role="banner"
<nav>           // role="navigation"  
<main>          // role="main"
<aside>         // role="complementary"
<footer>        // role="contentinfo"

// Interactive states
<button aria-expanded={isOpen} aria-controls="menu-id">Menu</button>
<div id="menu-id" role="menu" hidden={!isOpen}>...</div>

// Live regions (dynamic content)
<div aria-live="polite" aria-atomic="true">{statusMessage}</div>
<div role="alert">{errorMessage}</div>  // assertive by default

// Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-hint email-error" />
<p id="email-hint">We'll never share your email</p>
<p id="email-error" role="alert">{errors.email}</p>

// Loading state
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</button>

// Visually hidden but announced
<span className="sr-only">Close dialog</span>
```

---

## Keyboard Navigation

```tsx
// Focus trap for modals
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isOpen) return;
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0] as HTMLElement;
    const last = focusable?.[focusable.length - 1] as HTMLElement;
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return <div ref={modalRef} role="dialog" aria-modal="true">{children}</div>;
}
```

### Skip Navigation Link
```tsx
// Place as first element in body
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:border"
>
  Skip to main content
</a>
<main id="main-content" tabIndex={-1}>
```

---

## Focus Styles

```css
/* Never remove focus styles — customize them */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove for mouse users only */
:focus:not(:focus-visible) {
  outline: none;
}
```

```tsx
// Tailwind
<button className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none">
```

---

## Color Contrast Ratios

| Text Size | Minimum (AA) | Enhanced (AAA) |
|-----------|-------------|----------------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18pt+) | 3:1 | 4.5:1 |
| UI components | 3:1 | — |

Tools: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), [Polypane](https://polypane.app)

---

## Image Accessibility

```tsx
// Informative image
<img src="/hero.jpg" alt="Team collaborating in modern office" />

// Decorative (hidden from screen readers)
<img src="/divider.svg" alt="" role="presentation" />

// Complex image with long description
<figure>
  <img src="/chart.png" alt="Revenue growth Q1-Q4 2024" aria-describedby="chart-desc" />
  <figcaption id="chart-desc">
    Revenue grew from $1M in Q1 to $4M in Q4, showing consistent 30% quarterly growth.
  </figcaption>
</figure>

// Next.js Image
<Image src="/hero.jpg" alt="Descriptive alt text" fill />
```

---

## Accessible Form Patterns

```tsx
// Always associate label with input
<div className="space-y-2">
  <label htmlFor="name" className="font-medium">
    Full Name <span aria-hidden="true" className="text-red-500">*</span>
    <span className="sr-only">(required)</span>
  </label>
  <input
    id="name"
    type="text"
    required
    aria-required="true"
    aria-invalid={!!errors.name}
    aria-describedby={errors.name ? 'name-error' : undefined}
    className="w-full border rounded px-3 py-2"
  />
  {errors.name && (
    <p id="name-error" role="alert" className="text-red-600 text-sm">
      {errors.name.message}
    </p>
  )}
</div>
```

---

## Testing Accessibility

```bash
# axe-core (automated)
npm install -D @axe-core/playwright

# In Playwright test
import AxeBuilder from '@axe-core/playwright';
const results = await new AxeBuilder({ page }).analyze();
expect(results.violations).toEqual([]);
```

```tsx
// jest-axe (unit tests)
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no a11y violations', async () => {
  const { container } = render(<MyForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist
- [ ] Tab through entire page — all interactive elements reachable
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Check color contrast ratios
- [ ] Zoom to 200% — content still usable
- [ ] Run axe DevTools or Lighthouse audit
