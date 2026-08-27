export const siteConfig = {
  name: 'Paleoware',
  url: 'https://paleoware.com',
  whatsapp: {
    number: '541134117299',
    message: 'Hola, quiero solicitar un presupuesto para mi proyecto web.',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/paleoware',
    facebook: 'https://www.facebook.com/paleoware',
    // TikTok remains hidden until an official profile exists.
    tiktok: '',
  },
}

export const featureConfig = {
  showPortfolio: false,
}

export const services = [
  { id: 'strategy', enabled: true, number: '01' },
  { id: 'webDesign', enabled: true, number: '02' },
  { id: 'seoAnalytics', enabled: true, number: '03' },
  { id: 'webCreation', enabled: true, number: '04' },
  { id: 'ecommerce', enabled: true, number: '05' },
  { id: 'marketing', enabled: true, number: '06' },
] as const

export const portfolioItems = [
  { id: 'first-specimen', enabled: false },
  { id: 'second-specimen', enabled: false },
  { id: 'third-specimen', enabled: false },
] as const
