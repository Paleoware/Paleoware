# Paleoware Agent Guide

## Project

Paleoware is a bilingual marketing landing page for a web development studio. The visual direction combines paleontology, retrofuturism and biomechanical interfaces. The visual language uses volcanic black, amber light, fossil tones, technical labels, glass surfaces, holographic effects and controlled motion.

The first release is a static website. It does not have a database, authentication, custom API or server-side form handler.

## Stack

- Next.js 16 with the App Router.
- React 19 and TypeScript in strict mode.
- `next-intl` for Spanish and English translations.
- GSAP, `ScrollTrigger` and `@gsap/react` for motion.
- Google Fonts loaded in `src/app/layout.tsx` with `<link>`.
- `@emailjs/browser` for the client-side contact form.
- `@next/third-parties/google` for optional Google Analytics.
- GitHub Pages as the initial host.
- GitHub Actions for static builds and deployment.

## Important Constraints

- Keep `output: 'export'` in `next.config.ts` while GitHub Pages is the host.
- Do not add Server Actions, dynamic API routes, database code or server-only form handling without discussing the hosting change first.
- All visible user-facing text must exist in both `src/messages/es.json` and `src/messages/en.json`.
- Do not put translated copy directly in JSX when it belongs to the interface.
- Use Server Components by default. Add `'use client'` only for browser APIs, state, event handlers or animations.
- Keep animations disabled or reduced for `prefers-reduced-motion` and for touch devices when appropriate.
- Preserve keyboard focus states, semantic HTML, labels and useful alternative text.
- Keep the custom cursor as an enhancement, never as the only way to understand an interaction.

## Routes And Internationalization

- `/` is a client-side language gateway. It checks `localStorage`, then `navigator.language`, and redirects to `/es/` or `/en/`.
- `/es/` is the Spanish home page.
- `/en/` is the English home page.
- `/es/about/` and `/en/about/` are the localized About pages.
- `src/i18n/routing.ts` is the source of truth for supported locales.
- `src/i18n/request.ts` loads the correct message file.
- `src/app/[locale]/layout.tsx` validates locales and prepares static rendering.
- When adding a route, add it below `src/app/[locale]/` and update `src/app/sitemap.ts` if it is indexable.

## Content Configuration

`src/config/site.ts` controls content that is not translated:

- `siteConfig` contains the domain, WhatsApp number, WhatsApp message and social URLs.
- `featureConfig.showPortfolio` controls the whole portfolio section.
- Each service in `services` has an `enabled` flag.
- Each portfolio entry in `portfolioItems` has an `enabled` flag.

Use stable IDs in configuration and keep their translated labels in the message files. Do not duplicate the same service data in multiple components.

## Visual Architecture

- `src/app/globals.css` owns the global design tokens, layout primitives, responsive breakpoints, cursor rules and keyframes.
- `src/components/hero.tsx` owns the hero copy, rotating words, hero imagery and GSAP parallax.
- `hero-1.png` is the active hero image. `hero-2.png` is an unused visual experiment and must not be rendered unless explicitly requested.
- `Cursor.png`, `Pointer.png` and `Text.png` are the custom cursor assets.
- Large hero images can later be converted to WebP. Cursor assets should remain in a format with reliable transparency and cursor support.
- Avoid stacking nearly identical hero images because it creates ghosting and apparent blur.
- Avoid excessive blur, backdrop filters and particle DOM nodes on mobile.

## Forms And Analytics

- `src/components/contact-form.tsx` uses `@emailjs/browser` and currently shows a temporary configuration message when EmailJS variables are missing.
- Required browser variables are documented in `.env.example`.
- Never commit private credentials. EmailJS public identifiers and the GA measurement ID are build-time browser values.
- The form includes a honeypot and a privacy checkbox.
- Analytics only renders when `NEXT_PUBLIC_GA_ID` exists. Review consent requirements before the global public launch.

## GitHub Pages

- The repository should be `paleoware.github.io` for a user site.
- `.github/workflows/deploy.yml` runs on pushes to `main` and can also be started manually.
- The workflow installs dependencies with `npm ci`, runs `npm run build`, uploads `out` and deploys it to GitHub Pages.
- Configure the repository Pages source as GitHub Actions.
- Configure public build variables under the repository Actions variables when EmailJS or Analytics is ready.
- A future custom domain is represented by `siteConfig.url` and must also be configured in GitHub Pages settings.

## Files To Edit Carefully

Safe day-to-day files:

- `src/messages/es.json`
- `src/messages/en.json`
- `src/config/site.ts`
- `src/app/globals.css`
- `src/components/*.tsx`
- `src/app/[locale]/page.tsx`

Generated or dependency files that should not be edited manually:

- `node_modules/`
- `.next/`
- `out/`
- `next-env.d.ts`
- `package-lock.json`

Change `next.config.ts` or `.github/workflows/deploy.yml` only when the hosting or build strategy changes.

## Documentation Style

The project owner is learning Next.js. Explain changes in Spanish after implementation. Explain meaningful JSX, TypeScript and CSS blocks, how data flows into components, and why a file needs to be a Client Component. Keep source comments short and useful; put longer teaching explanations in the conversation or README.

## Verification

Run these commands after code changes:

```bash
npm run lint
npm run build
```

The build must generate static routes for `/es/` and `/en/`. Check desktop, mobile, keyboard navigation, reduced motion and direct navigation to localized URLs before considering a visual change complete.
