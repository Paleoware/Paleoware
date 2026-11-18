export const COOKIE_CONSENT_KEY = 'paleoware-cookie-consent'
export const COOKIE_CONSENT_EVENT = 'paleoware-consent-change'
export const COOKIE_CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 30 * 6

export type CookieConsent = {
  analytics: boolean
  expiresAt: number
}

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as Partial<CookieConsent>
    if (typeof value.analytics !== 'boolean' || typeof value.expiresAt !== 'number') return null
    return value.expiresAt > Date.now() ? { analytics: value.analytics, expiresAt: value.expiresAt } : null
  } catch {
    return null
  }
}

export function saveCookieConsent(analytics: boolean) {
  const value: CookieConsent = { analytics, expiresAt: Date.now() + COOKIE_CONSENT_MAX_AGE }
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }))
  } catch {
    // The site continues working if storage is unavailable.
  }
}
