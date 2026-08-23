"use client";

import { useState } from "react";

const TOPICS = [
  {
    name: "Networking",
    description: "Subnetting, routing, VLANs, and the protocols that move packets, explained the way I wish someone had explained them to me.",
  },
  {
    name: "Cybersecurity Fundamentals",
    description: "Threat models, hardening checklists, and the difference between security theater and security that actually holds up.",
  },
  {
    name: "Home Lab",
    description: "pfSense, VLAN segmentation, self-hosted services, and the hardware and mistakes behind every one of them.",
  },
  {
    name: "Linux & Systems",
    description: "Command-line notes, permissions, and the unglamorous plumbing that keeps everything else running.",
  },
  {
    name: "Scripting & Automation",
    description: "Python and shell scripts that turn a manual checklist into something that just runs itself.",
  },
  {
    name: "Write-ups & Notes",
    description: "Lab logs and long-form notes I come back to later, when I've forgotten how I did something.",
  },
];

export default function FocusAreas() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="focus" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4 flex flex-col gap-8">
          <span className="font-medium text-[0.7rem] uppercase tracking-[0.16em] text-foreground/40">
            What I write about
          </span>

          <blockquote className="border-l border-[#39FF8A] pl-5">
            <p className="text-foreground/60 text-lg leading-relaxed">
              &ldquo;I&apos;m learning this in public. Expect corrections,
              updates, and the occasional &lsquo;I was wrong about
              this.&rsquo;&rdquo;
            </p>
            <footer className="mt-3 font-medium text-[0.7rem] uppercase tracking-[0.1em] text-foreground/35">
              A note on this blog
            </footer>
          </blockquote>
        </div>

        <div className="md:col-span-8">
          <ul className="list-none" role="list">
            {TOPICS.map((topic, i) => {
              const isActive = i === activeIndex;
              const baseOpacity = 1 - (i / (TOPICS.length - 1)) * 0.7;
              return (
                <li
                  key={topic.name}
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
                      {topic.name}
                    </span>
                  </div>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 pl-9 text-foreground/50 max-w-[52ch]">
                        {topic.description}
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
