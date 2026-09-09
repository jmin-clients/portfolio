"use client";

import AsciiSpotlight from "@/components/ui/AsciiSpotlight";
import { CTAButton } from "@/components/ui/CTAButton";
import { DitheredPhoto } from "@/components/ui/DitheredPhoto";
import { motion, useReducedMotion, useTime, useTransform } from "motion/react";

// One-shot entrance choreography, plays once on load, never re-triggers on
// scroll. A slow, no-bounce ease-out tween, same curve already used for this
// section's background parallax, so the hero reads as one unhurried motion
// rather than a snappy UI reaction. Driven through the `transform` CSS
// property directly (not Motion's `y`/`scale` shorthands) since those
// shorthands aren't hardware-accelerated and this animation runs during
// initial page load, exactly when the main thread is busiest (hydration,
// the dither canvas, the blob background mounting).
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const ENTER_DELAY = { photo: 0.1, headline: 0.32, cta: 0.54 };
const ENTER_TRANSITION = { duration: 1.1, ease: EASE_OUT } as const;

// Idle drift starts once the one-shot entrance has settled.
const FLOAT_START_MS = (ENTER_DELAY.cta + ENTER_TRANSITION.duration) * 1000;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Continuous sine drift for the content block, not a looping keyframe
  // animation. A keyframe loop (0 -> -8 -> 0 with an ease) has to hit zero
  // velocity and reverse at each keyframe, which reads as a little stutter
  // on every turnaround. A sine wave has no keyframes to snap back to, it's
  // smooth by construction (velocity is a plain cosine, never zero except
  // at the peaks, where deceleration and re-acceleration are continuous),
  // so it reads as weightless drifting rather than a bounce loop. x and y
  // run on different periods, plus a phase offset on x, so the combined
  // path traces a slow, irregular ellipse instead of a straight diagonal.
  const time = useTime();
  const rawFloatY = useTransform(time, (t) =>
    Math.sin(Math.max(0, t - FLOAT_START_MS) / 4200) * 8
  );
  const rawFloatX = useTransform(time, (t) =>
    Math.sin(Math.max(0, t - FLOAT_START_MS) / 6100 + Math.PI / 3) * 5
  );
  const floatY = reduceMotion ? 0 : rawFloatY;
  const floatX = reduceMotion ? 0 : rawFloatX;

  return (
    // Sticky panel, not a normal in-flow section: it pins to the top of the
    // viewport and stays there while the sections after it scroll up and
    // over it (see the covering wrapper in app/page.tsx, which sits at a
    // higher z-index and carries an opaque background). `h`, not `min-h`,
    // a pinned panel is exactly one viewport tall by definition.
    <section
      id="top"
      className="sticky top-0 z-0 h-[100dvh] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Testing AsciiSpotlight (the intake form's hover grid) as the hero
          background in place of AnimatedBackground (mesh-gradient blobs,
          still at components/ui/AnimatedBackground.tsx if this doesn't
          stick). Rendered as a direct child of the section (not wrapped in
          its own div) because AsciiSpotlight attaches its mousemove
          listener to its immediate parent: nesting it in a sibling wrapper
          next to the content block meant hover events over the photo/
          headline/CTA never bubbled to it (mousemove bubbles to ancestors,
          not sibling subtrees), leaving a dead zone right where the cursor
          spends most of its time. */}
      <AsciiSpotlight />

      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-10 pt-20 pb-14 flex flex-col items-center gap-6 text-center"
        style={{ x: floatX, y: floatY }}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "scale(0.96)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{ ...ENTER_TRANSITION, delay: ENTER_DELAY.photo }}
        >
          <DitheredPhoto src="/images/jonathan.jpg" alt="Jonathan Min" className="w-[130px] md:w-[160px]" />
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ ...ENTER_TRANSITION, delay: ENTER_DELAY.headline }}
          className="font-display text-justify md:text-pretty uppercase tracking-tight leading-[1.16] text-[clamp(1.1rem,2.3vw,1.85rem)] w-full"
          style={{ textAlignLast: "justify" }}
        >
          <span className="text-foreground">👋 I&apos;m </span>
          <span style={{ fontFamily: "var(--font-comico)" }} className="text-brand-fg">
            Jonathan Min
          </span>
          <span className="text-foreground font-medium">
            , documenting whatever breaks in the homelab this week.
          </span>
        </motion.h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ ...ENTER_TRANSITION, delay: ENTER_DELAY.cta }}
        >
          <CTAButton href="/blog">Read the blog</CTAButton>
        </motion.div>
      </motion.div>

      {/* Subtle accent wash, replaces the old scroll-driven "Networking *
          Cybersecurity" ghost marquee. Anchored to the hero's bottom edge,
          which (because the hero is a sticky pinned panel) is the bottom of
          the viewport for the whole time the hero is on screen, so it reads
          as a glow sitting under the incoming section as that section
          slides up over it. Brand accent at 20% opacity at the floor,
          fading to fully transparent by its own top edge (never
          wallpapering the section, accent is punctuation per the site's
          color system). Eased stops (roughly Josh Comeau's "smooth
          gradient" curve) plus a physical blur, not just more gradient
          stops: CSS alpha gradients over a near-black base are notoriously
          bad at looking smooth (8-bit banding, and human contrast
          perception isn't linear), so even a carefully eased ramp reads as
          a block of color with an edge, a blur diffuses that away. The
          element hangs 4rem past the section's bottom edge (clipped by the
          section's `overflow-hidden`) with the color held flat across that
          overhang, so the blur has real color to draw from at the visible
          floor instead of softening it toward transparent right at the
          edge. */}
      <div
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{
          bottom: "-4rem",
          height: "calc(26dvh + 4rem)",
          filter: "blur(28px)",
          background: `linear-gradient(
            to top,
            rgba(var(--brand-fg-rgb), 0.20) 0%,
            rgba(var(--brand-fg-rgb), 0.20) 31%,
            rgba(var(--brand-fg-rgb), 0.15) 44%,
            rgba(var(--brand-fg-rgb), 0.11) 54%,
            rgba(var(--brand-fg-rgb), 0.075) 63%,
            rgba(var(--brand-fg-rgb), 0.055) 70%,
            rgba(var(--brand-fg-rgb), 0.04) 76%,
            rgba(var(--brand-fg-rgb), 0.025) 81%,
            rgba(var(--brand-fg-rgb), 0.015) 87%,
            rgba(var(--brand-fg-rgb), 0) 100%
          )`,
        }}
      />
    </section>
  );
}
