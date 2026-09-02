# Paleoware

Landing page multilenguaje para Paleoware, construida como una exportacion estatica de Next.js para GitHub Pages.

## Stack

- Next.js App Router y TypeScript.
- `next-intl` para las rutas `/es` y `/en`.
- CSS global con variables visuales, responsive y keyframes en `src/app/globals.css` durante esta primera fase.
- GSAP y `@gsap/react` para animaciones y ScrollTrigger.
- EmailJS Browser para el formulario sin backend.
- Google Analytics opcional mediante `@next/third-parties/google`.

## Desarrollo local

```bash
npm install
npm run dev
```

La raiz `/` detecta el idioma del navegador y redirige a `/es/` o `/en/`. Tambien se puede elegir manualmente desde el selector de idioma.

`NEXT_PUBLIC_BASE_PATH` debe quedar vacia para desarrollo local y Cloudflare Pages. El workflow de GitHub Pages la define como `/Paleoware` porque ese sitio se publica bajo el nombre del repositorio.

## Configuracion

Define estas variables en `.env.local` y completa los identificadores cuando existan las cuentas de EmailJS y Google Analytics. Son identificadores publicos para el navegador, no contraseñas.

Las activaciones de contenido se encuentran en `src/config/site.ts`:

- `featureConfig.showPortfolio` controla toda la seccion de portfolio.
- Cada elemento de `portfolioItems` tiene su propio `enabled`.
- Cada elemento de `services` tiene su propio `enabled`.

## Deploy

`npm run build` genera la carpeta `out`. El workflow de `.github/workflows/deploy.yml` la publica en GitHub Pages al hacer push a `main`.

Para una pagina de usuario, el repositorio debera llamarse `paleoware.github.io`. El dominio personalizado se configurara mas adelante desde los ajustes de Pages.

## Guia de lectura

- `src/app/[locale]/page.tsx`: composicion de la landing y orden de las secciones.
- `src/app/globals.css`: variables visuales, layout, responsive, estados hover y keyframes.
- `src/messages/es.json` y `src/messages/en.json`: textos de cada idioma.
- `src/components/hero.tsx`: texto rotativo, parallax y animaciones GSAP.
- `src/components/custom-cursor.tsx`: cursores personalizados y rastro de arena.
- `src/components/contact-form.tsx`: validacion, honeypot y envio EmailJS.

Cada bloque se explicara durante las siguientes iteraciones sin ocultar la relacion entre JSX, CSS y TypeScript.
