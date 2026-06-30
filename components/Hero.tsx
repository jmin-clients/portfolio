"use client";

import { motion, useReducedMotion } from "motion/react";
import { MixedText } from "./MixedText";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Introduction"
    >
      {/* Atmospheric gradient blob */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 50% 72%, rgba(52,50,44,0.60) 0%, transparent 65%),
            radial-gradient(ellipse 45% 35% at 30% 55%, rgba(42,40,36,0.45) 0%, transparent 60%),
            radial-gradient(ellipse 35% 25% at 68% 58%, rgba(38,36,32,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 28% 22% at 50% 38%, rgba(34,32,28,0.22) 0%, transparent 50%)
          `,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-[clamp(10rem,22vw,20rem)]">

        {/*
          H1 — phrase-level font pairing:
          Line 1 in Space Mono, line 2 in Bitcount Prop Single.
          At clamp(1.6rem → 2.8rem), Bitcount's dot-matrix grid is 3–5px
          per dot, making the two fonts clearly distinct.
        */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
        >
          <MixedText
            as="h1"
            block
            segments={[
              { text: "Precise interfaces." },
              { text: "Systems that ship.", accent: true },
            ]}
            className="font-mono font-bold text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.22] tracking-[-0.015em] text-[#f0efe9] mb-6"
            accentClassName="font-accent font-bold"
          />
        </motion.div>

        {/* Supporting line — pure Space Mono, descriptive */}
        <motion.p
          className="font-mono text-[0.8rem] leading-[1.9] tracking-[0.04em] text-[#f0efe9]/38 uppercase"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.52 }}
        >
          Full-stack development&nbsp;&nbsp;/&nbsp;&nbsp;Design-minded
        </motion.p>
      </div>

      {/* Oversized name — grey, bleeds off the bottom */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.28, ease }}
      >
        <p
          className="font-mono font-bold text-[#8a8a85] uppercase whitespace-nowrap leading-[0.88] tracking-tight"
          style={{
            fontSize: "clamp(5.5rem,19vw,21rem)",
            marginBottom: "-0.1em",
          }}
        >
          JONATHAN MIN
        </p>
      </motion.div>
    </section>
  );
}
