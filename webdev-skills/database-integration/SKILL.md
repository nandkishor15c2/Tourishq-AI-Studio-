---
name: database-integration
description: Set up and use databases with Prisma ORM, Drizzle ORM, or direct SQL/NoSQL connections in web applications. Use this skill whenever the user needs to connect a database, define schemas, write queries, handle migrations, set up relationships, or work with Prisma, Drizzle, Supabase, or MongoDB. Trigger for "database setup", "Prisma schema", "Drizzle ORM", "SQL query", "database migration", "DB connection", "Supabase", or any data persistence question.
---

# Database Integration

Connect, model, and query databases using modern ORMs.

## Choosing a Database

| Database | Best For | ORM |
|----------|----------|-----|
| **PostgreSQL** | Most apps (recommended) | Prisma, Drizzle |
| **MySQL** | Legacy, PlanetScale | Prisma, Drizzle |
| **SQLite** | Dev, edge, low-traffic | Drizzle, Prisma |
| **MongoDB** | Flexible schema, documents | Mongoose, Prisma |
| **Supabase** | Postgres + Auth + Storage | Supabase client, Drizzle |

---

## Prisma ORM

### Setup
```bash
npm install prisma @prisma/client
npx prisma init
```

### Schema
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  tags      Tag[]
  createdAt DateTime @default(now())
}

model Profile {
  id     String  @id @default(cuid())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String  @unique
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

### Client Setup
```ts
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
```

### Common Queries
```ts
// Create
const user = await db.user.create({
  data: { email: 'user@example.com', name: 'Alice' },
});

// Read with relations
const userWithPosts = await db.user.findUnique({
  where: { id: userId },
  include: { posts: { where: { published: true }, orderBy: { createdAt: 'desc' } } },
});

// Paginated list
const posts = await db.post.findMany({
  where: { published: true },
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' },
  select: { id: true, title: true, author: { select: { name: true } } },
});

// Update
const updated = await db.user.update({
  where: { id: userId },
  data: { name: 'Bob', updatedAt: new Date() },
});

// Upsert
const tag = await db.tag.upsert({
  where: { name: 'typescript' },
  create: { name: 'typescript' },
  update: {},
});

// Delete
await db.post.delete({ where: { id: postId } });

// Transaction
const [post, _] = await db.$transaction([
  db.post.create({ data: { title: 'My Post', authorId: userId } }),
  db.user.update({ where: { id: userId }, data: { postCount: { increment: 1 } } }),
]);
```

---

## Drizzle ORM

### Setup
```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

### Schema
```ts
// lib/db/schema.ts
import { pgTable, text, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  authorId: text('author_id').references(() => users.id, { onDelete: 'cascade' }),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

### Queries
```ts
import { db } from './db';
import { users, posts } from './schema';
import { eq, and, desc } from 'drizzle-orm';

// Select
const allUsers = await db.select().from(users);

// With join
const result = await db
  .select({ post: posts, author: users })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .where(and(eq(posts.published, true)))
  .orderBy(desc(posts.createdAt))
  .limit(10);

// Insert
await db.insert(users).values({ email: 'user@example.com', name: 'Alice' });

// Update
await db.update(users).set({ name: 'Bob' }).where(eq(users.id, userId));

// Delete
await db.delete(posts).where(eq(posts.id, postId));
```

---

## Migrations

```bash
# Prisma
npx prisma migrate dev --name add_user_role
npx prisma migrate deploy  # production

# Drizzle
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## Connection Pooling (Production)
Use **Prisma Accelerate** or **Supabase connection pooler** (PgBouncer) to avoid exhausting DB connections in serverless environments.

```
# Pooled connection string (Supabase)
DATABASE_URL=postgresql://...@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```
