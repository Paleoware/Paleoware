import { getTranslations } from 'next-intl/server'
import { portfolioItems } from '@/config/site'

export async function PortfolioSection() {
  const t = await getTranslations('Portfolio')
  const enabledItems = portfolioItems.filter((item) => item.enabled)

  if (!enabledItems.length) {
    return null
  }

  return (
    <section className="portfolio-section section-shell" id="portfolio">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{t('eyebrow')}</p>
          <h2>{t('title')}</h2>
        </div>
        <p>{t('description')}</p>
      </div>
      <div className="portfolio-grid">
        {enabledItems.map((item) => (
          <article className="portfolio-card" key={item.id}>
            <div className="portfolio-card__visual" aria-hidden="true">
            </div>
            <p>{t(`items.${item.id}`)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
