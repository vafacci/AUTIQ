# Architecture notes

## Principles

- Server Components by default; Client Components only for interaction / browser APIs.
- Keep sections small; isolate animation logic from business UI.
- Centralise mutable marketing/business content in `data/`.
- Prefer performance over spectacle: transform/opacity, clean up GSAP, mobile-first degrade.

## Paths

| Path | Role |
| --- | --- |
| `app/` | Routes, root layout, metadata foundation |
| `components/ui/` | Primitives (buttons, links, status labels) |
| `components/sections/` | One folder/file family per page section |
| `components/animations/` | Signature / complex motion modules |
| `components/providers/` | Client wrappers (`MotionProvider`) |
| `data/` | `site`, pricing, workflow states, integrations, FAQs |
| `lib/motion/` | Reduced-motion helpers for GSAP/Motion |
| `styles/tokens.css` | Color / type tokens wired into Tailwind `@theme` |

## Styling

Tailwind CSS 4 via `@import "tailwindcss"` and `@theme inline` in `styles/tokens.css`.

Utility examples: `bg-background`, `text-text-primary`, `text-signal`, `border-border`, `font-sans`, `font-mono`, `font-status`, `btn-primary`, `btn-secondary`.

**Color discipline:** site stays black/charcoal/white/grey. `--atom-signal` (`#C4510C`) is for small technical indicators only — not section fills, not primary CTAs.

## Fonts

`geist/font/sans` + `geist/font/mono` — CSS variables on `<html>`, mapped to Tailwind `--font-sans` / `--font-mono`.

## Motion stack

| Tool | When |
| --- | --- |
| CSS | Simple hover, focus, enter states |
| Motion (`motion/react`) | React state, layout, micro-interactions |
| GSAP + ScrollTrigger | Pinned / scrubbed / multi-step timelines |

`MotionProvider` sets `reducedMotion="user"`. Global CSS also short-circuits CSS animations when reduced motion is preferred. GSAP scenes must use `lib/motion/preferences` / `gsap.matchMedia`.

## SEO / analytics (later)

Root `metadata` + `viewport` are stubbed. Sitemap, robots, OG images, analytics, and conversion tracking intentionally deferred.

## CodePen policy

Never paste Pens blindly. Inspect concept → dependencies → recreate/adapt into React/Next → design-system fit → responsive + cleanup + attribution if substantial reuse. The site must remain one product, not a collage.

## Section build order

Sections are added deliberately with the stakeholder. Do not invent a full landing page in one pass.
