"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, type JSX } from "react";

export default function ThemeToggle(): JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // mounted must flip post-mount so theme reads are hydration-safe; there is
    // no external-system subscription to move this into, it's a one-time
    // client-only flag.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex size-9 items-center justify-center rounded-sm border border-border bg-foreground/[0.06] text-foreground backdrop-blur-md transition-colors hover:bg-foreground/[0.12] active:translate-y-px"
    >
      {mounted ? (
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="sun"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Sun size={18} weight="bold" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Moon size={18} weight="bold" />
            </motion.span>
          )}
        </AnimatePresence>
      ) : (
        <span className="opacity-0">
          <Sun size={18} weight="bold" />
        </span>
      )}
    </button>
  );
}
