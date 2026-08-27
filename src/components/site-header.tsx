'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import logo from '@/Paleoware-logo-completo.png'

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
        <span aria-hidden="true">{menuOpen ? 'X' : 'MENU'}</span>
      </button>

      <nav
        className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        <Link href={`/${locale}/#services`} onClick={closeMenu}>
          {t('services')}
        </Link>
        <Link href={`/${locale}/about/`} onClick={closeMenu}>
          {t('about')}
        </Link>
        <Link href={`/${locale}/#contact`} onClick={closeMenu}>
          {t('contact')}
        </Link>
        <div className="site-header__language" aria-label={t('language')}>
          <Link className={locale === 'es' ? 'is-active' : ''} href={pathForLocale('es')} onClick={() => {
            window.localStorage.setItem('paleoware-locale', 'es')
            closeMenu()
          }}>
            ES
          </Link>
          <span aria-hidden="true">/</span>
          <Link className={locale === 'en' ? 'is-active' : ''} href={pathForLocale('en')} onClick={() => {
            window.localStorage.setItem('paleoware-locale', 'en')
            closeMenu()
          }}>
            EN
          </Link>
        </div>
        <Link className="button button--small" href={`/${locale}/#contact`} onClick={closeMenu}>
          {t('quote')}
        </Link>
      </nav>
    </header>
  )
}
