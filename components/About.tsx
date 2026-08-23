"use client";

import { motion, useReducedMotion } from "motion/react";

const REASONS = [
  {
    big: "Hands-on",
    label: "Approach",
    description: "Everything here gets built, broken, and rebuilt before it gets written up.",
  },
  {
    big: "Self-hosted",
    label: "Home lab",
    description: "Most of what I write about runs on hardware in my own house, not a sandbox.",
  },
  {
    big: "In public",
    label: "Learning style",
    description: "Notes get published while I'm still figuring things out, not after I've mastered them.",
  },
  {
    big: "Plain language",
    label: "Writing style",
    description: "Fewer acronyms, more actual explanations of what's happening on the wire.",
  },
  {
    big: "In progress",
    label: "Degree",
    description: "Working toward a degree in cybersecurity, the home lab is where the coursework actually sinks in.",
  },
  {
    big: "Corrections",
    label: "Standard",
    description: "When I get something wrong later, I go back and fix the post instead of leaving it stale.",
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
          Why I write this
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
