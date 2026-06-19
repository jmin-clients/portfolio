"use client";

import { motion, useReducedMotion } from "motion/react";
import { Monitor, Stack, Database, Wrench } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

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
      className="bg-zinc-50 py-28"
      aria-labelledby="skills-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-[-0.025em] text-zinc-950 mb-4"
            id="skills-title"
          >
            My Tech Stack
          </h2>
          <p className="text-[1.0625rem] text-zinc-500 leading-[1.7] max-w-[580px] mx-auto">
            Tools and technologies I use to bring ideas to life, from initial
            design to production deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillSets.map(({ icon: Icon, title, pills }, i) => (
            <motion.article
              key={title}
              className="bg-white border border-zinc-200 rounded-xl p-7 hover:-translate-y-1 hover:shadow-xl hover:border-blue-600/20 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
            >
              <div className="w-11 h-11 bg-blue-600/10 rounded-md flex items-center justify-center mb-4 text-blue-600">
                <Icon size={22} aria-hidden />
              </div>
              <h3 className="text-[1rem] font-bold text-zinc-950 mb-3">{title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="text-[0.75rem] font-medium text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
