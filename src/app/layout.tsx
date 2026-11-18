import type { Metadata } from 'next'
import Script from 'next/script'
import socialImage from '@/Paleoware-Logotipo.webp'
import { Analytics } from '@/components/analytics'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://paleoware.com'),
  title: {
    default: 'Paleoware — Sitios a medida que no se confunden con el resto',
    template: '%s | Paleoware',
  },
  description:
    'Diseño web con identidad para negocios y proyectos en toda Argentina y para mercados hispanohablantes e internacionales.',
  openGraph: {
    title: 'Paleoware — Sitios a medida que no se confunden con el resto',
    description:
      'Diseño web con identidad, estrategia y tecnología para Argentina y mercados internacionales.',
    type: 'website',
    siteName: 'Paleoware',
    images: [
      {
        url: socialImage.src,
        width: socialImage.width,
        height: socialImage.height,
        alt: 'Paleoware',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [socialImage.src],
  },
}

/**
 * Runs before paint: adds the `js` class (reveals are opt-in) and applies the
 * saved theme so the first frame already has the right ground colour.
 */
const bootstrapScript = `
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  root.lang = /\\/en(\\/|$)/.test(window.location.pathname) ? 'en' : 'es';
  try {
    var saved = window.localStorage.getItem('pw-theme');
    if (saved !== 'light' && saved !== 'dark') {
      saved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    root.dataset.theme = saved;
  } catch (error) {
    root.dataset.theme = 'dark';
  }
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body>
        {children}
        <Analytics />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
