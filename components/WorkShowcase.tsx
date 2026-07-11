"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

// 3 placeholder entries now, data-driven so it's ready for the full 9 later.
const PROJECTS = [
  {
    name: "Ridgeline Coffee Co.",
    tags: "E-commerce, Brand",
    description:
      "A direct-to-consumer storefront and subscription flow built to replace three disconnected tools with one.",
    image: "https://picsum.photos/seed/ridgeline-coffee-roastery/640/480",
  },
  {
    name: "Marrow & Oak",
    tags: "Portfolio, Catalog",
    description:
      "A catalog site structured around how commissions actually get sold: by the piece, not the page.",
    image: "https://picsum.photos/seed/marrow-oak-woodworking/640/480",
  },
  {
    name: "Hazel Grove Dental",
    tags: "Local business, Booking",
    description:
      "A booking-first rebuild that cut new-patient form abandonment and gave the front desk one less phone call to make.",
    image: "https://picsum.photos/seed/hazel-grove-dental/640/480",
  },
];

export default function WorkShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
          Selected work
        </span>

        <ul className="list-none mt-8" role="list">
          {PROJECTS.map((project, i) => (
            <motion.li
              key={project.name}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-border last:border-b py-8 md:py-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                <span
                  style={{ fontFamily: "var(--font-tanker)" }}
                  className="hidden md:block md:col-span-1 text-[0.85rem] text-[#39FF8A]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-5 flex flex-col gap-2">
                  <h3 className="font-display font-medium text-[clamp(1.35rem,2.5vw,1.85rem)] text-foreground">
                    {project.name}
                  </h3>
                  <span className="font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
                    {project.tags}
                  </span>
                </div>

                <p className="md:col-span-4 text-foreground/50 text-sm">
                  {project.description}
                </p>

                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <div className="relative w-20 h-14 overflow-hidden border border-border shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.name} project thumbnail`}
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="text-foreground/30 transition-all duration-300 group-hover:text-[#39FF8A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
