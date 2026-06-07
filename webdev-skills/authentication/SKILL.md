---
name: authentication
description: Implement authentication systems including JWT, OAuth, sessions, and NextAuth for web applications. Use this skill whenever the user needs to add login/signup, protect routes, handle OAuth providers (Google, GitHub), manage user sessions, implement role-based access control, or deal with tokens and cookies. Trigger for "auth setup", "login system", "protect routes", "JWT", "OAuth", "NextAuth", "session management", or "user authentication".
---

# Authentication

Implement secure authentication and authorization for web applications.

## Choosing an Auth Strategy

| Approach | Best For |
|----------|----------|
| **NextAuth.js / Auth.js** | Next.js apps with OAuth |
| **Clerk** | Fastest setup, full UI included |
| **Supabase Auth** | Supabase projects |
| **Custom JWT** | Full control, non-Next.js |
| **Lucia** | TypeScript-first, framework-agnostic |

---

## NextAuth.js v5 (Auth.js)

### Setup
```bash
npm install next-auth@beta
openssl rand -base64 32  # → AUTH_SECRET
```

```ts
// auth.ts (root)
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }),
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
});

// app/api/auth/[...nextauth]/route.ts
export { handlers as GET, handlers as POST } from '@/auth';
```

### Protecting Routes (Middleware)
```ts
// middleware.ts
import { auth } from './auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.url));
  }
});

export const config = { matcher: ['/dashboard/:path*', '/settings/:path*'] };
```

### Using Session
```tsx
// Server Component
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return <div>Hello {session.user.name}</div>;
}

// Client Component
import { useSession } from 'next-auth/react';

export function UserMenu() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <Spinner />;
  if (!session) return <SignInButton />;
  return <Avatar user={session.user} />;
}
```

---

## Custom JWT Authentication

### Token Generation
```ts
// lib/auth/tokens.ts
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: object) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
```

### Cookie-Based Session
```ts
// lib/auth/session.ts
import { cookies } from 'next/headers';

export async function getSession() {
  const token = cookies().get('session')?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function setSession(userId: string) {
  const token = await signToken({ userId });
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}
```

---

## Role-Based Access Control (RBAC)

```ts
// types/auth.ts
type Role = 'user' | 'admin' | 'moderator';

// lib/auth/rbac.ts
const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  moderator: ['read', 'write', 'delete'],
  user: ['read'],
} satisfies Record<Role, string[]>;

export function can(role: Role, action: string) {
  return permissions[role]?.includes(action) ?? false;
}

// Usage in Server Component
const session = await auth();
if (!can(session.user.role, 'delete')) {
  return <p>Unauthorized</p>;
}
```

---

## Security Checklist

- [ ] Passwords hashed with bcrypt (cost factor ≥ 12)
- [ ] JWT secret ≥ 32 random bytes
- [ ] Cookies set as `httpOnly`, `secure`, `sameSite=lax`
- [ ] CSRF protection (SameSite cookie or CSRF token)
- [ ] Rate limiting on auth endpoints (see rate-limiting)
- [ ] Email verification before account activation
- [ ] Password reset tokens expire after 15 minutes
- [ ] OAuth redirect URIs whitelisted in provider dashboards
