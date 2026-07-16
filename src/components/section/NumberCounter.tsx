"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const formatter = new Intl.NumberFormat("es-CO");

type NumberCounterProps = {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
};

export function NumberCounter({
  value,
  duration = 1.5,
  className,
  suffix = "",
  prefix = "",
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (value <= 0) {
      setCount(0);
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCount(value);
      return;
    }

    let frameId: number;
    let start: number | null = null;
    const totalMs = duration * 1000;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter.format(count)}
      {suffix}
    </span>
  );
}
