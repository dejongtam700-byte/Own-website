"use client";

import { useEffect, useRef } from "react";
import { finalCta } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { WhatsAppCta } from "./WhatsAppCta";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  // Een zacht spotlicht volgt de cursor (alleen muis, geen reduced-motion)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="grain relative isolate overflow-hidden border-t border-line py-28 sm:py-40 lg:py-48"
      aria-labelledby="contact-title"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mx)_var(--my),rgba(90,215,238,0.11),transparent_65%)] transition-[background] duration-300" />
        {/* horizon: een dunne gloeiende boog onderin */}
        <div className="absolute left-1/2 top-[80%] aspect-square w-[180vw] max-w-[2400px] -translate-x-1/2 rounded-full border-t border-signal/30 bg-[radial-gradient(closest-side,rgba(8,11,18,1)_96%,transparent)] shadow-[0_-30px_120px_-20px_rgba(90,215,238,0.35),0_-10px_60px_-10px_rgba(143,133,255,0.25)]" />
      </div>

      <div className="container-x text-center">
        <Reveal as="h2" className="display mx-auto text-[clamp(2.6rem,8.4vw,7.25rem)]">
          <span id="contact-title">
            {finalCta.title.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </span>
        </Reveal>
        <Reveal as="p" delay={120} className="mx-auto mt-8 max-w-[34rem] text-[1.125rem] leading-relaxed text-mist sm:text-[1.25rem]">
          {finalCta.text}
        </Reveal>
        <Reveal delay={220} className="mt-12 flex flex-col items-center gap-5">
          <WhatsAppCta label={finalCta.cta} size="lg" />
          <p className="text-[0.9375rem] text-haze">
            Liever bellen?{" "}
            <a href={`tel:+${site.whatsapp.number}`} className="text-mist underline decoration-line-strong underline-offset-4 hover:text-paper">
              {site.whatsapp.display}
            </a>
            <span className="sr-only">. Of </span>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="sr-only">
              stuur een WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
