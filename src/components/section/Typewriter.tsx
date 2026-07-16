"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  className?: string;
  cursorClassName?: string;
};

function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseAfterTyping = 1600,
  pauseAfterDeleting = 350,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [reducedMotion] = useState<boolean>(() => detectReducedMotion());
  const [text, setText] = useState<string>(() =>
    detectReducedMotion() ? words[0] ?? "" : ""
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (words.length === 0) return;
    if (reducedMotion) return;

    const current = words[wordIndex % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        timer = setTimeout(() => setPhase("deleting"), pauseAfterTyping);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
      } else {
        timer = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, pauseAfterDeleting);
      }
    }

    return () => clearTimeout(timer);
  }, [
    text,
    phase,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
    reducedMotion,
  ]);

  return (
    <span className={className} aria-live="polite">
      <span>{text}</span>
      <span
        aria-hidden="true"
        className={
          cursorClassName ??
          "inline-block w-[0.06em] h-[0.9em] align-[-0.1em] ml-1 bg-current animate-pulse"
        }
      />
    </span>
  );
}
