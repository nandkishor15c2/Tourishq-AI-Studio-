---
name: dark-mode-theming
description: Implement dark mode, light/dark theme switching, and theming systems for web applications. Use this skill whenever the user wants to add dark mode support, build a theme switcher, use CSS variables for theming, implement system preference detection, or create a consistent color theme. Trigger for "dark mode", "theme switcher", "light dark", "system theme", "color scheme", "theme toggle", or "CSS variables theming".
---

# Dark Mode & Theming

Implement seamless light/dark mode with system preference detection and user override.

## CSS Variables Approach (Recommended)

```css
/* globals.css */
:root {
  --bg: #ffffff;
  --bg-secondary: #f8fafc;
  --text: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --card: #ffffff;
  --shadow: rgb(0 0 0 / 0.05);
}

[data-theme="dark"] {
  --bg: #0f172a;
  --bg-secondary: #1e293b;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --border: #334155;
  --primary: #60a5fa;
  --primary-hover: #93c5fd;
  --card: #1e293b;
  --shadow: rgb(0 0 0 / 0.3);
}

/* Apply system preference as default */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0f172a;
    /* ... same as [data-theme="dark"] */
  }
}
```

---

## Next.js + next-themes

### Setup
```bash
npm install next-themes
```

```tsx
// app/providers.tsx
'use client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"    // sets data-theme="dark" on <html>
      defaultTheme="system"     // respect OS preference
      enableSystem
      disableTransitionOnChange  // prevent flash of unstyled content
    >
      {children}
    </ThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Theme Toggle Component
```tsx
// components/ThemeToggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />; // placeholder

  const themes = [
    { value: 'light', icon: SunIcon, label: 'Light' },
    { value: 'dark', icon: MoonIcon, label: 'Dark' },
    { value: 'system', icon: ComputerDesktopIcon, label: 'System' },
  ];

  return (
    <div className="flex rounded-lg border border-[var(--border)] p-0.5 gap-0.5">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          className={`p-1.5 rounded-md transition-colors ${
            theme === value
              ? 'bg-[var(--primary)] text-white'
              : 'hover:bg-[var(--bg-secondary)]'
          }`}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
```

---

## Tailwind Dark Mode

```tsx
// tailwind.config.ts
export default {
  darkMode: ['class', '[data-theme="dark"]'],  // or 'media' for OS only
  // ...
}

// Usage in components
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <p className="text-gray-600 dark:text-gray-400">Muted text</p>
  <button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400">
    Action
  </button>
</div>
```

---

## Color Palette for Both Modes

```ts
// Semantic color tokens (always use these, never raw colors)
const tokens = {
  // Backgrounds
  'bg-base':      { light: '#ffffff',  dark: '#0f172a' },
  'bg-elevated':  { light: '#f8fafc',  dark: '#1e293b' },
  'bg-overlay':   { light: '#f1f5f9',  dark: '#334155' },

  // Text
  'text-primary': { light: '#0f172a',  dark: '#f8fafc' },
  'text-muted':   { light: '#64748b',  dark: '#94a3b8' },
  'text-disabled':{ light: '#cbd5e1',  dark: '#475569' },

  // Brand
  'primary':      { light: '#3b82f6',  dark: '#60a5fa' },
  'primary-text': { light: '#1d4ed8',  dark: '#93c5fd' },

  // Semantic
  'success':      { light: '#22c55e',  dark: '#4ade80' },
  'warning':      { light: '#f59e0b',  dark: '#fbbf24' },
  'error':        { light: '#ef4444',  dark: '#f87171' },
};
```

---

## Prevent Flash of Unstyled Content (FOUC)

```tsx
// Inject script before React hydrates (Next.js)
// app/layout.tsx
export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'system';
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = theme === 'dark' || (theme === 'system' && systemDark);
              if (isDark) document.documentElement.setAttribute('data-theme', 'dark');
            })();
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Dark Mode for Images

```tsx
// Different images for each theme
<picture>
  <source srcSet="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo-light.svg" alt="MyApp Logo" />
</picture>

// CSS filter approach (quick hack)
.dark img.invert-in-dark {
  filter: invert(1) hue-rotate(180deg);
}
```
