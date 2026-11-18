'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  href: string
  event: string
  params?: Record<string, string | number | boolean>
  children: ReactNode
}

export function TrackedLink({ href, event, params, children, ...props }: TrackedLinkProps) {
  return (
    <Link href={href} {...props} onClick={() => trackEvent(event, params)}>
      {children}
    </Link>
  )
}
