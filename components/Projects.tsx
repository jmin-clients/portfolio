"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="bg-white py-28"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-[-0.025em] text-zinc-950"
              id="projects-title"
            >
              Selected Projects
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold px-7 py-3.5 rounded-md bg-white text-zinc-950 border border-zinc-200 shadow-sm hover:bg-zinc-50 hover:border-zinc-400 hover:-translate-y-px active:translate-y-0 transition-all duration-150 whitespace-nowrap"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            <ArrowRight size={18} aria-hidden />
            Start a Project
          </motion.a>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <motion.article
            className="col-span-12 md:col-span-8 bg-zinc-50 border border-zinc-200 rounded-[20px] overflow-hidden flex flex-col group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease }}
          >
            <a
              href="https://onthecampus.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit On The Campus live site"
              tabIndex={-1}
            >
              <div
                className="w-full aspect-video relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 50%,#BFDBFE 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(37,99,235,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.2) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold tracking-tight text-blue-600/50"
                  aria-hidden
                >
                  On The Campus
                </div>
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/50 transition-colors duration-[250ms] flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[250ms]">
                    <ArrowSquareOut size={14} aria-hidden />
                    Visit Site
                  </span>
                </div>
              </div>
            </a>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-medium text-zinc-500">2024</span>
                <div className="flex gap-1.5">
                  <span className="text-[0.6875rem] font-semibold text-blue-600 bg-blue-600/8 px-2 py-0.5 rounded">
                    Webflow
                  </span>
                  <span className="text-[0.6875rem] font-semibold text-blue-600 bg-blue-600/8 px-2 py-0.5 rounded">
                    Web Design
                  </span>
                </div>
              </div>
              <h3 className="text-[1.375rem] font-bold text-zinc-950 tracking-tight mb-2">
                <a
                  href="https://onthecampus.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  On The Campus - Campus News Website
                </a>
              </h3>
              <p className="text-sm text-zinc-500 leading-[1.6]">
                Redesigned website for CAMPUS ministries, a Michigan Conference
                branch of Public Campus Ministries mainly reaching to collegiate
                on secular universities.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
