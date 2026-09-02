'use client'

import type { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

type ContactOptionLinkProps = Readonly<{
  children: ReactNode
  className?: string
  event_name: string
  href: string
}>

export function ContactOptionLink({ children, className, event_name, href }: ContactOptionLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent(event_name, { location: 'contact_section' })}
    >
      {children}
    </a>
  )
}
