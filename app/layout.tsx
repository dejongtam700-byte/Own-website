import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { faq } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

/** Canonical-URL's pas gebruiken zodra het echte domein is ingesteld (NEXT_PUBLIC_SITE_URL). */
const hasRealDomain = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Professionele website laten maken | Tam de Jong Webdesign",
    template: "%s | Tam de Jong Webdesign",
  },
  description: site.description,
  keywords: [
    "professionele website laten maken",
    "website laten maken zzp",
    "website laten maken mkb",
    "webdesigner",
    "moderne bedrijfswebsite",
    "website laten vernieuwen",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  ...(hasRealDomain ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.fullName,
    title: "Jouw bedrijf verdient een website die indruk maakt",
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jouw bedrijf verdient een website die indruk maakt",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Structured data met uitsluitend geverifieerde gegevens (geen adres, KvK of reviews). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.fullName,
      url: site.url,
      telephone: site.whatsapp.display.replace(/\s/g, ""),
      description: site.description,
      founder: { "@type": "Person", name: site.owner },
      knowsLanguage: "nl",
      serviceType: ["Webdesign", "Websiteontwikkeling", "Website redesign", "SEO-basisoptimalisatie"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.fullName,
      inLanguage: "nl-NL",
      publisher: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Zet de 'js'-klasse vóór de eerste paint, zodat scroll-reveals niet flitsen. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
