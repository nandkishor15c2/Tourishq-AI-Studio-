---
name: package-management
description: Handle npm/yarn/pnpm dependency management, versioning, scripts, and package.json configuration for web projects. Use this skill whenever the user asks about installing packages, resolving dependency conflicts, choosing a package manager, setting up scripts, managing monorepos, or dealing with node_modules issues. Trigger for phrases like "install X", "dependency error", "package.json setup", "monorepo", or "npm vs pnpm".
---

# Package Management

Manages dependencies, scripts, and package configuration for JavaScript/TypeScript projects.

## Package Manager Comparison

| Feature | npm | yarn | pnpm |
|---------|-----|------|------|
| Speed | ★★★ | ★★★★ | ★★★★★ |
| Disk usage | High | Medium | Low (symlinks) |
| Monorepo | Workspaces | Workspaces | Workspaces |
| Lockfile | package-lock.json | yarn.lock | pnpm-lock.yaml |
| **Recommended** | Default | Legacy | ✅ Modern projects |

---

## Common Commands

### Install
```bash
# npm
npm install           # install all deps
npm install <pkg>     # add dependency
npm install -D <pkg>  # add devDependency
npm install -g <pkg>  # global install

# pnpm equivalents
pnpm install
pnpm add <pkg>
pnpm add -D <pkg>
pnpm add -g <pkg>
```

### Update & Audit
```bash
npm outdated          # list outdated packages
npm update            # update within semver range
npx npm-check-updates # show all available updates
ncu -u                # write updates to package.json
npm audit fix         # auto-fix vulnerabilities
```

### Scripts
```bash
npm run dev
npm run build
npm run test
npm run lint
npm run format
```

---

## package.json Best Practices

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "prepare": "husky install"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

---

## Monorepo Setup (pnpm workspaces)

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```
monorepo/
├── apps/
│   ├── web/          # Next.js app
│   └── admin/        # Admin panel
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared config (eslint, tsconfig)
│   └── utils/        # Shared utilities
└── pnpm-workspace.yaml
```

```bash
# Run command in specific workspace
pnpm --filter web dev

# Add package to specific workspace
pnpm --filter web add react

# Add shared package
pnpm --filter web add @my-app/ui
```

---

## Dependency Resolution Issues

### Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `ERESOLVE` (npm) | `npm install --legacy-peer-deps` |
| Peer dep warning | Check versions, use `overrides` |
| Hoisting issues (pnpm) | Add `.npmrc`: `shamefully-hoist=true` |
| Lockfile conflict | Delete lockfile + `node_modules`, reinstall |

### Version Pinning Strategy
```json
{
  "dependencies": {
    "react": "^18.2.0",    // Minor updates OK
    "next": "~14.1.0",     // Patch updates only
    "typescript": "5.3.3"  // Exact pin (critical tools)
  },
  "overrides": {
    "some-dep": "1.2.3"    // Force version across tree
  }
}
```

---

## Workflow

1. **Choose** package manager based on project type (pnpm for new, npm for simplicity)
2. **Initialize** with `pnpm init` or use scaffold from project-scaffolding skill
3. **Install** dependencies in correct category (dep vs devDep)
4. **Set up scripts** for dev, build, lint, test, format
5. **Add** `.npmrc` or `.yarnrc.yml` for team-wide config
6. **Commit** lockfile always — never `.gitignore` it
