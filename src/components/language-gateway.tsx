'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/Paleoware-Logotipo.webp'
import esMessages from '@/messages/es.json'

type LanguageGatewayProps = Readonly<{
  basePath: string
}>

/**
 * Pantalla de entrada de menos de un segundo: redirige al locale guardado.
 * Los enlaces quedan como salida manual si el script no corre.
 */
export function LanguageGateway({ basePath }: LanguageGatewayProps) {
  useEffect(() => {
    const savedLocale = window.localStorage.getItem('paleoware-locale')
    const browserLocale = navigator.language.toLowerCase().startsWith('es')
      ? 'es'
      : 'en'
    const next = savedLocale === 'es' || savedLocale === 'en' ? savedLocale : browserLocale
    const normalizedBasePath = basePath ? `/${basePath.replace(/^\/+|\/+$/g, '')}` : ''

    window.location.replace(`${normalizedBasePath}/${next}/`)
  }, [basePath])

  const t = esMessages.LanguageGateway

  return (
    <main className="language-gateway">
      <Image
        className="language-gateway__logo"
        src={logo}
        alt="Paleoware"
        width={260}
        height={37}
        priority
      />
      <p>{t.loading}</p>
      <div className="language-gateway__links">
        <Link href="/es/">{t.spanish}</Link>
        <Link href="/en/">{t.english}</Link>
      </div>
    </main>
  )
}
