"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const slides = [
  {
    stat: "1",
    caption: "Production site shipped and live",
    quote:
      "The web is everyone's first impression of what you've built. I work with the conviction that what you ship should be worthy of the person behind it — precise, fast, and genuinely considered.",
  },
  {
    stat: "2+",
    caption: "Years building products on the web",
    quote:
      "Speed without craft is noise. I care about both — Lighthouse scores and the micro-detail that makes someone linger longer than they planned to. Both matter. Neither is optional.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function StatCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go(current === 0 ? slides.length - 1 : current - 1);
  const next = () => go(current === slides.length - 1 ? 0 : current + 1);

  const slide = slides[current];

  return (
    <section
      id="about"
      className="relative bg-[#0a0a0a] hairline py-24 overflow-hidden"
      aria-label="About Jonathan Min"
    >
      {/* Oversized dim background wordmark */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
      >
        <p
          className="font-display text-[#8a8a85]/08 uppercase whitespace-nowrap leading-none tracking-tight"
          style={{ fontSize: "clamp(4rem, 15vw, 15rem)", marginBottom: "-0.1em" }}
        >
          ABOUT
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — arrows, counter, stat */}
          <div>
            {/* Arrow nav + counter */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <button
                  onClick={prev}
                  className="w-8 h-8 border border-[#f0efe9]/15 flex items-center justify-center text-[#f0efe9]/50 hover:text-[#f0efe9] hover:border-[#f0efe9]/35 transition-all duration-200 rounded-full"
                  aria-label="Previous slide"
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M13 5H1M1 5L5 1M1 5L5 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-8 h-8 border border-[#f0efe9]/15 flex items-center justify-center text-[#f0efe9]/50 hover:text-[#f0efe9] hover:border-[#f0efe9]/35 transition-all duration-200 rounded-full"
                  aria-label="Next slide"
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M1 5H13M13 5L9 1M13 5L9 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <span className="font-mono text-[0.625rem] tracking-[0.15em] text-[#f0efe9]/30">
                {String(current + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Big stat */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stat-${current}`}
                initial={reduce ? false : { opacity: 0, y: direction * 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <p
                  className="font-display text-[#f0efe9] leading-none tracking-tight mb-3"
                  style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
                >
                  {slide.stat}
                </p>
                <p className="font-sans text-sm text-[#f0efe9]/45 leading-snug max-w-[18ch]">
                  {slide.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — fade-tail philosophy quote */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${current}`}
                initial={reduce ? false : { opacity: 0, y: direction * 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -10 }}
                transition={{ duration: 0.35, ease }}
                className="fade-tail"
              >
                <p className="font-sans text-[clamp(1.1rem,2.2vw,1.5rem)] text-[#f0efe9] leading-[1.55] font-medium">
                  {slide.quote}
                </p>
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-8 h-8 rounded-full bg-[#1c1c1a] border border-[#f0efe9]/10 flex items-center justify-center">
                    <span className="font-sans text-[0.5rem] text-[#f0efe9]/40">JM</span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-[#f0efe9]/80">Jonathan Min</p>
                    <p className="font-sans text-xs text-[#f0efe9]/35">Full-Stack Developer</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
