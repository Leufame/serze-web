# Serze — 墨と静寂 Portfolio

A minimalist Japanese-aesthetic portfolio site for **Serze** — designer & developer.

Built with **Nuxt 3 + Vue 3 + TypeScript + GSAP + Lenis + Three.js**.

## ✦ Design Language

- **Sumi-e aesthetic** (水墨画) — monochromatic black on warm paper
- **Japanese typography** — Shippori Mincho + Noto Sans JP
- **Kanji accents** — 墨, 静, 印, 壱, 弐, 参 as visual anchors
- **Custom ink cursor**, paper-grain noise, vertical writing, hanko-style seal
- **Zero "AI-slop"** — no inline styles, no copy-paste patterns, hand-crafted components

## ✦ Tech Stack

| Layer | Tool |
|---|---|
| Framework | Nuxt 3 (Vue 3 + TypeScript) |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| 3D | Three.js (raw, vanilla) + custom GLSL shaders |
| i18n | @nuxtjs/i18n v8 (ja / en / id) |
| Styling | SCSS (variables + mixins + modules) |
| Deploy | Vercel-ready (Nitro preset) |

## ✦ Project Structure

```
serze-web/
├── nuxt.config.ts              # Nuxt + i18n + Vite config
├── app.vue                     # Root layout
├── pages/
│   └── index.vue               # Single page (Hero/About/Services/Contact)
├── components/
│   ├── ui/                     # CustomCursor, LanguageSwitcher, NoiseOverlay
│   ├── layout/                 # SiteHeader, SiteFooter
│   ├── sections/               # HeroSection, AboutSection, ServicesSection, ContactSection
│   └── three/                  # HeroScene.client.vue + custom GLSL shaders
├── composables/
│   ├── useLenis.ts             # Lenis instance + scrollTo
│   ├── useGsap.ts              # GSAP/ScrollTrigger accessors
│   └── useReveal.ts            # ScrollTrigger reveal helpers
├── plugins/
│   └── lenis.client.ts         # Lenis + GSAP/ScrollTrigger sync
├── locales/
│   ├── ja.json                 # 日本語 (default)
│   ├── en.json                 # English
│   └── id.json                 # Bahasa Indonesia
├── assets/
│   ├── styles/
│   │   ├── abstracts/          # _variables, _mixins, _functions
│   │   ├── base/               # _reset, _typography, _global
│   │   └── main.scss
│   └── fonts/                  # (self-hosted JP fonts, if needed)
├── public/
│   ├── favicon.svg
│   └── textures/
│       └── paper-grain.svg
└── content/                    # (Nuxt Content, optional)
```

## ✦ Animation Inventory

| Event | Library | Detail |
|---|---|---|
| Initial load | GSAP | Logo stamp + char-by-char title reveal + kanji scale-in |
| Smooth scroll | Lenis | `duration: 1.2`, lerp easing, GSAP tick synced |
| Section reveal | GSAP ScrollTrigger | Stagger 0.1, fade+slide 20–40px, `start: top 85%` |
| Service hover | CSS + GSAP | List row expands, kanji color shift, arrow slides |
| Page transition | Vue `<Transition>` | "ink" mode — fade+slide 20px, 0.9s |
| Custom cursor | JS + GSAP | Dot 6px, ring 32px → 60px on `[data-cursor-hover]`, lerp 0.18 |
| 3D mouse parallax | Three.js | Mountain rotation Y, camera X/Y lerped 0.06 |
| 3D particles | Three.js | 320 ink dots, drift downward, respawn from top |
| Language switch | Vue i18n | Locale JSON reload, head meta updates |

## ✦ i18n

Default: **日本語 (Japanese)**. Toggle via top-right pill switcher.

- **ja** (default, no URL prefix)
- **en** at `/en/`
- **id** at `/id/`

Auto-detection: cookie-based, fallback to `ja`. Persists in `serze_lang` cookie.

All static strings live in `locales/{lang}.json`. Long-form content (bio paragraphs) is structured as arrays.

## ✦ Getting Started

```bash
# Install
npm install

# Dev
npm run dev          # http://localhost:3000

# Build
npm run build        # .output/

# Preview production
npm run preview
```

## ✦ Design Tokens (cheat-sheet)

### Colors (Sumi-e)

| Token | Hex | Use |
|---|---|---|
| `$color-sumi-ink` | `#0a0a0a` | Primary text, mountain |
| `$color-paper` | `#f5f3ee` | Background (和紙) |
| `$color-paper-warm` | `#ebe7df` | Aged paper, portrait frame |
| `$color-grey-500` | `#8a8780` | Subtle labels, dividers |
| `$color-seal-red` | `#8b1a1a` | Hanko seal, accent (sparingly) |

### Motion

| Token | Value |
|---|---|
| `$ease-ink` | `cubic-bezier(0.7, 0, 0.3, 1)` |
| `$ease-brush` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| `$ease-stamp` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `$dur-quick` | `0.3s` |
| `$dur-base` | `0.6s` |
| `$dur-slow` | `0.9s` |
| `$dur-cinematic` | `1.2s` |

## ✦ A11y

- `prefers-reduced-motion` → Lenis/GSAP/3D parallax disabled
- Custom cursor only on `hover: hover + pointer: fine`
- Skip-to-content link
- All sections have `aria-labelledby`
- Custom 3D scene is `aria-hidden`
- `prefers-reduced-motion` reduces particle drift

## ✦ Performance Budget

- LCP target: < 2.0s
- JS gzipped: < 200kb (Nuxt + GSAP + Lenis + Three)
- 3D scene: pauses on `prefers-reduced-motion`
- Fonts: preconnect + display=swap

## ✦ Deploy

Vercel (recommended):

```bash
# Vercel picks up Nuxt automatically
vercel deploy --prod
```

Or any Node host:

```bash
npm run build
node .output/server/index.mjs
```

## ✦ License

Code: MIT for the client (Serze). Content/copy: All rights reserved.
