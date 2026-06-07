---
name: api-testing
description: Test REST and GraphQL APIs using Supertest, Vitest, and mock strategies for web applications. Use this skill whenever the user wants to test API endpoints, mock database calls, test API authentication, validate request/response schemas, or write integration tests for backend routes. Trigger for "API testing", "Supertest", "test endpoint", "mock database", "integration test", "test route handler", or "API integration test".
---

# API Testing

Test REST API endpoints with mocked dependencies.

## Next.js Route Handler Tests

```ts
// app/api/posts/route.test.ts
import { GET, POST } from './route';
import { NextRequest } from 'next/server';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/lib/db', () => ({
  db: {
    post: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

import { db } from '@/lib/db';
import { auth } from '@/auth';

describe('GET /api/posts', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 401 when unauthenticated', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null);
    const req = new NextRequest('http://localhost/api/posts');
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('returns paginated posts', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'u1', role: 'user' } } as any);
    vi.mocked(db.post.findMany).mockResolvedValueOnce([
      { id: '1', title: 'Post 1', published: true } as any,
    ]);
    vi.mocked(db.post.count).mockResolvedValueOnce(1);

    const req = new NextRequest('http://localhost/api/posts?page=1&limit=10');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data).toHaveLength(1);
    expect(body.meta).toEqual({ page: 1, limit: 10, total: 1 });
  });
});

describe('POST /api/posts', () => {
  it('creates post with valid data', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'u1' } } as any);
    const mockPost = { id: '2', title: 'New Post', authorId: 'u1' };
    vi.mocked(db.post.create).mockResolvedValueOnce(mockPost as any);

    const req = new NextRequest('http://localhost/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Post', content: 'Content here' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.data.title).toBe('New Post');
  });

  it('returns 422 for invalid input', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'u1' } } as any);

    const req = new NextRequest('http://localhost/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title: '' }), // empty title fails validation
    });

    const res = await POST(req);
    expect(res.status).toBe(422);
  });
});
```

## Testing with Real Database (Integration)

```ts
// Use a test database
// vitest.config.ts — set TEST_DATABASE_URL

// tests/helpers/db.ts
import { db } from '@/lib/db';

export async function cleanDb() {
  await db.post.deleteMany();
  await db.user.deleteMany();
}

export async function createTestUser() {
  return db.user.create({ data: { email: 'test@example.com', name: 'Test User' } });
}
```

## Response Schema Validation

```ts
import { z } from 'zod';

const paginatedResponseSchema = z.object({
  data: z.array(z.object({ id: z.string(), title: z.string() })),
  meta: z.object({ page: z.number(), limit: z.number(), total: z.number() }),
  success: z.literal(true),
});

it('response matches schema', async () => {
  const res = await GET(new NextRequest('http://localhost/api/posts'));
  const body = await res.json();
  expect(() => paginatedResponseSchema.parse(body)).not.toThrow();
});
```
