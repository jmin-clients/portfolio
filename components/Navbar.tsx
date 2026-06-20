"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "motion/react";

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

          {/* Wordmark */}
          <a
            href="#"
            className="font-sans text-sm font-medium tracking-tight text-[#f0efe9] hover:text-[#f0efe9]/70 transition-colors duration-200"
            aria-label="Jonathan Min — home"
          >
            JM
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-sans text-sm text-[#f0efe9]/50 hover:text-[#f0efe9] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA pill */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 font-sans text-sm font-medium bg-[#f0efe9] text-[#0a0a0a] px-5 py-2 rounded-full hover:bg-[#f0efe9]/85 transition-colors duration-200"
          >
            Let&apos;s talk
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
              <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#f0efe9]/60 hover:text-[#f0efe9] transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {menuOpen ? (
                <>
                  <line x1="1" y1="1" x2="21" y2="13" />
                  <line x1="21" y1="1" x2="1" y2="13" />
                </>
              ) : (
                <>
                  <line x1="0" y1="1" x2="22" y2="1" />
                  <line x1="0" y1="7" x2="22" y2="7" />
                  <line x1="0" y1="13" x2="22" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#f0efe9]/08 px-6 py-4"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-sans text-base text-[#f0efe9]/60 hover:text-[#f0efe9] py-3 border-b border-[#f0efe9]/06 last:border-b-0 transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 mb-2 inline-flex items-center gap-1.5 font-sans text-sm font-medium bg-[#f0efe9] text-[#0a0a0a] px-5 py-2.5 rounded-full"
              >
                Let&apos;s talk ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
