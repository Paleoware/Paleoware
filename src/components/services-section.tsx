import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { serviceFamilies } from '@/config/services'
import { Reveal } from './reveal'
import { SectionHead } from './section-head'

type ServicesSectionProps = Readonly<{ locale: string }>

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('Services')

  return (
    <section className="section" id="servicios" data-stratum="01">
      <div className="shell">
        <SectionHead title={t('title')} lead={t('lead')} />

        <div className="bands">
          {serviceFamilies.map((family, index) => (
            <Reveal key={family.id} className="band" delay={index * 70}>
              <div className="band__family">
                <span className="band__bar" aria-hidden="true" />
                <h3 className="band__name">{t(`families.${family.id}.name`)}</h3>
              </div>

              <ul className="band__list">
                {family.services.map((id) => (
                  <li key={id}>
                    <Link className="svc" href={`/${locale}/servicios/#${id}`}>
                      <span className="svc__body">
                        <span className="svc__name">{t(`items.${id}.name`)}</span>
                        <span className="svc__promise">{t(`items.${id}.promise`)}</span>
                      </span>
                      <span className="svc__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="bands__foot">
          <Link className="link-arrow" href={`/${locale}/servicios/`}>
            {t('cta')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
