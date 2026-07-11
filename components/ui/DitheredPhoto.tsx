"use client";

import { createBayerDitherDataUrl } from "@/lib/dither";
import { User } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Same 8-bit Bayer ordered-dither treatment as AnimatedBackground (shared via
// lib/dither), applied over a grayscale/high-contrast photo so the portrait
// and the site background read as one consistent tech texture.
export function DitheredPhoto({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const ditherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ditherRef.current) return;
    ditherRef.current.style.backgroundImage = `url(${createBayerDitherDataUrl()})`;
  }, []);

  return (
    <div className={cn("relative aspect-square overflow-hidden bg-[#1a1a1a] border border-white/10", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 320px, 60vw"
          className="object-cover grayscale contrast-125 brightness-90"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center grayscale contrast-125" aria-label="Photo placeholder">
          <User size={56} weight="thin" className="text-white/25" />
        </div>
      )}
      <div
        ref={ditherRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundRepeat: "repeat",
          backgroundSize: "8px 8px",
          imageRendering: "pixelated",
          opacity: 0.45,
          mixBlendMode: "overlay",
          filter: "contrast(1.3)",
        }}
      />
    </div>
  );
}
