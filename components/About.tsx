"use client";

import { motion, useReducedMotion } from "motion/react";
import { Download } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

const tags = ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "UI/UX"];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="bg-paper-bg border-t border-dashed border-paper-fg/15 py-28"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">

          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <div
              className="w-full aspect-square border border-paper-fg/15 flex items-center justify-center"
              role="img"
              aria-label="Jonathan Min avatar with initials JM"
            >
              <span
                className="font-sans font-medium text-[6rem] text-paper-fg/10 tracking-tight select-none"
                aria-hidden
              >
                JM
              </span>
            </div>
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-dashed border-paper-fg/10 pointer-events-none" aria-hidden />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="font-mono text-[0.6875rem] text-paper-fg/40 mb-5 block">
              About Me
            </span>
            <h2
              className="font-sans font-medium text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-paper-fg mb-6"
              id="about-title"
            >
              Turning ideas into
              <br />
              polished products.
            </h2>
            <p className="font-sans text-[1.0625rem] text-paper-fg/60 leading-[1.75] mb-4">
              I&apos;m a web developer with a passion for building thoughtful
              digital experiences. I love working at the intersection of design
              and engineering, making things that are not just functional, but
              genuinely a joy to use.
            </p>
            <p className="font-sans text-[1.0625rem] text-paper-fg/60 leading-[1.75] mb-8">
              When I&apos;m not coding, you&apos;ll find me exploring new
              frameworks, contributing to open source, or hunting down the best
              coffee in the city.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.6875rem] border border-paper-fg/20 text-paper-fg/60 px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper-fg border border-paper-fg/30 hover:border-paper-fg hover:bg-paper-fg hover:text-paper-bg px-5 py-3.5 transition-all duration-200"
            >
              <Download size={14} aria-hidden />
              Download Resume
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
