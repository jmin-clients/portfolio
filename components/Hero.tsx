"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="scanlines relative min-h-[100dvh] bg-[#0A0A0A] flex flex-col border-b border-[#EAEAEA]/10 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Top status bar */}
      <div className="border-b border-[#EAEAEA]/8 px-6 flex items-center justify-between h-14 mt-14">
        <motion.span
          className="font-mono text-[0.5rem] tracking-[0.25em] text-[#EAEAEA]/25 uppercase"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          // 01 — IDENTIFICATION PROTOCOL
        </motion.span>
        <motion.span
          className="font-mono text-[0.5rem] tracking-[0.2em] text-[#E61919] flex items-center gap-2 uppercase"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#E61919] animate-pulse"
            aria-hidden
          />
          STATUS: AVAILABLE
        </motion.span>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-end px-6 pb-0 max-w-[1600px] mx-auto w-full">

        {/* Massive name */}
        <motion.h1
          className="font-heading text-[#EAEAEA] uppercase leading-[0.88] tracking-[-0.04em] mb-0 select-none"
          style={{ fontSize: "clamp(4.5rem, 13vw, 15rem)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          aria-label="Jonathan Min"
        >
          JONATHAN
          <br />
          MIN
        </motion.h1>

        {/* Red structural rule */}
        <motion.div
          className="h-[3px] bg-[#E61919] my-5 w-full"
          aria-hidden
          initial={reduce ? false : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
        />

        {/* Sub headline */}
        <motion.p
          className="font-mono text-[#EAEAEA]/60 uppercase tracking-[0.15em] mb-6"
          style={{ fontSize: "clamp(0.75rem, 2.2vw, 1.375rem)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7, ease }}
        >
          BUILDS FOR THE WEB.
        </motion.p>

        {/* Bio */}
        <motion.p
          className="font-mono text-[0.6875rem] text-[#EAEAEA]/35 tracking-[0.04em] max-w-2xl leading-[1.85] mb-10 uppercase"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8, ease }}
        >
          FULL-STACK ENGINEER CRAFTING PRECISION-ENGINEERED DIGITAL SYSTEMS —{" "}
          FROM PIXEL-PERFECT INTERFACES TO ROBUST BACK-END ARCHITECTURES.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-0 flex-wrap mb-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9, ease }}
        >
          <a
            href="#projects"
            className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] bg-[#EAEAEA] text-[#0A0A0A] px-7 py-4 hover:bg-[#E61919] hover:text-[#EAEAEA] transition-colors duration-150 border border-[#EAEAEA]"
          >
            [&gt;&gt;&gt; VIEW WORK ↓]
          </a>
          <a
            href="#contact"
            className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] border border-[#EAEAEA]/25 text-[#EAEAEA]/50 px-7 py-4 hover:border-[#EAEAEA]/60 hover:text-[#EAEAEA] transition-all duration-150 ml-px"
          >
            [&gt;&gt;&gt; CONTACT ↗]
          </a>
        </motion.div>
      </div>

      {/* Bottom telemetry bar */}
      <motion.div
        className="border-t border-[#EAEAEA]/8 px-6 py-3 grid grid-cols-4 gap-px max-w-[1600px] mx-auto w-full mt-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        <data className="font-mono text-[0.45rem] tracking-[0.22em] text-[#EAEAEA]/18 uppercase">
          UNIT / JM-01
        </data>
        <data className="font-mono text-[0.45rem] tracking-[0.22em] text-[#EAEAEA]/18 uppercase text-center">
          REV 3.0
        </data>
        <data className="font-mono text-[0.45rem] tracking-[0.22em] text-[#EAEAEA]/18 uppercase text-center">
          48°52&apos;N 2°20&apos;W
        </data>
        <data className="font-mono text-[0.45rem] tracking-[0.22em] text-[#EAEAEA]/18 uppercase text-right">
          2026
        </data>
      </motion.div>
    </section>
  );
}
