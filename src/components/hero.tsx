'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const CLIPS = {
  dark: [
    `${BASE}/fondo_hero/cabanha-lago-dark.webm`,
    `${BASE}/fondo_hero/city-dark.webm`,
    `${BASE}/fondo_hero/oficina-dark.webm`,
  ],
  light: [
    `${BASE}/fondo_hero/city_clear.webm`,
    `${BASE}/fondo_hero/laboratorio-clear.webm`,
    `${BASE}/fondo_hero/pila-chatarra-clear.webm`,
  ],
}

type MediaState = {
  mode: 'dark' | 'light'
  visible: 0 | 1
  /** Scene index held by each video slot. */
  slots: [number, number]
}

const TYPING_DELAY = 2400
const HOLD_DELAY = 2400

export function Hero() {
  const t = useTranslations('Hero')
  const phrases = useMemo(() => t.raw('phrases') as string[], [t])
  const phraseKey = phrases.join('\u0000')
  const firstPhrase = phrases[0] ?? ''

  const [still, setStill] = useState(false)
  const [typed, setTyped] = useState(firstPhrase)
  const [staticOn, setStaticOn] = useState(false)
  const [state, setState] = useState<MediaState>({
    mode: 'dark',
    visible: 0,
    slots: [0, 1],
  })
  const [loadedSlots, setLoadedSlots] = useState<0 | 1>(0)

  const mode = state.mode
  const clips = useMemo(() => CLIPS[mode], [mode])
  const timers = useRef<number[]>([])
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useGSAP((_, contextSafe) => {
    const button = ctaRef.current
    if (!button) return

    const floating = button.querySelectorAll<HTMLElement>('.hero__cta-particle')
    const edgePixels = button.querySelectorAll<HTMLElement>('.hero__cta-edge-pixel')
    if (!edgePixels.length) return

    const safeCallback =
      contextSafe ?? ((callback: () => void) => callback)

    // Punto del perímetro del botón para un progreso de 0 a 1.
    const pointAt = (progress: number, width: number, height: number) => {
      const perimeter = 2 * (width + height)
      let distance = (((progress % 1) + 1) % 1) * perimeter

      if (distance <= width) return { x: distance, y: 0 }
      distance -= width
      if (distance <= height) return { x: width, y: distance }
      distance -= height
      if (distance <= width) return { x: width - distance, y: height }
      distance -= width
      return { x: 0, y: height - distance }
    }

    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const edgeLoopRef: { current: gsap.core.Timeline | null } = { current: null }
        const trailPixels = Array.from(edgePixels).slice(1)
        const bounds = () => ({
          width: button.getBoundingClientRect().width,
          height: button.getBoundingClientRect().height,
        })

        // Un píxel principal recorre el contorno con pasos de videojuego viejo.
        // Los píxeles siguientes arrancan unos centímetros atrás y forman la estela.
        const buildEdgeLoop = (element: HTMLElement, offset: number) => {
          const { width, height } = bounds()
          const perimeter = 2 * (width + height)
          const speed = perimeter / 9
          const start = offset
          const corners = [width, width + height, 2 * width + height, perimeter]
          const stops = [
            ...[...corners, ...corners.map((corner) => corner + perimeter)]
              .filter((corner) => corner > start && corner < start + perimeter)
              .sort((a, b) => a - b),
            start + perimeter,
          ]

          const loop = gsap.timeline({ repeat: -1 })
          const from = pointAt(start / perimeter, width, height)
          gsap.set(element, { x: from.x, y: from.y })

          let previous = start
          stops.forEach((stop) => {
            const point = pointAt(stop / perimeter, width, height)
            const distance = stop - previous
            loop.to(element, {
              x: point.x,
              y: point.y,
              duration: distance / speed,
              ease: `steps(${Math.max(1, Math.round(distance / 6))})`,
            })
            previous = stop
          })

          return loop
        }

        // Estela tipo snake: cada píxel nace en la posición del líder y va
        // encogiéndose y perdiendo opacidad hasta desaparecer.
        let trailCursor = 0
        let lastHead = { x: Number.NaN, y: Number.NaN }

        const startEdgeLoop = () => {
          if (edgeLoopRef.current) edgeLoopRef.current.kill()
          gsap.killTweensOf(trailPixels)
          gsap.set(trailPixels, { opacity: 0 })
          lastHead = { x: Number.NaN, y: Number.NaN }

          edgeLoopRef.current = buildEdgeLoop(edgePixels[0], 0)
        }

        const spawnTrailPixel = () => {
          if (!trailPixels.length) return

          const headX = Number(gsap.getProperty(edgePixels[0], 'x'))
          const headY = Number(gsap.getProperty(edgePixels[0], 'y'))

          // Si el líder todavía no cambió de paso, no duplicamos el píxel.
          if (headX === lastHead.x && headY === lastHead.y) return
          lastHead = { x: headX, y: headY }

          const pixel = trailPixels[trailCursor % trailPixels.length]
          trailCursor += 1

          gsap.killTweensOf(pixel)
          gsap.fromTo(
            pixel,
            { x: headX, y: headY, scale: 1, opacity: 0.95 },
            { scale: 0, opacity: 0, duration: 0.95, ease: 'none' },
          )
        }

        const spawner = gsap.to(
          {},
          {
            duration: 0.07,
            repeat: -1,
            paused: true,
            onStart: spawnTrailPixel,
            onRepeat: spawnTrailPixel,
          },
        )

        startEdgeLoop()
        spawner.play()

        const observer = new ResizeObserver(() => startEdgeLoop())
        observer.observe(button)

        const onEnter = safeCallback(() => {
          gsap.to(button, { y: -2, duration: 0.22, ease: 'power2.out', overwrite: true })
          gsap.to(floating, {
            scale: 1.4,
            autoAlpha: 1,
            duration: 0.28,
            stagger: 0.035,
            ease: 'power2.out',
            overwrite: true,
          })
        })

        const onLeave = safeCallback(() => {
          gsap.to(button, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: true })
          gsap.to(floating, {
            scale: 1,
            autoAlpha: 0.72,
            duration: 0.22,
            stagger: 0.02,
            ease: 'power2.out',
            overwrite: true,
          })
        })

        button.addEventListener('pointerenter', onEnter)
        button.addEventListener('pointerleave', onLeave)

        return () => {
          button.removeEventListener('pointerenter', onEnter)
          button.removeEventListener('pointerleave', onLeave)
          observer.disconnect()
          edgeLoopRef.current?.kill()
          spawner.kill()
          gsap.killTweensOf([button, floating, edgePixels])
        }
      },
    )

    // Movimiento reducido: solo el píxel principal, quieto.
    media.add('(prefers-reduced-motion: reduce)', () => {
      const { width } = button.getBoundingClientRect()
      gsap.set(edgePixels, { x: width, y: 0, opacity: 0 })
      gsap.set(edgePixels[0], { x: width, y: 0, opacity: 1 })
    })

    return () => media.revert()
  }, { scope: ctaRef })

  // El modo lo manda el toggle del header, no el sistema. Al cambiar de modo
  // los canales vuelven al primer clip.
  useEffect(() => {
    const read = () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
      setState((current) =>
        current.mode === next ? current : { mode: next, visible: 0, slots: [0, 1] },
      )
    }

    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection

    const update = () => setStill(query.matches || Boolean(connection?.saveData))
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  // Escritura y borrado del H1. La primera frase ya viene impresa desde el
  // servidor: el efecto solo la borra cuando la página ya está en pantalla.
  useEffect(() => {
    if (still) return

    const list = phraseKey.split('\u0000')
    if (!list.length || !list[0]) return

    let phraseIndex = 0
    let charIndex = list[0].length
    let deleting = true
    let timer = 0

    const step = () => {
      const full = list[phraseIndex]

      if (deleting) {
        charIndex -= 1
        setTyped(full.slice(0, Math.max(charIndex, 0)))

        if (charIndex <= 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % list.length
          timer = window.setTimeout(step, 340)
          return
        }

        timer = window.setTimeout(step, 26)
        return
      }

      charIndex += 1
      setTyped(full.slice(0, charIndex))

      if (charIndex >= full.length) {
        deleting = true
        timer = window.setTimeout(step, HOLD_DELAY)
        return
      }

      timer = window.setTimeout(step, 52 + Math.round(Math.random() * 40))
    }

    timer = window.setTimeout(step, TYPING_DELAY)
    return () => window.clearTimeout(timer)
  }, [phraseKey, still])

  useEffect(() => {
    if (still) return
    if (clips.length < 2) return

    const interval = window.setInterval(() => {
      if (document.hidden) return

      setStaticOn(true)
      timers.current.push(
        window.setTimeout(() => {
          setLoadedSlots(1)
          setState((current) => {
            const nextVisible: 0 | 1 = current.visible === 0 ? 1 : 0
            const leaving = current.visible
            const nextScene = (current.slots[nextVisible] + 1) % clips.length
            const slots: [number, number] = [current.slots[0], current.slots[1]]
            slots[leaving] = nextScene
            return { mode: current.mode, visible: nextVisible, slots }
          })
        }, 120),
      )
      timers.current.push(window.setTimeout(() => setStaticOn(false), 320))
    }, window.matchMedia('(max-width: 767px)').matches ? 6000 : 3000)

    return () => {
      window.clearInterval(interval)
      timers.current.forEach((id) => window.clearTimeout(id))
      timers.current = []
    }
  }, [clips, still])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return

      if (still) {
        video.pause()
        try {
          video.currentTime = 0.05
        } catch {
          // Algunos navegadores bloquean el seek antes de tener metadatos.
        }
        return
      }

      void video.play().catch(() => undefined)
    })
  }, [state, mode, still])

  const visiblePhrase = still ? firstPhrase : typed
  const renderedSlots = still ? [0] : loadedSlots === 1 ? [0, 1] : [0]

  return (
    <section className="hero" id="superficie">
      <div className="hero__media">
        {renderedSlots.map((slot) => (
          <video
            key={`${mode}-${slot}-${state.slots[slot]}`}
            ref={(node) => {
              videoRefs.current[slot] = node
            }}
            className="hero__video"
            data-visible={state.visible === slot}
            src={clips[state.slots[slot]]}
            autoPlay={!still}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
        ))}
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__static" data-on={staticOn} aria-hidden="true" />
      </div>

      <div className="hero__inner">
        <div className="hero__grid">
          <div>
            <h1>
              <span className="hero__prefix">{t('titlePrefix')}</span>
              <span className="hero__type" aria-hidden="true">
                {visiblePhrase}
                <span className="hero__caret" />
              </span>
              <span className="sr-only"> {firstPhrase}.</span>
            </h1>
            <p className="hero__lead">{t('lead')}</p>
            <div className="hero__cta">
              <Link className="btn btn--primary hero__cta-button" href="#contacto" ref={ctaRef}>
                <span className="hero__cta-particles" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, index) => (
                    <span className="hero__cta-particle" key={index} />
                  ))}
                </span>
                <span className="hero__cta-edge" aria-hidden="true">
                  {Array.from({ length: 17 }, (_, index) => (
                    <span className="hero__cta-edge-pixel" key={index} />
                  ))}
                </span>
                <span className="hero__cta-label">{t('cta')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
