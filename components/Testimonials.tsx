"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Jonathan asked better questions about my business than the two agencies I talked to before him combined. The site he built actually sounds like us.",
    name: "Dana Ruiz",
    title: "Owner, Ridgeline Coffee Co.",
    initials: "DR",
  },
  {
    quote:
      "I make furniture, not websites. He handled the parts I didn't understand and never made me feel behind for not knowing them.",
    name: "Miles Okafor",
    title: "Founder, Marrow & Oak",
    initials: "MO",
  },
  {
    quote:
      "Patients stopped calling to ask if we take their insurance because the answer is finally just on the page.",
    name: "Priya Anand",
    title: "Practice Manager, Hazel Grove Dental",
    initials: "PA",
  },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = TESTIMONIALS[index];

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center flex flex-col items-center gap-10">
        <div className="min-h-[220px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.name}
              custom={direction}
              initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, x: direction > 0 ? -24 : 24 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-display font-medium text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.2] text-foreground">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full border border-foreground/15 flex items-center justify-center shrink-0">
                  <span className="font-medium text-[0.75rem] text-foreground/70">
                    {current.initials}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-foreground text-sm font-medium">{current.name}</div>
                  <div className="text-foreground/40 text-sm">{current.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex items-center justify-center size-9 border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors rounded-sm"
          >
            <ArrowLeft size={15} weight="bold" />
          </button>

          <span style={{ fontFamily: "var(--font-tanker)" }} className="text-[0.85rem] text-foreground/40">
            <span className="text-[#39FF8A]">{String(index + 1).padStart(2, "0")}</span>
            {" / "}
            {String(TESTIMONIALS.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex items-center justify-center size-9 border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors rounded-sm"
          >
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
