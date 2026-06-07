---
name: cms-integration
description: Integrate headless CMS platforms including Sanity, Contentful, Strapi, and Payload CMS with web applications. Use this skill whenever the user wants to add a CMS, set up content management, integrate Sanity or Contentful, fetch content from a headless CMS, or build a blog with a CMS backend. Trigger for "CMS integration", "Sanity", "Contentful", "Strapi", "Payload CMS", "headless CMS", "blog CMS", "content management", or "dynamic content".
---

# CMS Integration

Connect headless CMS platforms to your web application for dynamic content.

## Sanity (Recommended — Great DX + Real-time)

```bash
npm install next-sanity @sanity/image-url @sanity/client
```

### Configuration
```ts
// sanity/config.ts
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

// sanity/client.ts
import { createClient } from 'next-sanity';
export const client = createClient({ ...sanityConfig, token: process.env.SANITY_API_TOKEN });
```

### Schema Definition (Sanity Studio)
```ts
// schemas/post.ts
export const postSchema = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
  ],
};
```

### GROQ Queries
```ts
// lib/queries.ts
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id, title, slug, publishedAt, excerpt,
  "coverImage": coverImage.asset->url,
  "author": author->{ name, "avatar": image.asset->url }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, body,
  "coverImage": coverImage.asset->url,
  "author": author->{ name, bio, "avatar": image.asset->url }
}`;

// Fetch
export async function getPosts() {
  return client.fetch(postsQuery);
}
export async function getPost(slug: string) {
  return client.fetch(postBySlugQuery, { slug });
}
```

### Rendering Rich Text (Portable Text)
```tsx
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

const components = {
  types: {
    image: ({ value }) => (
      <div className="my-8 relative aspect-video">
        <Image src={urlFor(value).url()} alt={value.alt ?? ''} fill className="object-cover rounded-lg" />
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-blue-600 underline">{children}</a>
    ),
  },
};

export function RichText({ content }) {
  return (
    <div className="prose max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
```

---

## Contentful

```bash
npm install contentful
```

```ts
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getPosts() {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishedAt'],
    limit: 10,
  });
  return entries.items.map(item => ({
    id: item.sys.id,
    title: item.fields.title as string,
    slug: item.fields.slug as string,
    excerpt: item.fields.excerpt as string,
  }));
}
```

---

## On-Demand Revalidation (Next.js + CMS webhooks)

```ts
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const secret = req.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { type, slug } = await req.json();

  if (type === 'post') {
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidateTag('posts');
  }

  return Response.json({ revalidated: true });
}
// Configure webhook in CMS to POST to /api/revalidate on publish
```
