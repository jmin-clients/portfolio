"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

// Generic arrow-nav + index-counter carousel ("01/05"), reused wherever the
// site needs to cycle through a small set of items (currently: Lab.tsx's
// lab-node slides). Not a scroll-snap/drag carousel, just prev/next plus a
// counter, matching the rest of the site's restrained motion language.
export function Carousel({ slides }: { slides: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = slides.length;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  return (
    <div className="flex flex-col gap-10">
      <div className="relative min-h-[240px] md:min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="flex items-center justify-center size-9 border border-foreground/15 rounded-sm text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <span
          style={{ fontFamily: "var(--font-tanker)" }}
          className="text-sm text-foreground/50 tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="flex items-center justify-center size-9 border border-foreground/15 rounded-sm text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
