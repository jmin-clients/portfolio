# Portfolio — Jonathan Min (jmin.work)

## Critical, do not touch
These took real setup work and must keep working across every redesign. Never
rename, move, or rewrite them as part of a visual/design change:
- `app/api/intake/route.ts` — Google Sheets + Gmail notification pipeline.
  The intake form always POSTs here (`/api/intake`), payload shape is
  `{ businessName, projectType, situation, timeline, budget, goals }`.
- `.env.local` — `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_JSON`, `GMAIL_USER`,
  `GMAIL_APP_PASSWORD` (plus local-dev `GOOGLE_KEY_FILE`).
- `next.config.ts`, `package.json` dependencies (never drop `googleapis` or
  `nodemailer`), Vercel deployment config, the GitHub repo connection, `CNAME`.
Section components, styling, layout, and copy are all fair game to redesign
freely. Only the items above are off-limits, and only because they're wired
to live external services, not because of any design convention.

## Stack
- **Framework:** Next.js 16, App Router, TypeScript
- **Styling:** Tailwind v4 + shadcn/ui (own the components)
- **Animation:** Motion (`motion/react` — import from here, not `framer-motion`)
- **Icons:** `@phosphor-icons/react` (primary); lucide-react is installed but avoid by default

## Design System
This site gets fully reimagined periodically, the visual language is not
sacred. `DESIGN.md` is the current source of truth for colors, type, and
section layout, but treat it as a living snapshot of the latest direction,
not a permanent constraint. When a redesign is requested, overwrite `DESIGN.md`
rather than layering new rules on top of old ones, and don't let this file's
history of past aesthetics (Swiss grid, brutalist, editorial, etc.) limit
what the next direction can be.

### Durable technical conventions (survive redesigns)
- `<GrainOverlay />` (or whatever the current texture layer is called) stays
  fixed, `pointer-events-none`, high `z-index`, one instance in `app/page.tsx`.
  Don't add a second instance per-section.
- Motion: `motion/react` everywhere. `useScroll` + `useTransform` for
  scroll-linked/parallax effects, `whileInView` for simple reveals,
  `useReducedMotion()` checked on every animated component, `useMotionValue`/
  `useTransform` (never `useState`) for continuous pointer/scroll-driven values.
- Whatever shape system (corner radius) the current DESIGN.md specifies,
  apply it consistently, don't mix radii within one redesign.
- No repeated section layout family twice in a row, and no eyebrow on every
  section, DESIGN.md's per-redesign eyebrow budget (roughly 1 per 3 sections)
  is a floor for restraint, not a checklist to fill.
