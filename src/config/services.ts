export type ServiceId =
  | 'strategy'
  | 'webDesign'
  | 'webCreation'
  | 'ecommerce'
  | 'seoAnalytics'
  | 'marketing'
  | 'graphicDesign'

export type FamilyId = 'define' | 'build' | 'grow'

export type ServiceFamily = {
  id: FamilyId
  services: ServiceId[]
}

/**
 * Single source of truth for the service taxonomy.
 * Home renders the three bands from here; /servicios/ renders the service records.
 */
export const serviceFamilies: ServiceFamily[] = [
  { id: 'define', services: ['strategy'] },
  { id: 'build', services: ['webDesign', 'webCreation', 'graphicDesign', 'ecommerce'] },
  { id: 'grow', services: ['seoAnalytics', 'marketing'] },
]

export const serviceSlugs: Record<ServiceId, string> = {
  strategy: 'estrategia',
  webDesign: 'diseno-web',
  webCreation: 'desarrollo-web',
  ecommerce: 'e-commerce',
  seoAnalytics: 'seo-analitica',
  marketing: 'marketing-digital',
  graphicDesign: 'diseno-grafico',
}

export const serviceIds = Object.keys(serviceSlugs) as ServiceId[]
