# Test Results: Dark mode toggle button in the navbar (Round 2 re-test)

## Overall: PASS — all three round-1 bugs are fixed, no regressions found

Re-verified independently (not trusting the round-1 report or the coder's changes.md
narrative). Used `npm run build`, `npm run lint`, and a real Chromium browser driven via
Playwright against a freshly started `npm run dev` (`.next` cleared before the build check).
Scripts/screenshots used are in the scratchpad dir (not part of the repo). Dev server was
killed at the end of this session.

---

### 1. Build — PASS

`rm -rf .next && npm run build`: Turbopack compile, TypeScript check, and static generation
of all routes (`/`, `/_not-found`, `/api/intake`) succeed with no errors.

### 2. Lint — PASS (no new regression; one pre-existing, unrelated error remains)

`npm run lint` output:
- `components/ui/AnimatedBackground.tsx:83` — 1 error, `react-hooks/set-state-in-effect`
  on the `setIsSafari`/`setReducedMotion` calls inside a `useEffect`. This is the
  **pre-existing** instance the spec referenced (predates this feature; a different
  `useEffect` than the one this task's Phase 5 fix targeted).
- `app/page.tsx` — 7 pre-existing `no-unused-vars` warnings (unrelated, not part of this
  feature; commented-out sections' imports).
- `components/ThemeToggle.tsx` — **0 errors** — confirmed clean. The suppression comment
  (`// eslint-disable-next-line react-hooks/set-state-in-effect` above `setMounted(true)`)
  works and no longer appears in the lint report.

Total: 1 error + 7 warnings, all pre-existing/unrelated to this feature. This matches the
"only the one pre-existing unrelated error" bar the task asked me to confirm. **Not a
regression from this round's changes.**

### 3. Hydration mismatch — PASS (fixed)

Fresh Chromium load (`networkidle`), console + `pageerror` listeners attached before
navigation, checked for any message containing "hydrat" or "did not match":
- Fresh load, default dark theme: **0 hydration warnings**.
- After a reload with `light` persisted in `localStorage`: **0 hydration warnings**.

Root cause from round 1 (`aria-label` computed from raw `resolvedTheme` instead of the
`mounted`-gated `isDark`) is confirmed fixed in the source
(`components/ThemeToggle.tsx:27`):
```tsx
aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
```
`isDark` (line 21) is `mounted ? resolvedTheme === "dark" : true` — the exact same gated
variable the icon branches on, so label and icon are always in sync pre- and post-mount.

### 4. `aria-label` correctness on first paint (default dark theme) — PASS (fixed)

Measured via `page.getAttribute('button[aria-label*="Switch"]', "aria-label")` immediately
after a fresh load with no prior `localStorage` theme set (defaults to dark):
- `aria-label` = **"Switch to light mode"** — correct (you're in dark, clicking goes to
  light). This was previously "Switch to dark mode" (backwards) in round 1.

### 5. Toggle to light, reload, persistence + label — PASS

- Click toggle: `<html class>` flips from `..."h-full dark"` to `..."h-full light"`;
  `aria-label` updates immediately to "Switch to dark mode" — correct.
- `localStorage.theme` = `"light"` after the click.
- Fresh reload with `light` persisted: `<html class>` still has `light`, `aria-label` still
  reads "Switch to dark mode" — correct and stable pre/post hydration (no flash, no
  mismatch, confirmed via the same console-warning check as #3).

### 6. Hero text + unscrolled Navbar wordmark legibility in both themes — PASS (fixed)

Round 1's bug (Hero/Navbar `text-foreground` sitting on a permanently-dark
`AnimatedBackground` mesh, illegible in light mode) is fixed via the human-directed
approach: the mesh itself now re-themes.

Computed-style measurements (not just "the class is applied"):

| | Dark theme | Light theme |
|---|---|---|
| Hero `<h1>` color | `rgb(240, 238, 233)` | `rgb(13, 13, 13)` |
| Mesh container computed `background-image` | `linear-gradient(160deg, rgb(13,13,13) 0%, rgb(26,26,26) 100%)` | `linear-gradient(160deg, rgb(240,238,233) 0%, rgb(228,225,216) 100%)` |
| Unscrolled Navbar `JMIN` wordmark color | `rgb(240, 238, 233)` | `rgb(13, 13, 13)` |

In both themes the text color and the mesh background are properly inverted relative to
each other (light text on dark mesh; dark text on light mesh) — confirmed legible by
computed contrast, and visually via full-page screenshots in both themes (hero copy,
navbar wordmark, and toggle icon all clearly readable in both). Neither `Hero.tsx` nor
`Navbar.tsx` were touched this round — consistent with the stated scope (only
`AnimatedBackground.tsx`'s color source changed).

### 7. Blob motion/animation unchanged — PASS

Confirmed the same 5 blobs with the same animation names/durations as before
(`animate-first`/`moveVertical`/15s, `animate-second`/`moveInCircle`/12s,
`animate-third`/`moveInCircle`/20s, `animate-fourth`/`moveHorizontal`/17s,
`animate-fifth`/`moveInCircle`/10s). Sampled each blob's computed `transform` at two points
1.5s apart — all 5 showed genuinely different matrices (animation actively running, not
frozen), matching the "color-source-only change, animation logic untouched" claim. No
missing blobs, no visual glitching in screenshots.

### 8. Accent (`#39FF8A`) unaffected — PASS

Measured computed colors directly (not just source-diffing):
- Hero "Jonathan Min" name-accent span: `rgb(57, 255, 138)` in **both** dark and light
  themes — byte-identical.
- CTA button (`Start a project`): background `rgb(57, 255, 138)`, text `rgb(13, 13, 13)` —
  byte-identical in both themes.

`AnimatedBackground.tsx`'s two accent-blob green layers (`rgba(57,255,136,...)`) were left
as raw rgba literals, unmigrated, per the changes.md note — confirmed by source read, they
are untouched, theme-invariant as required.

### 9. Intake form payload / endpoint — PASS, unaffected

`components/IntakeSection.tsx`: `FormData` type and initial state are exactly
`{ businessName, projectType, situation, timeline, budget, goals }`; `goNext` POSTs
`JSON.stringify(data)` to `/api/intake` (lines 120–124). Unchanged shape, unchanged
endpoint. `app/api/intake/route.ts`, `.env.local`, `next.config.ts` untouched by this
feature (the `route.ts` diff visible in `git status` is the same pre-existing, unrelated
credential-loading change noted in round 1, not part of this task). `package.json` retains
`googleapis@^173.0.0` and `nodemailer@^9.0.3` at original versions; only `next-themes@^0.4.6`
was added.

### 10. Reduced motion, single `<GrainOverlay />`, not-rendered component migration

Not re-verified from scratch this round (no code changed in these areas between round 1
and round 2, and round 1's report already passed them with source-level confirmation).
Spot-checked that `components/ScrollToTop.tsx`-style reduced-motion branching is still
present unchanged in `ThemeToggle.tsx` (`initial`/`exit` branch on `reduceMotion`) and that
`GrainOverlay` is still imported exactly once in `app/page.tsx` — both still true.

---

## Files/paths referenced
- `/Users/jonathanmin/dev/portfolio/components/ThemeToggle.tsx`
- `/Users/jonathanmin/dev/portfolio/components/ui/AnimatedBackground.tsx`
- `/Users/jonathanmin/dev/portfolio/components/IntakeSection.tsx`
- `/Users/jonathanmin/dev/portfolio/app/api/intake/route.ts`
- `/Users/jonathanmin/dev/portfolio/package.json`

## Verdict
All three round-1 issues (hydration mismatch/backwards aria-label, illegible hero text in
light mode, lint regression) are fixed, confirmed via computed-style measurement and a live
browser, not just by re-reading the coder's diff. No new regressions found. **Feature is a
PASS.**
