'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function IntroSection() {
  const t = useTranslations('Intro')
  const introRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const core = introRef.current?.querySelector('.intro-section__core')
      const rings = introRef.current?.querySelectorAll('.intro-section__ring')

      if (!core || !rings) {
        return
      }

      gsap.to(core, {
        yPercent: 14,
        rotation: 7,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      rings.forEach((ring, index) => {
        gsap.to(ring, {
          y: index % 2 === 0 ? -34 : 34,
          rotation: index % 2 === 0 ? 10 : -8,
          ease: 'none',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5 + index * 0.3,
            invalidateOnRefresh: true,
          },
        })
      })
    })

    return () => media.revert()
  }, { scope: introRef })

  return (
    <section className="intro-section section-shell" id="intro" ref={introRef}>
      <div className="intro-section__visual" aria-hidden="true">
        <div className="intro-section__core">
          <span className="intro-section__ring intro-section__ring--outer" />
          <span className="intro-section__ring intro-section__ring--middle" />
          <span className="intro-section__ring intro-section__ring--inner" />
          <span className="intro-section__fossil" />
          <span className="intro-section__scanline" />
        </div>
      </div>
      <div className="intro-section__label">
        <span className="section-kicker">{t('eyebrow')}</span>
      </div>
      <div className="intro-section__content">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <p className="intro-section__detail">{t('detail')}</p>
      </div>
    </section>
  )
}
