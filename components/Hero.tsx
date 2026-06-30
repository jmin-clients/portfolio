'use client';

import { useScroll, useTransform, motion, useReducedMotion } from 'motion/react';
import ChromaticBlob from './ChromaticBlob';
import IntakeForm from './IntakeForm';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll-linked parallax: text drifts up as user scrolls off the hero
  const textY = useTransform(scrollY, [0, 600], [0, -60]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0.55]);

  return (
    <section
      id="intake"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero"
    >
      {/* Chromatic blob — hero background accent, left side */}
      <ChromaticBlob className="absolute left-[-60px] top-[12%] w-[620px] h-[520px] opacity-75" />

      {/* 12-col grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT — eyebrow + headline + subtext */}
          <motion.div
            className="lg:col-span-7 flex flex-col"
            style={reduce ? {} : { y: textY, opacity: textOpacity }}
          >
            {/* Eyebrow */}
            <p
              className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#f5f5f0]/32 mb-8"
              aria-hidden
            >
              Full-stack web developer
            </p>

            {/* H1 — Archivo Black, 2 lines */}
            <h1 className="font-black text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.04] tracking-tight text-[#f5f5f0] mb-6">
              Shipped fast.
              <br />
              Built to last.
            </h1>

            {/* Subtext — 18 words */}
            <p className="text-[#f5f5f0]/45 text-base leading-relaxed max-w-[38ch]">
              Design-led development for founders who want a site that works as hard as
              they do.
            </p>
          </motion.div>

          {/* RIGHT — intake form card */}
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease }}
          >
            {/* Glass card */}
            <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-md overflow-hidden">
              {/* Card header */}
              <div className="px-8 pt-7 pb-0 border-b border-white/[0.06]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#f5f5f0]/28 mb-1">
                  Start a project
                </p>
                <p className="text-[#f5f5f0]/55 text-sm leading-snug pb-5">
                  Answer a few quick questions and I'll be in touch within 24 hours.
                </p>
              </div>

              <IntakeForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
