import { readCookieConsent } from '@/components/cookie-consent'

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (
    typeof window === 'undefined' ||
    !readCookieConsent()?.analytics ||
    typeof window.gtag !== 'function'
  ) {
    return
  }

  if (params) {
    window.gtag('event', name, params)
  } else {
    window.gtag('event', name)
  }
}
