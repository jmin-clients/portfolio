# Changes: Dark mode toggle button in the navbar

Implements `.pipeline/spec.md` in full. `npm run build` passes (Turbopack compile +
TypeScript check + static generation all succeed).

## New files

- **`components/ThemeProvider.tsx`** — thin client wrapper around
  `next-themes`'s `ThemeProvider`, exactly as specified (spec 1b).
- **`components/ThemeToggle.tsx`** — the nav toggle button.
  - `"use client"`, no props, default export.
  - `useTheme()` from `next-themes` + a `mounted` boolean set in `useEffect`
    (hydration guard). Before mount, renders the same-size button shell with
    an `opacity-0` `Sun` placeholder — no layout shift, no early `null` return.
  - `onClick` flips `resolvedTheme` between `"dark"`/`"light"`;
    `aria-label` reflects the action ("Switch to light/dark mode").
  - Icons: Phosphor `Sun` (shown when dark, action = go light) / `Moon` (shown
    when light, action = go dark), `size={18} weight="bold"`.
  - Styling matches `ScrollToTop`'s icon-button language but inline/`size-9`
    instead of fixed/`size-11`: `border-border`, `bg-foreground/[0.06]`,
    `text-foreground`, `hover:bg-foreground/[0.12]`, `active:translate-y-px`,
    `rounded-sm`.
  - `AnimatePresence mode="wait"` cross-fade + rotate/scale on icon swap,
    branching on `useReducedMotion()` exactly like `ScrollToTop.tsx`
    (reduced motion → opacity-only fade).
  - Return type annotated `JSX.Element` per the spec signature; needed
    `import type { JSX } from "react"` since the global `JSX` namespace isn't
    ambient under this repo's TS/React 19 setup (`Cannot find namespace 'JSX'`
    without it — verified via `npm run build`).

## Modified files

- **`package.json`** — added `next-themes@^0.4.6` (installed via `npm install`).
  `googleapis`/`nodemailer` untouched.
- **`app/layout.tsx`** — added `suppressHydrationWarning` to `<html>`, wrapped
  `{children}` in `<ThemeProvider attribute="class" defaultTheme="dark"
  enableSystem={false} disableTransitionOnChange>` inside `<body>`, after the
  existing `disable-scroll-restoration` `<Script>` (left in place). Font
  variable classes and `h-full` on `<html>` untouched.
- **`components/Navbar.tsx`** — imported `ThemeToggle`; right side of the nav
  is now `<div className="flex items-center gap-3"><ThemeToggle /><CTAButton
  .../></div>` (toggle sits left of the CTA, always visible, no breakpoint
  hiding). Migrated its own 2 literals: `bg-[#0d0d0d]/80` → `bg-background/80`,
  `border-white/10` → `border-border`, wordmark `text-[#F0EEE9]` →
  `text-foreground` (+ its `/70` hover variant).
- **`app/globals.css`** — theme-token restructure (spec 3a):
  - `@theme inline` "Design tokens" block: `--color-surface`,
    `--color-surface-2`, `--color-text`, `--color-dim`, `--color-ghost`,
    `--color-hairline` now reference `var(--surface)` etc. instead of static
    hex; `--color-brand`/`--color-brand-dim` stay static (accent lock).
  - `:root, .dark { ... }` now holds the full existing dark palette (both the
    pre-hydration/no-JS fallback and the explicit `.dark` class target), plus
    new `--surface`, `--surface-2`, `--text`, `--dim`, `--ghost`, `--hairline`
    variables backing the design tokens above.
  - New `.light { ... }` block with the derived light palette from the spec's
    table (`#F0EEE9` background/surface, `#E4E1D8` surface-2/secondary/muted/
    accent, `#0d0d0d` foreground/text, `#FBFAF7` card/popover/sidebar, dim/
    ghost/hairline/input as the specified `rgba(13,13,13,...)` values, `--ring`
    bumped to `0.5` alpha for visibility on the pale surface). `--primary`/
    `--primary-foreground`/brand and `--radius` unchanged, per the accent and
    shape-system locks.
  - `html { background: #0d0d0d }` → `background: var(--background)`; body's
    hardcoded gradient → `linear-gradient(180deg, var(--surface) 0%,
    var(--surface-2) 100%)`; body `color: #f0eee9` → `color: var(--foreground)`.
    All other body/html rules (scroll-behavior, overflow-x: clip, page-fade
    animation, reduced-motion overrides) untouched.
- **`components/Hero.tsx`** — 3 literals migrated: ghost-marquee text
  `text-white/[0.045]` → `text-foreground/[0.05]`; `text-[#F0EEE9]/40` →
  `text-foreground/40`; `text-[#F0EEE9]` → `text-foreground`. The Comico
  `text-[#39FF8A]` name accent is untouched (accent lock).
- **`components/IntakeSection.tsx`** — full literal migration (largest
  surface): section/card borders (`border-white/10` → `border-border`),
  headings/body text (`text-[#F0EEE9]` family → `text-foreground` with
  matching alpha suffixes), progress-bar inactive state (`bg-white/10` →
  `bg-foreground/10`), inputs/textarea (`border-white/15` →
  `border-foreground/15`, placeholder/text colors → `text-foreground`/
  `placeholder:text-foreground/30`), option buttons' unselected state
  (`border-white/15 text-[#F0EEE9]/70 hover:border-white/30
  hover:text-[#F0EEE9]` → the `foreground` equivalents), back-button text.
  Left untouched: all `#39FF8A`/`#0d0d0d` accent-fill pairs (success icon
  chip, submit button + its inset arrow chip, selected-option border/text,
  focus-border `#39FF8A`) and the `text-[#ff6b6b]` error message color (not a
  surface/foreground/hairline literal, out of the mapping table's scope).
- **`components/Footer.tsx`** — 8 literals migrated: both `border-t
  border-white/10` dividers → `border-border`; wordmark, body copy, email
  link, social icons, and both copyright-row labels all moved from
  `text-[#F0EEE9]` (+ various alphas) to `text-foreground` (+ same alphas).
- **`components/ScrollToTop.tsx`** — `border-white/15` → `border-border`,
  `bg-white/[0.08]` → `bg-foreground/[0.06]`, `text-[#F0EEE9]` →
  `text-foreground`, `hover:bg-white/[0.14]` → `hover:bg-foreground/[0.12]`,
  matching the spec's explicit mapping for this file.
- **`components/ui/CTAButton.tsx`** — left unchanged, per spec (pure accent
  fill + inset dark chip, must look identical in both themes).
- **`components/ui/AnimatedBackground.tsx`** — left unchanged, per spec
  (out of scope; hero mesh stays dark in both themes).
- **`components/GrainOverlay.tsx`** — left unchanged (spec 3b: single fixed
  instance stays as-is; grain will read subtler on light backgrounds,
  documented as acceptable). Note: this file already had an unrelated
  pre-existing uncommitted change (`opacity: 0.055` → `0.1`) from before this
  task started; I did not touch it further.

### Not-currently-rendered components (migrated per spec, still not wired
into `app/page.tsx` — only their color literals changed, no re-enabling):
- **`components/Services.tsx`** — borders, eyebrow/quote/description text
  migrated to `border-border`/`text-foreground` variants. The per-item active/
  inactive number-index color and the service-name color were previously set
  via inline `style={{ color: ... }}` (not Tailwind classes); refactored those
  two spans to use conditional/plain `className` (`text-[#39FF8A]` /
  `text-foreground/30`, `text-foreground`) instead of hardcoded inline hex, so
  they re-theme like everything else. `baseOpacity`'s numeric inline
  `style={{ opacity }}` is untouched (it's a computed fade ramp, not a color).
- **`components/WorkShowcase.tsx`** — borders, heading/tag/description text,
  thumbnail border, and the arrow icon's idle color migrated to
  `border-border`/`text-foreground` variants. `#39FF8A` numbered marker and
  hover-state accent untouched.
- **`components/Statement.tsx`** — divider and the two text elements
  (`text-[#F0EEE9]/40`, `text-[#F0EEE9]`) migrated; `48HR` stat stays
  `text-[#39FF8A]`.
- **`components/ClientLogos.tsx`** — grid gap-line `bg-white/10` →
  `bg-border`, per-tile `bg-[#0d0d0d]` → `bg-background`, mark border
  `border-white/15` → `border-foreground/15`, mark/label text migrated to
  `text-foreground` variants.
- **`components/Testimonials.tsx`** — divider, quote text, avatar border,
  name/title text, and both prev/next nav-button borders/text migrated to
  `border-border`/`text-foreground` variants. Active-index `#39FF8A` digit
  untouched.
- **`components/WhySection.tsx`** — divider, eyebrow, per-card `bg-[#0d0d0d]`
  → `bg-background`, stat text, and description text migrated. Grid gap-line
  `bg-white/10` → `bg-border`. Label `text-[#39FF8A]` untouched.
- **`components/FAQ.tsx`** — divider, question/answer text, and the plus-icon
  chip border/text migrated to `border-border`/`text-foreground` variants.

## Documentation

- **`DESIGN.md`** — minimal edit per Phase 4:
  - "Color" section intro rewritten from "Dark-only. No section theme
    inversions (Section Theme Lock)." to describe dark as the default with a
    secondary light theme via the global `ThemeToggle`, Section Theme Lock
    reworded to prohibit *per-section* inversions specifically (global toggle
    only).
  - No-Go checklist item "One theme (dark), no section inversions to light"
    reworded to "Dark remains the default theme; light is a secondary global
    toggle, no per-section inversions". No other part of DESIGN.md rewritten.

## Verification

- `npm run build` — compiles, type-checks, and statically generates all
  routes successfully (`/`, `/_not-found`, `/api/intake`).
- `npm run lint` — one pre-existing error pattern (`react-hooks/set-state-in-
  effect` on a `useEffect`-based `setState` mount guard) already exists
  unmodified in `components/ui/AnimatedBackground.tsx`; `ThemeToggle.tsx`
  uses the same canonical next-themes "mounted" pattern and trips the same
  rule. This does not block `next build` (which only runs the TypeScript
  check, not ESLint) and mirrors the codebase's existing pattern rather than
  introducing a new one.
- Confirmed exactly one `<GrainOverlay />` instance (`app/page.tsx`).
- Confirmed `app/api/intake/route.ts`, `.env.local`, `next.config.ts` are
  untouched, and `googleapis`/`nodemailer` remain in `package.json` at their
  original versions.
- Confirmed `app/page.tsx`'s commented-out sections were not re-enabled (that
  file had an unrelated pre-existing uncommitted diff before this task began;
  I did not modify it).
- Grepped all 12 migrated files for leftover `F0EEE9`/`white/`/`#0d0d0d`/
  `#0D0D0D`/`rgba(240,...)`/`rgba(255,...)` literals — only the intentionally
  untouched `#39FF8A`+`#0d0d0d` accent-fill pairs remain.

## What the Tester should focus on

- Toggle behavior in the browser: click cycles dark ↔ light, icon cross-fade
  (Sun ↔ Moon) with rotate/scale, persists across reload (`localStorage`),
  respects `prefers-reduced-motion` (should degrade to plain opacity fade,
  no rotate/scale — throttle/emulate reduced motion to check).
- No hydration warnings in the browser console, and no icon flash on reload
  (dark is the `:root` fallback pre-hydration, matching `defaultTheme="dark"`).
- Visual check of `IntakeSection` in light mode specifically (it had the most
  literals: 18) — form borders, placeholder text, and the option-button
  selected/unselected contrast.
- Visual check of the light palette against WCAG contrast, especially
  `text-foreground/30`-`/35`-type low-alpha text on the new `#F0EEE9`
  surface (light-mode dim text reads at `rgba(13,13,13,0.55)` per
  `--dim`/`--muted-foreground`, but ad hoc `/30`-`/40` Tailwind opacity
  utilities on `text-foreground` were preserved at their original alpha
  values, not remapped to `--dim`, since the spec's mapping table says to
  "keep the alpha").
- Not-rendered components (Services, WorkShowcase, Statement, ClientLogos,
  Testimonials, WhySection, FAQ) are not wired into `app/page.tsx` and so
  can't be exercised via the live page; if the tester wants to visually spot
  check them, they'd need to temporarily import one into a test route/page
  (do not leave that enabled).

---

## Addendum: Round 2 — fixes from `.pipeline/test-results.md`

Three targeted fixes, per Phase 5 of `.pipeline/spec.md`. Nothing else touched.

### 1. `components/ThemeToggle.tsx` — hydration-mismatch / backwards aria-label
- `aria-label` previously read `` `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` ``
  directly off `resolvedTheme` (undefined pre-mount, so it disagreed with the
  `mounted`-gated `isDark` the icon already used). Changed to
  `` `Switch to ${isDark ? "light" : "dark"} mode` `` — now derived from the
  exact same gated `isDark` variable the icon branches on, so the label and
  icon are always in sync pre- and post-mount. No behavior change to `onClick`
  (still reads live `resolvedTheme` at click time, which is correct since by
  the time a click is possible the component is mounted).

### 2. `components/ui/AnimatedBackground.tsx` — hero mesh now re-themes
Round 1 left this hero mesh permanently dark-hardcoded while Hero/Navbar text
migrated to `text-foreground`, making hero text illegible in light mode.
Per human decision (spec Phase 5 item 2), the background now re-themes
instead of pinning the text — motion/blob animation logic is byte-for-byte
unchanged, only the color *source* changed:
- Container base gradient: `linear-gradient(160deg, #08080a 0%, #131313 100%)`
  → `linear-gradient(160deg, var(--surface) 0%, var(--surface-2) 100%)`.
- Each blob's "highlight" gradient layer: fixed `rgba(240,238,233,X)` →
  `color-mix(in srgb, var(--foreground) {X*100}%, transparent)` (same alpha
  stops, same ellipse sizes/positions/animation names — only the color
  literal became a token-driven `color-mix()`).
- Each blob's "shadow/undertone" gradient layer: fixed `rgba(20,20,20,X)` /
  `rgba(10,10,10,X)` → `color-mix(in srgb, var(--surface) {X*100}%, transparent)`.
- The two accent blobs' `rgba(57,255,136,...)` green layers are untouched
  (brand accent lock — theme-invariant per spec); their secondary
  off-white highlight layer was migrated the same way as the non-accent blobs.
- Edge vignette: fixed `rgba(2,2,2,0.58)` → `color-mix(in srgb, var(--surface-2)
  58%, transparent)`, so the corner-darkening deepens toward the mesh's own
  bottom-gradient tone in both themes instead of forcing black corners onto a
  light-mode hero.
- `color-mix()` was already an established pattern in this codebase
  (`components/ui/button.tsx`'s hover state), so no new technique introduced.
- Verified via Playwright against a fresh `npm run dev` (`.next` cleared
  first): in light mode the mesh container's resolved
  `background-image` is `linear-gradient(160deg, rgb(240, 238, 233) 0%,
  rgb(228, 225, 216) 100%)` (the light `--surface`/`--surface-2` values), the
  hero `h1` computed color is `rgb(13, 13, 13)` (dark, legible against that
  light mesh), and the unscrolled `Navbar` wordmark (`text-foreground`, sits
  directly on this same mesh per the transparent-until-scrolled nav) computed
  to `rgb(13, 13, 13)` as well — confirmed legible in both themes via
  screenshots. `components/Hero.tsx` and `components/Navbar.tsx` were **not**
  modified — only the background's color source changed, per the spec's
  explicit scope.

### 3. `components/ThemeToggle.tsx` — lint regression (`react-hooks/set-state-in-effect`)
`components/ui/AnimatedBackground.tsx:78` (the pre-existing instance the spec
pointed at) does **not** actually suppress this rule — checked, confirmed no
`eslint-disable` present there, so there was no existing suppression pattern
to copy. Left that pre-existing file/error untouched (out of scope for this
round). For `ThemeToggle.tsx`, added a justified inline
`// eslint-disable-next-line react-hooks/set-state-in-effect` directly above
`setMounted(true)` inside the `useEffect`, with a one-line comment explaining
why: the `mounted` flag is a one-time client-only hydration guard with no
external system to subscribe to, so there's no way to satisfy the rule's
"subscribe, don't setState synchronously" guidance without changing behavior.
No other lint rule touched or newly suppressed.

### Verification (round 2)
- `npm run lint` — `components/ThemeToggle.tsx` is now clean (0 errors). The
  one remaining lint error is the pre-existing, out-of-scope
  `react-hooks/set-state-in-effect` hit in `components/ui/AnimatedBackground.tsx`
  (unrelated `useEffect`, not touched by this round; same status as before
  this pass). Total: 1 error (pre-existing, unrelated) + 7 unrelated
  pre-existing `no-unused-vars` warnings in `app/page.tsx` (unchanged from
  before this task).
- `npm run build` (`rm -rf .next` first) — compiles, type-checks, and
  statically generates all routes successfully.
- Manual re-verification via a real Chromium browser (Playwright) against
  `npm run dev` with `.next` cleared:
  - No hydration-mismatch console warning on load (checked for any
    `console`/`pageerror` message containing "hydrat" or "did not match" —
    none found, across initial load, a theme toggle click, and a full reload
    with the toggled theme persisted).
  - `aria-label` on first paint in the default dark theme reads "Switch to
    light mode" (correct — clicking does switch to light); after toggling to
    light and reloading, it correctly reads "Switch to dark mode".
  - Hero text and the unscrolled Navbar wordmark are legible in both themes
    (screenshots taken of both); the toggle button itself (Sun in dark mode,
    Moon in light mode) renders with correct contrast in both themes.

### Files changed this round
- `components/ThemeToggle.tsx` (aria-label fix + lint-suppression comment)
- `components/ui/AnimatedBackground.tsx` (color-source-only re-theme of the
  base gradient, blob gradient layers, and vignette)
- `.pipeline/changes.md` (this addendum)

No other files were modified in this round.
