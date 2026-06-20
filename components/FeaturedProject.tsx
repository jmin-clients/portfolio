"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturedProject() {
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="bg-[#e8e6df] hairline py-24"
      aria-labelledby="work-title"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section eyebrow */}
        <motion.p
          className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#1a1a18]/35 mb-14"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          Selected Work
        </motion.p>

        {/* Project card */}
        <motion.article
          className="group"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

            {/* Screenshot / thumbnail */}
            <a
              href="https://onthecampus.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit On The Campus (opens in new tab)"
              className="block"
            >
              <div
                className="w-full aspect-video relative overflow-hidden bg-[#d8d5cc] border border-[#1a1a18]/08 group-hover:opacity-90 transition-opacity duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(26,26,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,0.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              >
                {/* Grid overlay content */}
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <span
                    className="font-sans font-medium text-[#1a1a18]/15 text-center leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}
                  >
                    On The Campus
                  </span>
                </div>
                {/* Hover state */}
                <div className="absolute inset-0 bg-[#1a1a18]/0 group-hover:bg-[#1a1a18]/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="font-sans text-xs font-medium text-[#e8e6df] bg-[#1a1a18]/70 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Visit site ↗
                  </span>
                </div>
              </div>
            </a>

            {/* Project details */}
            <div className="lg:pt-2">
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono text-[0.5rem] tracking-[0.18em] text-[#1a1a18]/35 uppercase">ss</span>
                <span className="font-mono text-[0.5rem] tracking-[0.12em] text-[#1a1a18]/25">←</span>
                <span className="font-mono text-[0.5rem] tracking-[0.12em] text-[#1a1a18]/40 border border-[#1a1a18]/20 px-1.5 py-0.5">01/01</span>
              </div>

              <h2
                id="work-title"
                className="font-sans text-xl font-semibold text-[#1a1a18] tracking-tight mb-3"
              >
                On The Campus
              </h2>

              <p className="font-sans text-sm text-[#1a1a18]/55 leading-relaxed mb-8">
                Redesigned website for CAMPUS ministries — a Michigan Conference branch of Public Campus Ministries reaching collegiate students on secular universities across the Midwest.
              </p>

              {/* Metric — real outcome placeholder */}
              <div className="border-t border-[#1a1a18]/10 pt-6 mb-8">
                <p
                  className="font-sans font-semibold text-[#1a1a18] leading-none mb-2"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                >
                  {/* [PLACEHOLDER: Add a real metric when available — e.g. "↑ 40% traffic" or "Built in 3 weeks"] */}
                  Live
                </p>
                <p className="font-sans text-xs text-[#1a1a18]/40">
                  Shipped and serving real users at onthecampus.org
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Webflow", "Web Design", "2024"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.5rem] tracking-[0.15em] text-[#1a1a18]/45 border border-[#1a1a18]/15 px-2.5 py-1 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="https://onthecampus.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#1a1a18] border border-[#1a1a18]/25 px-4 py-2.5 rounded-full hover:bg-[#1a1a18] hover:text-[#e8e6df] transition-all duration-200"
              >
                Visit site
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </motion.article>

      </div>
    </section>
  );
}
