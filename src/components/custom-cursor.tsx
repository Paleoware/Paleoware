'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import cursorImage from '@/Cursor.png'
import pointerImage from '@/Pointer.png'
import textImage from '@/Text.png'

export function CustomCursor() {
  const trailRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  useGSAP((_, contextSafe) => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches || !contextSafe) {
      return
    }

    const root = document.documentElement
    root.classList.add('has-custom-cursor')
    root.style.setProperty('--cursor-default', `url("${cursorImage.src}") 0 0`)
    root.style.setProperty('--cursor-pointer', `url("${pointerImage.src}") 16 16`)
    root.style.setProperty('--cursor-text', `url("${textImage.src}") 16 16`)

    const trail = trailRef.current
    if (!trail) {
      return
    }

    const glow = glowRef.current
    if (!glow) {
      return
    }

    gsap.set(glow, { xPercent: -50, yPercent: -50, autoAlpha: 0 })
    const moveGlowX = gsap.quickTo(glow, 'x', { duration: 0.18, ease: 'power3.out' })
    const moveGlowY = gsap.quickTo(glow, 'y', { duration: 0.18, ease: 'power3.out' })
    let lastSpawn = 0

    const movePointer = contextSafe((event: MouseEvent) => {
      moveGlowX(event.clientX)
      moveGlowY(event.clientY)
      gsap.to(glow, { autoAlpha: 1, duration: 0.2, overwrite: true })

      const now = performance.now()
      if (now - lastSpawn < 42) {
        return
      }
      lastSpawn = now

      const grain = document.createElement('span')
      grain.className = 'cursor-sand'
      trail.appendChild(grain)

      const driftX = -18 + Math.random() * 36
      const driftY = -22 - Math.random() * 30
      const size = 3 + Math.random() * 7

      gsap.set(grain, {
        x: event.clientX,
        y: event.clientY,
        width: size,
        height: size,
        scale: 0.3,
        autoAlpha: 0,
      })

      gsap.timeline({ onComplete: () => grain.remove() })
        .to(grain, {
          autoAlpha: 0.85,
          scale: 1,
          duration: 0.12,
          ease: 'power2.out',
        })
        .to(grain, {
          x: event.clientX + driftX,
          y: event.clientY + driftY,
          scale: 0.1,
          autoAlpha: 0,
          duration: 1.9,
          ease: 'power2.out',
        })
    })

    const hideGlow = contextSafe(() => {
      gsap.to(glow, { autoAlpha: 0, duration: 0.25, overwrite: true })
    })

    window.addEventListener('mousemove', movePointer, { passive: true })
    window.addEventListener('blur', hideGlow)

    return () => {
      window.removeEventListener('mousemove', movePointer)
      window.removeEventListener('blur', hideGlow)
      root.classList.remove('has-custom-cursor')
      root.style.removeProperty('--cursor-default')
      root.style.removeProperty('--cursor-pointer')
      root.style.removeProperty('--cursor-text')
      trail.replaceChildren()
    }
  }, { scope: trailRef })

  return (
    <div ref={trailRef} className="cursor-trail" aria-hidden="true">
      <span ref={glowRef} className="cursor-glow" />
    </div>
  )
}
