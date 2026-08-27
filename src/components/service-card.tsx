'use client'

import { useRef } from 'react'
import {
  ChartLine,
  Code2,
  Compass,
  LayoutPanelTop,
  Megaphone,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const serviceIcons: Record<string, LucideIcon> = {
  compass: Compass,
  layout: LayoutPanelTop,
  chart: ChartLine,
  code: Code2,
  cart: ShoppingCart,
  megaphone: Megaphone,
}

type ServiceCardProps = Readonly<{
  description: string
  icon: string
  title: string
}>

export function ServiceCard({ description, icon, title }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const Icon = serviceIcons[icon] ?? Compass

  useGSAP((_, contextSafe) => {
    const card = cardRef.current
    const inner = innerRef.current
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!card || !inner || !finePointer.matches || reducedMotion.matches || !contextSafe) {
      return
    }

    const moveX = gsap.quickTo(inner, 'x', { duration: 0.35, ease: 'power3.out' })
    const moveY = gsap.quickTo(inner, 'y', { duration: 0.35, ease: 'power3.out' })
    const resetX = gsap.quickTo(inner, 'x', { duration: 0.55, ease: 'elastic.out(1, 0.5)' })
    const resetY = gsap.quickTo(inner, 'y', { duration: 0.55, ease: 'elastic.out(1, 0.5)' })

    const handleMove = contextSafe((event: MouseEvent) => {
      const bounds = card.getBoundingClientRect()
      const percentX = ((event.clientX - bounds.left) / bounds.width) * 100
      const percentY = ((event.clientY - bounds.top) / bounds.height) * 100
      const offsetX = (percentX - 50) * 0.12
      const offsetY = (percentY - 50) * 0.12

      moveX(offsetX)
      moveY(offsetY)
      card.style.setProperty('--spot-x', `${percentX}%`)
      card.style.setProperty('--spot-y', `${percentY}%`)
    })

    const handleLeave = contextSafe(() => {
      resetX(0)
      resetY(0)
      card.style.setProperty('--spot-x', '50%')
      card.style.setProperty('--spot-y', '50%')
    })

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, { scope: cardRef })

  return (
    <article className="service-card" ref={cardRef}>
      <div className="service-card__inner" ref={innerRef}>
        <div className="service-card__topline">
          <span className="service-card__icon" aria-hidden="true">
            <Icon size={26} strokeWidth={1.4} />
          </span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}
