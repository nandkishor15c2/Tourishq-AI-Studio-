---
name: analytics-integration
description: Integrate analytics tools including Google Analytics 4, PostHog, Plausible, and custom event tracking into web applications. Use this skill whenever the user wants to add analytics, track user events, set up GA4, implement conversion tracking, monitor user behavior, or add page view tracking. Trigger for "Google Analytics", "GA4", "PostHog", "Plausible", "event tracking", "analytics setup", "conversion tracking", or "user behavior tracking".
---

# Analytics Integration

Track user behavior, conversions, and product metrics.

## PostHog (Recommended — Privacy-Friendly + Product Analytics)

```bash
npm install posthog-js posthog-node
```

```tsx
// app/providers.tsx
'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      capture_pageview: false,  // Manual in Next.js App Router
      capture_pageleave: true,
    });
  }, []);
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

```tsx
// app/_analytics/PostHogPageView.tsx — Track page views in App Router
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture('$pageview', { $current_url: window.location.href });
  }, [pathname, searchParams, posthog]);

  return null;
}
```

```tsx
// Event tracking
import { usePostHog } from 'posthog-js/react';

function SignUpButton() {
  const posthog = usePostHog();
  return (
    <button onClick={() => {
      posthog.capture('sign_up_clicked', { plan: 'pro', source: 'hero' });
    }}>
      Sign Up
    </button>
  );
}
```

---

## Google Analytics 4

```tsx
// components/GoogleAnalytics.tsx
export function GoogleAnalytics({ measurementId }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', { page_path: window.location.pathname });
      `}</Script>
    </>
  );
}

// lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function trackEvent(action: string, params?: Record<string, any>) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params);
  }
}

// Track conversions
trackEvent('purchase', { transaction_id: orderId, value: 29.99, currency: 'USD' });
trackEvent('sign_up', { method: 'google' });
```

---

## Plausible (Privacy-First, No Cookies)

```tsx
// next.config.ts — proxy to avoid ad blockers
async rewrites() {
  return [{ source: '/stats/js/script.js', destination: 'https://plausible.io/js/plausible.js' },
          { source: '/stats/api/event', destination: 'https://plausible.io/api/event' }];
}

// In layout
<Script defer data-domain="myapp.com" src="/stats/js/script.js" />
```

---

## Custom Event Taxonomy

```ts
// Consistent event naming convention
type AnalyticsEvent =
  | { name: 'page_viewed'; properties: { path: string } }
  | { name: 'button_clicked'; properties: { button_id: string; location: string } }
  | { name: 'form_submitted'; properties: { form_name: string; success: boolean } }
  | { name: 'user_signed_up'; properties: { method: 'email' | 'google' | 'github' } }
  | { name: 'purchase_completed'; properties: { plan: string; value: number } };

export function track(event: AnalyticsEvent) {
  posthog.capture(event.name, event.properties);
}
```
