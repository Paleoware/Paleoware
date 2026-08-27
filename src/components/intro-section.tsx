import { useTranslations } from 'next-intl'

export function IntroSection() {
  const t = useTranslations('Intro')

  return (
    <section className="intro-section section-shell" id="intro">
      <div className="intro-section__label">
        <span className="section-kicker">01 / {t('eyebrow')}</span>
        <span className="intro-section__mark" aria-hidden="true">PWL-001</span>
      </div>
      <div className="intro-section__content">
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <p className="intro-section__detail">{t('detail')}</p>
      </div>
    </section>
  )
}
