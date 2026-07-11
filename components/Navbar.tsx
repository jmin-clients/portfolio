"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import ThemeToggle from "@/components/ThemeToggle";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-colors duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="#top"
            style={{ fontFamily: "var(--font-tanker)" }}
            className="text-[1.05rem] tracking-[0.02em] text-foreground hover:text-foreground/70 transition-colors"
            aria-label="Jonathan Min, home"
          >
            JMIN
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <CTAButton href="#intake">Start a project</CTAButton>
          </div>
        </div>
      </nav>
    </header>
  );
}
