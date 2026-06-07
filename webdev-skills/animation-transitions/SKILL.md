---
name: animation-transitions
description: Implement animations, transitions, and micro-interactions using Framer Motion, CSS animations, and React Spring. Use this skill whenever the user wants to add animations, page transitions, hover effects, loading states, scroll animations, or any motion to their web app. Trigger for "animation", "Framer Motion", "transitions", "micro-interactions", "page transition", "scroll animation", "hover effect", "loading animation", or "React Spring".
---

# Animations & Transitions

Add fluid animations and micro-interactions to enhance user experience.

## Framer Motion (Recommended)

```bash
npm install framer-motion
```

### Basic Animations
```tsx
import { motion } from 'framer-motion';

// Fade in on mount
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
  Content
</motion.div>

// Slide up on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  Content
</motion.div>

// Hover + tap effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### Staggered List Animation
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### Page Transitions (Next.js App Router)
```tsx
// components/PageTransition.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Scroll-Triggered Animations
```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### Modal Animations
```tsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## CSS Animations (No Library)

```css
/* Skeleton loading pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.skeleton { animation: pulse 2s ease-in-out infinite; background: #e5e7eb; border-radius: 4px; }

/* Spin */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner { animation: spin 1s linear infinite; }

/* Fade in */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; } }
.fade-in { animation: fadeIn 0.3s ease-out forwards; }
```

```tsx
/* Tailwind */
<div className="animate-pulse bg-gray-200 rounded h-4 w-32" />  {/* skeleton */}
<div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />  {/* spinner */}
<div className="animate-bounce">↓</div>
<div className="animate-ping" />  {/* ripple effect */}
```

---

## Performance Rules

1. Animate only `transform` and `opacity` — they don't trigger layout
2. Use `will-change: transform` for elements that always animate
3. Disable animations for `prefers-reduced-motion` users:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
<motion.div animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }} />
```
