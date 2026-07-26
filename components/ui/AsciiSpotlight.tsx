"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Ambient/hot glyph ramp, dimmest to brightest under the cursor
const GLYPHS = ["·", ".", ":", "+", "*"] as const;
const CELL_SIZE = 24;
const RADIUS = 200;
const AMBIENT_OPACITY = 0.1; // matches the site's ghost-type resting opacity (8-15%)
const HOT_OPACITY = 0.85;
const LERP = 0.15;
const MOVE_THROTTLE_MS = 16;
const DIRTY_EPSILON = 0.05;

const AMBIENT_RGB = [240, 238, 233] as const; // --foreground
const HOT_RGB = [57, 255, 138] as const; // #39FF8A brand accent

/**
 * Fixed-grid glyph background that lights up in a soft radial falloff
 * around the cursor. Purely decorative: absolutely fills its nearest
 * positioned ancestor, ignores pointer events, and reads mouse position
 * from that ancestor rather than the canvas itself.
 */
export default function AsciiSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const parent = container?.parentElement;
    if (!container || !canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const pointer = { x: -9999, y: -9999, active: false };
    const target = { x: -9999, y: -9999, active: false };
    const lastDrawn = { x: NaN, y: NaN, active: false };

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL_SIZE);
      rows = Math.ceil(height / CELL_SIZE);
      lastDrawn.active = false;
      lastDrawn.x = NaN;
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    let lastMoveTime = 0;
    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastMoveTime < MOVE_THROTTLE_MS) return;
      lastMoveTime = now;
      const rect = parent!.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.active = true;
    }
    function handleMouseLeave() {
      target.active = false;
    }

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    let rafId = 0;
    function render() {
      pointer.x += (target.x - pointer.x) * LERP;
      pointer.y += (target.y - pointer.y) * LERP;
      pointer.active = target.active;

      const settled =
        pointer.active === lastDrawn.active &&
        Math.abs(pointer.x - lastDrawn.x) < DIRTY_EPSILON &&
        Math.abs(pointer.y - lastDrawn.y) < DIRTY_EPSILON;

      if (!settled) {
        drawGrid(ctx!, width, height, cols, rows, pointer);
        lastDrawn.x = pointer.x;
        lastDrawn.y = pointer.y;
        lastDrawn.active = pointer.active;
      }

      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cols: number,
  rows: number,
  pointer: { x: number; y: number; active: boolean }
) {
  ctx.clearRect(0, 0, width, height);
  ctx.font = "11px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * CELL_SIZE + CELL_SIZE / 2;
      const y = row * CELL_SIZE + CELL_SIZE / 2;

      let t = 0;
      if (pointer.active) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        t = Math.max(0, 1 - dist / RADIUS);
        t = t * t; // soften the falloff edge
      }

      const opacity = AMBIENT_OPACITY + t * (HOT_OPACITY - AMBIENT_OPACITY);
      const r = AMBIENT_RGB[0] + (HOT_RGB[0] - AMBIENT_RGB[0]) * t;
      const g = AMBIENT_RGB[1] + (HOT_RGB[1] - AMBIENT_RGB[1]) * t;
      const b = AMBIENT_RGB[2] + (HOT_RGB[2] - AMBIENT_RGB[2]) * t;
      const glyph = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(t * GLYPHS.length))];

      ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${opacity.toFixed(3)})`;
      ctx.fillText(glyph, x, y);
    }
  }
}
