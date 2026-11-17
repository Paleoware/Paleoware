import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CustomCursor } from '@/components/custom-cursor'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { serviceFamilies } from '@/config/services'
import { routing } from '@/i18n/routing'

type ServicesPageProps = Readonly<{
  params: Promise<{ locale: string }>
}>

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: 'ServicesPage' })

  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: `/${locale}/servicios`,
      languages: {
        es: '/es/servicios',
        en: '/en/servicios',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Paleoware',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      title: t('title'),
      description: t('lead'),
      url: `/${locale}/servicios`,
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('lead'),
    },
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations('ServicesPage')
  const services = await getTranslations('Services')
  const nav = await getTranslations('Navigation')

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />

      <main id="contenido" data-stratum="01">
        <header className="page-head">
          <div className="shell">
            <h1>{t('title')}</h1>
            <p className="page-head__lead">{t('lead')}</p>
            <Link className="link-arrow page-head__back" href={`/${locale}/`}>
              <span aria-hidden="true">←</span>
              {t('back')}
            </Link>
          </div>
        </header>

        {serviceFamilies.map((family) => (
          <section className="svc-group" key={family.id}>
            <div className="shell">
              <h2>{services(`families.${family.id}.name`)}</h2>

              {family.services.map((id) => {
                const includes = t.raw(`items.${id}.includes`) as string[]

                return (
                  <article className="svc-record" id={id} key={id}>
                    <div className="svc-record__body">
                      <div>
                        <h3>{services(`items.${id}.name`)}</h3>
                        <p className="svc-record__promise">
                          {services(`items.${id}.promise`)}
                        </p>
                        <Link className="link-arrow" href={`/${locale}/#contacto`}>
                          {nav('quote')}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>

                      <dl className="svc-record__meta">
                        <div>
                          <dt>{t('includes')}</dt>
                          <dd>
                            <ul>
                              {includes.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div>
                          <dt>{t('forWhom')}</dt>
                          <dd>{t(`items.${id}.forWhom`)}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </main>

      <SiteFooter locale={locale} />
    </>
  )
}
