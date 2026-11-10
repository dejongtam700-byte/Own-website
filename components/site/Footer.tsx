import Link from "next/link";
import { navItems, site, whatsappLink } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";
import { WhatsAppIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Footer</h2>
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="heading text-[1.75rem]">{site.owner}</p>
          <p className="mt-1 text-mist">{site.tagline}</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-line-strong py-2 pl-2 pr-5 transition-colors hover:border-paper/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
              <WhatsAppIcon width={18} height={18} />
            </span>
            <span>
              <span className="block text-[0.75rem] leading-none text-haze">WhatsApp</span>
              <span className="mt-1 block leading-none">{site.whatsapp.display}</span>
            </span>
          </a>
        </div>

        <nav className="md:col-span-4" aria-label="Footer navigatie">
          <p className="text-[0.875rem] text-haze">Navigatie</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navItems.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-mist transition-colors hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-[0.875rem] text-haze">Conceptontwerpen</p>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/concepten/schilder" className="text-mist transition-colors hover:text-paper">Schildersbedrijf</Link></li>
            <li><Link href="/concepten/hovenier" className="text-mist transition-colors hover:text-paper">Hovenier</Link></li>
            <li><Link href="/concepten/garage" className="text-mist transition-colors hover:text-paper">Autogarage</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.875rem] text-haze sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.fullName}
          </p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="transition-colors hover:text-paper">Privacyverklaring</Link></li>
            <li><Link href="/algemene-voorwaarden" className="transition-colors hover:text-paper">Algemene voorwaarden</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
