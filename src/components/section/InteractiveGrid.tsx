"use client";

import { useEffect, useRef } from "react";

type InteractiveGridProps = {
  className?: string;
  cellSize?: number;
  glowRadius?: number;
};

export function InteractiveGrid({
  className,
  cellSize = 32,
  glowRadius = 220,
}: InteractiveGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let raf = 0;
    let nextX = 0;
    let nextY = 0;
    let active = false;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        if (active) {
          active = false;
          el.style.setProperty("--ig-opacity", "0");
        }
        return;
      }

      nextX = e.clientX - rect.left;
      nextY = e.clientY - rect.top;
      if (!active) {
        active = true;
        el.style.setProperty("--ig-opacity", "1");
      }
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--ig-mx", `${nextX}px`);
          el.style.setProperty("--ig-my", `${nextY}px`);
          raf = 0;
        });
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const baseGrid =
    "linear-gradient(to right, rgba(120,120,120,0.08) 1px, transparent 1px)," +
    "linear-gradient(to bottom, rgba(120,120,120,0.08) 1px, transparent 1px)";

  const highlightGrid =
    "linear-gradient(to right, rgba(var(--primary-rgb),0.55) 1px, transparent 1px)," +
    "linear-gradient(to bottom, rgba(var(--primary-rgb),0.55) 1px, transparent 1px)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        ["--ig-mx" as string]: "50%",
        ["--ig-my" as string]: "50%",
        ["--ig-opacity" as string]: "0",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: baseGrid,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--ig-opacity)",
          backgroundImage: highlightGrid,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          maskImage: `radial-gradient(circle ${glowRadius}px at var(--ig-mx) var(--ig-my), #000 0%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle ${glowRadius}px at var(--ig-mx) var(--ig-my), #000 0%, transparent 80%)`,
        }}
      />
    </div>
  );
}
