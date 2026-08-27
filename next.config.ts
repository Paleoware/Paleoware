import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // GitHub Pages serves the generated files without a Next.js server.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
