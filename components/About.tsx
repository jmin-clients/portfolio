"use client";

import { motion, useReducedMotion } from "motion/react";
import { Download } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

const tags = ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "UI/UX"];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="bg-white py-28" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          <motion.div
            className="relative max-w-[400px] mx-auto w-full aspect-square"
            initial={reduce ? false : { opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease }}
          >
            <div
              className="absolute inset-[-16px] rounded-[28px] -rotate-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-[-1deg] hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.02))",
              }}
              aria-hidden
            />
            <div
              className="relative w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 rounded-[28px] overflow-hidden shadow-xl flex items-center justify-center"
              role="img"
              aria-label="Jonathan Min avatar with initials JM"
            >
              <span
                className="text-[6rem] font-extrabold text-blue-600/40 tracking-[-0.04em] select-none"
                aria-hidden
              >
                JM
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="text-xs font-bold tracking-[0.1em] uppercase text-blue-600 mb-3 block">
              About Me
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-[-0.025em] leading-[1.15] text-zinc-950 mb-4"
              id="about-title"
            >
              Turning ideas into
              <br />
              polished products.
            </h2>
            <p className="text-[1.0625rem] text-zinc-500 leading-[1.7] mb-3">
              I&apos;m a web developer with a passion for building thoughtful
              digital experiences. I love working at the intersection of design
              and engineering, making things that are not just functional, but
              genuinely a joy to use.
            </p>
            <p className="text-[1.0625rem] text-zinc-500 leading-[1.7] mb-6">
              When I&apos;m not coding, you&apos;ll find me exploring new
              frameworks, contributing to open source, or hunting down the best
              coffee in the city.
            </p>

            <div className="flex flex-wrap gap-2 mb-9">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.8125rem] font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full hover:bg-blue-600/8 hover:border-blue-600/25 hover:text-blue-600 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold px-7 py-3.5 rounded-md bg-blue-600 text-white shadow-[0_1px_3px_rgba(37,99,235,.3)] hover:bg-blue-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,.35)] active:translate-y-0 transition-all duration-150"
            >
              <Download size={18} aria-hidden />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
