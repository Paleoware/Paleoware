import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { serviceIds, serviceSlugs } from '@/config/services'

export const dynamic = 'force-static'

const languages = {
  es: `${siteConfig.url}/es/`,
  en: `${siteConfig.url}/en/`,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = serviceIds.flatMap((service) => [
    {
      url: `${siteConfig.url}/es/servicios/${serviceSlugs[service]}/`,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/servicios/${serviceSlugs[service]}/`,
          en: `${siteConfig.url}/en/servicios/${serviceSlugs[service]}/`,
        },
      },
    },
    {
      url: `${siteConfig.url}/en/servicios/${serviceSlugs[service]}/`,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/servicios/${serviceSlugs[service]}/`,
          en: `${siteConfig.url}/en/servicios/${serviceSlugs[service]}/`,
        },
      },
    },
  ])

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
    ...servicePages,
  ]
}
