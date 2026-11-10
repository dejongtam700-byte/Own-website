/**
 * Centrale bedrijfsgegevens. Pas hier naam, nummer en domein aan —
 * alle componenten, metadata en WhatsApp-links lezen uit dit bestand.
 */

export const site = {
  brand: "Tam de Jong",
  brandSuffix: "Webdesign",
  fullName: "Tam de Jong | Webdesign",
  owner: "Tam de Jong",
  tagline: "Webdesign & websiteontwikkeling",
  /** Vul je echte domein in zodra het bekend is (zonder slash aan het eind). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  locale: "nl_NL",
  whatsapp: {
    /** Internationaal formaat zonder +, spaties of streepjes. */
    number: "31640594805",
    display: "+31 6 40594805",
  },
  description:
    "Professionele website laten maken? Tam de Jong ontwerpt en bouwt moderne, snelle bedrijfswebsites voor zzp'ers en mkb — persoonlijk contact, ontwerp op maat en perfect op mobiel.",
} as const;

/** Vooraf ingevulde WhatsApp-berichten per plek op de site. */
export const whatsappMessages = {
  default:
    "Hoi Tam, ik heb je website bekeken en wil graag meer informatie over een professionele website voor mijn bedrijf.",
  quote:
    "Hoi Tam, ik wil graag vrijblijvend een offerte aanvragen voor een website. Mijn bedrijf: ",
  redesign:
    "Hoi Tam, ik heb al een website maar wil die graag laten vernieuwen. Kunnen we het daar eens over hebben?",
  concept: (name: string) =>
    `Hoi Tam, ik zag het concept "${name}" op je website. Zoiets wil ik ook voor mijn bedrijf.`,
} as const;

/** Bouwt een correct URL-gecodeerde wa.me-link. */
export function whatsappLink(message: string = whatsappMessages.default): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { href: "#home", label: "Home" },
  { href: "#diensten", label: "Diensten" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#werkwijze", label: "Werkwijze" },
  { href: "#over-mij", label: "Over mij" },
  { href: "#contact", label: "Contact" },
] as const;
