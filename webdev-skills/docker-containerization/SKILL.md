---
name: docker-containerization
description: Create Dockerfiles, docker-compose setups, and containerize web applications for development and production. Use this skill whenever the user wants to containerize an app, write a Dockerfile, set up docker-compose with services (app + db + redis), configure multi-stage builds, or deploy with containers. Trigger for "Dockerfile", "docker-compose", "containerize", "Docker setup", "multi-stage build", or "Docker deployment".
---

# Docker Containerization

Containerize web applications for consistent development and production deployments.

## Production Dockerfile (Next.js)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## .dockerignore
```
node_modules
.next
.git
.env
.env.local
*.log
README.md
.dockerignore
```

---

## Docker Compose (Full Stack Dev)

```yaml
# docker-compose.yml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  adminer:
    image: adminer
    ports:
      - '8080:8080'
    depends_on:
      - db

volumes:
  postgres_data:
  redis_data:
```

## Development Dockerfile
```dockerfile
# Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

---

## Common Commands

```bash
# Build
docker build -t my-app .
docker build -t my-app:v1.0 .

# Run
docker run -p 3000:3000 --env-file .env my-app
docker run -d --name my-app -p 3000:3000 my-app   # detached

# Compose
docker compose up -d          # start all services
docker compose up -d --build  # rebuild then start
docker compose down           # stop and remove containers
docker compose down -v        # also remove volumes
docker compose logs -f app    # follow app logs
docker compose exec app sh    # shell into container

# Inspect
docker ps                     # running containers
docker logs my-app -f         # container logs
docker exec -it my-app sh     # interactive shell
docker stats                  # resource usage

# Cleanup
docker system prune -af       # remove everything unused
```

---

## Environment Variables in Docker

```yaml
# Option 1: .env file (recommended)
services:
  app:
    env_file:
      - .env.local

# Option 2: Inline (non-secret values only)
services:
  app:
    environment:
      - NODE_ENV=production
      - PORT=3000

# Option 3: From host environment
services:
  app:
    environment:
      - SECRET_KEY   # passes $SECRET_KEY from host
```

---

## Health Checks

```dockerfile
# In Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

```ts
// app/api/health/route.ts
export function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

---

## Multi-Stage Build Benefits
- **Smaller images** – prod image only has runtime files, not build tools
- **Security** – dev dependencies not included
- **Speed** – layers are cached, only changed steps re-run

Typical size reduction: 1.2GB → 150MB for a Next.js app.
