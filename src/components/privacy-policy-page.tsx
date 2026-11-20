import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { CustomCursor } from '@/components/custom-cursor'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

type PrivacyPolicyPageProps = Readonly<{ locale: string }>

export async function PrivacyPolicyPage({ locale }: PrivacyPolicyPageProps) {
  const t = await getTranslations({ locale, namespace: 'Privacy' })
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
                <li><Link href={`/${locale}/`}>{t('home')}</Link></li>
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
            <p className="legal-page__note">{t('argentinaNote')}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
