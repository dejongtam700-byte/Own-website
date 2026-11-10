import { hero } from "@/lib/content";
import { HeroVisual } from "./HeroVisual";
import { ArrowDownIcon, CheckIcon } from "./Icons";
import { WhatsAppCta } from "./WhatsAppCta";

export function Hero() {
  return (
    <section id="home" className="grain relative isolate overflow-hidden pt-[4.5rem]" aria-labelledby="hero-title">
      {/* Lichtval: één koele bron rechtsboven, een vleugje iris onderin */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute right-[-10%] top-[-20%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(90,215,238,0.13),transparent)]" />
        <div className="absolute bottom-[-30%] left-[30%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(143,133,255,0.08),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative grid grid-cols-1 lg:min-h-[calc(100svh-4.5rem)] items-center gap-6 pb-10 lg:grid-cols-12 lg:gap-0 lg:pb-16">
        <div className="relative z-10 pt-10 lg:col-span-6 lg:pt-0 xl:col-span-5">
          <p className="fade-in mb-7 flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.16em] text-mist" style={{ ["--d" as string]: "80ms" }}>
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="display text-[clamp(2.9rem,11.5vw,4.25rem)] sm:text-[clamp(4rem,8.2vw,5.6rem)] lg:text-[clamp(4rem,6.1vw,6.1rem)]">
            {hero.headline.map((line, i) => (
              <span key={line} className="line-mask">
                <span style={{ ["--d" as string]: `${180 + i * 110}ms` }}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="fade-in mt-7 max-w-[34rem] text-[1.0625rem] leading-relaxed text-mist sm:text-[1.1875rem]" style={{ ["--d" as string]: "620ms" }}>
            {hero.intro}
          </p>

          <div className="fade-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ ["--d" as string]: "760ms" }}>
            <WhatsAppCta label={hero.primaryCta} fullOnMobile />
            <a href="#portfolio" className="btn btn-ghost group">
              {hero.secondaryCta}
              <ArrowDownIcon width={18} height={18} className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>
          </div>

          <ul className="fade-in mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.9375rem] text-mist" style={{ ["--d" as string]: "900ms" }}>
            {hero.credibility.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon width={16} height={16} className="text-signal" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D-podium: op desktop breed uitlopend naar rechts, op mobiel onder de tekst */}
        <div className="fade-in relative -mx-5 aspect-[5/4] sm:-mx-8 sm:aspect-[16/11] lg:absolute lg:inset-y-0 lg:right-[-6vw] lg:left-[44%] lg:mx-0 lg:aspect-auto xl:left-[40%]" style={{ ["--d" as string]: "300ms" }}>
          <HeroVisual />
        </div>
      </div>

      <a
        href="#voordelen"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.75rem] text-haze transition-colors hover:text-mist lg:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line-strong" aria-hidden>
          <span className="absolute inset-x-0 top-0 h-1/2 bg-signal motion-safe:animate-[scroll-cue_2.2s_var(--ease-in-out-quart)_infinite]" />
        </span>
      </a>
    </section>
  );
}
