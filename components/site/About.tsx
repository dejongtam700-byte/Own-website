import { about } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { WhatsAppCta } from "./WhatsAppCta";

/**
 * Portret: er wordt bewust géén nepfoto getoond.
 * Wil je een echte foto? Zet hem in /public (bijv. /public/tam.jpg) en vervang
 * <Monogram /> door <Image src="/tam.jpg" alt="Tam de Jong" fill className="object-cover" />.
 */
function Monogram() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line bg-panel">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 30% 20%, rgba(90,215,238,0.18), transparent 70%), radial-gradient(60% 50% at 85% 90%, rgba(143,133,255,0.14), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(248,250,252,1)_1px,transparent_1px),linear-gradient(90deg,rgba(248,250,252,1)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden />
      <span
        className="display absolute -bottom-[0.12em] left-[0.04em] select-none text-[clamp(8rem,22vw,15rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(248,250,252,0.22)]"
        aria-hidden
      >
        TdJ
      </span>
      <div className="absolute left-7 top-7 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_16px_rgba(90,215,238,0.8)]" />
        <span className="text-[0.875rem] text-mist">Beschikbaar voor nieuwe projecten</span>
      </div>
      <div className="absolute bottom-7 right-7 text-right">
        <p className="heading text-[1.5rem]">{site.owner}</p>
        <p className="text-[0.875rem] text-mist">Ontwerper en ontwikkelaar</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="over-mij" className="relative border-t border-line py-24 sm:py-32 lg:py-40" aria-labelledby="over-mij-title">
      <div className="container-x grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="aspect-[4/5] sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[34rem]">
          <Monogram />
        </Reveal>
        <div className="flex flex-col justify-center lg:col-span-7">
          <Reveal as="h2" className="heading text-[clamp(2.4rem,5vw,4rem)]">
            <span id="over-mij-title">{about.title}</span>
          </Reveal>
          {about.body.map((p, i) => (
            <Reveal as="p" key={i} delay={100 + i * 80} className={`max-w-[38rem] leading-relaxed ${i === 0 ? "mt-8 text-[1.1875rem] text-paper/90" : "mt-5 text-mist"}`}>
              {p}
            </Reveal>
          ))}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] bg-line sm:grid-cols-3">
            {about.principles.map((pr, i) => (
              <Reveal key={pr.title} delay={i * 80} className="bg-ink p-6">
                <dt className="heading text-[1.2rem]">{pr.title}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{pr.text}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={150} className="mt-10">
            <WhatsAppCta label="Maak kennis met Tam" variant="ghost" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
