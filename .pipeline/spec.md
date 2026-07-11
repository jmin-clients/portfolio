# Spec: Dark mode toggle button in the navbar

## Decisions (resolved by human, no longer open)

1. **Dark-only rule in DESIGN.md is superseded.** Proceed with light as a secondary,
   derived theme; dark remains the designed default. `DESIGN.md`'s "Section Theme Lock" /
   "One theme (dark), no section inversions to light" language must be updated as part of
   this change to reflect that a secondary light theme now exists (still no *per-section*
   inversions — the toggle is global, not per-section).
2. **Migration scope is ALL components**, not just currently-rendered ones. In addition to
   the rendered set (Navbar, Hero, IntakeSection, Footer, CTAButton, ScrollToTop), also
   migrate the commented-out-but-present components so nothing is left half-done:
   `components/Services.tsx`, `components/WorkShowcase.tsx`, `components/Statement.tsx`,
   `components/ClientLogos.tsx`, `components/Testimonials.tsx`, `components/WhySection.tsx`,
   `components/FAQ.tsx`. Same literal→token mapping rules apply (see 3c). These are not
   wired into `app/page.tsx` currently — do not re-enable them, just migrate their color
   literals so they're theme-correct whenever they are re-enabled.

---

## Approach (decided)

- **Mechanism:** `next-themes` with the class strategy. This is the standard Next.js
  App Router solution and injects a pre-hydration inline script that sets the `<html>`
  class before paint, avoiding the flash-of-wrong-theme that a hand-rolled
  `useEffect` + `localStorage` approach causes. No existing theming pattern exists to
  reuse (confirmed: no `next-themes`, no ThemeProvider, no `dark:` usage), so use the
  standard tool rather than inventing one.
- **Default theme:** `dark` (the designed default). `enableSystem={false}` — the site is
  opinionated dark-first; do not auto-follow OS preference.
- **Class semantics:** next-themes puts either `light` or `dark` on `<html>`. Palette is
  driven entirely by CSS-variable swaps under `.light` / `.dark`, and components consume
  **semantic Tailwind token classes** (`bg-background`, `text-foreground`, etc.), not
  `dark:` variants. Do not add `dark:`-prefixed utilities.

---

## Phase 1 — Dependency + provider

### 1a. Install dependency
Add `next-themes` (latest, `^0.4.x`) to `package.json` dependencies and install.
Do not touch `googleapis` or `nodemailer` (CLAUDE.md critical list).

### 1b. Create `components/ThemeProvider.tsx`
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 1c. Wire into `app/layout.tsx`
- Add `suppressHydrationWarning` to the `<html>` element (required by next-themes; it
  mutates the class before React hydrates).
- Wrap `{children}` (keep the existing `<Script id="disable-scroll-restoration">` where
  it is, inside `<body>`) with:
  ```tsx
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    {children}
  </ThemeProvider>
  ```
- `disableTransitionOnChange` prevents every `transition-colors` element from animating
  during the theme flip (avoids a laggy full-page color sweep). Keep it.
- Do not remove the existing `h-full` / font-variable classes on `<html>`.

---

## Phase 2 — Toggle button

### 2a. Create `components/ThemeToggle.tsx` (`"use client"`)

Signature: `export default function ThemeToggle(): JSX.Element` — no props.

Behavior:
- Use `const { resolvedTheme, setTheme } = useTheme()` from `next-themes`.
- **Hydration guard:** `useTheme()` returns `undefined` for theme on the server / first
  client render. Track a `mounted` boolean (set true in `useEffect`). Before mounted,
  render the button shell with a static icon (or `opacity-0` placeholder of the same
  size) so layout does not shift and there is no hydration mismatch. Do NOT early-return
  `null` (that shifts the navbar layout on hydration).
- `onClick`: `setTheme(resolvedTheme === "dark" ? "light" : "dark")`.
- `aria-label`: `` `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` ``.
- `type="button"`.

Icons (`@phosphor-icons/react` — per CLAUDE.md, not lucide):
- Show `Sun` when `resolvedTheme === "dark"` (action = go light).
- Show `Moon` when `resolvedTheme === "light"` (action = go dark).
- `size={18} weight="bold"` to match `ScrollToTop`.

Styling — reuse the `ScrollToTop` button treatment for a consistent icon-button language,
but as an inline (not fixed) element and sized to the nav. Sharp corners per the Shape
System (`rounded-sm`, never a pill):
```
flex size-9 items-center justify-center rounded-sm border border-border
bg-foreground/[0.06] text-foreground backdrop-blur-md transition-colors
hover:bg-foreground/[0.12] active:translate-y-px
```
Use the semantic tokens (`border-border`, `text-foreground`, `bg-foreground/...`) so the
button itself re-themes. `size-9` (36px) reads correctly against the 64px (`h-16`) nav bar
next to the CTA; do not use `size-11` (that's the floating ScrollToTop size).

Animation (`motion/react`, per convention — respect reduced motion):
- Import `AnimatePresence, motion, useReducedMotion`.
- Wrap the icon in `<AnimatePresence mode="wait">` keyed on the active icon so swapping
  Sun/Moon cross-fades + rotates:
  - `initial`: reduced → `{ opacity: 0 }`; else `{ opacity: 0, rotate: -90, scale: 0.6 }`
  - `animate`: `{ opacity: 1, rotate: 0, scale: 1 }`
  - `exit`: reduced → `{ opacity: 0 }`; else `{ opacity: 0, rotate: 90, scale: 0.6 }`
  - `transition`: `{ duration: 0.2 }`
- Follow the exact reduced-motion branching pattern already in `components/ScrollToTop.tsx`.

### 2b. Placement in `components/Navbar.tsx`
Current right side is just `<CTAButton href="#intake">`. Wrap the right side in a flex row
and put the toggle immediately to the **left** of the CTA:
```tsx
<div className="flex items-center gap-3">
  <ThemeToggle />
  <CTAButton href="#intake">Start a project</CTAButton>
</div>
```
Keep the existing left-side `JMIN` wordmark and the `justify-between` container untouched
otherwise. The toggle is small enough to remain visible at all breakpoints — do not hide
it on mobile.

---

## Phase 3 — Palette + token migration

Goal: derive a light theme from the existing DESIGN.md palette (do NOT invent a new brand
palette). Keep the brand accent `#39FF8A` identical in both themes (DESIGN.md accent lock);
it is only ever used as a fill with dark text on top, so it stays legible on a light surface.

### 3a. `app/globals.css` — make tokens theme-driven
The variables in `:root` (lines ~60–88) currently hold the dark palette and never change.
Restructure so the palette swaps by class:

1. Keep the **dark values** but place them under **both** `:root` (pre-hydration/no-JS
   fallback) **and** `.dark`. `next-themes` adds `.dark` or `.light` to `<html>`.
2. Add a `.light` block overriding the same variable names with the light palette below.
3. In the `@theme inline` block, the "Design tokens" (lines ~49–57: `--color-surface`,
   `--color-text`, `--color-dim`, `--color-ghost`, `--color-hairline`, `--color-brand`,
   `--color-brand-dim`) are static hex and will NOT re-theme. Convert the theme-dependent
   ones to `var()` references and move their per-theme values into the `.dark`/`.light`
   blocks:
   - `--color-surface: var(--surface)`, `--color-surface-2: var(--surface-2)`,
     `--color-text: var(--text)`, `--color-dim: var(--dim)`, `--color-ghost: var(--ghost)`,
     `--color-hairline: var(--hairline)`.
   - `--color-brand` / `--color-brand-dim` stay static (accent is theme-invariant).
   This keeps utilities like `text-text`, `bg-surface`, `border-hairline` working AND
   theme-reactive. (Alternatively migrate components to `bg-background`/`text-foreground`
   in 3c — either is fine as long as one consistent token set is used.)

**Light palette (derived from the dark tokens — inverted surface/foreground, warm off-white base):**

| Variable | Dark (existing) | Light (new) | Role |
|---|---|---|---|
| `--background` / `--surface` | `#0d0d0d` | `#F0EEE9` | page base (warm off-white, reuse the dark FG as light BG) |
| `--surface-2` | `#1a1a1a` | `#E4E1D8` | gradient bottom |
| `--foreground` / `--text` | `#f0eee9` | `#0d0d0d` | primary text |
| `--dim` | `rgba(240,238,233,0.45)` | `rgba(13,13,13,0.55)` | secondary text/labels |
| `--ghost` | `rgba(240,238,233,0.10)` | `rgba(13,13,13,0.08)` | decorative background type |
| `--hairline` / `--border` | `rgba(255,255,255,0.10)` | `rgba(13,13,13,0.12)` | dividers |
| `--card` / `--popover` | `#161616` | `#FBFAF7` | surfaces |
| `--card-foreground` / `--popover-foreground` / `--secondary-foreground` / `--accent-foreground` / `--sidebar-foreground` | `#f0eee9` | `#0d0d0d` | text on surfaces |
| `--secondary` / `--muted` / `--accent` / `--sidebar-accent` | `#1e1e1e` | `#E4E1D8` | subtle fills |
| `--muted-foreground` | `rgba(240,238,233,0.45)` | `rgba(13,13,13,0.55)` | muted text |
| `--input` | `rgba(255,255,255,0.08)` | `rgba(13,13,13,0.10)` | input borders |
| `--primary` / `--sidebar-primary` / brand | `#39FF8A` | `#39FF8A` | **unchanged** |
| `--primary-foreground` / `--sidebar-primary-foreground` | `#0d0d0d` | `#0d0d0d` | **unchanged** (dark text on green) |
| `--ring` | `rgba(57,255,138,0.4)` | `rgba(57,255,138,0.5)` | focus ring |
| `--sidebar` | `#161616` | `#FBFAF7` | |
| `--sidebar-border` | `rgba(255,255,255,0.1)` | `rgba(13,13,13,0.12)` | |
| `--radius` | `0.125rem` | `0.125rem` | **unchanged** (Shape System stays sharp) |

4. **`@layer base` body/html background (lines ~90–124):** currently hardcodes
   `background: #0d0d0d` on `html` and a hardcoded `linear-gradient(180deg,#0d0d0d,#1a1a1a)`
   on `body`. Replace the literals with the theme variables:
   - `html { background: var(--background); }`
   - `body { background: linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%); }`
   Keep `background-attachment: fixed`, `overflow-x: clip`, the page-fade animation, and
   the reduced-motion rules exactly as-is.

### 3b. `components/GrainOverlay.tsx`
`mixBlendMode: "overlay"` reads fine on both themes, but the grain nearly vanishes on a
light background. Bump opacity conditionally is out of scope for a non-client component;
leave `GrainOverlay` as-is (single fixed instance in `app/page.tsx`, do NOT add a second),
and note the grain will be subtler in light mode — acceptable. Do not convert it to a
client component just for this.

### 3c. Migrate hardcoded color literals → tokens in the rendered components
For each file below, replace hardcoded surface/foreground/hairline literals with the
semantic token utility classes so they re-theme. **Do not touch the brand accent literals
(`#39FF8A`, `bg-[#39FF8A]`, `text-[#39FF8A]`) — they are theme-invariant and stay as-is.**

Mapping (apply consistently):
- `bg-[#0d0d0d]` / `bg-[#0D0D0D]` (as a page/surface bg) → `bg-background`
- `text-[#F0EEE9]` / `text-[#f0eee9]` → `text-foreground`
- `text-[#F0EEE9]/70`, `/45`, `/80` etc. → `text-foreground/70` (keep the alpha)
- `border-white/10`, `border-white/15` → `border-border` (or `border-foreground/10` if a
  specific alpha must be preserved)
- `bg-white/[0.08]`, `bg-white/[0.14]` → `bg-foreground/[0.06]` / `bg-foreground/[0.12]`
- Ghost/decorative type at `white/[0.045]`-style opacities → `text-foreground/[0.05]`

Files to migrate — rendered set (per `app/page.tsx`):
- `components/Navbar.tsx` — the scrolled nav bg `bg-[#0d0d0d]/80` → `bg-background/80`;
  `border-white/10` → `border-border`; wordmark `text-[#F0EEE9]` → `text-foreground`.
  **Reference this file as the migration example** (smallest, 2 literals).
- `components/Hero.tsx` (3 literals)
- `components/IntakeSection.tsx` (18 literals — the largest surface; migrate carefully,
  preserve accent/focus states which use `#39FF8A`)
- `components/Footer.tsx` (8 literals)
- `components/ui/CTAButton.tsx` — **leave unchanged.** It is pure accent
  (`bg-[#39FF8A] text-[#0d0d0d]` + inset dark chip) and must look identical in both themes
  per the accent lock.
- `components/ScrollToTop.tsx` — migrate `border-white/15`→`border-border`,
  `bg-white/[0.08]`→`bg-foreground/[0.06]`, `text-[#F0EEE9]`→`text-foreground`,
  `hover:bg-white/[0.14]`→`hover:bg-foreground/[0.12]`.

Files to migrate — not-currently-rendered set (per human decision, migrate anyway so
nothing is left half-done; do NOT re-enable them in `app/page.tsx`, only fix their color
literals using the same mapping table above):
- `components/Services.tsx`
- `components/WorkShowcase.tsx`
- `components/Statement.tsx`
- `components/ClientLogos.tsx`
- `components/Testimonials.tsx`
- `components/WhySection.tsx`
- `components/FAQ.tsx`
Apply the same rules: preserve `#39FF8A` accent literals untouched; convert surface/
foreground/hairline hex+alpha literals to the semantic tokens; keep whatever
shape/spacing is already there unchanged — this is a color-token-only pass, not a
visual redesign of these sections.

### 3d. `components/ui/AnimatedBackground.tsx` — leave as-is
Out of scope. It is a hero-only decorative mesh hardcoded to a charcoal gradient with
`mixBlendMode: screen` blobs; making it theme-reactive is a separate visual-design task,
not a toggle mechanic. In light mode the hero background stays dark — acceptable, and it
sits behind foreground text that will still read (hero text is on the dark mesh). If the
human wants the hero to also invert, that is a follow-up (relates to OPEN QUESTION #1).

---

## Edge cases the implementation must handle
- **No FOUC / hydration mismatch:** `suppressHydrationWarning` on `<html>` + the `mounted`
  guard in `ThemeToggle`. Verify no console hydration warning and no icon flash on reload.
- **Reduced motion:** the icon-swap animation must degrade to a plain opacity fade (no
  rotate/scale) under `useReducedMotion()`, matching `ScrollToTop`.
- **Persistence:** `next-themes` handles `localStorage` (default key `theme`) automatically;
  do not write a manual persistence layer.
- **`disableTransitionOnChange`** must be set or every `transition-colors` element (nav,
  links, buttons) animates during the flip and looks laggy.
- **Accent contrast:** confirm `#39FF8A` fills keep dark (`#0d0d0d`) text in both themes;
  never render `#39FF8A` as text on the light `#F0EEE9` surface (it fails WCAG) — the
  existing components only use it as a fill, so no change needed, just don't introduce new
  green-text-on-light usages.
- **Focus visibility:** the `--ring` token is bumped to `0.5` alpha in light mode so the
  green focus ring stays visible on the pale surface.
- **Single grain overlay:** do not add a second `<GrainOverlay />`; it remains one instance
  in `app/page.tsx` (CLAUDE.md durable convention).

## Patterns to follow (name the file to copy from)
- Icon button styling + reduced-motion + AnimatePresence branching → `components/ScrollToTop.tsx`.
- Phosphor icon import + `size`/`weight` usage → `components/ui/CTAButton.tsx` (`ArrowUpRight`) and `ScrollToTop.tsx` (`ArrowUp`).
- Navbar right-cluster layout → existing `components/Navbar.tsx`.
- Token → utility wiring already scaffolded in `app/globals.css` (`@theme inline`, `:root`).

## Phase 4 — Update DESIGN.md
Update the "Section Theme Lock" / No-Go language in `DESIGN.md` that currently states
"Dark-only, no section theme inversions" / "One theme (dark), no section inversions to
light." Rewrite it to reflect: the site now supports a secondary light theme via a global
toggle (dark remains the default), while still prohibiting *per-section* theme inversions
(no single section may render in the opposite theme from the rest of the page — the toggle
is global only). Keep this edit minimal and consistent with the rest of DESIGN.md's voice;
do not otherwise rewrite DESIGN.md.

## Phase 5 — Fixes from test failures (round 2)

Test results (`.pipeline/test-results.md`) found three issues in the round-1 implementation:

1. **Hydration mismatch / wrong aria-label** — `components/ThemeToggle.tsx` computes
   `aria-label` from the raw (unmounted) `resolvedTheme` instead of the same
   `mounted`-gated value already used to pick the icon. Fix: derive the aria-label from
   the same gated variable the icon rendering uses, so both are consistent pre- and
   post-mount, eliminating the hydration warning and the backwards label on first paint.

2. **Illegible hero text in light mode** — `components/Hero.tsx` and the unscrolled state
   of `components/Navbar.tsx` use `text-foreground` over `components/ui/AnimatedBackground.tsx`,
   which was left permanently dark in round 1. **Human decision: make the hero background
   re-theme instead of pinning the text.** Update `components/ui/AnimatedBackground.tsx` so
   its gradient/blob colors respond to the active theme (read from the same CSS variables/
   tokens as the rest of the site — e.g. derive the mesh colors from `--surface`/`--surface-2`/
   `--foreground` tokens rather than hardcoded charcoal hex) so it inverts along with the page
   and `text-foreground` reads correctly on top of it in both themes. Keep the existing
   motion/blob animation behavior; only the color source changes from hardcoded hex to
   theme tokens. This was previously out of scope (spec 3d) — it is now in scope.
3. **Lint regression** — `components/ThemeToggle.tsx` trips `react-hooks/set-state-in-effect`
   on the `mounted` state set inside `useEffect`. Fix using whatever pattern resolves it
   without changing behavior (e.g. an eslint-disable comment matching the existing one at
   `components/ui/AnimatedBackground.tsx:78` if that's how the pre-existing instance is
   handled — check it first and stay consistent — or a lazy-init/ref-based alternative if
   that's cleaner). Do not suppress a *different* lint rule or introduce a new warning.

## Do not touch
`app/api/intake/route.ts`, `.env.local`, `next.config.ts`, `googleapis`/`nodemailer` deps,
Vercel config, `CNAME` (CLAUDE.md critical list). The intake form still POSTs to
`/api/intake` with the fixed payload shape — unaffected by this change.
