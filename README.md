# Ibrahim Lawal Abba — Portfolio

A full-stack & frontend developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Motion** (`motion/react`).

## Design

Not another centered-everything gradient template. A distinctive, human-crafted system:

- **Dark-first** with a light toggle, persisted to `localStorage`, no flash on load.
- **One blue accent** on a near-black/“paper” palette — no gradients, no glassmorphism-on-everything.
- **Asymmetric layout**, hairline rules instead of border-on-everything, monospace labels, strong type hierarchy.
- **Self-hosted fonts** via `next/font` (Space Grotesk + JetBrains Mono) — no external font request.

## Motion

Reusable primitives in `app/components/motion/`, built on [Motion](https://motion.dev), all **`prefers-reduced-motion` aware** and wrapped in `MotionConfig reducedMotion="user"`:

- `PageTransition` — crossfade + rise between routes
- `Reveal` / `Stagger` / `StaggerItem` — scroll-into-view reveals
- `TextReveal` — masked, staggered word reveal for headings
- `Magnetic` — subtle magnetic pull on CTAs
- `ScrollProgress` — fixed top scroll bar
- spring micro-interactions on cards, filters, nav, buttons; `AnimatePresence` + `layout` animated project filtering

## Performance

- **Every image** goes through `next/image`: automatic **AVIF/WebP** (`formats` in `next.config.ts`), responsive `sizes`, `placeholder="blur"`, `loading="lazy"`, `priority` for the LCP hero, explicit `alt`, correct intrinsic sizes.
- Source-image recompressor: `npm run optimize:images` (`scripts/optimize-images.mjs`, sharp).
- `sharp` for production image optimization.
- **Self-hosted fonts**, no render-blocking third-party CSS.
- **No artificial loading screens / timers**, no heavy animation libs beyond Motion; unused deps removed.

## Project structure

```
app/
  layout.tsx              # shell: fonts, theme script, header, footer, motion provider
  page.tsx                # home
  globals.css             # design tokens + tailwind
  hero -> components/Hero.tsx
  components/
    Header.tsx  Footer.tsx  Hero.tsx  ScrollToTop.tsx
    motion/               # Reveal, Stagger, PageTransition, TextReveal, Magnetic, ScrollProgress, MotionProvider
  skills/page.tsx
  experience/page.tsx
  contact/page.tsx
  project/
    page.tsx  ProjectGrid.tsx
    data/ProjectData.tsx
    project-image/*
    [projectId]/page.tsx
  api/send-email/route.ts # nodemailer
scripts/optimize-images.mjs
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run optimize:images` — losslessly recompress source PNGs

## Contact form

`app/api/send-email/route.ts` uses nodemailer. Provide:

```
EMAIL_USER=...
EMAIL_PASS=...
```
