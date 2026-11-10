"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

/**
 * Lichte scroll-reveal zonder animatiebibliotheek.
 * Eén gedeelde IntersectionObserver voor de hele pagina; respecteert prefers-reduced-motion via CSS.
 */
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );
  return observer;
}

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
};

export function Reveal({ as: Tag = "div", delay = 0, className = "", children, style, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el || !io) return;
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
