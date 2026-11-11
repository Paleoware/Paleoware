'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const DARK = `${BASE}/fondo_hero/contact_bg_dark.webp`
const LIGHT = `${BASE}/fondo_hero/contact_bg_clear.webp`

/** La imagen de contacto sigue al modo manual, no a prefers-color-scheme. */
export function ContactMedia() {
  const [src, setSrc] = useState(DARK)

  useEffect(() => {
    const read = () =>
      setSrc(document.documentElement.dataset.theme === 'light' ? LIGHT : DARK)

    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      fill
      sizes="(max-width: 1023px) 100vw, 45vw"
      style={{ objectFit: 'cover' }}
    />
  )
}
