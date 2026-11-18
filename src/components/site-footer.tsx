import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import logo from '@/Paleoware-new-logo.webp'
import { siteConfig } from '@/config/site'
import { ColorBar } from './color-bar'
import { TrackedLink } from './tracked-link'

type SiteFooterProps = Readonly<{ locale: string }>

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations('Footer')
  const nav = useTranslations('Navigation')
  const home = `/${locale}/`
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    siteConfig.whatsapp.message,
  )}`

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer__top">
          <div>
            <Link className="footer__brand" href={home} aria-label={nav('home')}>
              <Image src={logo} alt="" width={280} height={184} sizes="280px" />
            </Link>
            <p className="footer__statement">{t('statement')}</p>
          </div>

          <div className="footer__col">
            <h3>{t('sitemap')}</h3>
            <ul>
              <li>
                <Link href={`/${locale}/about/`}>{nav('about')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/servicios/`}>{nav('services')}</Link>
              </li>
              <li>
                <Link href={`${home}#preguntas`}>{nav('faq')}</Link>
              </li>
              <li>
                <Link href={`${home}#contacto`}>{nav('contact')}</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>{t('contact')}</h3>
            <ul>
              <li>
                <TrackedLink href={whatsappUrl} target="_blank" rel="noreferrer" event="contact_click" params={{ channel: 'whatsapp', location: 'footer' }}>
                  WhatsApp
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={`mailto:${siteConfig.contact.email}`} event="contact_click" params={{ channel: 'email', location: 'footer' }}>
                  {siteConfig.contact.email}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer" event="social_click" params={{ network: 'instagram' }}>
                  Instagram
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={siteConfig.socialLinks.facebook} target="_blank" rel="noreferrer" event="social_click" params={{ network: 'facebook' }}>
                  Facebook
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <ColorBar />
        </div>

        <div className="footer__bottom">
          <span>© 2026 Paleoware. {t('rights')}</span>
          <a href="#superficie">{t('top')} ↑</a>
        </div>
      </div>
    </footer>
  )
}
