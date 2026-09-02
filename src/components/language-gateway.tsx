'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/Paleoware-logo-completo.webp'

type LanguageGatewayProps = Readonly<{
  basePath: string
}>

export function LanguageGateway({ basePath }: LanguageGatewayProps) {
  useEffect(() => {
    const savedLocale = window.localStorage.getItem('paleoware-locale')
    const browserLocale = navigator.language.toLowerCase().startsWith('es')
      ? 'es'
      : 'en'
    const locale = savedLocale === 'es' || savedLocale === 'en' ? savedLocale : browserLocale
    const normalizedBasePath = basePath
      ? `/${basePath.replace(/^\/+|\/+$/g, '')}`
      : ''

    window.location.replace(`${normalizedBasePath}/${locale}/`)
  }, [basePath])

  return (
    <main className="language-gateway">
      <Image className="language-gateway__logo" src={logo} alt="Paleoware" width={320} height={180} priority />
      <p>Preparing the Paleoware experience...</p>
      <div className="language-gateway__links">
        <Link href="/es/">Espanol</Link>
        <Link href="/en/">English</Link>
      </div>
    </main>
  )
}
