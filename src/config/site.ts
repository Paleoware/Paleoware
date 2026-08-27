export const siteConfig = {
  name: 'Paleoware',
  url: 'https://paleoware.com',
  whatsapp: {
    number: '541134117299',
    message: 'Hola, quiero solicitar un presupuesto para mi proyecto web.',
  },
  contact: {
    email: 'info@paleoware.com',
    phoneDisplay: '+54 11 3411-7299',
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
  { id: 'strategy', enabled: true, icon: 'compass' },
  { id: 'webDesign', enabled: true, icon: 'layout' },
  { id: 'seoAnalytics', enabled: true, icon: 'chart' },
  { id: 'webCreation', enabled: true, icon: 'code' },
  { id: 'ecommerce', enabled: true, icon: 'cart' },
  { id: 'marketing', enabled: true, icon: 'megaphone' },
] as const

export const portfolioItems = [
  { id: 'first-specimen', enabled: false },
  { id: 'second-specimen', enabled: false },
  { id: 'third-specimen', enabled: false },
] as const
