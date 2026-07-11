"use client";

import { createBayerDitherDataUrl } from "@/lib/dither";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

// Ported from ../original-plan/components/ui/background-gradient-animation.tsx.
// Same mesh-gradient blob technique (overlapping elliptical radial gradients
// per blob, blur, screen blend, cursor-proximity drift) recolored to a
// monochrome off-white glow. Two treatments layered on top of the original:
// an SVG "goo" filter (blur + alpha-contrast) so overlapping blobs fuse into
// metaball-like liquid shapes instead of just softly overlapping, and a
// Bayer 8x8 ordered-dither overlay, rendered blocky with
// `image-rendering: pixelated`, for an exaggerated 8-bit tech texture.
const DRIFT_RADIUS = 350;
const MAX_DRIFT = 22;
const LERP = 0.03;

// Blob colors are sourced from the theme tokens (--foreground for the light
// "highlight" layer, --surface for the darker undertone layer) via
// `color-mix()` instead of fixed hex, so the mesh inverts along with the
// rest of the page. Only the color source changed here — same layer
// structure, alphas, positions, and motion as before.
const BLOBS = [
  {
    bg: [
      "radial-gradient(ellipse 48% 78% at 35% 28%, color-mix(in srgb, var(--foreground) 40%, transparent) 0%, color-mix(in srgb, var(--foreground) 22%, transparent) 30%, color-mix(in srgb, var(--foreground) 8%, transparent) 52%, transparent 66%)",
      "radial-gradient(ellipse 70% 44% at 68% 72%, color-mix(in srgb, var(--surface) 60%, transparent) 0%, color-mix(in srgb, var(--surface) 30%, transparent) 52%, transparent 70%)",
    ].join(", "),
    anim: "animate-first",
    posTop: "-2%",
    posLeft: "2%",
  },
  {
    bg: [
      "radial-gradient(ellipse 78% 46% at 28% 55%, color-mix(in srgb, var(--foreground) 36%, transparent) 0%, color-mix(in srgb, var(--foreground) 19%, transparent) 30%, color-mix(in srgb, var(--foreground) 6%, transparent) 52%, transparent 70%)",
      "radial-gradient(ellipse 48% 74% at 74% 34%, color-mix(in srgb, var(--surface) 60%, transparent) 0%, color-mix(in srgb, var(--surface) 28%, transparent) 50%, transparent 68%)",
    ].join(", "),
    anim: "animate-second",
    posTop: "48%",
    posLeft: "50%",
  },
  {
    // Accent blob (1 of 2), kept faint, one of the permitted highlights in the ghost field.
    bg: [
      "radial-gradient(ellipse 58% 76% at 52% 40%, rgba(57,255,136,0.13) 0%, rgba(57,255,136,0.06) 30%, rgba(57,255,136,0.02) 52%, transparent 68%)",
      "radial-gradient(ellipse 68% 40% at 24% 76%, color-mix(in srgb, var(--foreground) 8%, transparent) 0%, color-mix(in srgb, var(--foreground) 3%, transparent) 54%, transparent 68%)",
    ].join(", "),
    anim: "animate-third",
    posTop: "0%",
    posLeft: "48%",
  },
  {
    bg: [
      "radial-gradient(ellipse 84% 44% at 50% 44%, color-mix(in srgb, var(--foreground) 34%, transparent) 0%, color-mix(in srgb, var(--foreground) 18%, transparent) 30%, color-mix(in srgb, var(--foreground) 6%, transparent) 54%, transparent 72%)",
      "radial-gradient(ellipse 46% 64% at 20% 68%, color-mix(in srgb, var(--surface) 50%, transparent) 0%, color-mix(in srgb, var(--surface) 22%, transparent) 52%, transparent 66%)",
    ].join(", "),
    anim: "animate-fourth",
    posTop: "50%",
    posLeft: "2%",
  },
  {
    // Accent blob (2 of 2), same restrained opacity as the other accent blob.
    bg: [
      "radial-gradient(ellipse 62% 72% at 42% 46%, rgba(57,255,136,0.13) 0%, rgba(57,255,136,0.06) 30%, rgba(57,255,136,0.02) 52%, transparent 70%)",
      "radial-gradient(ellipse 64% 52% at 65% 44%, color-mix(in srgb, var(--surface) 56%, transparent) 0%, color-mix(in srgb, var(--surface) 24%, transparent) 52%, transparent 68%)",
    ].join(", "),
    anim: "animate-fifth",
    posTop: "22%",
    posLeft: "22%",
  },
] as const;

export function AnimatedBackground({ className }: { className?: string }) {
  const gooId = useId().replace(/:/g, "");
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ditherRef = useRef<HTMLDivElement>(null);
  const cursor = useRef({ x: -9999, y: -9999 });
  const [isSafari, setIsSafari] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!ditherRef.current) return;
    ditherRef.current.style.backgroundImage = `url(${createBayerDitherDataUrl()})`;
  }, []);

  // Proximity drift, blobs gently attract toward the cursor. Skipped entirely
  // under reduced motion; the blobs still sit in their static CSS positions.
  useEffect(() => {
    if (reducedMotion) return;
    const cur = blobRefs.current.map(() => ({ x: 0, y: 0 }));
    let rafId: number;

    const tick = () => {
      const cx = cursor.current.x;
      const cy = cursor.current.y;

      blobRefs.current.forEach((blob, i) => {
        if (!blob) return;
        const rect = blob.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;
        const dx = bx - cx;
        const dy = by - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        let tx = 0;
        let ty = 0;
        if (dist < DRIFT_RADIUS) {
          const strength = (1 - dist / DRIFT_RADIUS) * MAX_DRIFT;
          tx = -(dx / dist) * strength;
          ty = -(dy / dist) * strength;
        }

        cur[i].x += (tx - cur[i].x) * LERP;
        cur[i].y += (ty - cur[i].y) * LERP;
        blob.style.setProperty("translate", `${cur[i].x.toFixed(1)}px ${cur[i].y.toFixed(1)}px`);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cursor.current.x = e.clientX;
    cursor.current.y = e.clientY;
  };
  const handleMouseLeave = () => {
    cursor.current = { x: -9999, y: -9999 };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        background: "linear-gradient(160deg, var(--surface) 0%, var(--surface-2) 100%)",
      }}
    >
      {/* Goo filter: blur then sharpen the alpha channel so overlapping blobs
          fuse into one liquid membrane instead of just softly overlapping. */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={gooId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="goo" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ filter: `url(#${gooId})` }}>
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            ref={(el) => {
              blobRefs.current[i] = el;
            }}
            style={{
              background: blob.bg,
              filter: isSafari ? "blur(12px)" : "blur(18px)",
              mixBlendMode: "screen",
              top: blob.posTop,
              left: blob.posLeft,
            }}
            className={cn("absolute w-[52%] h-[52%]", blob.anim)}
          />
        ))}
      </div>

      {/* Edge vignette, deepens toward the corners, toward the mesh's own
          bottom-gradient tone (--surface-2) rather than a fixed black, so it
          stays coherent with the mesh in both themes instead of forcing dark
          corners onto a light-mode hero. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 58% at 50% 50%, transparent 25%, color-mix(in srgb, var(--surface-2) 58%, transparent) 100%)",
        }}
      />

      <div
        ref={ditherRef}
        className="absolute inset-0"
        style={{
          backgroundRepeat: "repeat",
          backgroundSize: "26px 26px",
          imageRendering: "pixelated",
          opacity: 0.4,
          mixBlendMode: "overlay",
          filter: "contrast(1.25)",
        }}
      />
    </div>
  );
}
