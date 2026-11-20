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
    {
      url: `${siteConfig.url}/es/about/`,
      alternates: { languages: { es: `${siteConfig.url}/es/about/`, en: `${siteConfig.url}/en/about/` } },
    },
    {
      url: `${siteConfig.url}/en/about/`,
      alternates: { languages: { es: `${siteConfig.url}/es/about/`, en: `${siteConfig.url}/en/about/` } },
    },
    {
      url: `${siteConfig.url}/es/cookies/`,
      alternates: { languages: { es: `${siteConfig.url}/es/cookies/`, en: `${siteConfig.url}/en/cookies/` } },
    },
    {
      url: `${siteConfig.url}/en/cookies/`,
      alternates: { languages: { es: `${siteConfig.url}/es/cookies/`, en: `${siteConfig.url}/en/cookies/` } },
    },
    {
      url: `${siteConfig.url}/es/privacidad/`,
      alternates: { languages: { es: `${siteConfig.url}/es/privacidad/`, en: `${siteConfig.url}/en/privacy/` } },
    },
    {
      url: `${siteConfig.url}/en/privacy/`,
      alternates: { languages: { es: `${siteConfig.url}/es/privacidad/`, en: `${siteConfig.url}/en/privacy/` } },
    },
    ...servicePages,
  ]
}
