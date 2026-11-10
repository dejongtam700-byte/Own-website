# Tam de Jong | Webdesign

Website van Tam de Jong: een donkere, premium one-pager met een interactieve 3D-hero, drie klikbare conceptdemo's en WhatsApp als belangrijkste contactkanaal.

## Snel starten

Vereist: **Node.js 20.9 of nieuwer**.

```bash
npm install
npm run dev        # ontwikkelserver op http://localhost:3000
```

Overige commando's:

```bash
npm run build      # productiebuild
npm run start      # productiebuild lokaal draaien
npm run lint       # ESLint (Next.js core-web-vitals + TypeScript)
npm run typecheck  # TypeScript zonder output
npm run capture    # screenshots van de conceptdemo's vernieuwen (zie onder)
```

## Techniek

| Onderdeel | Keuze |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 met design-tokens in `app/globals.css` |
| 3D | Three.js (zonder React Three Fiber): `components/site/Hero3DScene.ts` |
| Animaties | Eigen lichte CSS + IntersectionObserver (geen animatiebibliotheek nodig) |
| Lettertypen | Bricolage Grotesque (koppen) + Geist (tekst) via `next/font`. De demo's gebruiken Fraunces, Instrument Serif en Archivo, die alleen op de demopagina's laden. |
| Iconen | Eigen lijniconen in `components/site/Icons.tsx` |

**Waarom geen React Three Fiber/Drei en Framer Motion?** Het gaat om één scène en een handvol animaties. Met losse Three.js en CSS blijft de JavaScript-bundel kleiner en heb je volledige controle over de render-loop. De 3D-module laadt pas na de eerste weergave (dynamic import) en alleen op apparaten die het aankunnen.

### 3D-hero en fallbacks

`components/site/HeroVisual.tsx` rendert altijd eerst een statische compositie (snel, geen JavaScript nodig). Daarna wordt de 3D-scène alleen geladen als:

- de bezoeker geen *reduced motion* heeft ingesteld,
- WebGL2 beschikbaar is zonder software-rendering,
- het geen zwakker mobiel toestel is (minder dan 6 cores of 4 GB geheugen) en *data besparen* uit staat.

De scène pauzeert automatisch buiten beeld en in een achtergrondtab. Om te testen: `?force3d` forceert 3D, `?no3d` toont de fallback.

## Teksten en portfolio aanpassen

- **Bedrijfsgegevens, WhatsApp-nummer en -berichten:** `lib/site.ts`
- **Alle homepageteksten** (hero, voordelen, diensten, werkwijze, over mij, offerte, FAQ): `lib/content.ts`
- **Portfolio-concepten:** de lijst `concepts` in `lib/content.ts` en de demo's zelf in `components/concepts/`
- **Kleuren en typografie:** de `@theme`-tokens bovenaan `app/globals.css`

### Portfolio-afbeeldingen vernieuwen

De beelden in `public/concepts/` zijn screenshots van de echte demopagina's (`/concepten/schilder`, `/concepten/hovenier`, `/concepten/garage`). Pas je een demo aan, vernieuw dan de screenshots:

```bash
npm run dev                         # in venster 1
npx playwright install chromium     # eenmalig
npm run capture                     # in venster 2
```

### Je eigen foto toevoegen

In de sectie *Over mij* staat bewust geen nepportret, maar een monogram. Zet je foto in `public/` en volg de aanwijzing bovenaan `components/site/About.tsx`.

## Live zetten

De eenvoudigste route is **Vercel**:

1. Zet het project in een GitHub-repository.
2. Importeer de repository op vercel.com. Instellingen worden automatisch herkend.
3. Voeg bij *Environment Variables* toe: `NEXT_PUBLIC_SITE_URL=https://www.jouwdomein.nl`
4. Koppel je domein onder *Domains*.

Met `NEXT_PUBLIC_SITE_URL` worden canonical-URL's, sitemap, robots.txt, Open Graph en structured data automatisch op je echte domein gezet. Zonder die variabele staat er een tijdelijk voorbeelddomein in.

Andere hosts die Next.js ondersteunen (Netlify, een eigen Node-server met `npm run build && npm run start`) werken ook.

## Nog aan te vullen

- **Domeinnaam** → `NEXT_PUBLIC_SITE_URL`
- **Privacyverklaring** → `app/privacy/page.tsx` (nu een nette placeholder, staat op `noindex`)
- **Algemene voorwaarden** → `app/algemene-voorwaarden/page.tsx` (idem)
- **KvK-nummer, (vestigings)adres en btw-nummer**: bewust nergens ingevuld. Voeg ze toe aan de footer en de structured data in `app/layout.tsx` zodra je ze wilt tonen.
- **Portretfoto**: optioneel, zie hierboven.
- **Echte projecten en reviews**: als je die hebt, kun je ze naast of in plaats van de concepten tonen. Verzin ze niet.

## Structuur

```
app/
  layout.tsx              metadata, fonts, structured data
  page.tsx                homepage (secties in volgorde)
  globals.css             design-tokens en basisstijlen
  concepten/[slug]/       de drie conceptdemo's
  privacy/, algemene-voorwaarden/   placeholders
  sitemap.ts, robots.ts, opengraph-image.png, icon.svg
components/site/          Navbar, Hero, HeroVisual, Hero3DScene, Benefits, Services,
                          Portfolio, Process, About, PricingCTA, FAQ, FinalCTA,
                          Footer, WhatsAppButton, …
components/concepts/      PainterSite, LandscaperSite, GarageSite, ConceptView
lib/                      site.ts (gegevens), content.ts (teksten), assets.ts
public/concepts/          screenshots voor 3D-hero en portfolio
scripts/capture-concepts.mjs
```
