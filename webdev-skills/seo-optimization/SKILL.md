---
name: seo-optimization
description: Implement SEO best practices including meta tags, Open Graph, structured data, sitemaps, and technical SEO for web applications. Use this skill whenever the user wants to improve search rankings, add meta tags, implement Open Graph for social sharing, create sitemaps, add structured data (JSON-LD), or handle SEO for Next.js apps. Trigger for "SEO", "meta tags", "Open Graph", "sitemap", "structured data", "search ranking", "robots.txt", or "social preview".
---

# SEO Optimization

Implement technical SEO, meta tags, structured data, and discoverability for web apps.

## Next.js Metadata API

### Root Layout
```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://myapp.com'),
  title: {
    template: '%s | MyApp',
    default: 'MyApp – Your App Tagline',
  },
  description: 'Clear description of what your app does. Keep under 155 characters.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: 'MyApp Team', url: 'https://myapp.com' }],
  creator: 'MyApp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myapp.com',
    siteName: 'MyApp',
    title: 'MyApp – Your App Tagline',
    description: 'Clear description of what your app does.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MyApp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyApp – Your App Tagline',
    description: 'Clear description of what your app does.',
    images: ['/og-image.png'],
    creator: '@myapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};
```

### Dynamic Page Metadata
```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { getPost } from '@/lib/blog';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://myapp.com/blog/${params.slug}`,
    },
  };
}
```

---

## Sitemap

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const postUrls = posts.map(post => ({
    url: `https://myapp.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: 'https://myapp.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://myapp.com/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...postUrls,
  ];
}
```

## Robots.txt
```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/private/'] },
    ],
    sitemap: 'https://myapp.com/sitemap.xml',
  };
}
```

---

## Structured Data (JSON-LD)

```tsx
// components/JsonLd.tsx
export function ArticleJsonLd({ post }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Person', name: post.author.name },
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          image: post.coverImage,
          url: `https://myapp.com/blog/${post.slug}`,
          publisher: {
            '@type': 'Organization',
            name: 'MyApp',
            logo: { '@type': 'ImageObject', url: 'https://myapp.com/logo.png' },
          },
        }),
      }}
    />
  );
}

// Other schema types: Product, BreadcrumbList, FAQPage, LocalBusiness, Person
```

---

## OG Image Generation

```tsx
// app/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'My App';

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#0f172a', padding: 60, alignItems: 'center' }}>
        <h1 style={{ fontSize: 60, color: 'white', fontWeight: 700, lineHeight: 1.2 }}>{title}</h1>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

// Usage in metadata:
// openGraph: { images: [`/og?title=${encodeURIComponent(post.title)}`] }
```

---

## SEO Checklist

**Technical**
- [ ] HTTPS enabled
- [ ] Canonical URLs set for duplicate content
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible and submitted to Google Search Console
- [ ] 301 redirects for moved pages (not 302)
- [ ] Core Web Vitals passing (see core-web-vitals skill)

**Content**
- [ ] Title tags 50-60 characters, unique per page
- [ ] Meta descriptions 120-155 characters
- [ ] H1 tag present and unique per page
- [ ] Alt text on all meaningful images
- [ ] Internal linking structure

**Social**
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] OG image is 1200×630px
