---
name: rest-api-design
description: Design and implement RESTful APIs with proper route structure, controllers, middleware, validation, and error handling. Use this skill whenever the user wants to build API endpoints, design route structures, add middleware, handle API errors, implement CRUD operations, or structure a backend. Trigger for "API route", "REST endpoint", "controller", "middleware", "API design", "CRUD API", "route handler", or backend API questions.
---

# REST API Design

Build well-structured, consistent RESTful APIs.

## URL Convention

```
GET    /api/users           → list users
POST   /api/users           → create user
GET    /api/users/:id       → get user
PATCH  /api/users/:id       → update user
DELETE /api/users/:id       → delete user

GET    /api/users/:id/posts → list user's posts
POST   /api/posts/:id/like  → action verb for non-CRUD
```

---

## Next.js App Router API Routes

### Route Handler Structure
```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';

const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['user', 'admin']).default('user'),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Math.min(Number(searchParams.get('limit') ?? '20'), 100);

  const [users, total] = await Promise.all([
    db.user.findMany({ skip: (page - 1) * limit, take: limit }),
    db.user.count(),
  ]);

  return NextResponse.json({ data: users, meta: { page, limit, total } });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 422 });
  }

  const user = await db.user.create({ data: parsed.data });
  return NextResponse.json({ data: user }, { status: 201 });
}
```

### Dynamic Route
```ts
// app/api/users/[id]/route.ts
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: user });
}
```

---

## Response Format Standard

```ts
// lib/api/response.ts
export const apiResponse = {
  success: <T>(data: T, status = 200) =>
    NextResponse.json({ data, success: true }, { status }),

  error: (message: string, status = 400, details?: unknown) =>
    NextResponse.json({ error: message, success: false, details }, { status }),

  paginated: <T>(data: T[], meta: { page: number; limit: number; total: number }) =>
    NextResponse.json({ data, meta, success: true }),
};

// Usage
return apiResponse.success(user, 201);
return apiResponse.error('Not found', 404);
```

### HTTP Status Codes
| Code | When to use |
|------|-------------|
| 200 | Successful GET, PATCH |
| 201 | Successful POST (created) |
| 204 | Successful DELETE (no content) |
| 400 | Bad request / invalid input |
| 401 | Unauthenticated |
| 403 | Unauthorized (authenticated but no permission) |
| 404 | Resource not found |
| 409 | Conflict (duplicate) |
| 422 | Validation error |
| 429 | Rate limit exceeded |
| 500 | Server error |

---

## Middleware Pattern

```ts
// lib/api/middleware.ts
type Handler = (req: NextRequest, ctx?: any) => Promise<NextResponse>;

export function withAuth(handler: Handler): Handler {
  return async (req, ctx) => {
    const session = await auth();
    if (!session) return apiResponse.error('Unauthorized', 401);
    return handler(req, ctx);
  };
}

export function withValidation<T>(schema: z.ZodSchema<T>, handler: (req: NextRequest, data: T) => Promise<NextResponse>): Handler {
  return async (req) => {
    const body = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(body);
    if (!parsed.success) return apiResponse.error('Validation failed', 422, parsed.error.issues);
    return handler(req, parsed.data);
  };
}
```

---

## Error Handling

```ts
// lib/api/error-handler.ts
export function handleApiError(error: unknown) {
  if (error instanceof z.ZodError) {
    return apiResponse.error('Validation failed', 422, error.issues);
  }
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') return apiResponse.error('Already exists', 409);
    if (error.code === 'P2025') return apiResponse.error('Not found', 404);
  }
  console.error(error);
  return apiResponse.error('Internal server error', 500);
}

// Wrap handlers
export async function GET(req: NextRequest) {
  try {
    // ... handler logic
  } catch (error) {
    return handleApiError(error);
  }
}
```

---

## Rate Limiting

```ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

export async function POST(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) return apiResponse.error('Too many requests', 429);
  // ...
}
```
