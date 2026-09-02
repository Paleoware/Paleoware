import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Mail, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { ContactOptionLink } from '@/components/contact-option-link'
import { CustomCursor } from '@/components/custom-cursor'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HolographicEffects } from '@/components/holographic-effects'
import { IntroSection } from '@/components/intro-section'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ServicesSection } from '@/components/services-section'
import { ServicesContactTransition } from '@/components/services-contact-transition'
import { SiteHeader } from '@/components/site-header'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { featureConfig } from '@/config/site'
import { siteConfig } from '@/config/site'
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
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`

  return (
    <>
      <CustomCursor />
      <HolographicEffects />
      <SiteHeader locale={locale} />
      <main>
        <div className="hero-transition">
          <Hero />
          <div className="hero-intro-divider" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <IntroSection />
        </div>
        <ServicesContactTransition
          services={<ServicesSection />}
          contact={
            <section className="contact-section section-shell" id="contact">
              <div className="contact-section__intro">
                <p className="section-kicker">{contact('eyebrow')}</p>
                <h2>{contact('title')}</h2>
                <p className="contact-section__description">{contact('description')}</p>
                <p className="contact-section__note">{contact('quoteNote')}</p>
                <div className="contact-section__actions">
                  <ContactOptionLink className="contact-option contact-option--whatsapp holographic-target" href={whatsappUrl} event_name="whatsapp_click">
                    <span className="contact-option__icon" aria-hidden="true">
                      <MessageCircle size={28} strokeWidth={1.4} />
                    </span>
                    <span className="button__scan-window" aria-hidden="true">
                      <span className="button__scan" />
                    </span>
                    <span className="button__portal" aria-hidden="true" />
                    <span className="contact-option__label">
                      <small>{contact('whatsappLabel')}</small>
                      <strong>{siteConfig.contact.phoneDisplay}</strong>
                    </span>
                  </ContactOptionLink>
                  <ContactOptionLink className="contact-option holographic-target" href={`mailto:${siteConfig.contact.email}`} event_name="email_click">
                    <Mail className="contact-option__icon" size={28} strokeWidth={1.4} aria-hidden="true" />
                    <span className="button__scan-window" aria-hidden="true">
                      <span className="button__scan" />
                    </span>
                    <span className="button__portal" aria-hidden="true" />
                    <span className="contact-option__label">
                      <small>{contact('emailLabel')}</small>
                      <strong>{siteConfig.contact.email}</strong>
                    </span>
                  </ContactOptionLink>
                </div>
              </div>
              <ContactForm />
            </section>
          }
        />
        {featureConfig.showPortfolio ? <PortfolioSection /> : null}
      </main>
      <Footer locale={locale} />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  )
}
