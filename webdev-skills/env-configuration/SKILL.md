---
name: env-configuration
description: Manage environment variables, .env files, secrets, and runtime configuration for web applications. Use this skill whenever the user mentions .env files, environment variables, secrets management, API keys, config between dev/staging/production, or asks how to safely store sensitive values. Trigger for "env setup", "API key storage", "config management", ".env.local", or "environment-specific settings".
---

# Environment Configuration

Handles environment variables, secrets, and configuration management across dev/staging/production environments.

## .env File Hierarchy (Next.js / Node)

| File | Loaded | Committed to git? |
|------|--------|-------------------|
| `.env` | Always | ✅ Yes (non-secret defaults) |
| `.env.local` | Always | ❌ No |
| `.env.development` | `NODE_ENV=development` | ✅ Yes |
| `.env.production` | `NODE_ENV=production` | ✅ Yes |
| `.env.development.local` | `NODE_ENV=development` | ❌ No |

---

## .env.example Template

Always commit `.env.example` so teammates know what's needed:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyApp

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Auth
NEXTAUTH_SECRET=          # generate: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Email
RESEND_API_KEY=
FROM_EMAIL=noreply@myapp.com

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
S3_BUCKET_NAME=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## Naming Conventions

```bash
# Public (exposed to browser) — Next.js
NEXT_PUBLIC_API_URL=...

# Server-only (never exposed to browser)
DATABASE_URL=...
SECRET_KEY=...

# Use SCREAMING_SNAKE_CASE
MY_API_KEY=...         # ✅
myApiKey=...           # ❌
```

---

## Validation with Zod (Recommended)

Validate env vars at startup to catch missing values early:

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
});

export const env = envSchema.parse(process.env);
// Throws at startup if any required env var is missing or invalid
```

---

## Multi-Environment Strategy

```
envs/
├── .env.example          # Template (committed)
├── .env.development      # Dev defaults (committed)
├── .env.test             # Test defaults (committed)
└── .env.local            # Personal overrides (gitignored)
```

### Per-Environment Values Pattern
```typescript
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;
```

---

## Secrets in Production

| Platform | Secrets Management |
|----------|--------------------|
| Vercel | Project Settings → Environment Variables |
| Netlify | Site Settings → Environment Variables |
| AWS | AWS Secrets Manager / SSM Parameter Store |
| Docker | Docker Secrets or mounted `.env` |
| GitHub Actions | Repository Secrets |

---

## Security Rules

1. **Never** commit `.env.local` or any file with real secrets
2. **Always** add `.env*.local` to `.gitignore`
3. **Rotate** secrets immediately if accidentally committed
4. **Use** different secrets per environment
5. **Prefix** browser-safe vars with `NEXT_PUBLIC_` (or framework equivalent)
6. **Validate** all env vars at app startup using a schema

---

## .gitignore Entries
```
.env.local
.env.*.local
.env.production
```
