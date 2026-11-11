'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import logo from '@/Paleoware-Logotipo.webp'
import boneIcon from '@/Text.png'
import { ThemeToggle } from './theme-toggle'

type SiteHeaderProps = Readonly<{ locale: string }>

export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const home = `/${locale}/`
  const otherLocale = locale === 'es' ? 'en' : 'es'
  const switchHref =
    pathname.replace(/^\/(es|en)(?=\/|$)/, `/${otherLocale}`) || `/${otherLocale}/`
  const isHome = pathname === home || pathname === home.slice(0, -1)

  const rememberScrollPosition = () => {
    window.sessionStorage.setItem('paleoware-locale-scroll', String(window.scrollY))
  }

  const links = [
    { href: `/${locale}/servicios/`, label: t('services'), key: 'services' },
    { href: `${home}#preguntas`, label: t('faq'), key: 'faq' },
    { href: `${home}#contacto`, label: t('contact'), key: 'contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // One red action per view: the header CTA steps back when the contact
  // section is on screen, so only the submit button stays red.
  useEffect(() => {
    const section = document.getElementById('contacto')
    const button = ctaRef.current

    if (!section || !button || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        button.dataset.demoted = entry.isIntersecting ? 'true' : 'false'
      },
      { threshold: 0.15 },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      delete button.dataset.demoted
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    document.body.dataset.menuOpen = String(open)

    return () => {
      delete document.body.dataset.menuOpen
    }
  }, [open])

  useEffect(() => {
    const stored = window.sessionStorage.getItem('paleoware-locale-scroll')
    if (stored === null) return

    const scrollY = Number(stored)
    if (!Number.isFinite(scrollY)) return

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'auto' })
      window.sessionStorage.removeItem('paleoware-locale-scroll')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="shell site-header__inner">
          <Link
            className="brand"
            href={home}
            aria-label={t('home')}
            onClick={(event) => {
              if (!isHome) return
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <Image src={logo} alt="" fill priority sizes="238px" />
          </Link>

          <nav className="site-nav" aria-label={t('menu')}>
            {links.map((link) => (
              <Link
                key={link.key}
                className="site-nav__link"
                href={link.href}
                aria-current={
                  link.key === 'services' && pathname.includes('/servicios')
                    ? 'page'
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <ThemeToggle label={t('toggleTheme')} />

            <div className="lang" aria-label={t('language')}>
              <Link
                href={locale === 'es' ? pathname : switchHref}
                aria-current={locale === 'es'}
                onClick={locale === 'es' ? undefined : rememberScrollPosition}
              >
                ES
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={locale === 'en' ? pathname : switchHref}
                aria-current={locale === 'en'}
                onClick={locale === 'en' ? undefined : rememberScrollPosition}
              >
                EN
              </Link>
            </div>

            <Link ref={ctaRef} className="btn btn--primary btn--sm" href={`${home}#contacto`}>
              {t('quote')}
            </Link>

            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="main-drawer"
              onClick={() => setOpen((current) => !current)}
            >
              <span className="sr-only">{open ? t('closeMenu') : t('openMenu')}</span>
              <span
                className="menu-btn__glyph"
                data-open={open}
                aria-hidden="true"
                style={{ '--bone-icon': `url("${boneIcon.src}")` } as CSSProperties}
              />
            </button>
          </div>
        </div>
      </header>

      <div className="drawer" id="main-drawer" data-open={open} inert={!open}>
        <button
          type="button"
          className="drawer__scrim"
          aria-label={t('closeMenu')}
          onClick={() => setOpen(false)}
        />

        <div className="drawer__panel">
          <div className="drawer__top">
            <span className="label">{t('menu')}</span>
          </div>

          <nav className="drawer__nav" aria-label={t('menu')}>
            {links.map((link) => (
              <Link
                key={link.key}
                className="drawer__link"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="drawer__bottom">
            <div className="drawer__meta">
              <ThemeToggle label={t('toggleTheme')} />
              <div className="lang" aria-label={t('language')}>
                <Link
                  href={locale === 'es' ? pathname : switchHref}
                  aria-current={locale === 'es'}
                  onClick={locale === 'es' ? undefined : rememberScrollPosition}
                >
                  ES
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  href={locale === 'en' ? pathname : switchHref}
                  aria-current={locale === 'en'}
                  onClick={locale === 'en' ? undefined : rememberScrollPosition}
                >
                  EN
                </Link>
              </div>
            </div>

            <Link
              className="btn btn--primary"
              href={`${home}#contacto`}
              onClick={() => setOpen(false)}
            >
              {t('quote')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
