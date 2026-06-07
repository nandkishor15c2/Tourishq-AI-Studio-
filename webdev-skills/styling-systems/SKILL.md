---
name: styling-systems
description: Set up and use CSS styling solutions including Tailwind CSS, CSS Modules, Styled Components, and Sass for web projects. Use this skill whenever the user asks about styling approaches, CSS architecture, design tokens, theming systems, or wants to set up a consistent visual style. Trigger for "Tailwind setup", "CSS Modules", "styled-components", "design system", "theme tokens", "global styles", or styling configuration questions.
---

# Styling Systems

Configure and use modern CSS styling solutions with best practices.

## Choosing a Styling Approach

| Approach | Best For | Tradeoffs |
|----------|----------|-----------|
| **Tailwind CSS** | Most projects | Verbose JSX, excellent DX |
| **CSS Modules** | Scoped styles without JS | Verbose imports |
| **Styled Components** | Dynamic themes, component libraries | Runtime overhead |
| **Sass/SCSS** | Legacy or design-system-heavy | Compile step |
| **Vanilla CSS + vars** | Simple sites | Manual scoping |

**Recommended default: Tailwind CSS**

---

## Tailwind CSS

### Setup (Next.js)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
export default config;
```

### cn() Utility (essential)
```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn('base-class', condition && 'conditional-class', className)} />
```

### Component Variants with CVA
```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

interface ButtonProps extends VariantProps<typeof button> {
  className?: string;
}
```

---

## CSS Modules

```tsx
// Button.module.css
.button { padding: 0.5rem 1rem; border-radius: 0.375rem; }
.primary { background: #3b82f6; color: white; }
.secondary { background: #f3f4f6; color: #111; }

// Button.tsx
import styles from './Button.module.css';
import clsx from 'clsx';

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...props} />
  );
}
```

---

## Design Tokens (CSS Variables)

```css
/* styles/tokens.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-muted: #64748b;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;

  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  /* Border Radius */
  --radius: 0.375rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}

[data-theme="dark"] {
  --color-surface: #0f172a;
  --color-text: #f8fafc;
  --color-muted: #94a3b8;
}
```

---

## Global Styles (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; margin: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-sans); color: var(--color-text); }
  img, video { max-width: 100%; height: auto; }
  :focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .scrollbar-hidden { scrollbar-width: none; }
  .scrollbar-hidden::-webkit-scrollbar { display: none; }
}
```
