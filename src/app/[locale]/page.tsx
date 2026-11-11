import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ContactSection } from '@/components/contact-section'
import { CustomCursor } from '@/components/custom-cursor'
import { FaqSection } from '@/components/faq-section'
import { Hero } from '@/components/hero'
import { PricingSection } from '@/components/pricing-section'
import { ProcessSection } from '@/components/process-section'
import { ServicesSection } from '@/components/services-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { routing } from '@/i18n/routing'

type HomePageProps = Readonly<{
  params: Promise<{ locale: string }>
}>

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />
      <main id="contenido">
        <Hero />
        <ServicesSection locale={locale} />
        <ProcessSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
