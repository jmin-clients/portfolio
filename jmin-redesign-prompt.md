# jmin.work Redesign — Design System Brief

## Goal
Rebuild my portfolio (jmin.work) using the attached reference screenshots as the visual/structural direction. This is NOT a brutalist build — it's restrained, grain-textured, editorial, confident. Match the *system* (typography scale, spacing, texture, motion language), not the literal copy, logo, or brand name from the reference. The reference site is another studio's live site — use it for layout/interaction patterns only. Swap in my real content, my name, my projects, my process.

## Design System

**Color**
- Base: near-black background (~#0a0a0a), not pure black
- Primary text: warm off-white (~#f0efe9)
- Secondary/display text: mid-grey (~#8a8a85) for oversized background-layer typography
- One light/cream section (~#e8e6df) used as a contrast break for a project case-study card — don't make the whole site dark
- No bright accent color — restraint is the point. If anything, one muted accent used sparingly (a single status dot, a single underline)

**Texture**
- A persistent fine halftone/film-grain overlay across the entire site (SVG feTurbulence or a tiled noise PNG, low opacity ~4-8%, mix-blend-mode: overlay), visible even on the nav bar and footer
- Hero background: a soft, blurred, dark atmospheric gradient blob behind the grain — not a hard graphic, more like an out-of-focus photo

**Typography**
- Two-font system, both Google Fonts: **Space Mono** (primary — headlines, body, meta labels) and **Bitcount Single** (accent — variable dot-matrix/pixel display face, used sparingly as a signature mark, never as a primary reading face)
- Space Mono carries: oversized display headlines (all-caps, tight-tracked, bleeding off the viewport edge for section-break weight), body copy, and monospace meta/label text — index counters, step labels, timestamps, small-caps section eyebrows (e.g. "01/02", "STEP • 01")
- Bitcount Single is variable (weight 100–900, plus slant/grade axes) — use a heavier weight instance so it reads clearly as an accent against Space Mono rather than a rendering glitch

**Font-pairing system (two distinct treatments)**

1. *Letter-level pairing — headers, all caps only.* One word set almost entirely in Space Mono, with exactly 1 (max 2) letters in that same word swapped to Bitcount Single. This replaces what a custom logomark glyph does in the reference site — the "signature letter" moment, same idea as the swirl treatment on the O in MONOLOG. Pick the swapped letter intentionally: round letters (O, Q, G) or the first/last letter of a short word read best. Reserve for short, high-impact headers only — nav wordmark, section dividers, 1–2 word stat callouts. Don't apply to every heading or it stops meaning anything.

2. *Phrase-level pairing — taglines, hero sub-copy, pull quotes, mixed case.* Instead of swapping individual letters, swap whole phrases or clauses. One phrase in Space Mono, the next in Bitcount Single, alternating across a short multi-line statement. Keep this to short editorial lines (hero subhead, pull quotes, section intros) — not dense paragraphs, since Bitcount Single gets harder to read at body-copy length. Use normal sentence case here, not all-caps — the rhythm comes from the font swap, not from shouting.

**Implementation note for Claude Code**
- Space Mono is long-established on `next/font/google` and safe to import directly. Bitcount Single is a newer Google Fonts addition (variable, with sibling families like Bitcount Grid Single / Bitcount Prop Single) — check whether the installed `next/font/google` version has it indexed. If not, fall back to a `<link>` import from fonts.googleapis.com or self-host via Fontsource (`@fontsource-variable/bitcount-single`) rather than blocking on next/font.
- Build a small reusable `<MixedText>` component that takes a string plus an array of swap targets (letter indices or phrase indices) and an accent font class, so this pairing system doesn't get hand-coded with one-off spans every time it's used.

**Layout/Motion**
- Generous vertical whitespace between sections, separated by hairline dividers at low opacity
- Large blocks of body copy get a scroll-triggered fade-in, with the tail end of long quotes fading to transparent
- Subtle, not flashy — no aggressive parallax, just clean reveal-on-scroll

## Page Sections (adapt to my content — pull real details from CLAUDE.md / project context, don't invent fake stats)

1. **Nav** — wordmark left, links center (About / Work / Skills / Process), sound toggle optional (skip if not relevant), solid pill CTA button right ("Start a project" → adapt to my framing)
2. **Hero** — short two-line positioning statement + supporting line, oversized name/wordmark bleeding off the bottom of the viewport in grey display type, grain + blurred dark gradient background
3. **Stat + quote carousel** — left side: arrow nav, slide counter, a single big stat with caption (e.g. years building, sites shipped, client count — real numbers only). Right side: a 3-4 line personal statement/philosophy on why I build the way I do, fading at the tail
4. **Logo/brand row** — "Stack & tools I build with" or "Platforms I work across" instead of client logos, small caps labels under each mark
5. **Big statement break** — one oversized condensed headline (3-5 words) with a small embedded photo/screenshot inline within the text
6. **Featured project card** — light/cream contrast section, real project screenshot (Original Plan, this portfolio, etc.), index label, short description, one real outcome metric
7. **Process section** — "How I work," 3 numbered steps with description + supporting photo/screenshot per step, in the step-label / heading / paragraph / image-right format shown
8. **FAQ accordion** — client-facing questions (process, timeline, communication, what's needed to start, pricing range, post-launch support), with my photo + a direct contact CTA
9. **Mega footer** — huge nav link list with hairline dividers, studio/contact details column (socials, email, location, "working with clients remotely"), live local-time clock with timezone, "back to top," availability status line, oversized wordmark on grain background at the very bottom with a one-line tagline

## Components & Interactions to Build
- Reusable grain/noise overlay component, fixed position, applied site-wide
- Carousel component (arrows + index counter, e.g. "01/02") reused for both the stat/quote slider and the testimonial/services slider
- FAQ accordion with smooth height transition
- Live clock widget (client component, updates per second, shows my actual timezone)
- Scroll-triggered fade/reveal wrapper for headline and paragraph blocks

## Technical Notes
- Next.js App Router, TypeScript, Tailwind, shadcn/ui — match existing stack
- Use Framer Motion (motion/react) for scroll reveals and the carousel transitions
- Grain texture as a single shared component, not duplicated per-section
- Keep it performant — no heavy WebGL needed for this pass, this is the typography/layout/texture system, not the liquid-dither hero effect (that's a separate piece)

## What NOT to copy
- Don't reuse the reference studio's name, wordmark, logo mark, client logos, or any of their written copy verbatim
- Don't invent fake stats, fake client names, or fake testimonials for me — leave clear placeholders if real content isn't available yet and flag them
