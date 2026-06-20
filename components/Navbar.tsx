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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? "bg-[#0A0A0A]/98 border-b border-[#EAEAEA]/10"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between h-14 border-b border-[#EAEAEA]/8">

            {/* Logo */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-[#EAEAEA] group"
              aria-label="Jonathan Min home"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[#EAEAEA]/30 group-hover:text-[#E61919] transition-colors duration-150"
                aria-hidden
              >
                <line x1="5" y1="0" x2="5" y2="10" />
                <line x1="0" y1="5" x2="10" y2="5" />
              </svg>
              <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-[#EAEAEA]/70 group-hover:text-[#EAEAEA] transition-colors duration-150 uppercase">
                JM <span className="text-[#EAEAEA]/30">®</span>
              </span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center list-none" role="list">
              {NAV_LINKS.map((item, i) => (
                <li key={item} className="border-l border-[#EAEAEA]/10 first:border-l-0">
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[#EAEAEA]/35 hover:text-[#EAEAEA] hover:bg-[#EAEAEA]/5 transition-all duration-150 px-5 py-4 inline-block"
                  >
                    <span className="text-[#EAEAEA]/20 mr-1.5">0{i + 2}</span>
                    {item}
                  </a>
                </li>
              ))}
              <li className="border-l border-[#EAEAEA]/10 ml-2">
                <a
                  href="#contact"
                  className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[#E61919] border border-[#E61919]/40 hover:bg-[#E61919] hover:text-[#0A0A0A] px-4 py-2 ml-4 inline-block transition-all duration-150"
                >
                  [ CONTACT ↗ ]
                </a>
              </li>
            </ul>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-[#EAEAEA]/50 hover:text-[#EAEAEA] transition-colors duration-150 p-1 border border-[#EAEAEA]/10"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
            >
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                {menuOpen ? (
                  <>
                    <line x1="1" y1="1" x2="17" y2="11" />
                    <line x1="17" y1="1" x2="1" y2="11" />
                  </>
                ) : (
                  <>
                    <line x1="0" y1="1" x2="18" y2="1" />
                    <line x1="0" y1="6" x2="18" y2="6" />
                    <line x1="0" y1="11" x2="18" y2="11" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-[#0A0A0A] border-b border-[#EAEAEA]/10"
          >
            {NAV_LINKS.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[#EAEAEA]/40 hover:text-[#EAEAEA] py-4 px-6 border-b border-[#EAEAEA]/8 flex items-center gap-3 transition-colors duration-150"
              >
                <span className="text-[#EAEAEA]/20">0{i + 2}</span>
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-[#E61919] border-t border-[#E61919]/20 px-6 py-4 block text-center transition-colors duration-150"
            >
              [ CONTACT ↗ ]
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
