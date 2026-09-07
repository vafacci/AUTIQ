# ATOM — Website Foundation

Official website for **ATOM**: custom automation systems for creators, brands, and content teams.

Primary product: **Content Autopilot**.

---

## Product (short)

Content Autopilot automates the repetitive work between finishing content and publishing it — detection, preparation, approval, scheduling handoff, status — while the creator keeps control at the approval checkpoint.

Customers buy a working automation system around their workflow. They do not buy n8n, Buffer, OpenAI, or “an AI agency.”

Positioning direction: *automate the repetitive work without giving up control.*

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Fonts | Geist Sans + Geist Mono (`geist`) |
| Micro-interaction | Motion for React (`motion`) |
| Complex scroll / timeline | GSAP + ScrollTrigger + `@gsap/react` |
| Icons | Lucide React |

Package manager: **npm**

Not installed (by design): Three.js, shadcn, large component libraries.

---

## Animation rules

1. **CSS** — simple transitions and state styles  
2. **Motion** — React-driven layout / micro-interactions  
3. **GSAP + ScrollTrigger** — pinned, scrubbed, or complex timelines only  

Always respect `prefers-reduced-motion` (global CSS + `MotionConfig` + GSAP matchMedia helpers in `lib/motion`).

---

## Project structure

```
app/                  App Router (layouts, pages, route-level CSS)
components/
  ui/                 Small reusable primitives
  sections/           Page sections (built one at a time)
  animations/         Isolated animation modules
  providers/          Client providers (e.g. Motion)
data/                 Pricing, workflow states, integrations, FAQs, site config
lib/                  Utilities (cn, motion preferences)
styles/               Design tokens
public/               Static assets
docs/                 Product & architecture notes
```

Business content that may change (pricing, FAQs, states) lives in `data/` — not hardcoded across components.

---

## Design system (foundation)

**Surfaces:** `#070809` / `#0D0F12` / `#13161A`  
**Border:** `#24282E`  
**Text:** `#F4F5F6` / `#8B9098`  
**Signal accent:** `#C4510C` (hover `#DF5A08`, soft `#241006`) — system signal only  
**CTAs:** primary = white / black text; secondary = transparent + neutral border / white text — never orange  
**Public product name:** Content Autopilot (do not treat internal project codenames as brand)

Orange is energy in a technical system (status dots, active paths, PROCESSING labels) — never large fills, cards, or primary buttons.

Visual direction: high-end tech, dark, precise, controlled. Overwhelmingly black / charcoal / white / grey.

---

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

---

## Current status

**Foundation only.** The homepage is a temporary development screen to verify tokens, fonts, and data wiring.

Do **not** treat `app/page.tsx` as the marketing site. Sections will be designed and built deliberately, one at a time.

See `docs/PRODUCT.md` and `docs/ARCHITECTURE.md` for fuller context.
