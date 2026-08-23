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
            ONGOING
          </span>
          <span className="text-foreground/40 text-sm max-w-[20ch]">
            This list grows as I keep learning, nothing here is finished
          </span>
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-9 font-display font-medium text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] text-foreground"
        >
          Most security incidents are not exotic. They are a default
          password, an open port, and nobody watching the logs.
        </motion.p>
      </div>
    </section>
  );
}
