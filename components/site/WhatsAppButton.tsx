"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

/**
 * Zwevende WhatsApp-knop. Verschijnt na de hero en verdwijnt zodra
 * het contactblok of de footer in beeld is, zodat hij nooit iets blokkeert.
 */
export function WhatsAppButton() {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setPastHero(y > window.innerHeight * 0.7);
      // Op mobiel: verberg tijdens naar beneden scrollen, zodat de knop nooit over tekst blijft hangen
      if (Math.abs(y - lastY) > 6) {
        setScrollingDown(y > lastY && window.innerWidth < 640);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["faq", "contact", "offerte"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const footer = document.querySelector("footer");
    if (footer) targets.push(footer);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
        setNearEnd(visible.size > 0);
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !nearEnd && !scrollingDown;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur Tam een WhatsApp-bericht (opent WhatsApp)"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-1 rounded-full border border-white/10 bg-ink/85 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-[#05230f] transition-transform duration-500 group-hover:rotate-[-10deg]">
        <WhatsAppIcon width={24} height={24} />
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.9375rem] font-medium opacity-0 transition-[max-width,opacity,margin] duration-500 ease-[var(--ease-out-expo)] group-hover:mr-4 group-hover:max-w-[8rem] group-hover:opacity-100 group-focus-visible:mr-4 group-focus-visible:max-w-[8rem] group-focus-visible:opacity-100 sm:block">
        App met Tam
      </span>
    </a>
  );
}
