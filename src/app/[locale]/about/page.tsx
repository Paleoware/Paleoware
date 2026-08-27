import Link from 'next/link'
import { hasLocale, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CustomCursor } from '@/components/custom-cursor'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SiteHeader } from '@/components/site-header'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { routing } from '@/i18n/routing'

type AboutPageProps = Readonly<{
  params: Promise<{ locale: string }>
}>

function AboutContent() {
  const t = useTranslations('About')

  return (
    <main className="about-page section-shell">
      <p className="section-kicker">{t('eyebrow')}</p>
      <h1>{t('title')}</h1>
      <p className="about-page__description">{t('description')}</p>
      <Link className="text-link" href="../">
        <span aria-hidden="true">&lt;-</span> {t('back')}
      </Link>
    </main>
  )
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />
      <AboutContent />
      <Footer locale={locale} />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  )
}
