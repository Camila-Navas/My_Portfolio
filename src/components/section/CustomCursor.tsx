"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsEnabled(true);
    document.body.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;
      const isClickable = !!target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      setIsHovering(isClickable);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ type: "spring", damping: 30, stiffness: 800, mass: 0.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 200, mass: 0.5 }}
      >
        <div className="w-8 h-8 rounded-full border border-primary/50 backdrop-blur-[2px]" />
      </motion.div>
    </>
  );
}
