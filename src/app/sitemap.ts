import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

const languages = {
  es: `${siteConfig.url}/es/`,
  en: `${siteConfig.url}/en/`,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/es/`,
      alternates: { languages },
    },
    {
      url: `${siteConfig.url}/en/`,
      alternates: { languages },
    },
    {
      url: `${siteConfig.url}/es/servicios/`,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/servicios/`,
          en: `${siteConfig.url}/en/servicios/`,
        },
      },
    },
    {
      url: `${siteConfig.url}/en/servicios/`,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/servicios/`,
          en: `${siteConfig.url}/en/servicios/`,
        },
      },
    },
  ]
}
