"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="bg-[#0D0D0D] border-t border-[#EAEAEA]/10 py-24"
      aria-labelledby="projects-title"
    >
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="flex items-center gap-0 mb-16 border-b border-[#EAEAEA]/10 pb-5"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="font-mono text-[0.5rem] tracking-[0.25em] text-[#EAEAEA]/20 uppercase">
            // 04 — DEPLOYED ASSETS
          </span>
          <div className="flex-1 h-px bg-[#EAEAEA]/8 mx-6" aria-hidden />
          <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
            D-04 / ACTIVE
          </span>
        </motion.div>

        {/* Section title + CTA */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <motion.h2
            className="font-heading text-[#EAEAEA] uppercase leading-[0.9] tracking-[-0.03em]"
            id="projects-title"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.05, ease }}
          >
            SELECTED
            <br />
            PROJECTS.
          </motion.h2>

          <motion.a
            href="#contact"
            className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] border border-[#EAEAEA]/20 text-[#EAEAEA]/40 hover:border-[#E61919] hover:text-[#E61919] px-6 py-4 transition-all duration-150 whitespace-nowrap self-end"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            [ START A PROJECT ↗ ]
          </motion.a>
        </div>

        {/* Project entry */}
        <motion.article
          className="group border border-[#EAEAEA]/10 hover:border-[#EAEAEA]/20 transition-colors duration-200"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          aria-label="Project: On The Campus"
        >
          {/* Asset header */}
          <div className="border-b border-[#EAEAEA]/8 px-6 py-3 flex items-center justify-between bg-[#111111]">
            <samp className="font-mono text-[0.45rem] tracking-[0.22em] text-[#E61919] uppercase">
              ASSET: 01 / 01
            </samp>
            <samp className="font-mono text-[0.45rem] tracking-[0.18em] text-[#EAEAEA]/20 uppercase">
              DEPLOYED — 2024
            </samp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-px bg-[#EAEAEA]/8">

            {/* Thumbnail */}
            <a
              href="https://onthecampus.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit On The Campus live site (opens in new tab)"
              className="block"
              tabIndex={-1}
            >
              <div
                className="w-full aspect-video relative overflow-hidden bg-[#0D0D0D]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(234,234,234,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(234,234,234,0.06) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              >
                {/* Red left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E61919]" aria-hidden />

                {/* Blueprint content */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden
                >
                  <div className="text-center">
                    <div className="font-heading text-[#EAEAEA]/6 uppercase tracking-tight leading-none"
                      style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}>
                      ON THE
                      <br />
                      CAMPUS
                    </div>
                    <div className="font-mono text-[0.45rem] tracking-[0.25em] text-[#EAEAEA]/15 mt-3 uppercase">
                      ONTHECAMPUS.ORG
                    </div>
                  </div>
                </div>

                {/* Corner registration marks */}
                <div className="absolute top-4 left-6 w-4 h-4 border-t-2 border-l-2 border-[#EAEAEA]/15" aria-hidden />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#EAEAEA]/15" aria-hidden />
                <div className="absolute bottom-4 left-6 w-4 h-4 border-b-2 border-l-2 border-[#EAEAEA]/15" aria-hidden />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#EAEAEA]/15" aria-hidden />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/50 transition-colors duration-200 flex items-center justify-center">
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#EAEAEA] border border-[#EAEAEA]/50 px-5 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    [&gt;&gt;&gt; VISIT SITE ↗]
                  </span>
                </div>
              </div>
            </a>

            {/* Project details */}
            <div className="bg-[#0D0D0D] p-8 flex flex-col justify-between">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-px mb-6">
                  {["Webflow", "Web Design", "2024"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.45rem] tracking-[0.18em] text-[#EAEAEA]/30 border border-[#EAEAEA]/12 px-2.5 py-1.5 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-heading text-[#EAEAEA] uppercase leading-[0.9] tracking-[-0.02em] mb-6"
                    style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)" }}>
                  <a
                    href="https://onthecampus.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E61919] transition-colors duration-150"
                  >
                    ON THE CAMPUS —
                    <br />
                    CAMPUS NEWS WEBSITE
                  </a>
                </h3>

                <div className="h-px bg-[#EAEAEA]/8 mb-6" aria-hidden />

                <p className="font-mono text-[0.6025rem] text-[#EAEAEA]/40 leading-[1.85] tracking-[0.04em] mb-8 uppercase">
                  Redesigned website for CAMPUS ministries, a Michigan Conference
                  branch of Public Campus Ministries reaching collegiate communities
                  on secular universities across the region.
                </p>
              </div>

              <a
                href="https://onthecampus.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[#EAEAEA]/40 border border-[#EAEAEA]/15 hover:border-[#E61919] hover:text-[#E61919] px-5 py-3.5 inline-flex items-center gap-3 transition-all duration-150 self-start"
              >
                [&gt;&gt;&gt; VISIT SITE ↗]
              </a>
            </div>
          </div>
        </motion.article>

        {/* Footer note */}
        <motion.div
          className="border-t border-[#EAEAEA]/8 mt-px pt-4 flex items-center justify-between"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
        >
          <samp className="font-mono text-[0.4rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
            ASSETS ON RECORD: 01 // MORE IN DEVELOPMENT
          </samp>
        </motion.div>

      </div>
    </section>
  );
}
