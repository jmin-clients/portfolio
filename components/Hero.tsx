"use client";

import { motion, useReducedMotion } from "motion/react";
import { Desktop, ChatCircle } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  };
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex items-center pt-[72px]"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 text-center">
        <motion.div
          {...(reduce ? {} : fadeUp(0.1))}
          className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-blue-600 bg-blue-600/8 border border-blue-600/20 px-3.5 py-1.5 rounded-full mb-7"
          aria-hidden
        >
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
          Available for new projects
        </motion.div>

        <motion.h1
          {...(reduce ? {} : fadeUp(0.2))}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-zinc-950 mb-6"
        >
          Hi, I&apos;m <span className="text-blue-600">Jonathan Min</span>
          <br />
          I build for the web.
        </motion.h1>

        <motion.p
          {...(reduce ? {} : fadeUp(0.3))}
          className="text-[1.0625rem] md:text-xl font-normal text-zinc-500 max-w-[560px] mx-auto mb-10 leading-relaxed"
        >
          Full-stack web developer crafting fast, accessible, and beautifully
          designed digital experiences from pixel-perfect interfaces to robust
          back-end systems.
        </motion.p>

        <motion.div
          {...(reduce ? {} : fadeUp(0.4))}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold px-7 py-3.5 rounded-md bg-blue-600 text-white shadow-[0_1px_3px_rgba(37,99,235,.3)] hover:bg-blue-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,.35)] active:translate-y-0 transition-all duration-150"
          >
            <Desktop size={18} aria-hidden />
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold px-7 py-3.5 rounded-md bg-white text-zinc-950 border border-zinc-200 shadow-sm hover:bg-zinc-50 hover:border-zinc-400 hover:-translate-y-px active:translate-y-0 transition-all duration-150"
          >
            <ChatCircle size={18} aria-hidden />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
