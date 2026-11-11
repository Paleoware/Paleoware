'use client'

import { useEffect } from 'react'

/**
 * The `lang` attribute lives in the root layout, which does not know the
 * locale. This keeps the document language in sync with the active route.
 */
export function LocaleLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
