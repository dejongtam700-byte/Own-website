import Link from "next/link";
import type { ConceptSlug } from "@/lib/content";
import { concepts } from "@/lib/content";
import { whatsappLink, whatsappMessages } from "@/lib/site";
import { GarageSite } from "./GarageSite";
import { LandscaperSite } from "./LandscaperSite";
import { PainterSite } from "./PainterSite";

const sites: Record<ConceptSlug, () => React.JSX.Element> = {
  schilder: PainterSite,
  hovenier: LandscaperSite,
  garage: GarageSite,
};

/** Rendert een conceptdemo met een duidelijke melding dat het om een ontwerpvoorbeeld gaat. */
export function ConceptView({ slug }: { slug: ConceptSlug }) {
  const Site = sites[slug];
  const concept = concepts.find((c) => c.slug === slug)!;
  return (
    <>
      <Site />
      <aside
        data-concept-banner
        aria-label="Over dit voorbeeld"
        className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[44rem] flex-col gap-3 rounded-[20px] border border-white/10 bg-[#080B12]/92 p-3 pl-5 text-[14px] text-[#F8FAFC] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:rounded-full"
      >
        <p className="leading-snug">
          <span className="font-semibold">Conceptontwerp</span>
          <span className="text-[#A1AAB9]"> van Tam de Jong. {concept.name} is een fictief bedrijf.</span>
        </p>
        <div className="flex shrink-0 gap-2">
          <Link href="/#portfolio" className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium transition hover:bg-white/10">
            Terug naar portfolio
          </Link>
          <a
            href={whatsappLink(whatsappMessages.concept(concept.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#F8FAFC] px-4 py-2 text-[13px] font-semibold text-[#080B12] transition hover:bg-white"
          >
            Zoiets voor mijn bedrijf
          </a>
        </div>
      </aside>
    </>
  );
}
