"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-zinc-50/85 backdrop-blur-md border-b border-zinc-200/70"
            : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            <a
              href="#"
              className="text-[1.125rem] font-bold tracking-[-0.02em] text-zinc-950 hover:text-blue-600 transition-colors"
              aria-label="Jonathan Min home"
            >
              JM<span className="text-blue-600">.</span>
            </a>

            <ul className="hidden md:flex items-center gap-2 list-none" role="list">
              <li>
                <a
                  href="#about"
                  className="text-[0.9rem] font-medium text-zinc-500 px-3.5 py-2 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-all"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-[0.9rem] font-medium text-zinc-500 px-3.5 py-2 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-all"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-[0.9rem] font-medium text-zinc-500 px-3.5 py-2 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-all"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[0.875rem] font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-md transition-colors"
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>

            <button
              className="md:hidden p-2 rounded-md hover:bg-zinc-100 transition-colors text-zinc-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="nav-menu"
            className="md:hidden bg-zinc-50/95 backdrop-blur-md border-b border-zinc-200 px-6 pb-5 pt-3 flex flex-col gap-1"
          >
            <a href="#about" onClick={closeMenu} className="text-[0.9rem] font-medium text-zinc-500 px-3.5 py-3 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-all">About</a>
            <a href="#skills" onClick={closeMenu} className="text-[0.9rem] font-medium text-zinc-500 px-3.5 py-3 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-all">Skills</a>
            <a href="#projects" onClick={closeMenu} className="text-[0.9rem] font-medium text-zinc-500 px-3.5 py-3 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-all">Projects</a>
            <a href="#contact" onClick={closeMenu} className="text-[0.875rem] font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-3 rounded-md transition-colors mt-1 text-center">
              Let&apos;s Talk
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
