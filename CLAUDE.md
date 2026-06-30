# Portfolio — Jonathan Min (jmin.work)

## Stack
- **Framework:** Next.js 16, App Router, TypeScript
- **Styling:** Tailwind v4 + shadcn/ui (own the components)
- **Animation:** Motion (`motion/react` — import from here, not `framer-motion`)
- **Icons:** `@phosphor-icons/react` (primary); lucide-react is installed but avoid by default

## Design System
Full brief in `jmin-redesign-prompt.md`. That file is the source of truth for all visual decisions.

### Colors (hard-coded, no dark-mode flip — site is dark-only)
| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0a` | Site base |
| Primary text | `#f0efe9` | Body, headlines |
| Grey display | `#8a8a85` | Oversized background-layer type |
| Cream | `#e8e6df` | One contrast-break section only |
| Hairline | `rgba(240,239,233,0.08)` | Dividers |

### Typography
Two-font system — Space Mono is primary for **everything**; Bitcount Prop Single is accent only.

| Tailwind class | Font | When |
|---|---|---|
| `font-mono` (and `font-sans`, `font-display`) | Space Mono | All standard type |
| `font-accent` | Bitcount Prop Single | Signature letter/phrase moments only |

Use `<MixedText segments={[...]} />` for all font-pairing. Never hand-code one-off accent spans.

**Letter-level pairing** (nav wordmark, short stat callouts, section dividers):
- Swap 1-2 letters in a short all-caps word to `font-accent` at heavier weight
- Pick round letters (O, Q, G) or first/last letter

**Phrase-level pairing** (hero subtext, pull quotes, taglines):
- Alternate whole clauses between `font-mono` and `font-accent`
- Mixed case, not all-caps
- Keep short — Bitcount at body-copy length gets hard to read

### Texture
`<GrainOverlay />` — fixed, `pointer-events-none`, `z-[9000]`, site-wide. One instance in `app/page.tsx`. Do not add per-section.

### Motion
- Use `motion/react` everywhere
- Scroll reveals: `whileInView` with `viewport={{ once: true }}`
- Always wrap with `useReducedMotion()` and degrade to static
- `useMotionValue` / `useTransform` for continuous pointer physics (never `useState`)

### Shape system
All-sharp by default (`rounded-none` / `rounded-sm` max). Consistent throughout.
