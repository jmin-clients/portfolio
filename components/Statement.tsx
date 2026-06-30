'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function Statement() {
  const reduce = useReducedMotion();

  return (
    <section
      id="statement"
      className="py-32 bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden"
      aria-label="Statement"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-[clamp(2.8rem,9.5vw,9rem)] leading-[1.0] tracking-tight text-[#f5f5f0] uppercase"
        >
          Built with
          <br />
          <span className="text-[#f5f5f0]/18">intent.</span>
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 text-[#f5f5f0]/40 text-base leading-relaxed max-w-[44ch]"
        >
          Every decision has a reason. Every pixel, every millisecond, every line of
          code: deliberate.
        </motion.p>
      </div>
    </section>
  );
}
