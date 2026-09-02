'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import arrow from '@/Arrow.webp'
import { trackEvent } from '@/lib/analytics'

export function ScrollToTop() {
  const t = useTranslations('Footer')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`scroll-top${visible ? ' scroll-top--visible' : ''}`}
      type="button"
      aria-label={t('backToTop')}
      onClick={() => { trackEvent('scroll_to_top'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
    >
      <Image src={arrow} alt="" width={20} height={21} />
    </button>
  )
}
