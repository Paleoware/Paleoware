import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import logo from '@/Paleoware-new-logo.webp'
import facebookIcon from '@/fb.webp'
import instagramIcon from '@/ig.webp'
import whatsappIcon from '@/wpp.webp'
import { siteConfig } from '@/config/site'
import { ColorBar } from './color-bar'
import { TrackedLink } from './tracked-link'
import { CookieSettingsButton } from './cookie-banner'

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
            <h3>{t('menu')}</h3>
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
              <li>
                <Link href={`/${locale}/cookies/`}>{nav('cookies')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/${locale === 'es' ? 'privacidad' : 'privacy'}/`}>
                  {nav('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__col footer__socials">
            <h3>{t('follow')}</h3>
            <div className="footer__social-links">
              <TrackedLink className="footer__social-link" href={siteConfig.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label={t('facebook')} event="social_click" params={{ network: 'facebook' }}>
                <Image src={facebookIcon} alt="" width={150} height={150} />
              </TrackedLink>
              <TrackedLink className="footer__social-link" href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label={t('instagram')} event="social_click" params={{ network: 'instagram' }}>
                <Image src={instagramIcon} alt="" width={150} height={150} />
              </TrackedLink>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <ColorBar />
        </div>

        <div className="footer__bottom">
          <span>© 2026 Paleoware. {t('rights')}</span>
          <span className="footer__bottom-actions">
            <CookieSettingsButton label={nav('cookieSettings')} />
            <a href="#superficie">{t('top')} ↑</a>
          </span>
        </div>
      </div>
      <TrackedLink className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={t('whatsapp')} event="whatsapp_click" params={{ location: 'floating' }}>
        <Image src={whatsappIcon} alt="" width={150} height={150} />
      </TrackedLink>
    </footer>
  )
}
