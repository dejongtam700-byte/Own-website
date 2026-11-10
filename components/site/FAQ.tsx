"use client";

import { useId, useState } from "react";
import { faq } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { PlusIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" className="relative border-t border-line py-24 sm:py-32 lg:py-40" aria-labelledby="faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal as="h2" className="heading text-[clamp(2.4rem,5vw,4rem)]">
              <span id="faq-title">{faq.title}</span>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-6 max-w-[22rem] leading-relaxed text-mist">
              Staat je vraag er niet bij?{" "}
              <a
                href={whatsappLink("Hoi Tam, ik heb een vraag over een website: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline decoration-signal/60 underline-offset-[5px] hover:decoration-signal"
              >
                Stuur me gerust een berichtje.
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-8">
          <ul className="border-t border-line">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              const btnId = `${uid}-q-${i}`;
              const panelId = `${uid}-a-${i}`;
              return (
                <li key={item.q} className="border-b border-line">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                    >
                      <span className={`heading text-[1.25rem] transition-colors duration-300 sm:text-[1.5rem] ${isOpen ? "text-paper" : "text-paper/85 group-hover:text-paper"}`}>
                        {item.q}
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[transform,border-color,color,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                          isOpen ? "rotate-45 border-signal/50 bg-signal/10 text-signal" : "border-line-strong text-mist group-hover:border-paper/40"
                        }`}
                        aria-hidden
                      >
                        <PlusIcon width={18} height={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="max-w-[42rem] pb-7 pr-14 leading-relaxed text-mist">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
