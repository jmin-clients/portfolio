"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Statement() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="statement" className="py-24 md:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-3 flex flex-col gap-2">
          <span
            style={{ fontFamily: "var(--font-tanker)" }}
            className="text-[clamp(2.5rem,5vw,4rem)] text-[#39FF8A] leading-none"
          >
            48HR
          </span>
          <span className="text-foreground/40 text-sm max-w-[20ch]">
            Average first response time on a new inquiry
          </span>
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-9 font-display font-medium text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] text-foreground"
        >
          Good design does not decorate a business. It removes the friction
          between someone finding you and someone hiring you.
        </motion.p>
      </div>
    </section>
  );
}
