import { pricing } from "@/lib/content";
import { whatsappMessages } from "@/lib/site";
import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { WhatsAppCta } from "./WhatsAppCta";

export function PricingCTA() {
  return (
    <section id="offerte" className="relative border-t border-line py-24 sm:py-32 lg:py-40" aria-labelledby="offerte-title">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-panel to-ink-2 p-7 sm:p-12 lg:p-16">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(90,215,238,0.12),transparent)]"
            aria-hidden
          />
          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id="offerte-title" className="heading text-[clamp(2.2rem,4.6vw,3.75rem)]">
                {pricing.title}
              </h2>
              <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-mist">{pricing.intro}</p>
              <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {pricing.points.map((p) => (
                  <div key={p.title} className="border-t border-line-strong pt-5">
                    <dt className="heading text-[1.25rem]">{p.title}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">{p.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col justify-between gap-10 lg:col-span-5">
              <div className="rounded-[1.25rem] border border-line bg-ink/60 p-6 sm:p-7">
                <p className="heading text-[1.2rem]">{pricing.checklistTitle}</p>
                <ul className="mt-5 space-y-3.5">
                  {pricing.checklist.map((c) => (
                    <li key={c} className="flex gap-3 text-[0.9375rem] leading-snug text-mist">
                      <CheckIcon width={18} height={18} className="mt-px shrink-0 text-signal" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <WhatsAppCta label={pricing.cta} message={whatsappMessages.quote} fullOnMobile />
                <p className="mt-4 text-[0.875rem] text-haze">Vrijblijvend. Je zit nergens aan vast.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
