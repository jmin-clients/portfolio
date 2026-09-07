"use client";

import { useState } from "react";

const REASONS = [
  {
    name: "Home lab first",
    description:
      "Every concept gets tested on my own OptiPlex, Proxmox, and OPNsense setup before it goes in a post. If I can't reproduce it, I don't write about it.",
  },
  {
    name: "Built for SOC work",
    description:
      "The lab exists to practice the actual job: watching logs, tuning detections, and telling a false positive from a real one, not just drawing network diagrams.",
  },
  {
    name: "Structured, not just self-taught",
    description:
      "WGU coursework and CompTIA/Cisco certifications give the theory a place to land. The lab is where that theory gets tested against something real.",
  },
  {
    name: "Documented in public",
    description:
      "Posts get published while I'm still learning, not after I've mastered the topic. When I get something wrong later, I go back and fix it.",
  },
  {
    name: "Plain language",
    description:
      "Fewer acronyms, more actual explanations of what's happening on the wire and why it matters.",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="about" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4 flex flex-col gap-8">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
            Why cybersecurity
          </span>

          <blockquote className="border-l border-[#39FF8A] pl-5">
            <p className="text-foreground/60 text-lg leading-relaxed">
              &ldquo;The goal isn&apos;t a blog. It&apos;s proof I can do this
              work before someone hires me to do it.&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="md:col-span-8">
          <ul className="list-none" role="list">
            {REASONS.map((reason, i) => {
              const isActive = i === activeIndex;
              const baseOpacity = 1 - (i / (REASONS.length - 1)) * 0.7;
              return (
                <li
                  key={reason.name}
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
                      className="font-display font-medium text-[clamp(1.25rem,2.8vw,2rem)] text-foreground transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : baseOpacity }}
                    >
                      {reason.name}
                    </span>
                  </div>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 pl-9 text-foreground/50 max-w-[56ch]">
                        {reason.description}
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
