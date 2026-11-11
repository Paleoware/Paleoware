import { useTranslations } from 'next-intl'
import { Reveal } from './reveal'
import { SectionHead } from './section-head'

const PHASES = ['dig', 'classify', 'assemble', 'hatch'] as const

export function ProcessSection() {
  const t = useTranslations('Process')

  return (
    <section className="section section--field" id="metodo" data-stratum="02">
      <div className="shell">
        <SectionHead title={t('title')} lead={t('lead')} />

        <Reveal>
          <ol className="trench">
            {PHASES.map((phase) => (
              <li key={phase} className="phase">
                <div>
                  <h3 className="phase__name">{t(`phases.${phase}.name`)}</h3>
                  <p className="phase__desc">{t(`phases.${phase}.desc`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
