"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    number: "01",
    heading: "Start with the brief",
    body: "Every project begins with listening. I ask a lot of questions — about your goals, your users, your constraints, and what success actually looks like to you — before writing a single line of code.",
  },
  {
    number: "02",
    heading: "Design in the open",
    body: "I share early. Rough wireframes, visual directions, component sketches. Getting your eyes on work before it's polished means we course-correct fast, not late — and you're never surprised by what launches.",
  },
  {
    number: "03",
    heading: "Ship, then stay",
    body: "Launch is a milestone, not the finish line. I stay available after go-live to catch the edge cases real users always find. Your site going live is the beginning of its relationship with the world.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      className="bg-[#0a0a0a] hairline overflow-hidden"
      aria-labelledby="process-title"
    >
      {/* Section title — oversized, viewport-width */}
      <div className="overflow-hidden border-b border-[#f0efe9]/08">
        <motion.h2
          id="process-title"
          className="font-display uppercase text-[#f0efe9] leading-none tracking-tight px-6 pt-10 pb-6"
          style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
        >
          HOW I WORK
        </motion.h2>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-6">
        {steps.map(({ number, heading, body }, i) => (
          <motion.div
            key={number}
            className="grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr] gap-6 lg:gap-12 py-14 border-b border-[#f0efe9]/08 last:border-b-0 items-start"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease }}
          >
            {/* Step label */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-[#f0efe9]/30 uppercase">
                STEP • {number}
              </span>
            </div>

            {/* Heading + body */}
            <div>
              <h3 className="font-sans text-xl font-semibold text-[#f0efe9] tracking-tight mb-3">
                {heading}
              </h3>
              <p className="font-sans text-sm text-[#f0efe9]/45 leading-relaxed">
                {body}
              </p>
            </div>

            {/* Photo placeholder */}
            <div className="aspect-[4/3] bg-[#111110] border border-[#f0efe9]/06 flex items-center justify-center">
              {/* [PLACEHOLDER: Add a real photo here — desk setup, working, candid shot] */}
              <span className="font-mono text-[0.45rem] tracking-widest text-[#f0efe9]/15 uppercase text-center px-4 leading-loose">
                [ PHOTO<br />PLACEHOLDER ]
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
