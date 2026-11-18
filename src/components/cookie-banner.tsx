'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { COOKIE_CONSENT_EVENT, readCookieConsent, saveCookieConsent } from './cookie-consent'

export function CookieBanner() {
  const t = useTranslations('Cookies')
  const [open, setOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const consentSnapshot = useSyncExternalStore(
    (callback) => {
      window.addEventListener(COOKIE_CONSENT_EVENT, callback)
      window.addEventListener('storage', callback)
      return () => {
        window.removeEventListener(COOKIE_CONSENT_EVENT, callback)
        window.removeEventListener('storage', callback)
      }
    },
    () => {
      const value = readCookieConsent()
      return value ? `${value.analytics}:${value.expiresAt}` : null
    },
    () => null,
  )
  const consent = useMemo(() => {
    if (!consentSnapshot) return null
    const [analyticsValue, expiresAtValue] = consentSnapshot.split(':')
    return {
      analytics: analyticsValue === 'true',
      expiresAt: Number(expiresAtValue),
    }
  }, [consentSnapshot])

  useEffect(() => {
    const openSettings = () => {
      setAnalytics(consent?.analytics ?? false)
      setOpen(true)
    }
    window.addEventListener('paleoware-open-cookie-settings', openSettings)
    return () => window.removeEventListener('paleoware-open-cookie-settings', openSettings)
  }, [consent?.analytics])

  if (consent && !open) return null

  const selectedAnalytics = consent && !open ? consent.analytics : analytics

  const closeWithDecision = (allowAnalytics: boolean) => {
    saveCookieConsent(allowAnalytics)
    setAnalytics(allowAnalytics)
    setOpen(false)
  }

  return (
    <aside className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <div className="cookie-banner__copy">
        <p className="label">Paleoware</p>
        <h2 id="cookie-title">{t('title')}</h2>
        <p>{t('description')}</p>
        <a href={t('policyPath')}>{t('policyLink')}</a>
      </div>

      {open ? (
        <div className="cookie-banner__preferences">
          <div className="cookie-option">
            <div>
              <strong>{t('necessaryTitle')}</strong>
              <p>{t('necessaryDescription')}</p>
            </div>
            <span>{t('alwaysOn')}</span>
          </div>
          <label className="cookie-option cookie-option--toggle">
            <span>
              <strong>{t('analyticsTitle')}</strong>
              <span>{t('analyticsDescription')}</span>
            </span>
            <input type="checkbox" checked={selectedAnalytics} onChange={(event) => setAnalytics(event.target.checked)} />
          </label>
        </div>
      ) : null}

      <div className="cookie-banner__actions">
        {open ? <button className="btn btn--ghost" type="button" onClick={() => closeWithDecision(analytics)}>{t('save')}</button> : null}
        <button className="btn btn--ghost" type="button" onClick={() => closeWithDecision(false)}>{t('reject')}</button>
        <button className="btn btn--primary" type="button" onClick={() => closeWithDecision(true)}>{t('accept')}</button>
        {!open ? <button className="cookie-banner__configure" type="button" onClick={() => { setAnalytics(consent?.analytics ?? false); setOpen(true) }}>{t('configure')}</button> : null}
      </div>
    </aside>
  )
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      className="footer__cookie-settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event('paleoware-open-cookie-settings'))}
    >
      {label}
    </button>
  )
}

export { COOKIE_CONSENT_EVENT }
