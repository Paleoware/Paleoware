import { Reveal } from './reveal'

type SectionHeadProps = {
  title: string
  lead?: string
}

/** Cabecera de sección: título y una línea de apoyo. */
export function SectionHead({ title, lead }: SectionHeadProps) {
  return (
    <Reveal className="section-head">
      <h2>{title}</h2>
      {lead ? <p className="section-head__lead">{lead}</p> : null}
    </Reveal>
  )
}
