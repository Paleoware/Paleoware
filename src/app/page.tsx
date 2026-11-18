import { LanguageGateway } from '@/components/language-gateway'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

export default function RootPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return <LanguageGateway basePath={basePath} />
}
