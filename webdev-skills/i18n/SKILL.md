---
name: i18n
description: Implement internationalization (i18n) and multi-language support for web applications including locale routing, translation files, and RTL support. Use this skill whenever the user wants to add multiple languages, set up locale-based routing, manage translation strings, implement RTL layout, or configure next-intl or i18next. Trigger for "i18n", "internationalization", "multi-language", "translations", "locale routing", "next-intl", "i18next", "RTL support", or "language switcher".
---

# Internationalization (i18n)

Add multi-language support to web applications.

## next-intl (Best for Next.js App Router)

```bash
npm install next-intl
```

### File Structure
```
messages/
├── en.json
├── fr.json
├── ar.json    # RTL language
└── ja.json
```

```json
// messages/en.json
{
  "HomePage": {
    "title": "Welcome to {appName}",
    "description": "The best app for your needs",
    "cta": "Get started"
  },
  "Navigation": {
    "home": "Home",
    "about": "About",
    "pricing": "Pricing"
  },
  "Common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

### Configuration
```ts
// i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fr', 'de', 'ar', 'ja'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  return { messages: (await import(`./messages/${locale}.json`)).default };
});
```

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',  // /en/about → /about for default locale
});
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
```

### Using Translations
```tsx
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title', { appName: 'MyApp' })}</h1>
      <p>{t('description')}</p>
      <Button>{t('cta')}</Button>
    </div>
  );
}

// Server Component
import { getTranslations } from 'next-intl/server';
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('title') };
}
```

### Language Switcher
```tsx
'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/client';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select value={locale} onChange={(e) => router.replace(pathname, { locale: e.target.value })}>
      {languages.map(({ code, label, flag }) => (
        <option key={code} value={code}>{flag} {label}</option>
      ))}
    </select>
  );
}
```

---

## RTL Support

```tsx
// app/[locale]/layout.tsx
const rtlLocales = ['ar', 'he', 'fa', 'ur'];

export default function LocaleLayout({ children, params: { locale } }) {
  const isRTL = rtlLocales.includes(locale);
  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={isRTL ? 'font-arabic' : ''}>{children}</body>
    </html>
  );
}
```

```css
/* Use logical properties for RTL-compatible layout */
.card { margin-inline-start: 1rem; }  /* instead of margin-left */
.icon { padding-inline-end: 0.5rem; } /* instead of padding-right */
```

---

## Pluralization & Formatting

```json
// messages/en.json
{
  "items": "{count, plural, =0 {No items} =1 {One item} other {# items}}",
  "lastSeen": "{date, date, short}"
}
```

```tsx
t('items', { count: 5 })     // "5 items"
t('lastSeen', { date: new Date() })  // "3/10/26"
```
