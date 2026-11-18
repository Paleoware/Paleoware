import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CustomCursor } from '@/components/custom-cursor'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { AboutPageSchema } from '@/components/structured-data'
import { siteConfig } from '@/config/site'
import { routing } from '@/i18n/routing'
import socialImage from '@/Paleoware-Logotipo.webp'

type AboutPageProps = Readonly<{ params: Promise<{ locale: string }> }>

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  const path = `/${locale}/about`

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: path,
      languages: { es: '/es/about', en: '/en/about' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Paleoware',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      title: t('title'),
      description: t('description'),
      url: path,
      images: [{ url: socialImage.src, width: socialImage.width, height: socialImage.height, alt: 'Paleoware' }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description'), images: [socialImage.src] },
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('AboutPage')
  const nav = await getTranslations('Navigation')
  const phases = ['dig', 'classify', 'assemble', 'hatch'] as const
  const conditions = t.raw('conditions') as string[]

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />
      <main id="contenido" className="about-page">
        <AboutPageSchema
          locale={locale}
          path={`/${locale}/about`}
          name={t('title')}
          description={t('description')}
        />

        <header className="about-page__hero">
          <div className="shell">
            <nav className="breadcrumbs" aria-label={t('home')}>
              <ol>
                <li><Link href={`/${locale}/`}>{t('home')}</Link></li>
              </ol>
            </nav>
            <h1>{t('title')}</h1>
            <p className="about-page__intro">{t('intro')}</p>
          </div>
        </header>

        <section className="section about-page__section">
          <div className="shell about-page__grid">
            <div><h2>{t('whatTitle')}</h2><p>{t('whatBody')}</p></div>
            <div><h2>{t('scaleTitle')}</h2><p>{t('scaleBody')}</p></div>
          </div>
        </section>

        <section className="section section--field about-page__method">
          <div className="shell">
            <div className="section-head"><h2>{t('methodTitle')}</h2><p className="section-head__lead">{t('methodLead')}</p></div>
            <ol className="trench">
              {phases.map((phase) => <li key={phase} className="phase"><div><h3 className="phase__name">{t(`phases.${phase}.name`)}</h3><p className="phase__desc">{t(`phases.${phase}.desc`)}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="section about-page__conditions">
          <div className="shell about-page__conditions-grid">
            <div><h2>{t('conditionsTitle')}</h2></div>
            <ul>{conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
          </div>
        </section>

        <section className="section about-page__contact">
          <div className="shell">
            <h2>{t('contactTitle')}</h2>
            <p>{t('contactBody')}</p>
            <p className="about-page__contact-data">{siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}</p>
            <Link className="btn btn--primary" href={`/${locale}/#contacto`}>{nav('quote')} <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
