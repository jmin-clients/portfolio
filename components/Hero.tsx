"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Introduction"
    >
      {/* Atmospheric blob background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 50% 58%, rgba(52,51,47,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 35% 30% at 28% 48%, rgba(36,35,33,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 25% 20% at 72% 52%, rgba(32,31,30,0.25) 0%, transparent 55%)
          `,
        }}
      />

      {/* Hero content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-40">
        <motion.p
          className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#f0efe9]/35 mb-8"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Full-Stack Web Developer
        </motion.p>

        <motion.h1
          className="font-sans font-semibold text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.12] tracking-[-0.025em] text-[#f0efe9] max-w-2xl mb-5"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          I build digital experiences for founders who mean business.
        </motion.h1>

        <motion.p
          className="font-sans text-base text-[#f0efe9]/45 max-w-lg leading-relaxed mb-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Full-stack developer with an eye for design — from fast, accessible interfaces to the back-end systems that make them work.
        </motion.p>

        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium bg-[#f0efe9] text-[#0a0a0a] px-6 py-3 rounded-full hover:bg-[#f0efe9]/85 transition-colors duration-200"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 font-sans text-sm text-[#f0efe9]/55 border border-[#f0efe9]/15 px-6 py-3 rounded-full hover:border-[#f0efe9]/35 hover:text-[#f0efe9]/80 transition-all duration-200"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Oversized name — bleeds off the bottom, grey display layer */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p
          className="font-display text-[#8a8a85]/35 uppercase whitespace-nowrap leading-none tracking-tight"
          style={{ fontSize: "clamp(5rem, 18vw, 18rem)", marginBottom: "-0.15em" }}
        >
          JONATHAN MIN
        </p>
      </motion.div>
    </section>
  );
}
