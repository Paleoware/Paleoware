import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/contact-form'
import { CustomCursor } from '@/components/custom-cursor'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { IntroSection } from '@/components/intro-section'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ServicesSection } from '@/components/services-section'
import { SiteHeader } from '@/components/site-header'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { featureConfig } from '@/config/site'
import { routing } from '@/i18n/routing'
import { PortfolioSection } from '@/components/portfolio-section'

type HomePageProps = Readonly<{
  params: Promise<{ locale: string }>
}>

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const contact = await getTranslations('Contact')

  return (
    <>
      <CustomCursor />
      <SiteHeader locale={locale} />
      <main>
        <Hero />
        <IntroSection />
        <ServicesSection />
        {featureConfig.showPortfolio ? <PortfolioSection /> : null}
        <section className="contact-section section-shell" id="contact">
          <div className="contact-section__intro">
            <p className="section-kicker">03 / {contact('eyebrow')}</p>
            <h2>{contact('title')}</h2>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer locale={locale} />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  )
}
