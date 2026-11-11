import { useTranslations } from 'next-intl'
import { Reveal } from './reveal'

const QUESTIONS = ['time', 'start', 'existing', 'content', 'remote', 'after'] as const

export function FaqSection() {
  const t = useTranslations('Faq')

  return (
    <section className="section section--field" id="preguntas" data-stratum="04">
      <div className="shell">
        <div className="faq">
          <Reveal className="faq__aside">
            <h2>{t('title')}</h2>
            <p>{t('lead')}</p>
            <a className="link-arrow" href="#contacto">
              {t('cta')}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal delay={80}>
            {QUESTIONS.map((question) => (
              <details key={question} className="faq__item">
                <summary>
                  {t(`items.${question}.q`)}
                  <span className="faq__sign" aria-hidden="true" />
                </summary>
                <p className="faq__answer">{t(`items.${question}.a`)}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
