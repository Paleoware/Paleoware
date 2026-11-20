import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PrivacyPolicyPage } from '@/components/privacy-policy-page'
import { routing } from '@/i18n/routing'

type PrivacyPageProps = Readonly<{ params: Promise<{ locale: string }> }>

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  const path = locale === 'es' ? `/${locale}/privacidad` : `/${locale}/privacy`

  return {
    title: t('pageTitle'),
    description: t('intro'),
    alternates: {
      canonical: path,
      languages: { es: '/es/privacidad', en: '/en/privacy' },
    },
    openGraph: { type: 'website', title: t('pageTitle'), description: t('intro'), url: path },
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return <PrivacyPolicyPage locale={locale} />
}
