---
name: graphql-api
description: Design and implement GraphQL APIs with schema definition, resolvers, queries, mutations, and subscriptions. Use this skill whenever the user wants to build a GraphQL API, write schemas, create resolvers, add GraphQL to Next.js, or use Apollo/Pothos. Trigger for "GraphQL", "Apollo Server", "schema design", "resolvers", "GraphQL query", "mutation", "Pothos", or "type-safe GraphQL".
---

# GraphQL API

Build type-safe GraphQL APIs with schema-first or code-first approaches.

## Setup (Apollo Server + Next.js)

```bash
npm install @apollo/server graphql @as-integration/next
```

```ts
// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integration/next';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createContext } from './context';

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => createContext(req),
});

export { handler as GET, handler as POST };
```

## Schema Definition

```graphql
# graphql/schema.ts
export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User!
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    users(limit: Int, offset: Int): [User!]!
    post(id: ID!): Post
    posts(published: Boolean): [Post!]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }

  input CreatePostInput {
    title: String!
    content: String
    published: Boolean
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }
`;
```

## Resolvers

```ts
// graphql/resolvers.ts
export const resolvers = {
  Query: {
    user: async (_, { id }, { db }) => db.user.findUnique({ where: { id } }),
    users: async (_, { limit = 20, offset = 0 }, { db }) =>
      db.user.findMany({ take: limit, skip: offset }),
    posts: async (_, { published }, { db }) =>
      db.post.findMany({ where: published !== undefined ? { published } : {} }),
  },
  Mutation: {
    createPost: async (_, { input }, { db, user }) => {
      if (!user) throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHORIZED' } });
      return db.post.create({ data: { ...input, authorId: user.id } });
    },
    deletePost: async (_, { id }, { db, user }) => {
      const post = await db.post.findUnique({ where: { id } });
      if (!post || post.authorId !== user?.id) throw new GraphQLError('Forbidden');
      await db.post.delete({ where: { id } });
      return true;
    },
  },
  User: {
    posts: (user, _, { db }) => db.post.findMany({ where: { authorId: user.id } }),
  },
  Post: {
    author: (post, _, { db }) => db.user.findUnique({ where: { id: post.authorId } }),
  },
};
```

## Context

```ts
// graphql/context.ts
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function createContext(req: Request) {
  const session = await auth();
  return { db, user: session?.user ?? null };
}
```

## Code-First with Pothos (Recommended for TypeScript)

```bash
npm install @pothos/core @pothos/plugin-prisma
```

```ts
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { db } from '@/lib/db';

const builder = new SchemaBuilder({
  plugins: [PrismaPlugin],
  prisma: { client: db },
});

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email'),
    posts: t.relation('posts'),
  }),
});

builder.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    resolve: (query) => db.user.findMany({ ...query }),
  })
);

export const schema = builder.toSchema();
```

## DataLoader (Prevent N+1)

```ts
import DataLoader from 'dataloader';

const userLoader = new DataLoader(async (ids: string[]) => {
  const users = await db.user.findMany({ where: { id: { in: ids } } });
  return ids.map(id => users.find(u => u.id === id) ?? null);
});

// In context
export function createContext() {
  return { db, loaders: { user: userLoader } };
}

// In resolver (batches requests)
Post: {
  author: (post, _, { loaders }) => loaders.user.load(post.authorId),
}
```
