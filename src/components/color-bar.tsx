/**
 * La barra espectral del manual: tres franjas y un corte diagonal a la derecha.
 * Es el único lugar del sitio donde los seis colores aparecen juntos.
 */
export function ColorBar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 56"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="pw-spectrum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0045bd" />
          <stop offset="0.1" stopColor="#0088fc" />
          <stop offset="0.22" stopColor="#00ebe9" />
          <stop offset="0.34" stopColor="#00dba8" />
          <stop offset="0.5" stopColor="#7bd300" />
          <stop offset="0.62" stopColor="#fdb300" />
          <stop offset="0.74" stopColor="#fc7304" />
          <stop offset="0.87" stopColor="#fa013b" />
          <stop offset="1" stopColor="#e4006e" />
        </linearGradient>
        <clipPath id="pw-spectrum-clip">
          <polygon points="0,0 1200,0 1172,56 0,56" />
        </clipPath>
      </defs>
      <g clipPath="url(#pw-spectrum-clip)">
        <rect width="1200" height="56" fill="url(#pw-spectrum)" />
        <rect y="17" width="1200" height="4" fill="#050407" />
        <rect y="35" width="1200" height="4" fill="#050407" />
      </g>
      <polygon
        points="0,0 1200,0 1172,56 0,56"
        fill="none"
        stroke="#050407"
        strokeWidth="4"
      />
    </svg>
  )
}
