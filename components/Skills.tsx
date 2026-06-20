"use client";

import { motion, useReducedMotion } from "motion/react";
import { Monitor, Stack, Database, Wrench } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const skillSets: { icon: Icon; title: string; pills: string[] }[] = [
  {
    icon: Monitor,
    title: "Frontend",
    pills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Stack,
    title: "Backend",
    pills: ["Node.js", "Express", "REST APIs", "GraphQL", "Prisma"],
  },
  {
    icon: Database,
    title: "Database & Cloud",
    pills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Vercel"],
  },
  {
    icon: Wrench,
    title: "Tooling",
    pills: ["Git", "Docker", "CI/CD", "Jest", "Figma"],
  },
];

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="bg-ink-bg border-t border-dashed border-ink-fg/10 py-28"
      aria-labelledby="skills-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="font-sans font-medium text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-ink-fg mb-20"
          id="skills-title"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          My Tech Stack
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-4">
          {skillSets.map(({ icon: Icon, title, pills }, i) => (
            <motion.div
              key={title}
              className={cn(
                "py-10 lg:px-8",
                i === 0 && "lg:pl-0",
                i === skillSets.length - 1 && "lg:pr-0",
                i > 0 &&
                  "border-t border-dashed border-ink-fg/15 lg:border-t-0 lg:border-l lg:border-dashed lg:border-ink-fg/15",
              )}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease }}
            >
              <div className="w-9 h-9 border border-ink-fg/20 flex items-center justify-center text-ink-fg/50 mb-5">
                <Icon size={16} weight="thin" aria-hidden />
              </div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-fg/50 mb-4">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="font-mono text-[0.6875rem] border border-ink-fg/15 text-ink-fg/50 px-2 py-0.5"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
