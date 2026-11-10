import { process } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="werkwijze" className="relative overflow-hidden border-t border-line bg-ink-2 py-24 sm:py-32 lg:py-40" aria-labelledby="werkwijze-title">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal as="h2" className="heading text-[clamp(2.4rem,5vw,4rem)] lg:col-span-8">
            <span id="werkwijze-title">{process.title}</span>
          </Reveal>
          <Reveal as="p" delay={100} className="max-w-[26rem] leading-relaxed text-mist lg:col-span-4 lg:justify-self-end">
            {process.intro}
          </Reveal>
        </div>

        <Reveal as="ol" className="process-track relative mt-16 grid gap-0 md:mt-24 md:grid-cols-4">
          {/* De lijn tekent zichzelf wanneer de stappen in beeld komen */}
          <span className="process-line pointer-events-none absolute left-[1.4rem] top-0 h-full w-px bg-gradient-to-b from-signal via-signal/40 to-transparent md:left-0 md:top-[1.4rem] md:h-px md:w-full md:bg-gradient-to-r" aria-hidden />
          {process.steps.map((step, i) => (
            <li key={step.title} className="process-step relative grid grid-cols-[2.8rem_1fr] gap-x-6 pb-12 last:pb-0 md:block md:pb-0 md:pr-8" style={{ ["--i" as string]: i }}>
              <span className="relative z-[1] grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border border-signal/40 bg-ink-2 text-[0.875rem] font-medium tabular-nums text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-10">
                <h3 className="heading text-[1.75rem] sm:text-[2rem]">{step.title}</h3>
                <p className="mt-3 max-w-[22rem] leading-relaxed text-mist">{step.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
