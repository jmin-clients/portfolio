"use client";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { CTAButton } from "@/components/ui/CTAButton";
import { DitheredPhoto } from "@/components/ui/DitheredPhoto";
import { Asterisk } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

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

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Background drifts slower than the page scrolls, standard parallax depth cue.
  const rawParallaxY = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  const parallaxY = reduceMotion ? 0 : rawParallaxY;

  // Ghost text is static at rest, the scroll ties into it, but through a
  // heavy spring rather than a 1:1 proportional map, so it lags behind the
  // scroll input, keeps drifting a beat after you stop, and settles with a
  // soft trailing overshoot instead of tracking the scrollbar exactly, the
  // "weight" is the mass/stiffness/damping balance below.
  const rawGhostX = useTransform(scrollYProgress, [0, 0.3], [0, -220]);
  const weightedGhostX = useSpring(rawGhostX, { mass: 3, stiffness: 50, damping: 20 });
  const ghostX = reduceMotion ? 0 : weightedGhostX;

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <AnimatedBackground />
      </motion.div>

      <motion.p
        aria-hidden
        style={{ x: ghostX, fontFamily: "var(--font-tanker)" }}
        className="absolute bottom-[6%] left-0 whitespace-nowrap select-none uppercase leading-none tracking-tight text-[10vw] text-foreground/[0.05] flex items-center gap-8"
      >
        <span>Web Design</span>
        <Asterisk weight="fill" className="size-[0.85em] shrink-0" />
        <span>AI Powered Workflow</span>
      </motion.p>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-10 pt-20 pb-14 flex flex-col items-center gap-6 text-center">
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
          className="font-display text-justify uppercase tracking-tight leading-[1.16] text-[clamp(1.1rem,2.3vw,1.85rem)] w-full"
          style={{ textAlignLast: "justify" }}
        >
          <span className="text-foreground/40 font-normal">I&apos;m </span>
          <span style={{ fontFamily: "var(--font-comico)" }} className="text-[#39FF8A]">
            Jonathan Min
          </span>
          <span className="text-foreground font-medium">
            , a web designer who spent years as a marketing director. I
            don&apos;t just make sites look good, I build them around proven
            frameworks like StoryBrand so your message actually converts
            visitors into customers.
          </span>
        </motion.h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ ...ENTER_TRANSITION, delay: ENTER_DELAY.cta }}
        >
          <CTAButton href="#intake">Start a project</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
