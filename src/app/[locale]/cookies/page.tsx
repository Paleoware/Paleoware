import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CustomCursor } from '@/components/custom-cursor'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { routing } from '@/i18n/routing'

type CookiesPageProps = Readonly<{ params: Promise<{ locale: string }> }>

export async function generateMetadata({ params }: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'Cookies' })
  const path = `/${locale}/cookies`

  return {
    title: t('pageTitle'),
    description: t('intro'),
    alternates: {
      canonical: path,
      languages: { es: '/es/cookies', en: '/en/cookies' },
    },
    openGraph: {
      type: 'website',
      title: t('pageTitle'),
      description: t('intro'),
      url: path,
    },
    robots: { index: true, follow: true },
  }
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('Cookies')
  const nav = await getTranslations('Navigation')
  const sections = t.raw('sections') as { title: string; body: string }[]

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />
      <main id="contenido" className="legal-page">
        <header className="page-head">
          <div className="shell">
            <nav className="breadcrumbs" aria-label={t('pageTitle')}>
              <ol>
                <li><Link href={`/${locale}/`}>{nav('home')}</Link></li>
                <li aria-current="page">{nav('cookies')}</li>
              </ol>
            </nav>
            <h1>{t('pageTitle')}</h1>
            <p className="page-head__lead">{t('intro')}</p>
            <p className="legal-page__updated">{t('updated')}</p>
            <p className="legal-page__responsible">{t('responsible')}</p>
          </div>
        </header>

        <section className="section legal-page__body">
          <div className="shell legal-page__content">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
