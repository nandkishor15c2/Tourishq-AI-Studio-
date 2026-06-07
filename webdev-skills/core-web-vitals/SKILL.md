---
name: core-web-vitals
description: Optimize Core Web Vitals (LCP, CLS, FID/INP) and overall web performance for better user experience and search rankings. Use this skill whenever the user wants to improve page performance, fix slow loading, reduce layout shift, optimize paint timing, or score better on Lighthouse/PageSpeed. Trigger for "Core Web Vitals", "LCP", "CLS", "INP", "performance optimization", "Lighthouse score", "slow page", or "page speed".
---

# Core Web Vitals

Optimize the three key user experience metrics that affect search ranking.

## The Metrics

| Metric | Measures | Good | Needs Work | Poor |
|--------|----------|------|------------|------|
| **LCP** (Largest Contentful Paint) | Loading | ≤2.5s | ≤4s | >4s |
| **CLS** (Cumulative Layout Shift) | Visual stability | ≤0.1 | ≤0.25 | >0.25 |
| **INP** (Interaction to Next Paint) | Responsiveness | ≤200ms | ≤500ms | >500ms |

---

## LCP Optimization (Largest Content Loads Fast)

### Priority: Optimize the hero image or heading

```tsx
// Next.js: Mark hero image as priority (preloads it)
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority              // ← Adds preload link, disables lazy load
  sizes="(max-width: 768px) 100vw, 1200px"
/>

// HTML: Native preload
<link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />
```

### Reduce Server Response Time
```ts
// Cache expensive queries
import { unstable_cache } from 'next/cache';

const getHomepageData = unstable_cache(
  async () => db.post.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
  ['homepage-posts'],
  { revalidate: 60 } // Cache for 60 seconds
);
```

### Font Optimization
```tsx
// Next.js: Preload fonts, avoid layout shift
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',        // Don't block render
  preload: true,
});

// Apply via className
<html className={inter.className}>
```

---

## CLS Optimization (No Layout Shift)

### Reserve space for images
```tsx
// ✅ Always set width + height or use aspect-ratio
<Image src="/card.jpg" width={400} height={300} alt="..." />

// For unknown dimensions, use aspect-ratio CSS
<div className="aspect-video w-full">
  <Image src="/video-thumb.jpg" fill className="object-cover" alt="..." />
</div>
```

### Reserve space for dynamic content
```tsx
// ❌ Causes CLS when content loads
{user && <UserBanner user={user} />}

// ✅ Reserve space with skeleton
{user ? <UserBanner user={user} /> : <UserBannerSkeleton />}
```

### Avoid inserting content above the fold
```tsx
// ❌ Injecting a cookie banner pushes content down
// ✅ Use position: fixed for cookie banners/notifications

<div className="fixed bottom-4 left-4 right-4 z-50">
  <CookieBanner />
</div>
```

### Font size flash
```css
/* Match fallback font metrics to prevent text reflow */
@font-face {
  font-family: 'MyFont-fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}
```

---

## INP Optimization (Interactions Feel Fast)

### Avoid long tasks (>50ms) on main thread
```ts
// Break up heavy computations
async function processLargeArray(items: Item[]) {
  const CHUNK_SIZE = 100;
  const results = [];

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    results.push(...chunk.map(processItem));
    // Yield to main thread between chunks
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  return results;
}

// Or use Web Workers for CPU-intensive tasks
```

### Debounce expensive handlers
```ts
import { useDebouncedCallback } from 'use-debounce';

const handleSearch = useDebouncedCallback(async (value) => {
  const results = await search(value);
  setResults(results);
}, 300);
```

### Lazy load below-the-fold components
```tsx
import dynamic from 'next/dynamic';

// Only load heavy components when needed
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

---

## Measuring Performance

```bash
# Lighthouse CLI
npx lighthouse https://myapp.com --view

# Web Vitals in code
npm install web-vitals
```

```ts
// app/layout.tsx - Report vitals
import { onCLS, onINP, onLCP } from 'web-vitals';

export function reportWebVitals() {
  onCLS(metric => console.log('CLS:', metric.value));
  onINP(metric => console.log('INP:', metric.value));
  onLCP(metric => console.log('LCP:', metric.value));
}
```

---

## Quick Wins Checklist

**LCP**
- [ ] Add `priority` to hero image in Next.js
- [ ] Serve images in WebP/AVIF format
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2 or HTTP/3

**CLS**
- [ ] All images have explicit `width` and `height`
- [ ] No content injected above the fold after load
- [ ] Fonts use `font-display: swap` with size-adjust

**INP**
- [ ] No JavaScript bundles >100KB blocking main thread
- [ ] Expensive computations moved to Web Workers
- [ ] Search/filter inputs debounced
- [ ] `React.memo` on expensive pure components
