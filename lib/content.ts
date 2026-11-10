/**
 * Alle teksten van de homepage staan hier, zodat je ze kunt aanpassen
 * zonder in de componenten te hoeven zoeken.
 */

export type IconName =
  | "presence"
  | "trust"
  | "mobile"
  | "conversion"
  | "website"
  | "redesign"
  | "responsive"
  | "seo"
  | "support"
  | "automation";

export const hero = {
  eyebrow: "WEBDESIGN VOOR AMBITIEUZE ONDERNEMERS",
  headline: ["Jouw bedrijf", "verdient een", "website die", "indruk maakt."],
  intro:
    "Ik bouw moderne, professionele websites die vertrouwen uitstralen, jouw bedrijf onderscheiden en bezoekers omzetten in klanten.",
  primaryCta: "Bespreek jouw website",
  secondaryCta: "Bekijk mijn werk",
  credibility: ["Persoonlijk contact", "Modern design", "Gebouwd voor jouw bedrijf"],
};

export const benefits = {
  title: "Een sterke eerste indruk begint online.",
  intro:
    "Voordat een klant belt, mailt of een offerte aanvraagt, zoekt hij je op. In een paar seconden wordt besloten of jouw bedrijf betrouwbaar overkomt. Een professionele website zorgt dat die eerste indruk klopt met de kwaliteit die je in het echt levert.",
  items: [
    {
      icon: "presence" as IconName,
      title: "Professionele uitstraling",
      text: "Een verzorgd ontwerp dat past bij jouw vakmanschap, zodat je online net zo serieus overkomt als op de werkvloer.",
    },
    {
      icon: "trust" as IconName,
      title: "Meer vertrouwen bij klanten",
      text: "Duidelijke informatie, heldere diensten en een eenvoudige manier om contact op te nemen. Dat haalt twijfel weg.",
    },
    {
      icon: "mobile" as IconName,
      title: "Perfect op mobiel",
      text: "De meeste bezoekers kijken op hun telefoon. Jouw site is vanaf de eerste schets ontworpen voor het kleine scherm.",
    },
    {
      icon: "conversion" as IconName,
      title: "Gericht op aanvragen",
      text: "Elke pagina leidt logisch naar de volgende stap: bellen, appen of een offerte aanvragen.",
    },
  ],
};

export const services = {
  title: "Alles wat jouw bedrijf online sterker maakt.",
  intro:
    "Van een compleet nieuwe website tot het opfrissen van wat je al hebt. Je krijgt één aanspreekpunt voor ontwerp én techniek.",
  items: [
    {
      icon: "website" as IconName,
      title: "Professionele websites",
      text: "Een website op maat, ontworpen rond jouw bedrijf, jouw klanten en jouw manier van werken. Geen standaardtemplate.",
      optional: false,
    },
    {
      icon: "redesign" as IconName,
      title: "Website redesign",
      text: "Is je huidige site verouderd of traag? Ik vertaal hem naar een moderne, geloofwaardige website die weer bij je bedrijf past.",
      optional: false,
    },
    {
      icon: "responsive" as IconName,
      title: "Mobielvriendelijk design",
      text: "Werkt soepel op telefoon, tablet en desktop. Knoppen die je met je duim raakt en teksten die je zonder inzoomen leest.",
      optional: false,
    },
    {
      icon: "seo" as IconName,
      title: "SEO-basisoptimalisatie",
      text: "Een nette technische basis, logische paginastructuur en goede titels, zodat zoekmachines begrijpen wat je doet.",
      optional: false,
    },
    {
      icon: "support" as IconName,
      title: "Onderhoud en ondersteuning",
      text: "Wil je na de livegang hulp bij updates of kleine aanpassingen? Dan kijken we samen wat daarvoor nodig is.",
      optional: true,
    },
    {
      icon: "automation" as IconName,
      title: "Slimme automatiseringen",
      text: "Denk aan een aanvraagformulier dat direct in je mail of agenda landt. Bespreekbaar waar het jouw bedrijf echt tijd bespaart.",
      optional: true,
    },
  ],
};

export type ConceptSlug = "schilder" | "hovenier" | "garage";

export type Concept = {
  slug: ConceptSlug;
  name: string;
  industry: string;
  title: string;
  story: string;
  highlights: string[];
  /** Achtergrondkleur van de presentatie, afgestemd op het concept. */
  tone: string;
  url: string;
};

export const concepts: Concept[] = [
  {
    slug: "schilder",
    name: "Kleurwerk Schilders",
    industry: "Schildersbedrijf",
    title: "Vakmanschap dat je in elke laag terugziet.",
    story:
      "Een warme, rustige uitstraling met veel ruimte voor kleur. De bezoeker ziet direct welke klussen het bedrijf doet en kan in twee stappen een kleuradvies aanvragen.",
    highlights: ["Kleurenpalet als ontwerptaal", "Diensten in één oogopslag", "Aanvraag in twee stappen"],
    tone: "#E9E2D6",
    url: "kleurwerk-schilders.nl",
  },
  {
    slug: "hovenier",
    name: "Groenveld Tuinontwerp",
    industry: "Hovenier & tuinontwerp",
    title: "Rust en ruimte, net als in een goed aangelegde tuin.",
    story:
      "Een rustig, editorial ontwerp dat het ambacht laat spreken. Seizoenen, werkwijze en tuintypen staan helder op een rij, met een uitnodigende stap naar een tuingesprek.",
    highlights: ["Editorial typografie", "Werkwijze per seizoen", "Intake voor een tuingesprek"],
    tone: "#DDE3D3",
    url: "groenveld-tuinontwerp.nl",
  },
  {
    slug: "garage",
    name: "Garage Noordkade",
    industry: "Autogarage",
    title: "Strak, technisch en direct to the point.",
    story:
      "Een krachtige, donkere stijl met een herkenbaar geel kenteken als blikvanger. Klanten zien meteen wat er kan en plannen hun APK of onderhoud zonder te bellen.",
    highlights: ["Kenteken-invoer als blikvanger", "Diensten helder op een rij", "Afspraak plannen in één scherm"],
    tone: "#1A1D22",
    url: "garage-noordkade.nl",
  },
];

export const process = {
  title: "Van eerste idee naar een website waar je trots op bent.",
  intro: "Een helder traject zonder vakjargon. Je weet bij elke stap waar we staan en wat de volgende stap is.",
  steps: [
    { title: "Kennismaking", text: "We bespreken jouw bedrijf, wensen en doelen." },
    { title: "Ontwerp", text: "Ik maak een professioneel ontwerp dat bij jouw onderneming past." },
    { title: "Ontwikkeling", text: "Ik bouw jouw website met aandacht voor snelheid, gebruiksgemak en uitstraling." },
    { title: "Livegang", text: "Na controle en jouw akkoord kan de website online." },
  ],
};

export const about = {
  title: "Persoonlijk contact. Professioneel resultaat.",
  body: [
    "Ik ben Tam de Jong. Ik help ondernemers aan moderne, professionele websites die passen bij hun bedrijf en ambities. Mijn focus ligt op strak design, gebruiksgemak en een website die direct vertrouwen uitstraalt.",
    "Je hebt rechtstreeks contact met mij, van het eerste gesprek tot de livegang. Geen accountmanagers of tussenpersonen: degene die je spreekt, is degene die jouw website ontwerpt en bouwt.",
  ],
  principles: [
    { title: "Eén aanspreekpunt", text: "Korte lijnen via WhatsApp, telefoon of een kop koffie." },
    { title: "Ontwerp op maat", text: "Gebaseerd op jouw bedrijf, niet op een template." },
    { title: "Eerlijk advies", text: "Ook als iets niet nodig is voor jouw situatie." },
  ],
};

export const pricing = {
  title: "Een professionele website hoeft niet ingewikkeld te zijn.",
  intro:
    "Elk bedrijf is anders, dus ik werk niet met vaste pakketten. Je krijgt een offerte die precies past bij wat jij nodig hebt. Duidelijk, zonder verrassingen achteraf.",
  points: [
    { title: "Persoonlijke aanpak", text: "We beginnen met een gesprek over jouw bedrijf en doelen." },
    { title: "Transparante offerte", text: "Je ziet precies wat je krijgt en wat het kost." },
    { title: "Ontwerp op maat", text: "Afgestemd op jouw vak, je klanten en je uitstraling." },
    { title: "Duidelijke afspraken", text: "Over planning, oplevering en wat er daarna gebeurt." },
  ],
  checklistTitle: "Handig om mee te sturen",
  checklist: [
    "De naam van je bedrijf en wat je doet",
    "Je huidige website, als je die hebt",
    "Welke pagina's of functies je in gedachten hebt",
    "Voorbeelden van websites die je mooi vindt",
  ],
  cta: "Vraag vrijblijvend een offerte aan",
};

export const faq = {
  title: "Veelgestelde vragen",
  items: [
    {
      q: "Wat kost een professionele website?",
      a: "Dat hangt af van wat je nodig hebt: het aantal pagina's, de functies en of er teksten of beelden gemaakt moeten worden. Daarom werk ik niet met vaste pakketten maar met een offerte op maat. Stuur me een bericht met wat je in gedachten hebt, dan krijg je een duidelijk voorstel.",
    },
    {
      q: "Hoelang duurt het om een website te bouwen?",
      a: "Dat verschilt per project en hangt onder andere af van de omvang en hoe snel teksten en feedback beschikbaar zijn. In de offerte spreken we een realistische planning af, zodat je weet waar je aan toe bent.",
    },
    {
      q: "Kan ik mijn bestaande website laten vernieuwen?",
      a: "Ja. Ik kijk eerst wat er goed werkt en wat beter kan. Daarna ontwerp ik een moderne versie die bij je bedrijf past. Bestaande teksten en beelden kunnen we waar mogelijk hergebruiken.",
    },
    {
      q: "Werkt mijn website ook op mobiele telefoons?",
      a: "Altijd. Ik ontwerp vanaf het begin voor telefoon, tablet en desktop en test de website op verschillende schermformaten voordat hij live gaat.",
    },
    {
      q: "Kan mijn website later worden uitgebreid?",
      a: "Ja. De website wordt zo opgezet dat er later pagina's, diensten of functies bij kunnen komen. Groeit je bedrijf, dan groeit je website mee.",
    },
    {
      q: "Hoe werkt het aanvragen van een offerte?",
      a: "Stuur me een WhatsApp-bericht met een korte omschrijving van je bedrijf en wat je zoekt. Ik neem contact met je op voor een kennismaking en stuur daarna een vrijblijvende offerte.",
    },
  ],
};

export const finalCta = {
  title: ["Klaar om online", "écht indruk te maken?"],
  text: "Laten we samen kijken hoe jouw bedrijf online sterker voor de dag kan komen.",
  cta: "Stuur Tam een WhatsApp",
};
