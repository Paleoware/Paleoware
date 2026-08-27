import { getTranslations } from 'next-intl/server'
import { services } from '@/config/site'
import { ServiceCard } from '@/components/service-card'

export async function ServicesSection() {
  const t = await getTranslations('Services')
  const enabledServices = services.filter((service) => service.enabled)

  return (
    <section className="services-section section-shell" id="services">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{t('eyebrow')}</p>
          <h2>{t('title')}</h2>
        </div>
        <p>{t('description')}</p>
      </div>
      <div className="services-grid">
        {enabledServices.map((service) => (
          <ServiceCard
            description={t(`items.${service.id}.description`)}
            icon={service.icon}
            key={service.id}
            title={t(`items.${service.id}.title`)}
          />
        ))}
      </div>
    </section>
  )
}
