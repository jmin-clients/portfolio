"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowSquareOut } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="bg-paper-bg border-t border-dashed border-paper-fg/15 py-28"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-paper-fg/35 mb-4">
              WORK — 01/01
            </p>
            <h2
              className="font-sans font-medium text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-paper-fg"
              id="projects-title"
            >
              Selected Projects
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper-fg border border-paper-fg/30 hover:border-paper-fg hover:bg-paper-fg hover:text-paper-bg px-5 py-3 transition-all duration-200 whitespace-nowrap"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            Start a Project ↗
          </motion.a>
        </div>

        <motion.article
          className="group"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease }}
        >
          <a
            href="https://onthecampus.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit On The Campus live site"
            tabIndex={-1}
          >
            <div
              className="w-full aspect-video relative overflow-hidden border border-paper-fg/10"
              style={{
                background:
                  "linear-gradient(135deg, #dce9fa 0%, #c8d9f5 50%, #b8c9eb 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-25"
                aria-hidden
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(10,10,9,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,9,0.3) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center font-sans font-medium text-2xl tracking-tight text-paper-fg/20"
                aria-hidden
              >
                On The Campus
              </div>
              <div className="absolute inset-0 bg-paper-fg/0 group-hover:bg-paper-fg/40 transition-colors duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper-bg border border-paper-bg/60 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowSquareOut size={12} aria-hidden />
                  Visit Site
                </span>
              </div>
            </div>
          </a>

          <div className="pt-6 pb-10 border-b border-dashed border-paper-fg/15">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-paper-fg/35">2024</span>
                <span className="font-mono text-[0.6875rem] border border-paper-fg/20 text-paper-fg/50 px-2 py-0.5">
                  Webflow
                </span>
                <span className="font-mono text-[0.6875rem] border border-paper-fg/20 text-paper-fg/50 px-2 py-0.5">
                  Web Design
                </span>
              </div>
            </div>
            <h3 className="font-sans font-medium text-xl text-paper-fg tracking-tight mb-2">
              <a
                href="https://onthecampus.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper-fg/60 transition-colors duration-200"
              >
                On The Campus - Campus News Website
              </a>
            </h3>
            <p className="font-sans text-sm text-paper-fg/55 leading-relaxed max-w-2xl">
              Redesigned website for CAMPUS ministries, a Michigan Conference
              branch of Public Campus Ministries mainly reaching to collegiate
              on secular universities.
            </p>
          </div>
        </motion.article>

      </div>
    </section>
  );
}
