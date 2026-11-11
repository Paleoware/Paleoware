import type { CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import { Reveal } from './reveal'

const TIERS = [
  { id: 'prospecting', width: '0.2' },
  { id: 'afloramiento', width: '0.45' },
  { id: 'excavacion', width: '0.7' },
  { id: 'holotipo', width: '1' },
] as const

export function PricingSection() {
  const t = useTranslations('Pricing')

  return (
    <section className="section" id="valoracion" data-stratum="03">
      <div className="shell">
        <Reveal className="section-head">
          <h2>{t('title')}</h2>
          <p className="section-head__lead">{t('lead')}</p>
        </Reveal>

        <div className="tiers">
          {TIERS.map((tier, index) => {
            const items = t.raw(`tiers.${tier.id}.items`) as string[]

            return (
              <Reveal key={tier.id} className="tier" delay={index * 80}>
                <div className="tier__top">
                  <h3 className="tier__name">{t(`tiers.${tier.id}.name`)}</h3>
                  <span className="tier__from">
                    {t('from')} {t('currency')}
                    <span className="tier__price">{t(`tiers.${tier.id}.price`)}</span>
                  </span>
                </div>

                <div className="tier__bar" aria-hidden="true">
                  <span
                    className="tier__fill"
                    style={{ '--w': tier.width } as CSSProperties}
                  />
                </div>

                <ul className="tier__items">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>

        <p className="tiers__note">{t('note')}</p>
      </div>
    </section>
  )
}
