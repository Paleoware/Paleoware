import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Both languages remain visible in the URL, which is clearer for SEO.
  localePrefix: 'always',
})
