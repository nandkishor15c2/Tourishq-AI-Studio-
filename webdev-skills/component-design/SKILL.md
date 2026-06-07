---
name: component-design
description: Build reusable, accessible, and well-structured UI components in React or Vue. Use this skill whenever the user wants to create or improve a UI component — buttons, modals, forms, cards, dropdowns, tables, navigation, or any other interface element. Trigger for "build a component", "create a modal", "make a reusable X", "component props", "compound component", or any request involving UI building blocks.
---

# Component Design

Patterns and best practices for building reusable, composable UI components.

## Component Anatomy

```tsx
// ✅ Well-structured React component
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Spinner />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, type ButtonProps };
```

---

## Component Patterns

### Compound Components
```tsx
// Usage: <Select><Select.Trigger /><Select.Options /></Select>
const Select = ({ children, value, onChange }) => (
  <SelectContext.Provider value={{ value, onChange }}>
    <div className="relative">{children}</div>
  </SelectContext.Provider>
);

Select.Trigger = SelectTrigger;
Select.Options = SelectOptions;
Select.Option = SelectOption;
```

### Render Props
```tsx
const DataTable = ({ data, renderRow }) => (
  <table>
    <tbody>{data.map(row => renderRow(row))}</tbody>
  </table>
);
```

### Controlled vs Uncontrolled
```tsx
// Support both patterns with useControllableState
function useControllableState(prop, defaultProp) {
  const [state, setState] = useState(defaultProp);
  const isControlled = prop !== undefined;
  return [isControlled ? prop : state, isControlled ? () => {} : setState];
}
```

---

## Common Components Cheatsheet

### Modal / Dialog
```tsx
import { Dialog } from '@radix-ui/react-dialog';

export function Modal({ open, onClose, title, children }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title>{title}</Dialog.Title>
          {children}
          <Dialog.Close>×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### Form with Validation
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} aria-invalid={!!errors.email} />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <button type="submit" disabled={isSubmitting}>Login</button>
    </form>
  );
}
```

### Toast Notification
```tsx
import { toast } from 'sonner';
toast.success('Saved!');
toast.error('Something went wrong');
toast.promise(saveData(), { loading: 'Saving...', success: 'Saved!', error: 'Failed' });
```

---

## Component API Design Principles

1. **Single Responsibility** – One component, one job
2. **Sensible Defaults** – Props should have defaults so component works out-of-the-box
3. **Extend HTML** – Spread native element props (`...props`) for full HTML support
4. **Forward Refs** – Use `forwardRef` for elements needing DOM access
5. **className Override** – Accept `className` prop for styling customization
6. **Accessibility** – Include ARIA attributes, roles, keyboard support by default

---

## Recommended Libraries

| Need | Library |
|------|---------|
| Accessible primitives | `@radix-ui/react-*` |
| Full component system | `shadcn/ui` |
| Icons | `lucide-react` |
| Forms | `react-hook-form` + `zod` |
| Toasts | `sonner` |
| Dates | `react-day-picker` |
| Tables | `@tanstack/react-table` |
| Virtual lists | `@tanstack/react-virtual` |
