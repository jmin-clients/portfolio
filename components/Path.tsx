"use client";

import { motion, useReducedMotion } from "motion/react";

const CREDENTIALS = [
  { name: "B.S. Cybersecurity", org: "WGU", status: "In progress" },
  { name: "Security+", org: "CompTIA", status: "In progress" },
  { name: "CCNA", org: "Cisco", status: "In progress" },
  { name: "CySA+", org: "CompTIA", status: "In progress" },
];

export default function Path() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="path" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
          Path to SOC
        </span>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {CREDENTIALS.map((cred, i) => (
            <motion.div
              key={cred.name}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8 flex flex-col gap-3"
            >
              <span
                style={{ fontFamily: "var(--font-tanker)" }}
                className="text-[clamp(1.15rem,2vw,1.5rem)] text-foreground leading-none"
              >
                {cred.status}
              </span>
              <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-brand-fg">
                {cred.name}
              </span>
              <p className="text-foreground/45 text-sm">{cred.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
