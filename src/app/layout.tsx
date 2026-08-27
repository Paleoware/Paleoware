import type { Metadata } from 'next'
import { Analytics } from '@/components/analytics'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://paleoware.com'),
  title: {
    default: 'Paleoware | Creacion web que deja huella',
    template: '%s | Paleoware',
  },
  description:
    'Paleoware crea experiencias web vistosas, estrategicas y orientadas a resultados.',
  openGraph: {
    title: 'Paleoware | Creacion web que deja huella',
    description:
      'Experiencias web con identidad, estrategia y tecnologia.',
    type: 'website',
    siteName: 'Paleoware',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The project intentionally loads Google Fonts with link tags. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
