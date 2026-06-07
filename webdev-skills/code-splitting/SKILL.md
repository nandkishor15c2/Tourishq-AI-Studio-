---
name: code-splitting
description: Implement code splitting, lazy loading, and bundle optimization to reduce JavaScript bundle sizes for web applications. Use this skill whenever the user wants to reduce bundle size, implement lazy loading of routes/components, configure Webpack or Vite, analyze bundle composition, or speed up initial page load. Trigger for "code splitting", "lazy loading", "bundle size", "tree shaking", "dynamic import", "webpack config", "Vite config", or "chunk optimization".
---

# Code Splitting & Bundle Optimization

Reduce JavaScript payload to speed up initial page load.

## Next.js Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy component
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded" />,
  ssr: false,  // Disable for browser-only components (maps, charts)
});

// Only render when needed
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), { ssr: false });

// Usage — component loads only when rendered
export default function Dashboard({ isAdmin }) {
  return (
    <div>
      <HeavyChart data={data} />
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

## React Lazy + Suspense

```tsx
import { lazy, Suspense } from 'react';

const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
```

## Bundle Analysis

```bash
# Next.js
npm install @next/bundle-analyzer
```

```ts
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
export default withBundleAnalyzer(nextConfig);

# Run: ANALYZE=true npm run build
```

```bash
# Vite
npm install --save-dev rollup-plugin-visualizer
# → Adds stats.html after build
```

## Tree Shaking Best Practices

```ts
// ✅ Named imports (tree-shakable)
import { format } from 'date-fns';
import { debounce } from 'lodash-es';

// ❌ Default import (imports entire library)
import _ from 'lodash';
import * as dateFns from 'date-fns';

// ✅ Use lighter alternatives
import { format } from 'date-fns';        // vs moment.js (huge)
import clsx from 'clsx';                  // vs classnames
import { z } from 'zod';                  // already tree-shakable
```

## Vite Config Optimization

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
```

## Bundle Size Targets

| Asset | Target |
|-------|--------|
| First JS load | < 150KB gzipped |
| Per-route chunk | < 50KB gzipped |
| CSS | < 20KB gzipped |
| Total page weight | < 500KB |

## Quick Wins

1. **Audit dependencies**: `npx bundlephobia` — check package sizes before installing
2. **Replace heavy libs**: moment → date-fns, lodash → lodash-es or native
3. **Lazy load routes**: Never load all routes upfront
4. **Dynamic import third-party**: Load analytics/chat widgets after page load
5. **Compress**: Enable gzip/brotli compression on server/CDN
