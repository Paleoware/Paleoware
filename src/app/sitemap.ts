import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/es/`,
      alternates: { languages: { es: `${siteConfig.url}/es/`, en: `${siteConfig.url}/en/` } },
    },
    {
      url: `${siteConfig.url}/en/`,
      alternates: { languages: { es: `${siteConfig.url}/es/`, en: `${siteConfig.url}/en/` } },
    },
    {
      url: `${siteConfig.url}/es/about/`,
      alternates: { languages: { es: `${siteConfig.url}/es/about/`, en: `${siteConfig.url}/en/about/` } },
    },
    {
      url: `${siteConfig.url}/en/about/`,
      alternates: { languages: { es: `${siteConfig.url}/es/about/`, en: `${siteConfig.url}/en/about/` } },
    },
  ]
}
