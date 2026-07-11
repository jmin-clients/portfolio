"use client";

import { useState } from "react";

const SERVICES = [
  {
    name: "Web Design",
    description: "Interfaces that make the case for your business before a single word is read.",
  },
  {
    name: "Web Development",
    description: "Fast, accessible builds on modern frameworks, not template plugins stacked six deep.",
  },
  {
    name: "AI-Powered Workflows",
    description: "Agentic tools built into delivery, so builds move at a pace legacy shops can't match.",
  },
  {
    name: "Hosting & Maintenance",
    description: "Deployed, monitored, and kept current, so the site stays yours to worry about the least.",
  },
  {
    name: "Content Strategy",
    description: "Copy and structure that guide a visitor toward the one action that matters.",
  },
  {
    name: "Graphic Design",
    description: "Logos, brand marks, and visual systems that hold up outside the browser too.",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4 flex flex-col gap-8">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
            What I do
          </span>

          <blockquote className="border-l border-[#39FF8A] pl-5">
            <p className="text-foreground/60 text-lg leading-relaxed">
              &ldquo;He handled the parts I didn&apos;t understand and never
              made me feel behind for not knowing them.&rdquo;
            </p>
            <footer className="mt-3 font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
              Miles Okafor, Marrow &amp; Oak
            </footer>
          </blockquote>
        </div>

        <div className="md:col-span-8">
          <ul className="list-none" role="list">
            {SERVICES.map((service, i) => {
              const isActive = i === activeIndex;
              const baseOpacity = 1 - (i / (SERVICES.length - 1)) * 0.7;
              return (
                <li
                  key={service.name}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  tabIndex={0}
                  className="border-t border-border last:border-b py-5 md:py-6 cursor-default outline-none"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`text-[0.75rem] transition-colors duration-300 ${
                        isActive ? "text-[#39FF8A]" : "text-foreground/30"
                      }`}
                      style={{ fontFamily: "var(--font-tanker)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display font-medium text-[clamp(1.5rem,3.5vw,2.5rem)] text-foreground transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : baseOpacity }}
                    >
                      {service.name}
                    </span>
                  </div>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 pl-9 text-foreground/50 max-w-[52ch]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
