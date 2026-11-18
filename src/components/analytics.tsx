 'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_EVENT, readCookieConsent } from './cookie-consent'

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const update = () => setAllowed(Boolean(readCookieConsent()?.analytics))
    update()
    window.addEventListener(COOKIE_CONSENT_EVENT, update)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, update)
  }, [])

  if (!gaId || !allowed) {
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}
