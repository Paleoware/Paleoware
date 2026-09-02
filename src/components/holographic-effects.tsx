'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function HolographicEffects() {
  useGSAP((_, contextSafe) => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches || !contextSafe) {
      return
    }

    const targets = gsap.utils.toArray<HTMLElement>('.holographic-target')
    const cleanups: Array<() => void> = []

    targets.forEach((target) => {
      const scan = target.querySelector<HTMLElement>('.button__scan')
      const portal = target.querySelector<HTMLElement>('.button__portal')

      if (!scan || !portal) {
        return
      }

      const activate = contextSafe(() => {
        target.classList.add('holographic-target--active')
        gsap.killTweensOf([target, scan, portal])
        gsap.set(scan, { xPercent: -140, autoAlpha: 0 })
        gsap.set(portal, { scale: 0.72, autoAlpha: 0 })
        gsap.to(target, {
          scale: 1.015,
          boxShadow: '0 0 2rem rgba(177, 222, 239, 0.28), 0 0 4rem rgba(242, 169, 0, 0.2)',
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(scan, {
          xPercent: 650,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power2.inOut',
        })
        gsap.to(portal, {
          scale: 1.18,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power2.out',
        })
      })

      const deactivate = contextSafe(() => {
        target.classList.remove('holographic-target--active')
        gsap.to(target, {
          scale: 1,
          boxShadow: '0 0 0 rgba(177, 222, 239, 0)',
          duration: 0.35,
          ease: 'power2.out',
        })
        gsap.to([scan, portal], {
          autoAlpha: 0,
          duration: 0.2,
          overwrite: true,
        })
      })

      target.addEventListener('mouseenter', activate)
      target.addEventListener('mouseleave', deactivate)

      cleanups.push(() => {
        target.removeEventListener('mouseenter', activate)
        target.removeEventListener('mouseleave', deactivate)
      })
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  })

  return null
}
