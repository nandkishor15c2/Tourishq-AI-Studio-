---
name: responsive-layouts
description: Build responsive, mobile-first web layouts using CSS Grid, Flexbox, and Tailwind CSS. Use this skill whenever the user wants to create layouts that work across screen sizes, fix mobile responsiveness issues, build grids, sidebars, navigation bars, hero sections, or multi-column layouts. Trigger for "responsive design", "mobile layout", "grid layout", "flexbox", "breakpoints", "sidebar", or any layout-related request.
---

# Responsive Layouts

Mobile-first, responsive layout patterns using modern CSS and Tailwind.

## Breakpoint Reference

| Name | Tailwind prefix | Min-width |
|------|-----------------|-----------|
| Mobile | (default) | 0px |
| Small | `sm:` | 640px |
| Medium | `md:` | 768px |
| Large | `lg:` | 1024px |
| XL | `xl:` | 1280px |
| 2XL | `2xl:` | 1536px |

---

## Core Layout Patterns

### Responsive Grid
```tsx
// 1 col → 2 col → 3 col
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card /><Card /><Card />
</div>

// Auto-fill grid (items fill available space)
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Sidebar Layout
```tsx
// Stacked on mobile, side-by-side on desktop
<div className="flex flex-col lg:flex-row min-h-screen">
  <aside className="w-full lg:w-64 lg:flex-shrink-0 bg-gray-100">
    <Nav />
  </aside>
  <main className="flex-1 p-6">
    <Outlet />
  </main>
</div>
```

### Sticky Sidebar with Scrollable Content
```tsx
<div className="flex gap-8 max-w-7xl mx-auto px-4">
  <aside className="hidden lg:block w-64 flex-shrink-0">
    <div className="sticky top-4 space-y-4">
      <TableOfContents />
    </div>
  </aside>
  <article className="flex-1 min-w-0">
    <Content />
  </article>
</div>
```

### Hero Section
```tsx
<section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
  <div className="max-w-3xl mx-auto space-y-6">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
      Headline Text
    </h1>
    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
      Supporting text here
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg">Primary CTA</Button>
      <Button variant="outline" size="lg">Secondary</Button>
    </div>
  </div>
</section>
```

### Navigation Bar
```tsx
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
  <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <Logo />
    {/* Desktop nav */}
    <ul className="hidden md:flex items-center gap-6">
      <NavLink href="/features">Features</NavLink>
      <NavLink href="/pricing">Pricing</NavLink>
    </ul>
    {/* Mobile hamburger */}
    <button className="md:hidden" onClick={toggleMenu}>
      <MenuIcon />
    </button>
  </nav>
  {/* Mobile menu drawer */}
  {isOpen && <MobileMenu />}
</header>
```

### Card Grid with Feature Section
```tsx
<section className="py-16 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {features.map(f => (
        <div key={f.id} className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
          <f.icon className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
          <p className="text-gray-600">{f.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Container & Spacing

```tsx
// Standard page container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Narrow content (articles, forms)
<div className="max-w-2xl mx-auto px-4">

// Full-bleed with inner padding
<section className="w-full bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 py-16">
```

---

## Common Fixes

| Problem | Fix |
|---------|-----|
| Image overflow | `max-w-full h-auto` or `object-cover` |
| Text overflow | `break-words` or `overflow-hidden text-ellipsis` |
| Flex children shrink | `flex-shrink-0` on fixed-size child |
| Content under fixed header | `pt-16` (match header height) |
| Horizontal scroll | `overflow-x-hidden` on `body` |

---

## Mobile-First Rule
Always write base styles for mobile, then add `md:` and `lg:` overrides.
```
❌  hidden md:block → hides on mobile (ok if intentional)
✅  block md:hidden → shows on mobile, hides on desktop
```
