'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span aria-hidden="true">^</span>
    </button>
  )
}
