---
name: image-optimization
description: Optimize images for web performance using Next.js Image, WebP/AVIF conversion, lazy loading, and CDN delivery. Use this skill whenever the user wants to optimize images, reduce image file sizes, implement lazy loading, use responsive images, or configure a CDN for assets. Trigger for "image optimization", "lazy loading images", "WebP", "responsive images", "Next.js Image component", "image CDN", or "slow image loading".
---

# Image Optimization

Deliver fast, correctly-sized images across all devices.

## Next.js Image Component

```tsx
import Image from 'next/image';

// Fixed size (product card, avatar)
<Image src="/product.jpg" alt="Product name" width={400} height={300} />

// Hero (above the fold) — priority preloads it
<Image src="/hero.jpg" alt="Hero" fill priority
  className="object-cover"
  sizes="100vw"
/>

// Responsive gallery
<Image
  src="/photo.jpg"
  alt="Description"
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// Remote images — must configure domains
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.example.com' },
    { protocol: 'https', hostname: '**.cloudinary.com' },
  ],
}
```

## Sizes Attribute Guide
```
sizes="100vw"                              → full width always
sizes="(max-width: 768px) 100vw, 50vw"    → full on mobile, half on desktop
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"  → 3-col grid
```

## Image CDN Setup (Cloudinary)
```ts
// lib/cloudinary.ts
export function cloudinaryUrl(publicId: string, options: {
  width?: number; height?: number; quality?: number; format?: 'auto' | 'webp';
} = {}) {
  const { width = 'auto', height, quality = 'auto', format = 'auto' } = options;
  const transforms = [
    `f_${format}`, `q_${quality}`,
    width !== 'auto' && `w_${width}`,
    height && `h_${height}`,
    'c_fill',
  ].filter(Boolean).join(',');
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
```

## Native Lazy Loading
```html
<!-- For non-Next.js projects -->
<img src="photo.jpg" alt="..." loading="lazy" decoding="async" width="800" height="600" />
```

## Optimization Checklist
- [ ] Hero images use `priority` prop
- [ ] All images have `width` and `height` (prevents CLS)
- [ ] Images served in WebP/AVIF
- [ ] `sizes` prop reflects actual rendered width
- [ ] SVGs used for icons/logos
- [ ] Blur placeholder for perceived performance: `placeholder="blur" blurDataURL="..."`
