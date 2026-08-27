'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export function LanguageGateway() {
  useEffect(() => {
    const savedLocale = window.localStorage.getItem('paleoware-locale')
    const browserLocale = navigator.language.toLowerCase().startsWith('es')
      ? 'es'
      : 'en'

    window.location.replace(`/${savedLocale === 'es' || savedLocale === 'en' ? savedLocale : browserLocale}/`)
  }, [])

  return (
    <main className="language-gateway">
      <div className="language-gateway__mark">P/</div>
      <p>Preparing the Paleoware experience...</p>
      <div className="language-gateway__links">
        <Link href="/es/">Espanol</Link>
        <Link href="/en/">English</Link>
      </div>
    </main>
  )
}
