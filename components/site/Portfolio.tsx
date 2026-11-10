import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";
import { concepts, type Concept } from "@/lib/content";
import { whatsappLink, whatsappMessages } from "@/lib/site";
import { ArrowUpRightIcon, CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";

function DeviceStage({ concept, priority }: { concept: Concept; priority?: boolean }) {
  const dark = concept.slug === "garage";
  return (
    <Link
      href={`/concepten/${concept.slug}`}
      className="group/stage relative block overflow-hidden rounded-[1.75rem] p-5 pb-10 outline-offset-4 sm:p-10 sm:pb-16 lg:p-12 lg:pb-20"
      style={{ background: concept.tone }}
      aria-label={`Bekijk het conceptontwerp ${concept.name}`}
    >
      {/* licht op het podium */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(80% 60% at 70% 0%, rgba(242,194,48,0.12), transparent 70%)"
            : "radial-gradient(80% 60% at 30% 0%, rgba(255,255,255,0.55), transparent 70%)",
        }}
        aria-hidden
      />

      {/* desktop */}
      <div className="relative overflow-hidden rounded-[0.75rem] bg-[#0f1520] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.08)] transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/stage:-translate-y-1.5">
        <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-[#151b27] px-3">
          <span className="h-2 w-2 rounded-full bg-[#ff6b62]/80" />
          <span className="h-2 w-2 rounded-full bg-[#f5bf4f]/80" />
          <span className="h-2 w-2 rounded-full bg-[#3fc66b]/80" />
          <span className="mx-auto rounded-full bg-white/5 px-4 text-[0.6875rem] leading-[1.15rem] text-mist">{concept.url}</span>
        </div>
        {/* Bij hover scrolt de volledige pagina langzaam voorbij */}
        <div className="relative aspect-[16/10] overflow-hidden [container-type:size]">
          <Image
            src={asset(`/concepts/${concept.slug}-full.webp`)}
            alt={`Desktopontwerp van ${concept.name}`}
            width={1200}
            height={3000}
            priority={priority}
            sizes="(min-width: 1024px) 55vw, 92vw"
            className="absolute left-0 top-0 h-auto w-full transition-transform duration-[5000ms] ease-[cubic-bezier(0.45,0,0.25,1)] group-hover/stage:translate-y-[calc(-100%+100cqh)] motion-reduce:transition-none"
          />
        </div>
      </div>

      {/* mobiel */}
      <div className="absolute bottom-4 right-4 w-[24%] min-w-[92px] max-w-[170px] rounded-[1.4rem] bg-[#0a0d13] p-[5px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/stage:-translate-y-3 sm:bottom-6 sm:right-7 lg:right-9">
        <div className="relative overflow-hidden rounded-[1.1rem]">
          <Image
            src={asset(`/concepts/${concept.slug}-mobile.webp`)}
            alt={`Mobiel ontwerp van ${concept.name}`}
            width={520}
            height={1126}
            sizes="170px"
            className="block h-auto w-full"
          />
          <span className="absolute left-1/2 top-1.5 h-[9px] w-[34%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
        </div>
      </div>
    </Link>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative border-t border-line py-24 sm:py-32 lg:py-40" aria-labelledby="portfolio-title">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal as="h2" className="heading text-[clamp(2.4rem,5.4vw,4.5rem)] lg:col-span-7">
            <span id="portfolio-title">Design dat voor zichzelf spreekt.</span>
          </Reveal>
          <Reveal as="p" delay={100} className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-mist lg:col-span-5 lg:justify-self-end">
            Drie conceptontwerpen voor verschillende branches, elk met een eigen identiteit. Het zijn uitgewerkte, klikbare demo&apos;s die laten zien hoe ik denk en ontwerp. Geen bestaande klanten.
          </Reveal>
        </div>

        <div className="mt-16 space-y-24 sm:space-y-32 lg:mt-24">
          {concepts.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={c.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14" aria-labelledby={`concept-${c.slug}`}>
                <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                  <DeviceStage concept={c} priority={i === 0} />
                </Reveal>
                <Reveal delay={120} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2.5 text-[0.8125rem]">
                    <span className="rounded-full border border-signal/35 bg-signal/[0.07] px-3 py-1 font-medium text-signal">Conceptontwerp</span>
                    <span className="rounded-full border border-line-strong px-3 py-1 text-mist">{c.industry}</span>
                  </div>
                  <h3 id={`concept-${c.slug}`} className="heading mt-6 text-[clamp(2rem,3.4vw,2.75rem)]">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-[1.125rem] text-paper/90">{c.title}</p>
                  <p className="mt-4 max-w-[32rem] leading-relaxed text-mist">{c.story}</p>
                  <ul className="mt-7 space-y-2.5">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-[0.98rem]">
                        <CheckIcon width={17} height={17} className="shrink-0 text-signal" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link href={`/concepten/${c.slug}`} className="btn btn-ghost group">
                      Bekijk het concept
                      <ArrowUpRightIcon width={17} height={17} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                    <a
                      href={whatsappLink(whatsappMessages.concept(c.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.98rem] text-mist underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-paper hover:decoration-signal"
                    >
                      Zoiets voor mijn bedrijf
                    </a>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
