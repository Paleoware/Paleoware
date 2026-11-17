import type { Metadata } from 'next'
import Script from 'next/script'
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The project intentionally loads Google Fonts with link tags. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DotGothic16&family=IBM+Plex+Sans:wght@400;500;600&family=Tektur:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
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
