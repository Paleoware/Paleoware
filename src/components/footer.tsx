'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import facebook from '@/Facebook.webp'
import instagram from '@/Instagram.webp'
import logo from '@/Paleoware-logo-completo.webp'
import whatsapp from '@/Whatsapp.webp'
import { siteConfig } from '@/config/site'
import { trackEvent } from '@/lib/analytics'

type FooterProps = Readonly<{ locale: string }>

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('Footer')
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <div>
          <Link className="site-footer__logo" href={`/${locale}/`}>
            <Image src={logo} alt="Paleoware" width={260} height={146} />
          </Link>
          <p>{t('statement')}</p>
        </div>
        <div className="site-footer__links">
          <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer" onClick={() => trackEvent('social_click', { platform: 'instagram' })}>
            <Image src={instagram} alt="" width={24} height={24} /> {t('instagram')}
          </a>
          <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noreferrer" onClick={() => trackEvent('social_click', { platform: 'facebook' })}>
            <Image src={facebook} alt="" width={24} height={24} /> {t('facebook')}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}>
            <Image src={whatsapp} alt="" width={24} height={25} /> {t('whatsapp')}
          </a>
        </div>
        <small>© {new Date().getFullYear()} Paleoware. {t('rights')}</small>
      </div>
    </footer>
  )
}
