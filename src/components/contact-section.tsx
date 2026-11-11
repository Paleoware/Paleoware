import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { ContactForm } from './contact-form'
import { ContactMedia } from './contact-media'

export function ContactSection() {
  const t = useTranslations('Contact')
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    siteConfig.whatsapp.message,
  )}`

  return (
    <section className="section contact" id="contacto" data-stratum="05">
      <div className="contact__bg" aria-hidden="true">
        <ContactMedia />
      </div>

      <div className="shell">
        <div className="contact__grid">
          <div className="contact__intro">
            <h2>{t('title')}</h2>
            <p className="contact__lead">{t('lead')}</p>

            <div className="contact__routes">
              <a
                className="route route--whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="route__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.1 1.7 5.8L.3 23.8l6.5-1.7a11.7 11.7 0 0 0 5.3 1.3h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6-3.4-8.2Zm-8.4 17.8h-.1c-1.7 0-3.4-.5-4.8-1.4l-.3-.2-3.8 1 1-3.7-.2-.3a9.7 9.7 0 1 1 8.2 4.6Zm5.3-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.9 3.4.8.5-.1 1.7-.7 2-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.3-.6-.5Z" />
                  </svg>
                </span>
                <span className="route__key">{t('routes.whatsapp')}</span>
                <span className="route__value">
                  {siteConfig.contact.phoneDisplay} <span className="route__arrow" aria-hidden="true">→</span>
                </span>
              </a>
              <a className="route route--email" href={`mailto:${siteConfig.contact.email}`}>
                <span className="route__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path d="M2 4h20v16H2V4Zm2 2v.5l8 5.3 8-5.3V6l-8 5.3L4 6Zm0 3v8h16V9l-8 5.3L4 9Z" />
                  </svg>
                </span>
                <span className="route__key">{t('routes.email')}</span>
                <span className="route__value">
                  {siteConfig.contact.email} <span className="route__arrow" aria-hidden="true">→</span>
                </span>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
