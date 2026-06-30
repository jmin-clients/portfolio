"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "motion/react";
import { MixedText } from "./MixedText";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Wordmark — letter-level Bitcount pairing on the J */}
          <a
            href="#"
            className="font-mono text-[1rem] font-bold tracking-[0.04em] uppercase text-[#f0efe9] hover:text-[#f0efe9]/70 transition-colors duration-200"
            aria-label="Jonathan Min — home"
          >
            <MixedText
              segments={[
                { text: "J", accent: true },
                { text: "MIN" },
              ]}
              accentClassName="font-accent font-bold"
            />
          </a>

          {/* Desktop nav links — center */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-mono text-[0.75rem] text-[#f0efe9]/45 hover:text-[#f0efe9] transition-colors duration-200 tracking-[0.04em]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA — solid fill, square-ish, arrow icon */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.05em] font-bold bg-[#f0efe9] text-[#0a0a0a] px-4 py-2 rounded-sm hover:bg-[#f0efe9]/88 active:scale-[0.98] transition-all duration-200"
          >
            Start a project
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#f0efe9]/55 hover:text-[#f0efe9] transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              {menuOpen ? (
                <>
                  <line x1="1" y1="1" x2="19" y2="11" />
                  <line x1="19" y1="1" x2="1" y2="11" />
                </>
              ) : (
                <>
                  <line x1="0" y1="1" x2="20" y2="1" />
                  <line x1="0" y1="6" x2="20" y2="6" />
                  <line x1="0" y1="11" x2="20" y2="11" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-[#0a0a0a]/96 backdrop-blur-md border-t border-[#f0efe9]/08 px-6 py-4"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-mono text-[0.875rem] text-[#f0efe9]/55 hover:text-[#f0efe9] py-3 border-b border-[#f0efe9]/06 last:border-b-0 transition-colors duration-200 tracking-[0.03em]"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 mb-2 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold bg-[#f0efe9] text-[#0a0a0a] px-4 py-2.5 rounded-sm tracking-[0.05em]"
              >
                Start a project ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
