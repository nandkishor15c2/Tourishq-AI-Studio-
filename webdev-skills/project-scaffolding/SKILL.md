---
name: project-scaffolding
description: Set up complete project structures for modern web frameworks. Use this skill whenever the user wants to start a new web project, initialize a codebase, scaffold a React/Next.js/Vue/Nuxt/Svelte app, or asks about project structure and folder organization. Trigger even for partial requests like "start a new app", "set up a project", "create a boilerplate", or "what folder structure should I use".
---

# Project Scaffolding

Bootstraps production-ready project structures for modern web frameworks.

## Supported Frameworks

| Framework | Command | Notes |
|-----------|---------|-------|
| Next.js (App Router) | `npx create-next-app@latest` | Preferred for React SSR |
| Next.js (Pages Router) | `npx create-next-app@latest --no-app` | Legacy projects |
| Vite + React | `npm create vite@latest -- --template react-ts` | SPA / CSR |
| Vue 3 + Vite | `npm create vite@latest -- --template vue-ts` | Vue SPA |
| Nuxt 3 | `npx nuxi@latest init` | Vue SSR |
| SvelteKit | `npm create svelte@latest` | Svelte full-stack |
| Astro | `npm create astro@latest` | Content-heavy sites |

---

## Recommended Folder Structure

### Next.js App Router
```
my-app/
├── app/
│   ├── (auth)/           # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   ├── api/              # API routes
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # Generic reusable components
│   └── features/         # Feature-specific components
├── lib/
│   ├── db.ts             # Database client
│   ├── auth.ts           # Auth helpers
│   └── utils.ts
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── styles/               # Global styles
```

### Vite + React SPA
```
src/
├── assets/
├── components/
│   ├── ui/
│   └── layout/
├── pages/
├── hooks/
├── store/               # Zustand / Redux
├── services/            # API calls
├── types/
└── utils/
```

---

## Essential Config Files

### tsconfig.json (path aliases)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./lib/*"]
    }
  }
}
```

### .gitignore
```
node_modules/
.env
.env.local
.next/
dist/
build/
.DS_Store
```

### prettier.config.js
```js
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
};
```

---

## Workflow

1. **Clarify** – Ask: framework preference, TypeScript yes/no, styling solution, auth needed?
2. **Scaffold** – Run the appropriate `create` command
3. **Install extras** – Add commonly needed packages based on project type:
   - UI: `shadcn/ui`, `radix-ui`, `lucide-react`
   - State: `zustand` or `jotai`
   - Forms: `react-hook-form` + `zod`
   - Data fetching: `@tanstack/react-query`
4. **Configure** – Set up path aliases, linting (ESLint + Prettier), and `.env.example`
5. **Verify** – Run `npm run dev` and confirm the app starts

---

## Quick Start Templates

See `references/templates.md` for ready-to-use boilerplates for:
- SaaS starter
- Marketing site
- E-commerce storefront
- Admin dashboard
