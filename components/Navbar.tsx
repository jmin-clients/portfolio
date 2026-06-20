"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const NAV_LINKS = ["About", "Skills", "Projects"] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-ink-bg/95 backdrop-blur-sm border-b border-ink-fg/10"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            <a
              href="#"
              className="inline-flex items-center gap-2 text-ink-fg group"
              aria-label="Jonathan Min home"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-ink-fg/40 group-hover:text-ink-fg transition-colors duration-200"
                aria-hidden
              >
                <rect x="0.75" y="0.75" width="9.5" height="9.5" />
              </svg>
              <span className="font-mono text-sm tracking-tight">JM</span>
            </a>

            <ul className="hidden md:flex items-center gap-8 list-none" role="list">
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-fg/45 hover:text-ink-fg transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-fg border border-ink-fg/40 hover:border-ink-fg hover:bg-ink-fg hover:text-ink-bg px-4 py-2.5 transition-all duration-200"
                >
                  Let&apos;s talk ↗
                </a>
              </li>
            </ul>

            <button
              className="md:hidden text-ink-fg/60 hover:text-ink-fg transition-colors duration-200 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
            >
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                {menuOpen ? (
                  <>
                    <line x1="1" y1="1" x2="21" y2="15" />
                    <line x1="21" y1="1" x2="1" y2="15" />
                  </>
                ) : (
                  <>
                    <line x1="0" y1="1" x2="22" y2="1" />
                    <line x1="0" y1="8" x2="22" y2="8" />
                    <line x1="0" y1="15" x2="22" y2="15" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-ink-bg border-t border-ink-fg/10 px-6 py-2 flex flex-col"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-fg/50 hover:text-ink-fg py-3.5 border-b border-dashed border-ink-fg/10 last:border-b-0 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-fg border border-ink-fg/40 hover:bg-ink-fg hover:text-ink-bg px-4 py-3 mt-4 mb-2 text-center transition-all duration-200"
            >
              Let&apos;s talk ↗
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
