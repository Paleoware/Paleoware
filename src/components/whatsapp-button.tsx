import { siteConfig } from '@/config/site'

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`

  return (
    <a className="whatsapp-button" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.1 18.8 6.2 15A8 8 0 1 1 9 18.1l-3.9.7Z" />
        <path d="M9.1 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.6 1.1 1.5 1.9 2.7 2.4l.7-.7c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.3.6-.2.8-.9 1.4-1.7 1.5-1.1.1-2.7-.7-4.2-1.9-1.2-1-2.1-2.3-2.5-3.4-.3-.9-.2-1.7.6-2.2Z" />
      </svg>
    </a>
  )
}
