---
name: cloud-deployment
description: Deploy web applications to cloud platforms including Vercel, Netlify, AWS, and GCP. Use this skill whenever the user wants to deploy their app, configure production hosting, set up custom domains, configure environment variables in production, or choose a deployment platform. Trigger for "deploy to Vercel", "Netlify deploy", "AWS deployment", "production hosting", "deploy Next.js", or "cloud deployment".
---

# Cloud Deployment

Deploy web applications to modern cloud platforms.

## Vercel (Best for Next.js)

### One-Command Deploy
```bash
npm install -g vercel
vercel --prod
```

### vercel.json Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ],
  "rewrites": [
    { "source": "/api/v1/:path*", "destination": "https://api.external.com/:path*" }
  ]
}
```

### Environment Variables
```bash
# Add via CLI
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production

# Or via dashboard: vercel.com → Project → Settings → Environment Variables
```

---

## Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301
```

---

## AWS (EC2 + Docker)

```bash
# 1. Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URI
docker build -t my-app .
docker tag my-app:latest $ECR_URI/my-app:latest
docker push $ECR_URI/my-app:latest

# 2. Update ECS service
aws ecs update-service --cluster my-cluster --service my-app --force-new-deployment
```

## Deployment Checklist

**Before Deploy**
- [ ] All environment variables set in platform
- [ ] Database migrations run
- [ ] `npm run build` succeeds locally
- [ ] Production secrets different from dev

**After Deploy**
- [ ] Health check endpoint returns 200
- [ ] Auth flows work
- [ ] Database connections succeed
- [ ] Error tracking (Sentry) reports no new errors

## Platform Comparison

| Platform | Best For | Free Tier | Scale |
|----------|----------|-----------|-------|
| **Vercel** | Next.js, SSR | Generous | Serverless |
| **Netlify** | Static, JAMstack | Generous | Serverless |
| **Railway** | Full-stack + DB | Limited | Containers |
| **Render** | Docker, services | Limited | Containers |
| **AWS/GCP** | Enterprise | Pay-as-go | Unlimited |
