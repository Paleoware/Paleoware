import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CustomCursor } from '@/components/custom-cursor'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { serviceIds, serviceSlugs, type ServiceId } from '@/config/services'
import { routing } from '@/i18n/routing'
import { PageSchema, ServiceSchema } from '@/components/structured-data'
import socialImage from '@/ISOTIPO.webp'

type Props = Readonly<{ params: Promise<{ locale: string; service: string }> }>

function serviceFromSlug(slug: string): ServiceId | undefined {
  return serviceIds.find((id) => serviceSlugs[id] === slug)
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceIds.map((service) => ({ locale, service: serviceSlugs[service] })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service: slug } = await params
  const service = serviceFromSlug(slug)
  if (!hasLocale(routing.locales, locale) || !service) return {}

  const t = await getTranslations({ locale, namespace: 'ServiceDetail' })
  const path = `/${locale}/servicios/${slug}`
  const alternateSlug = serviceSlugs[service]

  return {
    title: t(`items.${service}.title`),
    description: t(`items.${service}.description`),
    alternates: {
      canonical: path,
      languages: {
        es: `/es/servicios/${alternateSlug}`,
        en: `/en/servicios/${alternateSlug}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Paleoware',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      title: t(`items.${service}.title`),
      description: t(`items.${service}.description`),
      url: path,
      images: [{ url: socialImage.src, width: socialImage.width, height: socialImage.height, alt: 'Paleoware' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`items.${service}.title`),
      description: t(`items.${service}.description`),
      images: [socialImage.src],
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, service: slug } = await params
  const service = serviceFromSlug(slug)
  if (!hasLocale(routing.locales, locale) || !service) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('ServiceDetail')
  const nav = await getTranslations('Navigation')
  const includes = t.raw(`items.${service}.includes`) as string[]
  const title = t(`items.${service}.title`)
  const description = t(`items.${service}.description`)
  const intro = t(`items.${service}.intro`)
  const forWhom = t(`items.${service}.forWhom`)
  const path = `/${locale}/servicios/${slug}`

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />
      <main id="contenido" className={`service-detail service-detail--${service}`}>
        <PageSchema
          locale={locale}
          path={path}
          name={title}
          description={description}
          breadcrumb={[
            { name: nav('services'), path: `/${locale}/servicios` },
            { name: title, path },
          ]}
        />
        <ServiceSchema
          locale={locale}
          path={path}
          name={title}
          description={description}
          intro={intro}
          forWhom={forWhom}
          includes={includes}
        />
        <header className="service-detail__hero">
          <div className="shell">
            <nav className="breadcrumbs" aria-label={t('home')}>
              <ol>
                <li><Link href={`/${locale}/`}>{t('home')}</Link></li>
                <li><Link href={`/${locale}/servicios/`}>{nav('services')}</Link></li>
                <li aria-current="page">{title}</li>
              </ol>
            </nav>
            <Link className="link-arrow" href={`/${locale}/servicios/`}>
              <span aria-hidden="true">←</span> {t('back')}
            </Link>
            <p className="label">{t(`items.${service}.eyebrow`)}</p>
            <h1>{t(`items.${service}.title`)}</h1>
            <p className="service-detail__intro">{t(`items.${service}.intro`)}</p>
          </div>
        </header>

        <section className="service-detail__body section">
          <div className="shell service-detail__grid">
            <div>
              <p className="label">{t('deliverables')}</p>
              <h2>{t(`items.${service}.heading`)}</h2>
              <p className="service-detail__copy">{t(`items.${service}.body`)}</p>
              <Link className="btn btn--primary" href={`/${locale}/#contacto`}>
                {nav('quote')} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <aside className="service-detail__aside">
              <p className="label">{t('includes')}</p>
              <ul>
                {includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="label">{t('forWhom')}</p>
              <p>{t(`items.${service}.forWhom`)}</p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
