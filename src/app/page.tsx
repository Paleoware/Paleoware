import { LanguageGateway } from '@/components/language-gateway'

export default function RootPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return <LanguageGateway basePath={basePath} />
}
