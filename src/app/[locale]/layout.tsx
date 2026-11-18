import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { notFound } from 'next/navigation'
import { LocaleLang } from '@/components/locale-lang'
import { OrganizationSchema } from '@/components/structured-data'
import { routing } from '@/i18n/routing'

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // This keeps localized Server Components statically rendered at build time.
  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'Navigation' })

  return (
    <NextIntlClientProvider messages={messages}>
      <a className="skip-link" href="#contenido">
        {t('skip')}
      </a>
      <LocaleLang locale={locale} />
      <OrganizationSchema />
      {children}
    </NextIntlClientProvider>
  )
}
