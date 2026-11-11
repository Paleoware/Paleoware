export type ServiceId =
  | 'strategy'
  | 'webDesign'
  | 'webCreation'
  | 'ecommerce'
  | 'seoAnalytics'
  | 'marketing'

export type FamilyId = 'define' | 'build' | 'grow'

export type ServiceFamily = {
  id: FamilyId
  services: ServiceId[]
}

/**
 * Single source of truth for the service taxonomy.
 * Home renders the three bands from here; /servicios/ renders the six records.
 */
export const serviceFamilies: ServiceFamily[] = [
  { id: 'define', services: ['strategy'] },
  { id: 'build', services: ['webDesign', 'webCreation', 'ecommerce'] },
  { id: 'grow', services: ['seoAnalytics', 'marketing'] },
]
