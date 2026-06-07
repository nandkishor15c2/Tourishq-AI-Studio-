---
name: caching-strategies
description: Implement caching strategies including service workers, HTTP cache headers, CDN caching, Redis, and Next.js data cache for web performance. Use this skill whenever the user wants to add caching, reduce API calls, configure Cache-Control headers, implement Redis caching, set up a service worker, or improve performance with data caching. Trigger for "caching", "Redis cache", "Cache-Control", "service worker", "stale-while-revalidate", "CDN cache", or "data caching".
---

# Caching Strategies

Implement multi-layer caching to reduce latency and server load.

## Caching Layers

```
Browser Cache → CDN → Server Cache (Redis) → Database
```

## HTTP Cache Headers

```ts
// Next.js Route Handler
export async function GET() {
  const data = await fetchData();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
    },
  });
}

// Cache-Control values:
// public, max-age=3600           → cache for 1 hour, CDN-cacheable
// private, max-age=0             → no CDN, browser can cache
// no-store                       → never cache (auth pages)
// stale-while-revalidate=60      → serve stale while refreshing
```

## Next.js Data Cache

```ts
// Fetch with built-in cache
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },  // revalidate every 60 seconds
});

// Cache indefinitely (revalidate manually)
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['products'] },
});

// Revalidate by tag
import { revalidateTag } from 'next/cache';
revalidateTag('products');  // call from Server Action after mutation

// unstable_cache for arbitrary functions
import { unstable_cache } from 'next/cache';
const getCachedUser = unstable_cache(
  async (id: string) => db.user.findUnique({ where: { id } }),
  ['user'],
  { revalidate: 300, tags: ['users'] }
);
```

## Redis Caching

```ts
// lib/redis.ts
import { Redis } from '@upstash/redis';
export const redis = Redis.fromEnv();

// lib/cache.ts
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl = 300
): Promise<T> {
  const cached = await redis.get<T>(key);
  if (cached) return cached;
  const fresh = await fn();
  await redis.setex(key, ttl, JSON.stringify(fresh));
  return fresh;
}

// Usage
const user = await withCache(
  `user:${userId}`,
  () => db.user.findUnique({ where: { id: userId } }),
  600  // 10 minutes
);

// Invalidate on update
await redis.del(`user:${userId}`);
```

## Service Worker (Offline Support)

```ts
// public/sw.js
const CACHE_NAME = 'myapp-v1';
const STATIC_ASSETS = ['/', '/offline.html', '/styles/globals.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match('/offline.html'));
    })
  );
});

// Register in app
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## Caching Strategy Reference

| Data Type | Strategy | TTL |
|-----------|----------|-----|
| Static assets (images, JS, CSS) | `Cache-Control: public, max-age=31536000, immutable` | 1 year |
| HTML pages | `stale-while-revalidate` | 60s |
| API responses | Redis + `Cache-Control` | 1-15 min |
| User sessions | Redis | 7 days |
| Database queries | `unstable_cache` / Redis | 1-10 min |
| Auth endpoints | `no-store` | Never |
