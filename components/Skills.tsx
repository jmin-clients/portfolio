"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const skillSets: { code: string; title: string; items: string[] }[] = [
  {
    code: "SYS-A",
    title: "FRONTEND",
    items: ["React 18.x", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    code: "SYS-B",
    title: "BACKEND",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "Prisma"],
  },
  {
    code: "SYS-C",
    title: "DATABASE & CLOUD",
    items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Vercel"],
  },
  {
    code: "SYS-D",
    title: "TOOLING",
    items: ["Git", "Docker", "CI/CD", "Jest", "Figma"],
  },
];

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="bg-[#0A0A0A] border-t border-[#EAEAEA]/10 py-24"
      aria-labelledby="skills-title"
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
            // 03 — CAPABILITY MATRIX
          </span>
          <div className="flex-1 h-px bg-[#EAEAEA]/8 mx-6" aria-hidden />
          <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
            D-03 / ACTIVE
          </span>
        </motion.div>

        {/* Section title */}
        <motion.h2
          className="font-heading text-[#EAEAEA] uppercase leading-[0.9] tracking-[-0.03em] mb-14"
          id="skills-title"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.05, ease }}
        >
          MY TECH
          <br />
          STACK.
        </motion.h2>

        {/* Capability grid */}
        <div className="grid-borders" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {skillSets.map(({ code, title, items }, i) => (
            <motion.div
              key={title}
              className="bg-[#0A0A0A] p-0"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease }}
            >
              {/* Column header */}
              <div className="border-b border-[#EAEAEA]/10 px-5 py-3 flex items-center justify-between">
                <samp className="font-mono text-[0.45rem] tracking-[0.22em] text-[#E61919] uppercase">
                  {code}
                </samp>
                <samp className="font-mono text-[0.45rem] tracking-[0.18em] text-[#EAEAEA]/20 uppercase">
                  {items.length} MODULES
                </samp>
              </div>

              {/* Category label */}
              <div className="px-5 pt-5 pb-3">
                <h3 className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#EAEAEA]/50 uppercase">
                  {title}
                </h3>
              </div>

              {/* Items */}
              <ul className="px-5 pb-6 space-y-0" role="list">
                {items.map((item, j) => (
                  <li
                    key={item}
                    className="font-mono text-[0.5625rem] tracking-[0.1em] text-[#EAEAEA]/40 py-2 border-t border-[#EAEAEA]/6 flex items-center gap-2.5 uppercase"
                  >
                    <span className="w-1 h-1 bg-[#EAEAEA]/20 flex-shrink-0" aria-hidden />
                    {item}
                    <span className="ml-auto text-[0.4rem] tracking-[0.15em] text-[#EAEAEA]/18">
                      {j === 0 ? "ACTIVE" : "LOADED"}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer telemetry */}
        <motion.div
          className="border-t border-[#EAEAEA]/8 mt-px pt-4 flex items-center justify-between"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
        >
          <samp className="font-mono text-[0.4rem] tracking-[0.2em] text-[#EAEAEA]/15 uppercase">
            TOTAL MODULES: 20 // ALL SYSTEMS OPERATIONAL
          </samp>
          <samp className="font-mono text-[0.4rem] tracking-[0.2em] text-[#4AF626] uppercase">
            ● SYS: ONLINE
          </samp>
        </motion.div>

      </div>
    </section>
  );
}
