"use client";

import { motion, useReducedMotion } from "motion/react";

const REASONS = [
  {
    big: "48HR",
    label: "Typical response time",
    description: "You'll hear back the same or next business day, not lost in a queue.",
  },
  {
    big: "AI-Augmented",
    label: "Build process",
    description: "Agentic tools are part of how I ship, faster iteration without cutting the craft.",
  },
  {
    big: "Included",
    label: "Hosting & maintenance",
    description: "Deployed, monitored, and kept current. One less vendor for you to manage.",
  },
  {
    big: "IT & CS",
    label: "Background",
    description: "Four years in enterprise IT before development. Uptime and security aren't an afterthought.",
  },
  {
    big: "Design-led",
    label: "Approach",
    description: "Graphic design training means the visual system gets the same attention as the code.",
  },
  {
    big: "Security-first",
    label: "Practice",
    description: "Cybersecurity fundamentals in every build: sane auth, no exposed secrets, hardened defaults.",
  },
];

export default function WhySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="why" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
          Why work with me
        </span>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.label}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8 flex flex-col gap-3"
            >
              <span
                style={{ fontFamily: "var(--font-tanker)" }}
                className="text-[clamp(1.5rem,2.5vw,2.25rem)] text-foreground leading-none"
              >
                {reason.big}
              </span>
              <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-[#39FF8A]">
                {reason.label}
              </span>
              <p className="text-foreground/45 text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
