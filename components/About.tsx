"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const profile = [
  { label: "DESIGNATION", value: "Jonathan Min" },
  { label: "CLASS", value: "Full-Stack Engineer" },
  { label: "SPECIALIZATION", value: "Web Systems / Interface Eng." },
  { label: "LOCATION", value: "United States" },
  { label: "STATUS", value: "ACTIVE — AVAILABLE" },
];

const tags = ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "UI/UX"];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="bg-[#0D0D0D] border-t border-[#EAEAEA]/10 py-24"
      aria-labelledby="about-title"
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
            // 02 — IDENTITY PROFILE
          </span>
          <div className="flex-1 h-px bg-[#EAEAEA]/8 mx-6" aria-hidden />
          <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
            D-02 / ACTIVE
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-px bg-[#EAEAEA]/8">

          {/* Left: Blueprint avatar + profile data */}
          <motion.div
            className="bg-[#0D0D0D] p-0"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            {/* Crosshair avatar */}
            <div
              className="relative border border-[#EAEAEA]/10 aspect-square flex items-center justify-center overflow-hidden"
              role="img"
              aria-label="Jonathan Min avatar — initials JM with blueprint crosshair"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(234,234,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(234,234,234,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              {/* Crosshair lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <div className="absolute w-full h-px bg-[#E61919]/20" />
                <div className="absolute h-full w-px bg-[#E61919]/20" />
                <div className="w-3 h-3 border border-[#E61919]/50 rounded-full absolute" />
              </div>
              <span
                className="font-heading text-[#EAEAEA]/6 tracking-tight select-none uppercase"
                style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
                aria-hidden
              >
                JM
              </span>
              {/* Corner markers */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#EAEAEA]/20" aria-hidden />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#EAEAEA]/20" aria-hidden />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#EAEAEA]/20" aria-hidden />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#EAEAEA]/20" aria-hidden />
            </div>

            {/* Profile data table */}
            <dl className="border-t border-[#EAEAEA]/10">
              {profile.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`grid grid-cols-[1fr_1.5fr] gap-px bg-[#EAEAEA]/8 ${i > 0 ? "border-t border-[#EAEAEA]/8" : ""}`}
                >
                  <dt className="bg-[#0D0D0D] font-mono text-[0.5rem] tracking-[0.18em] text-[#EAEAEA]/30 uppercase px-4 py-3">
                    {label}
                  </dt>
                  <dd
                    className={`bg-[#0D0D0D] font-mono text-[0.5625rem] tracking-[0.1em] px-4 py-3 ${
                      label === "STATUS"
                        ? "text-[#E61919]"
                        : "text-[#EAEAEA]/60"
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right: Bio + tags + CTA */}
          <motion.div
            className="bg-[#0D0D0D] p-8 lg:p-12 flex flex-col justify-between"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.15, ease }}
          >
            <div>
              <h2
                className="font-heading text-[#EAEAEA] uppercase leading-[0.9] tracking-[-0.03em] mb-8"
                id="about-title"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                TURNING IDEAS INTO
                <br />
                POLISHED PRODUCTS.
              </h2>

              <div className="h-px bg-[#EAEAEA]/10 mb-8" aria-hidden />

              <p className="font-mono text-[0.6875rem] text-[#EAEAEA]/45 leading-[1.85] tracking-[0.03em] mb-4 uppercase">
                Web developer with a passion for building thoughtful digital
                experiences. Working at the intersection of design and
                engineering — making things that are not just functional, but
                genuinely a joy to use.
              </p>
              <p className="font-mono text-[0.6875rem] text-[#EAEAEA]/45 leading-[1.85] tracking-[0.03em] mb-10 uppercase">
                When not coding, exploring new frameworks, contributing to open
                source, or hunting down the best coffee in the city.
              </p>

              {/* Tag grid */}
              <div className="grid-borders mb-10" style={{ gridTemplateColumns: `repeat(${Math.ceil(tags.length / 2)}, 1fr)` }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.5rem] tracking-[0.18em] text-[#EAEAEA]/40 px-3 py-2.5 uppercase bg-[#0D0D0D]"
                  >
                    [ {tag} ]
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#"
              className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[#EAEAEA]/60 border border-[#EAEAEA]/20 hover:border-[#EAEAEA]/50 hover:text-[#EAEAEA] px-6 py-4 inline-flex items-center gap-3 transition-all duration-150 self-start"
            >
              ↓ DOWNLOAD SPECS
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
