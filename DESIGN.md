# jmin.work — Design Direction v2

## Design Read
Personal networking/cybersecurity blog and notebook (readers are technically
curious people, not prospective clients), with an editorial/magazine dramatic
language, leaning toward maximalist-with-restraint typography-driven design:
Tailwind + Motion + a custom animated mesh-gradient background. Dials:
`DESIGN_VARIANCE: 8` / `MOTION_INTENSITY: 7` / `VISUAL_DENSITY: 3`.

Pivoted from an earlier "hire me for web design" freelance portfolio to a
personal IT/networking/cybersecurity blog. The visual system below (type,
color, motion, shape) is unchanged from that version, only the content and
section lineup changed. The client-intake funnel (`IntakeSection.tsx`,
Tally-style stepper POSTing to `/api/intake`) is retired from the page for
that reason, not because the route broke, see Forms below.

## Reference
Monolog studio (monolog.au) — editorial, magazine-scale, dramatic.

## Core Aesthetic
Dark editorial. Type at viewport scale. Cinematic grain. Not minimalist, but
maximalist with restraint. Every section feels like a spread in a high-end
design magazine.

---

## Stack Conventions
- **Framework:** Next.js 16, App Router, TypeScript
- **Styling:** Tailwind v4 + shadcn/ui components (owned, in `components/ui`)
- **Animation:** `motion/react` (import from here, never `framer-motion`)
- **Icons:** `@phosphor-icons/react` — no hand-rolled SVG paths, no Lucide by default

---

## Background & Texture
- Base: deep charcoal gradient, `#0D0D0D` to `#1A1A1A`, not flat black
- Hero background: `components/ui/AnimatedBackground.tsx` — mesh-gradient blobs
  ported from the sibling `original-plan` project, recolored to charcoal/off-white
  (one blob tinted with the neon accent). Same cursor-proximity drift logic,
  new palette, plus two treatments the original didn't have:
  - **Goo/liquid merge** — an SVG filter (`feGaussianBlur` + `feColorMatrix`
    alpha-contrast boost, applied via `filter: url(#id)` from a `useId()`-scoped
    `<filter>`) wraps the blob layer so overlapping blobs fuse into one liquid
    membrane instead of just softly overlapping, cells splitting/merging as
    they drift. Keyframes include a scale "breathe" (1 to ~1.2) alongside the
    position drift, eased with a custom `cubic-bezier(0.45, 0.05, 0.55, 0.95)`
    for a fluid, non-linear feel.
  - **8-bit dither** — `lib/dither.ts` renders a standard Bayer 8x8 ordered-dither
    matrix to a tiny canvas, tiled via CSS with `image-rendering: pixelated` so
    each matrix cell reads as a crisp block. Sits over the blobs at moderate
    opacity/contrast (`overlay` blend, `contrast(1.25)`), exaggerated enough to
    read as a deliberate tech texture, not so strong it fights the content.
    Shared by `DitheredPhoto` for a consistent 8-bit language across the site.
- Persistent film grain overlay (`GrainOverlay`) at 8-12% opacity site-wide — a
  defining texture, not a subtle hint. Fixed, `pointer-events-none`, `z-[9000]`.

---

## Typography
One face, all registers: **Aspekta** (github.com/ivodolenc/aspekta, SIL OFL 1.1,
self-hosted via `next/font/local` from `app/fonts/aspekta`), a modern grotesque
sans. Weights 400/500/600/700/900 cover display, body, and label roles,
hierarchy comes from weight and size, not from mixing families.
`--font-display`, `--font-sans`, `--font-mono`, `--font-accent` all resolve to
`--font-aspekta`. System fallback: `"Helvetica Neue", Arial, sans-serif`.

- Scale is the point where it earns it. Mix of centered and left-aligned per
  section.
- No Fraunces, no Instrument_Serif. No serif anywhere in this system.

### Special-purpose display accents (not general registers)
Two additional self-hosted Fontshare faces, deliberately scoped, not part of
the display/body/label system above:
- **Tanker** (`--font-tanker`, `app/fonts/tanker`) — condensed slab, caps-only
  (lowercase input still renders as capital letterforms, the font has no
  separate lowercase design). This is the site's **numeral/stat/wordmark**
  register: anywhere a big standalone number, a short punchy stat word, a
  numbered marker, or the "JMIN"/"Jonathan Min" wordmark appears, it's Tanker,
  never mixed with `font-bold`/`font-black` (the face is already heavy;
  stacking a bold weight class on a single-weight font family just invites
  synthetic-bold artifacts). Currently used: hero ghost text, hero/footer
  "JMIN" wordmark, footer's bleeding "Jonathan Min", Statement's "48HR" stat,
  WhySection's six stat cells, Services/WorkShowcase numbered markers,
  Testimonials' counter. Deliberately **not** used for headings, body copy,
  or anything that needs to read as a sentence, Aspekta stays the voice for
  prose. The hero marquee's `*` separators are a Phosphor `Asterisk` icon
  (`weight="fill"`), not a text glyph, text asterisks sit high/off-baseline in
  most fonts and don't vertically center against surrounding words the way a
  flex-centered icon does.
- **Comico** (`--font-comico`, `app/fonts/comico`) — rounded/hand-drawn display
  face, "Jonathan Min" (the full name, one face, not split across two fonts)
  within the hero headline only, colored `#39FF8A` (the brand accent), the only
  place accent color is used on text rather than a UI control, a deliberate
  exception.

### Sizes
- Hero headline: `clamp(1.75rem, 4vw, 3.5rem)`, mixed weight within one sentence
  (dim/400 for the personal opener, medium/500 for the rest)
- Section statement: `clamp(2.5rem, 8vw, 8rem)` — weight 500 (medium, not bold or black)
- Section H2: `clamp(1.75rem, 3.5vw, 3rem)` — weight 500
- Body: `1rem`-`1.125rem`, weight 400, `max-w-[65ch]`
- Eyebrow/counter/label: `0.7rem`, weight 500, `tracking-[0.16em]`, uppercase

---

## Color
Dark is the designed default, with a secondary light theme available via a
global toggle (`next-themes`, `components/ThemeToggle.tsx`) in the nav.
Section Theme Lock still applies: no *per-section* theme inversions, the
toggle flips the whole page at once, never an individual section.

| Token | Value | Role |
|---|---|---|
| Surface start | `#0D0D0D` | Page base, top of gradient |
| Surface end | `#1A1A1A` | Page base, bottom of gradient |
| Foreground | `#F0EEE9` | Primary text, warm off-white |
| Dim | `rgba(240,238,233,0.45)` | Secondary text, labels |
| Ghost | `rgba(240,238,233,0.08)`-`rgba(240,238,233,0.15)` | Decorative background type |
| Hairline | `rgba(255,255,255,0.10)` | Dividers only |
| **Brand accent** | `#39FF8A` | CTAs, active states, one or two highlights |

### Accent Rules (critical)
`#39FF8A` (neon green) is punctuation, not wallpaper. One accent color,
used only for interactive states and highlights:
- Primary CTA button fill (`bg-[#39FF8A] text-[#0D0D0D]`), see the button
  pattern below
- Numbered markers (`01 /`, `02 /`), active list-item state
- Focus/selected states in form option buttons
- The single warm-accent blob in `AnimatedBackground` (kept faint)

Never on: section backgrounds, large fills, gradient text, decorative borders
on plain text links. One accent usage family per section max.

---

## Ghost Type
Repeating or oversized text at 8-15% opacity used as a decorative background
layer (e.g. behind the services list, behind the statement section). Drifts
horizontally on scroll, opposing directions between layers. Never carries the
only copy of information the user needs, it's atmosphere.

---

## Signature Treatments
- **Ghost/fading list** — services stacked vertically, opacity fading from
  100% at top to 8% at bottom; active item full opacity with description.
- **Ghost text, weighted scroll slide** — a static (not auto-scrolling) line
  at `~10vw` in Tanker, `white/[0.045]` opacity: "Web Design ✳ Cybersecurity
  ✳ AI Powered Workflow". `useTransform(scrollYProgress, [0, 0.3], [0, -220])`
  feeds into `useSpring(raw, { mass: 3, stiffness: 50, damping: 20 })` before
  hitting `x`, so it lags behind scroll input, keeps drifting briefly after
  you stop, and settles with a soft one-time overshoot rather than tracking
  the scrollbar 1:1 or snapping. High mass + low stiffness is what reads as
  "heavy." Sits low in the hero (`bottom-[6%]`, below the headline) so it
  never collides with foreground text.
- **Dithered photo** — `components/ui/DitheredPhoto.tsx`: grayscale + contrast
  photo with the same Bayer 8x8 dither overlay as `AnimatedBackground` (via
  `lib/dither.ts`), not a separate halftone-dot technique. Sharp corners,
  hairline border, no rounding.
- **Justified headline block** — the hero headline uses `text-align: justify`
  plus `text-align-last: justify` so every line (including the last) stretches
  edge to edge within its centered container, an editorial "print block" look
  (short last lines get a large word-gap, that's the intended aesthetic, not
  a bug). All caps via `uppercase` (transform, not literal caps in copy, for
  screen-reader friendliness). Mixed treatment within the one sentence: dim
  opener ("I'm "), the name in Comico as a signature accent, medium/500 Aspekta
  for the rest. Reserve this justified-block treatment for the hero only
  (this is distinct from the Tanker numeral/stat register above, both are
  scoped accents but for different jobs).
- **Corner colophon** — small mono-weight functional labels pinned to the
  hero's bottom-left/bottom-right corners (availability status, contact email),
  aligned to the same grid margins as everything else. Print-poster colophon
  convention, kept functional (real status/contact), not decorative atmosphere.
- **CTA button, icon chip** — `components/ui/CTAButton.tsx`: solid accent
  fill, sharp corners, the arrow icon boxed in its own inset dark square chip
  (`bg-[#0D0D0D] text-[#39FF8A]`) rather than a bare inline glyph. One shared
  component, used in nav and hero (and anywhere else a CTA appears).
- **Viewport-filling display text** — `clamp(80px, 15vw, 200px)`, full width,
  reserved for the Statement section only (not the hero).
- **Editorial quote blocks** — pull quotes at `clamp(32px, 5vw, 72px)`, full
  viewport width, small stat in the left column.
- **Avatar attribution** — circular avatar + name + title for testimonials.

---

## Shape System
All-sharp. `rounded-none` default, `rounded-sm` (2px) max on interactive
elements. No pill buttons, no large rounded cards.

---

## Glass
Used only on the nav background once scrolled:
`bg-[#0d0d0d]/80 border-b border-white/10 backdrop-blur-md`

Not on large surfaces, not on cards, not on section backgrounds, not on the
CTA button (the CTA uses the solid accent icon-chip pattern, see Signature
Treatments).

## Navigation Typography
Nav links are **not** in the eyebrow/mono register. Sentence case, semibold
(600), no letter-spacing: `font-semibold text-[0.95rem] text-[#F0EEE9]/80`.
This is a deliberate exception to the eyebrow/label pattern used elsewhere.

---

## Layout
- 12-column grid, generous margins (min 5vw each side)
- Container: `max-w-7xl mx-auto px-6 md:px-10`
- Mix of full-bleed and contained sections
- Hairline dividers between sections (1px, `white/10`)
- Section padding: `py-24` standard, `py-32`-`py-40` for statement/hero

---

## Motion
- **Scroll-linked parallax** on the hero animated background — moves slower
  than scroll (`useTransform` with a small output range).
- **Ghost text layers** drift horizontally on scroll, opposing directions.
- **Liquid blobs** — goo-filter merge (see Background & Texture) plus a scale
  "breathe" baked into the CSS keyframes, eased with
  `cubic-bezier(0.45, 0.05, 0.55, 0.95)` instead of linear/ease, for a fluid,
  organic feel rather than mechanical looping.
- `useScroll` + `useTransform` — tied to scroll progress, reversible. Applied
  to: hero, services/ghost-type section, stats/quote section only.
- Simple reveals elsewhere: `whileInView` with `viewport={{ once: true }}`.
- Subtle. Editorial gravity, not bounce. No spring overshoot.
- Always `useReducedMotion()` — degrade to static under `prefers-reduced-motion`.
- `useMotionValue`/`useTransform` for continuous values, never `useState`.
- No `window.addEventListener('scroll')` — use Motion's `useScroll()`.
- Motion isolated in client-leaf components (`'use client'` at top).

---

## Eyebrow Restraint
Max 1 eyebrow per 3 sections. This site has 8 sections: max 3 eyebrows total.
Hero has no eyebrow (the headline opens with "I'm Jonathan" and identifies him
directly, an eyebrow would be redundant). Assigned: Focus Areas, Topics,
About. All others, including Hero, Statement, FAQ, Footer: headline-only,
no eyebrow. Featured Posts carries a small "Latest writing" label, not
counted against the eyebrow budget since it functions as a list header, not
a section-identity eyebrow.

---

## Section Order and IDs
| # | Section | ID | Nav Link |
|---|---|---|---|
| 1 | Hero | `#top` | logo/home |
| 2 | Featured Posts (latest 3, real MDX content) | `#work` | none (CTA: "Read the blog" -> `/blog`) |
| 3 | Focus Areas / What I Write About | `#focus` | none |
| 4 | Quote / Statement | `#statement` | none |
| 5 | Topics grid | `#topics` | "Topics" |
| 6 | About / Why I Write This | `#about` | "About" |
| 7 | FAQ | `#faq` | none |
| 8 | Footer | — | — |

Nav center links: Blog (`/blog`, the full post index), Topics (`#topics`),
About (`#about`).

### Blog
Real content, not placeholder. Posts live as MDX files with frontmatter in
`content/posts/*.mdx`, read via `lib/posts.ts` (`getAllPosts`,
`getPostBySlug`), and rendered server-side with `next-mdx-remote/rsc`. Prose
styling is hand-rolled to match the existing type/color tokens
(`components/mdx-components.tsx`), no `@tailwindcss/typography` plugin.
`/blog` is the full index, `/blog/[slug]` is a post. `FeaturedPosts.tsx`
(home, `#work`) and the `/blog` index both render posts through the shared
`PostList.tsx` client component, so there's one data source and one list
treatment, not a separate hardcoded "work" dataset.

### Retired: client-funnel sections
The earlier freelance-portfolio version had a client intake form, a client
work showcase, client logos, and client testimonials, all built around a
fictional small-business cast (Ridgeline Coffee Co., Marrow & Oak, Hazel
Grove Dental, etc.) for narrative consistency. None of that fits a personal
blog: `Services.tsx`, `WorkShowcase.tsx`, `ClientLogos.tsx`, and
`WhySection.tsx` were rewritten in place as `FocusAreas.tsx`,
`FeaturedPosts.tsx` (now reads real posts, not a fictional client list),
`TopicsGrid.tsx`, and `About.tsx` respectively, same visual treatment, new
content. `Testimonials.tsx` was deleted outright rather than repurposed,
fabricating quotes from named "readers" of a blog that doesn't have them
yet is a different, worse kind of misleading than illustrative placeholder
client copy was.

`IntakeSection.tsx` is not deleted, just no longer imported in
`app/page.tsx`. It still POSTs to the protected `/api/intake` route (Google
Sheets + Gmail pipeline), payload shape unchanged:
`{ businessName, projectType, situation, timeline, budget, goals }`. Kept
parked rather than removed in case occasional client work comes back. Do not
rename, move, or rewrite the route itself, `next.config.ts`, or the
`googleapis`/`nodemailer` dependencies, that constraint applies whether or
not the form is currently on the page.

---

## Z-Index Scale
| Layer | z-index |
|---|---|
| Grain overlay | 9000 |
| Scroll-to-top button | 100 |
| Sticky nav | 50 |
| Default content | auto |

---

## No-Go List (pre-flight checklist)
- [ ] Zero em-dashes (`—`) anywhere, not in headlines, copy, captions, attribution, or buttons
- [ ] Dark remains the default theme; light is a secondary global toggle, no per-section inversions
- [ ] `#39FF8A` accent used identically across all sections
- [ ] `rounded-none` or `rounded-sm` only, no pill buttons, no round cards
- [ ] `min-h-[100dvh]` on hero, never `h-screen`
- [ ] Hero: photo, justified headline, one CTA, corner colophon, no separate
      subtext paragraph, no eyebrow
- [ ] Eyebrow count: max 3 across all 8 sections
- [ ] No eyebrow on Hero, Statement, FAQ, Footer
- [ ] Button contrast: `#0D0D0D` on `#39FF8A` passes WCAG AA easily
- [ ] CTA label consistency: "Read the blog" everywhere (nav, hero, footer), one intent, icon-chip pattern
- [ ] No two consecutive sections share a layout family (zigzag cap)
- [ ] Motion: every animated component has a `useReducedMotion()` fallback
- [ ] API route at `/api/intake` untouched; env vars untouched; next.config.ts untouched
      (even though `IntakeSection.tsx` is currently unused on the page)
