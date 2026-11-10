import { services } from "@/lib/content";
import { whatsappLink, whatsappMessages } from "@/lib/site";
import { FeatureIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="diensten" className="relative border-t border-line py-24 sm:py-32 lg:py-40" aria-labelledby="diensten-title">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal as="h2" className="heading text-[clamp(2.4rem,5vw,4rem)] lg:col-span-7">
            <span id="diensten-title">{services.title}</span>
          </Reveal>
          <Reveal as="p" delay={100} className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-mist lg:col-span-5 lg:justify-self-end">
            {services.intro}
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line">
          {services.items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="border-b border-line">
              <article className="group relative grid grid-cols-[3rem_1fr] gap-x-5 gap-y-3 py-8 transition-colors duration-500 sm:grid-cols-[3.5rem_1fr] md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-x-10 md:py-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-strong text-mist transition-[color,border-color,background-color] duration-500 group-hover:border-signal/40 group-hover:bg-signal/[0.06] group-hover:text-signal sm:h-14 sm:w-14">
                  <FeatureIcon name={s.icon} />
                </span>
                <h3 className="heading self-center text-[1.6rem] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 sm:text-[2rem]">
                  {s.title}
                  {s.optional && (
                    <span className="ml-3 inline-block translate-y-[-0.3em] rounded-full border border-line-strong px-2.5 py-0.5 align-middle font-sans text-[0.75rem] font-medium tracking-normal text-mist">
                      Optioneel
                    </span>
                  )}
                </h3>
                <p className="col-start-2 max-w-[34rem] text-[1rem] leading-relaxed text-mist md:col-start-3">{s.text}</p>
                <span
                  className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-signal via-signal/50 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-mist">Twijfel je wat je nodig hebt? Daar denk ik graag over mee.</p>
          <a
            href={whatsappLink(whatsappMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-paper underline decoration-signal/60 decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal"
          >
            Stel je vraag via WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
