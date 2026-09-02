'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import logo from '@/Paleoware-logo-completo.webp'
import textCursor from '@/Text.png'
import { trackEvent } from '@/lib/analytics'

type SiteHeaderProps = Readonly<{ locale: string }>

export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const localPath = pathname.replace(/^\/(es|en)/, '') || '/'
  const pathForLocale = (targetLocale: string) =>
    `/${targetLocale}${localPath === '/' ? '/' : `${localPath.replace(/\/+$/, '')}/`}`

  useEffect(() => {
    window.localStorage.setItem('paleoware-locale', locale)
  }, [locale])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <Link className="site-header__logo" href={`/${locale}/`} aria-label="Paleoware">
        <Image src={logo} alt="Paleoware" priority />
      </Link>

      <button
        className="site-header__menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? t('closeMenu') : t('openMenu')}</span>
        <span className="site-header__menu-bones" aria-hidden="true">
          <Image className="site-header__menu-bone" src={textCursor} alt="" />
          <Image className="site-header__menu-bone" src={textCursor} alt="" />
        </span>
      </button>

      <nav
        className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        <Link href={`/${locale}/#services`} onClick={() => { trackEvent('nav_click', { target: 'services' }); closeMenu() }}>
          {t('services')}
        </Link>
        <Link href={`/${locale}/about/`} onClick={() => { trackEvent('nav_click', { target: 'about' }); closeMenu() }}>
          {t('about')}
        </Link>
        <Link href={`/${locale}/#contact`} onClick={() => { trackEvent('nav_click', { target: 'contact' }); closeMenu() }}>
          {t('contact')}
        </Link>
        <div className="site-header__language" aria-label={t('language')}>
          <Link className={locale === 'es' ? 'is-active' : ''} href={pathForLocale('es')} onClick={() => {
            trackEvent('language_switch', { from: locale, to: 'es' })
            window.localStorage.setItem('paleoware-locale', 'es')
            closeMenu()
          }}>
            ES
          </Link>
          <span aria-hidden="true">/</span>
          <Link className={locale === 'en' ? 'is-active' : ''} href={pathForLocale('en')} onClick={() => {
            trackEvent('language_switch', { from: locale, to: 'en' })
            window.localStorage.setItem('paleoware-locale', 'en')
            closeMenu()
          }}>
            EN
          </Link>
        </div>
        <Link className="button button--small holographic-target" href={`/${locale}/#contact`} onClick={() => { trackEvent('cta_click', { location: 'header' }); closeMenu() }}>
          <span className="button__scan-window" aria-hidden="true">
            <span className="button__scan" />
          </span>
          <span className="button__portal" aria-hidden="true" />
          <span className="button__label">{t('quote')}</span>
        </Link>
      </nav>
    </header>
  )
}
