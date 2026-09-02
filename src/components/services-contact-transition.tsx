'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type ServicesContactTransitionProps = Readonly<{
  contact: ReactNode
  services: ReactNode
}>

export function ServicesContactTransition({ contact, services }: ServicesContactTransitionProps) {
  const transitionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add(
      '(min-width: 801px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const panel = transitionRef.current?.querySelector<HTMLElement>(
          '.services-contact-transition__panel',
        )
        const servicesWrapper = transitionRef.current?.querySelector<HTMLElement>(
          '.services-contact-transition__services',
        )

        if (!panel || !servicesWrapper) {
          return
        }

        gsap.set(panel, { xPercent: 100 })

        gsap.timeline({
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'bottom bottom',
            end: () => `+=${Math.ceil(panel.offsetWidth)}`,
            pin: transitionRef.current,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).to(panel, { xPercent: 0, duration: 1, ease: 'none' })
      },
    )

    return () => media.revert()
  }, { scope: transitionRef })

  return (
    <div className="services-contact-transition" ref={transitionRef}>
      <div className="services-contact-transition__services">{services}</div>
      <div className="services-contact-transition__stage">
        <div className="services-contact-transition__panel">{contact}</div>
      </div>
    </div>
  )
}
