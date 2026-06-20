"use client";

// TODO (Option B): pinned headline / image punch-through interaction — revisit
// when there are 2+ real project images to crossfade between.

import { motion, useReducedMotion } from "motion/react";

const SUBTITLE =
  "Full-stack web developer crafting fast, accessible, and beautifully designed digital experiences from pixel-perfect interfaces to robust back-end systems.";

const ease = [0.16, 1, 0.3, 1] as const;

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.028, delayChildren: 0.72 },
  },
};

const wordItem = {
  hidden: { opacity: 0.08 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex items-end bg-ink-bg pb-20 pt-32"
      aria-label="Introduction"
    >
      <div className="w-full max-w-7xl mx-auto px-6">

        <motion.p
          className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-fg/35 mb-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          01 — AVAILABLE
        </motion.p>

        <motion.h1
          className="font-sans font-medium text-[clamp(2.75rem,7vw,6rem)] leading-[1.05] tracking-[-0.025em] text-ink-fg mb-10 max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          Hello, I&apos;m{" "}
          <span className="text-ink-fg/50">Jonathan Min</span>
          <br />
          I build for the web.
        </motion.h1>

        {reduce ? (
          <p className="font-sans text-base md:text-lg text-ink-fg/50 max-w-xl leading-relaxed mb-14">
            {SUBTITLE}
          </p>
        ) : (
          <motion.p
            className="font-sans text-base md:text-lg text-ink-fg/50 max-w-xl leading-relaxed mb-14"
            variants={wordContainer}
            initial="hidden"
            animate="visible"
          >
            {SUBTITLE.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordItem}
                className="inline-block mr-[0.28em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        )}

        <motion.div
          className="flex items-center gap-4 flex-wrap"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease }}
        >
          <a
            href="#projects"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-bg bg-ink-fg hover:bg-ink-fg/85 px-6 py-3.5 transition-colors duration-200"
          >
            View My Work ↓
          </a>
          <a
            href="#contact"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-fg border border-ink-fg/35 hover:border-ink-fg px-6 py-3.5 transition-colors duration-200"
          >
            Say Hello ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
