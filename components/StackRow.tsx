"use client";

import { motion, useReducedMotion } from "motion/react";

const stack = [
  { name: "React", label: "UI LIBRARY" },
  { name: "Next.js", label: "FRAMEWORK" },
  { name: "TypeScript", label: "LANGUAGE" },
  { name: "Node.js", label: "RUNTIME" },
  { name: "PostgreSQL", label: "DATABASE" },
  { name: "Tailwind", label: "STYLING" },
  { name: "Vercel", label: "PLATFORM" },
  { name: "Figma", label: "DESIGN" },
];

export default function StackRow() {
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="bg-[#0a0a0a] hairline py-16"
      aria-labelledby="stack-title"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-20">

          {/* Left label */}
          <div className="md:w-48 flex-shrink-0">
            <p id="stack-title" className="font-sans text-sm text-[#f0efe9]/40 leading-snug">
              Stack & tools I build with
            </p>
          </div>

          {/* Right grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#f0efe9]/06">
              {stack.map(({ name, label }, i) => (
                <motion.div
                  key={name}
                  className="bg-[#0a0a0a] px-5 py-6 flex flex-col gap-3"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <p className="font-sans text-base font-medium text-[#f0efe9]/80">{name}</p>
                  <p className="font-mono text-[0.5rem] tracking-[0.18em] text-[#f0efe9]/25">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
