'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import heroOne from '@/hero-1.webp'
import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

const messages = { es: esMessages, en: enMessages } as const

function detectLocale(): 'es' | 'en' {
  if (typeof window === 'undefined') return 'es'
  const saved = localStorage.getItem('paleoware-locale')
  if (saved === 'es' || saved === 'en') return saved
  return navigator.language.startsWith('en') ? 'en' : 'es'
}

export default function NotFound() {
  const [locale, setLocale] = useState<'es' | 'en'>(detectLocale)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('paleoware-locale')
      if (saved === 'es' || saved === 'en') {
        setLocale((prev) => (prev === saved ? prev : saved))
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const t = messages[locale].NotFound

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const breathingLayer = heroRef.current?.querySelector('.hero-visual__breath')
      const eyeGlow = heroRef.current?.querySelector('.hero-eye-glow')

      gsap.from('.hero-copy > *', {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })

      if (breathingLayer) {
        gsap.to(breathingLayer, {
          y: 2,
          scale: 1.012,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      if (eyeGlow) {
        gsap.to(eyeGlow, {
          autoAlpha: 0.52,
          scale: 1.06,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })

    return () => media.revert()
  }, { scope: heroRef })

  return (
    <section className="hero" ref={heroRef} aria-labelledby="not-found-title">
      <div className="hero-halos" aria-hidden="true">
        <span className="hero-halo hero-halo--upper" />
        <span className="hero-halo hero-halo--middle" />
        <span className="hero-halo hero-halo--lower" />
      </div>
      <div className="hero-sand-clouds" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-visual__parallax">
          <div className="hero-visual__breath">
            <Image className="hero-visual__front" src={heroOne} alt="" priority />
            <span className="hero-eye-glow" />
          </div>
        </div>
      </div>
      <div className="hero-copy section-shell">
        <p className="section-kicker">{t.eyebrow}</p>
        <div className="not-found-404" id="not-found-title" aria-hidden="true">
          {t.title}
        </div>
        <h1 className="not-found-subtitle">{t.subtitle}</h1>
        <p className="not-found-heading">{t.heading}</p>
        <p className="hero-copy__description">{t.description}</p>
        <Link
          className="button button--primary hero-cta holographic-target"
          href={`/${locale}/`}
        >
          <span className="button__scan-window" aria-hidden="true">
            <span className="button__scan" />
          </span>
          <span className="button__portal" aria-hidden="true" />
          <span className="button__label">{t.cta}</span>
        </Link>
      </div>
    </section>
  )
}
