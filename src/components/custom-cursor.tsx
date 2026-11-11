'use client'

import { useEffect } from 'react'
import cursorImage from '@/Cursor.png'
import pointerImage from '@/Pointer.png'
import textImage from '@/Text.png'

/**
 * Los tres cursores del manual, sin partículas ni canvas.
 * Solo se aplican con puntero fino; en táctil queda el cursor del sistema.
 */
export function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const root = document.documentElement

    const apply = () => {
      if (!fine.matches) {
        root.classList.remove('has-custom-cursor')
        root.style.removeProperty('--cursor-default')
        root.style.removeProperty('--cursor-pointer')
        root.style.removeProperty('--cursor-text')
        return
      }

      root.style.setProperty('--cursor-default', `url("${cursorImage.src}") 2 2, auto`)
      root.style.setProperty('--cursor-pointer', `url("${pointerImage.src}") 6 4, pointer`)
      root.style.setProperty('--cursor-text', `url("${textImage.src}") 8 16, text`)
      root.classList.add('has-custom-cursor')
    }

    apply()
    fine.addEventListener('change', apply)

    return () => {
      fine.removeEventListener('change', apply)
      root.classList.remove('has-custom-cursor')
    }
  }, [])

  return null
}
