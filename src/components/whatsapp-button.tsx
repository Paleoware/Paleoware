import Image from 'next/image'
import whatsapp from '@/Whatsapp.webp'
import { siteConfig } from '@/config/site'

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`

  return (
    <a className="whatsapp-button" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <Image src={whatsapp} alt="" width={34} height={36} />
    </a>
  )
}
