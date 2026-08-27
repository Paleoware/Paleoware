'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import heroOne from '@/hero-1.png'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const t = useTranslations('Hero')
  const heroRef = useRef<HTMLElement>(null)
  const words = t.raw('rotatingWords') as string[]

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const wordNodes = gsap.utils.toArray<HTMLElement>('.hero-rotating-word')

      wordNodes.forEach((word) => {
        gsap.set(word, { autoAlpha: 0 })
      })

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.65 })

      wordNodes.forEach((word) => {
        const characters = word.querySelectorAll('.hero-char')

        timeline
          .to(word, { autoAlpha: 1, duration: 0.1 })
          .fromTo(
            characters,
            { opacity: 0, yPercent: 105 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 0.45,
              stagger: 0.025,
              ease: 'power3.out',
            },
            '<',
          )
          .to({}, { duration: 1.9 })
          .to(characters, {
            opacity: 0,
            yPercent: -80,
            duration: 0.3,
            stagger: 0.015,
            ease: 'power2.in',
          })
          .set(word, { autoAlpha: 0 })
      })

      gsap.from('.hero-copy > *', {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })

      gsap.to('.hero-visual', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => media.revert()
  }, { scope: heroRef })

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-sand-clouds" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-visual" aria-hidden="true">
        <Image className="hero-visual__front" src={heroOne} alt="" priority />
      </div>
      <div className="hero-copy section-shell">
        <p className="section-kicker">{t('eyebrow')}</p>
        <h1 id="hero-title">
          {t('titleStart')}{' '}
          <span className="hero-rotating-words" aria-hidden="true">
            {words.map((word) => (
              <span className="hero-rotating-word" key={word}>
                {word.split('').map((character, index) => (
                  <span className="hero-char" key={`${word}-${index}`}>
                    {character === ' ' ? '\u00a0' : character}
                  </span>
                ))}
              </span>
            ))}
          </span>
          <span className="sr-only">{words.join(', ')}</span>
        </h1>
        <p className="hero-copy__description">{t('description')}</p>
        <Link className="button button--primary" href="#contact">
          {t('cta')} <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
      <a className="hero-scroll" href="#intro">
        <span className="hero-scroll__line" aria-hidden="true" />
        <span>{t('scroll')}</span>
      </a>
    </section>
  )
}
