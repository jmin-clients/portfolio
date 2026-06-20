"use client";

import { motion, useReducedMotion } from "motion/react";

export default function StatementBreak() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#0a0a0a] hairline py-28 overflow-hidden" aria-label="Statement">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Oversized headline with inline image */}
          <h2
            className="font-display uppercase text-[#f0efe9] leading-none tracking-tight"
            style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
          >
            BUILT{" "}
            <span className="inline-block relative align-middle" style={{ width: "clamp(4rem, 10vw, 10rem)", height: "clamp(2.8rem, 7vw, 7rem)", verticalAlign: "middle", margin: "0 0.08em" }}>
              {/* [PLACEHOLDER: inline screenshot or personal photo] */}
              <span
                className="absolute inset-0 bg-[#1c1c1a] border border-[#f0efe9]/08 flex items-center justify-center"
                aria-hidden
              >
                <span className="font-mono text-[0.4rem] text-[#f0efe9]/20 uppercase tracking-widest text-center leading-relaxed px-1">
                  [PHOTO]
                </span>
              </span>
            </span>{" "}
            WITH
            <br />
            INTENT.
          </h2>

          {/* Supporting line */}
          <p className="font-sans text-base text-[#f0efe9]/40 max-w-sm mt-10 leading-relaxed">
            Every decision has a reason. Every pixel, every millisecond, every line of code — deliberate.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
