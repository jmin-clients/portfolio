# DESIGN.md — jmin.work

## Stack Conventions
- **Framework:** Next.js 16, App Router, TypeScript
- **Styling:** Tailwind v4 + shadcn/ui components (owned)
- **Animation:** `motion/react` (import from here, never `framer-motion`)
- **Icons:** `@phosphor-icons/react` — no hand-rolled SVG paths, no Lucide by default

---

## Aesthetic
Swiss/International Typographic Style on a dark-only base. Grid-driven, typography-first,
restrained color, high contrast. One font family used at different weights and scales.

---

## Typography — Archivo (Google Fonts)
Loaded via `next/font/google`, weights 400–900. All CSS font variables (`--font-sans`,
`--font-mono`, `--font-display`, `--font-accent`) resolve to Archivo.

Three registers, same face:
| Register | Weight | Tracking | Case | Use |
|---|---|---|---|---|
| Display | 900 (black) | -0.025em | Sentence or ALL CAPS | Hero H1, section statements |
| Label | 500 (medium) | 0.12em–0.18em | UPPERCASE | Eyebrows, metadata, numbered markers |
| Body | 400 (regular) | 0 | Sentence | Paragraphs, FAQ answers, form labels |

Headline sizes jump in clear steps:
- Hero: `clamp(3rem, 5vw, 5.5rem)` — `font-black`
- Statement: `clamp(3rem, 10vw, 9rem)` — `font-black`
- Section H2: `clamp(1.75rem, 3.5vw, 2.75rem)` — `font-bold`
- Card title: `1.125rem` — `font-semibold`

No in-between sizes. No decorative serifs. No Fraunces, no Instrument_Serif.

---

## Color
Dark-only. No section theme inversions.

| Token | Value | Role |
|---|---|---|
| Surface | `#0A0A0A` | Page base (near-black, not pure) |
| Text | `#F5F5F0` | Primary foreground (off-white) |
| Dim | `#8A8A85` | Secondary text, labels, disabled |
| Hairline | `rgba(245,245,240,0.08)` | Dividers, card borders |
| **Brand** | `#E8C547` | Accent — CTAs, numbered markers, active states |

### Accent Rules (critical)
`#E8C547` (warm amber) is punctuation, not wallpaper. Use only on:
- Primary CTA button fill (`bg-[#E8C547] text-[#0A0A0A]`)
- Numbered row markers (`01 /`, `02 /`)
- Selected state in form option buttons (border + text)
- Active nav indicator (if added)

Never on: section backgrounds, large fills, gradient text, decorative borders on text links,
hover states for plain links. One accent usage per section max.

---

## Shape System
All-sharp. `rounded-none` is the default. Maximum `rounded-sm` (2px) on interactive elements.
No pill buttons. No large rounded cards. Sharp everywhere.

One rule, applied consistently.

---

## Grid
- 12-column, `max-w-7xl mx-auto px-6` as the standard container
- Section padding: `py-24` standard; `py-32` for statement sections
- Hero: `pt-24 pb-16` inner grid padding (leaves room for fixed nav)

---

## Numbered Rows (Swiss grid pattern)
Used for: Work Showcase, WhySection (stats), FAQ.
```
01 / Label       Content description here         →
────────────────────────────────────────────────────  ← hairline
02 / Label       Content description here         →
```
Numbers in `text-[#E8C547]`. Labels in dim/muted. Hairlines at `border-white/[0.08]`.

---

## Signature Graphic Element: ChromaticBlob
Reusable component. White/light blurred shape with red+cyan chromatic fringing.
Three layered divs, radial-gradient fills, heavy `blur()` filters, slight X offsets.
Used ONLY in the hero section as a background accent. Do not repeat.

---

## Glass Elements
Used sparingly on small UI chrome only:
- Navbar background on scroll
- Intake form card
- (Future) scroll-to-top button

Pattern: `bg-white/[0.04] border border-white/[0.08] backdrop-blur-md`

Not on large surfaces, not on cards, not on section backgrounds.

---

## Eyebrow Restraint
Max 1 eyebrow per 3 sections. This site has 8 sections: max 3 eyebrows total.
Assigned: Hero (1), WorkShowcase (2), WhySection (3). All others: headline-only.
Eyebrow pattern: `text-[0.65rem] uppercase tracking-[0.18em] text-[#f5f5f0]/30`

---

## Motion
### Scroll-linked (useScroll + useTransform): hero text, work items, why/stats rows
- Hero text Y: `useTransform(scrollY, [0, 600], [0, -60])` — gentle parallax
- Work/stats: staggered `whileInView` entry with `y: 24 → 0`, `once: true`

### UI state (AnimatePresence): intake form steps, FAQ accordion
- Form step transition: x slide, `duration: 0.22`, ease `[0.16, 1, 0.3, 1]`
- FAQ open/close: height + opacity, `duration: 0.28`

### Rules
- Always `useReducedMotion()` — degrade to static under `prefers-reduced-motion`
- `useMotionValue`/`useTransform` for continuous values, never `useState`
- No `window.addEventListener('scroll')` — use Motion's `useScroll()`
- Client components only for motion (`'use client'` at top)

---

## Section Order and IDs
| # | Section | ID | Nav Link |
|---|---|---|---|
| 1 | Hero + Intake Form | `#intake` | CTA ("Start a project") |
| 2 | Statement | `#statement` | none |
| 3 | Work Showcase | `#work` | "Work" |
| 4 | Testimonials | `#testimonials` | none |
| 5 | Logo Marquee | `#logos` | none |
| 6 | Why Work With Me | `#stats` | "About" |
| 7 | FAQ | `#faq` | "FAQ" |
| 8 | Footer | — | — |

---

## Z-Index Scale
| Layer | z-index |
|---|---|
| Grain overlay | 9000 |
| Sticky nav | 50 |
| Default content | auto |

---

## No-Go List (pre-flight checklist)
- [ ] Zero em-dashes (`—`) anywhere — not in headlines, copy, captions, attribution, or buttons
- [ ] One theme (dark) — no section inversions to light
- [ ] `#E8C547` accent used identically across all sections
- [ ] `rounded-none` or `rounded-sm` only — no pill buttons, no round cards
- [ ] `min-h-[100dvh]` on hero — never `h-screen`
- [ ] Hero: max 4 text elements in left column; headline max 2 lines
- [ ] Eyebrow count: max 3 across all 8 sections
- [ ] No eyebrow on FAQ, Testimonials, Statement, LogoMarquee, Footer
- [ ] Button contrast: `#0A0A0A` on `#E8C547` — passes WCAG AA easily
- [ ] CTA label consistency: "Start a project" everywhere (nav, hero form, FAQ), one intent
- [ ] Motion: all animated components have `useReducedMotion()` fallback
