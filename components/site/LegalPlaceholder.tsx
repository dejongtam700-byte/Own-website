import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

/** Tijdelijke juridische pagina. Vervang de inhoud zodra de officiële tekst beschikbaar is. */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <main id="main" className="container-x flex min-h-[100svh] flex-col justify-center py-32">
      <Link href="/" className="mb-12 w-fit text-mist hover:text-paper">
        Terug naar de homepage
      </Link>
      <h1 className="heading text-[clamp(2.5rem,6vw,4.5rem)]">{title}</h1>
      <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-mist">
        Deze pagina wordt binnenkort aangevuld. Heb je in de tussentijd een vraag over dit onderwerp? Neem dan contact op met {site.owner} via{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-paper underline underline-offset-4">
          WhatsApp ({site.whatsapp.display})
        </a>
        .
      </p>
    </main>
  );
}
