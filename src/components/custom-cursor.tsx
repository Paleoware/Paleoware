'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import cursorImage from '@/Cursor.png'
import pointerImage from '@/Pointer.png'
import textImage from '@/Text.png'

export function CustomCursor() {
  const trailRef = useRef<HTMLDivElement>(null)

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

    let lastSpawn = 0
    let previousX = 0
    let previousY = 0

    const movePointer = contextSafe((event: MouseEvent) => {
      const now = performance.now()
      if (now - lastSpawn < 58) {
        return
      }
      lastSpawn = now

      const deltaX = Math.max(-24, Math.min(24, event.clientX - previousX))
      const deltaY = Math.max(-24, Math.min(24, event.clientY - previousY))
      previousX = event.clientX
      previousY = event.clientY

      const particleCount = Math.random() > 0.45 ? 3 : 2

      for (let index = 0; index < particleCount; index += 1) {
        const grain = document.createElement('span')
        grain.className = 'cursor-sand'
        trail.appendChild(grain)

        const driftX = -deltaX * 0.65 + (-16 + Math.random() * 32)
        const driftY = -deltaY * 0.4 - 8 - Math.random() * 18
        const startX = event.clientX - deltaX * 0.2 + (-5 + Math.random() * 10)
        const startY = event.clientY - deltaY * 0.2 + (-5 + Math.random() * 10)
        const size = 0.9 + Math.random() * 1.5

        gsap.set(grain, {
          x: startX,
          y: startY,
          width: size,
          height: size,
          scale: 0.35,
          autoAlpha: 0,
        })

        gsap.timeline({ onComplete: () => grain.remove() })
          .to(grain, {
            autoAlpha: 0.35 + Math.random() * 0.3,
            scale: 1,
            duration: 0.1,
            ease: 'power1.out',
          })
          .to(grain, {
            x: startX + driftX,
            y: startY + driftY,
            scale: 0.15,
            autoAlpha: 0,
            duration: 1.8 + Math.random() * 0.35,
            ease: 'power2.out',
          })
      }
    })

    window.addEventListener('mousemove', movePointer, { passive: true })

    return () => {
      window.removeEventListener('mousemove', movePointer)
      root.classList.remove('has-custom-cursor')
      root.style.removeProperty('--cursor-default')
      root.style.removeProperty('--cursor-pointer')
      root.style.removeProperty('--cursor-text')
      trail.replaceChildren()
    }
  }, { scope: trailRef })

  return (
    <div ref={trailRef} className="cursor-trail" aria-hidden="true">
    </div>
  )
}
