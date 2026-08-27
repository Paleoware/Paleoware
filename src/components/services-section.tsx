import { getTranslations } from 'next-intl/server'
import { services } from '@/config/site'

export async function ServicesSection() {
  const t = await getTranslations('Services')
  const enabledServices = services.filter((service) => service.enabled)

  return (
    <section className="services-section section-shell" id="services">
      <div className="section-heading">
        <div>
          <p className="section-kicker">02 / {t('eyebrow')}</p>
          <h2>{t('title')}</h2>
        </div>
        <p>{t('description')}</p>
      </div>
      <div className="services-grid">
        {enabledServices.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-card__topline">
              <span>{service.number}</span>
              <span aria-hidden="true">+</span>
            </div>
            <h3>{t(`items.${service.id}.title`)}</h3>
            <p>{t(`items.${service.id}.description`)}</p>
            <span className="service-card__signal" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}
