import { benefits } from "@/lib/content";
import { FeatureIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function Benefits() {
  return (
    <section id="voordelen" className="relative py-24 sm:py-32 lg:py-40" aria-labelledby="voordelen-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal as="h2" className="heading text-[clamp(2.4rem,5vw,4rem)]">
              <span id="voordelen-title">{benefits.title}</span>
            </Reveal>
            <Reveal as="p" delay={120} className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-mist">
              {benefits.intro}
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-line sm:grid-cols-2">
            {benefits.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 90}
                className="group relative flex flex-col bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 sm:p-9"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-strong text-paper transition-[color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:border-signal/40 group-hover:text-signal">
                  <FeatureIcon name={item.icon} />
                </span>
                <h3 className="heading mt-10 text-[1.5rem]">{item.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-mist">{item.text}</p>
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: "radial-gradient(400px circle at 0% 0%, rgba(90,215,238,0.07), transparent 60%)" }}
                  aria-hidden
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
