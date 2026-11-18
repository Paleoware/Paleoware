'use client'

import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_EVENT, readCookieConsent } from './cookie-consent'

declare global {
  interface Window {
    dataLayer?: ArrayLike<unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

function removeAnalyticsCookies() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID ?? ''
  const cookieNames = [
    '_ga',
    '_gid',
    '_gat',
    `_ga_${measurementId.replace(/^G-/, '')}`,
  ]
  const domains = [window.location.hostname, `.${window.location.hostname}`]

  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`
    }
    document.cookie = `${name}=; Max-Age=0; path=/`
  }
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const update = () => setAllowed(Boolean(readCookieConsent()?.analytics))
    update()
    window.addEventListener(COOKIE_CONSENT_EVENT, update)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, update)
  }, [])

  useEffect(() => {
    if (!gaId || !allowed) {
      if (!allowed) removeAnalyticsCookies()
      return
    }

    if (document.getElementById('paleoware-ga-script')) return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // Google expects the Arguments object in dataLayer, not a copied array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId)

    const script = document.createElement('script')
    script.id = 'paleoware-ga-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    document.head.appendChild(script)

    return () => {
      script.remove()
      delete window.gtag
      delete window.dataLayer
    }
  }, [allowed, gaId])

  return null
}
