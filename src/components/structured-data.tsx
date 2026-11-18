import { siteConfig } from '@/config/site'
import socialImage from '@/Paleoware-Logotipo.webp'

const SITE_URL = siteConfig.url
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

type JsonLdProps = Readonly<{ data: Record<string, unknown> }>

function JsonLd({ data }: JsonLdProps) {
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': ORGANIZATION_ID,
            name: siteConfig.name,
            url: SITE_URL,
            logo: `${SITE_URL}${socialImage.src}`,
            sameAs: [siteConfig.socialLinks.instagram, siteConfig.socialLinks.facebook],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: siteConfig.contact.email,
              telephone: siteConfig.contact.phoneDisplay,
              availableLanguage: ['es', 'en'],
              hoursAvailable: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'https://schema.org/Monday',
                  'https://schema.org/Tuesday',
                  'https://schema.org/Wednesday',
                  'https://schema.org/Thursday',
                  'https://schema.org/Friday',
                ],
                opens: '09:00',
                closes: '18:00',
              },
            },
          },
          {
            '@type': 'WebSite',
            '@id': WEBSITE_ID,
            name: siteConfig.name,
            url: SITE_URL,
            publisher: { '@id': ORGANIZATION_ID },
          },
        ],
      }}
    />
  )
}

type PageSchemaProps = Readonly<{
  locale: string
  path: string
  name: string
  description: string
  breadcrumb?: { name: string; path: string }[]
}>

export function PageSchema({ locale, path, name, description, breadcrumb }: PageSchemaProps) {
  const url = `${SITE_URL}${path}/`.replace(/\/\/+$/, '/')
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: locale,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
    },
  ]

  if (breadcrumb?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}/`.replace(/\/\/+$/, '/'),
      })),
    })
  }

  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />
}

export function AboutPageSchema({
  locale,
  path,
  name,
  description,
}: Omit<PageSchemaProps, 'breadcrumb'>) {
  const url = `${SITE_URL}${path}/`.replace(/\/\/+$/, '/')

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${url}#about-page`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
      }}
    />
  )
}

type ServiceSchemaProps = Readonly<{
  locale: string
  path: string
  name: string
  description: string
  intro: string
  forWhom: string
  includes: string[]
}>

export function ServiceSchema({
  locale,
  path,
  name,
  description,
  intro,
  forWhom,
  includes,
}: ServiceSchemaProps) {
  const url = `${SITE_URL}${path}/`.replace(/\/\/+$/, '/')

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name,
            description,
            inLanguage: locale,
            isPartOf: { '@id': WEBSITE_ID },
            about: { '@id': `${SITE_URL}/#service-${path.split('/').pop()}` },
            publisher: { '@id': ORGANIZATION_ID },
          },
          {
            '@type': 'Service',
            '@id': `${SITE_URL}/#service-${path.split('/').pop()}`,
            name,
            description,
            url,
            provider: { '@id': ORGANIZATION_ID },
            serviceType: name,
            audience: { '@type': 'Audience', audienceType: forWhom },
            subjectOf: {
              '@type': 'CreativeWork',
              name: intro,
              text: includes.join('. '),
            },
          },
        ],
      }}
    />
  )
}

export function ServiceListSchema({
  locale,
  items,
}: Readonly<{
  locale: string
  items: { name: string; path: string; description: string }[]
}>) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${SITE_URL}${item.path}/`.replace(/\/\/+$/, '/'),
          description: item.description,
          item: {
            '@type': 'Service',
            name: item.name,
            url: `${SITE_URL}${item.path}/`.replace(/\/\/+$/, '/'),
            provider: { '@id': ORGANIZATION_ID },
            inLanguage: locale,
          },
        })),
      }}
    />
  )
}
