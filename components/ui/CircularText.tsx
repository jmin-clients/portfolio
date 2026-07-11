"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect } from "react";

// Ported from reactbits.dev's CircularText (text-animations/circular-text),
// Tailwind + TypeScript variant, adapted to this codebase's conventions:
// named export, cn() class merging, and a useReducedMotion() gate (the
// upstream version spins forever with no reduced-motion handling).
type OnHoverBehavior = "slowDown" | "speedUp" | "pause" | "goBonkers";

type CircularTextProps = {
  text: string;
  spinDuration?: number;
  onHover?: OnHoverBehavior;
  className?: string;
};

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: "spring" as const, damping: 20, stiffness: 300 },
});

export function CircularText({ text, spinDuration = 20, onHover = "speedUp", className }: CircularTextProps) {
  const reduceMotion = useReducedMotion();
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation, reduceMotion]);

  const handleHoverStart = () => {
    if (reduceMotion || !onHover) return;
    const start = rotation.get();

    let transitionConfig: ReturnType<typeof getTransition> | { rotate: object; scale: object };
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    if (reduceMotion) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={cn(
        "relative mx-auto w-[200px] h-[200px] origin-center cursor-pointer rounded-full text-center font-black text-white",
        className
      )}
      style={{ rotate: reduceMotion ? 0 : rotation }}
      initial={{ rotate: 0 }}
      animate={reduceMotion ? undefined : controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inset-0 inline-block text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
}
