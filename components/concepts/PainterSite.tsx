/**
 * Conceptontwerp — fictief schildersbedrijf "Kleurwerk Schilders".
 * Dit is een ontwerpvoorbeeld, geen bestaand bedrijf of echte klant.
 */

const swatches = [
  { name: "Kalkwit", code: "KW 01", color: "#EEE8DC" },
  { name: "Zandsteen", code: "KW 14", color: "#D8C3A0" },
  { name: "Okergeel", code: "KW 27", color: "#C8893B" },
  { name: "Steenrood", code: "KW 33", color: "#A9533A" },
  { name: "Saliegroen", code: "KW 48", color: "#8A9A82" },
  { name: "Bosgroen", code: "KW 62", color: "#2E4237" },
];

const services = [
  { title: "Binnenschilderwerk", text: "Wanden, plafonds, kozijnen en deuren. Strak afgewerkt, met stofvrij en netjes werken als standaard." },
  { title: "Buitenschilderwerk", text: "Bescherming tegen weer en wind met verf die past bij het hout en de gevel van je woning." },
  { title: "Houtrotherstel", text: "Aangetast hout vakkundig vervangen of hersteld, zodat je schilderwerk jaren meegaat." },
  { title: "Kleuradvies", text: "Twijfel je over kleuren? We komen langs met stalen en denken mee in licht en sfeer." },
];

function PlasterArt() {
  return (
    <svg viewBox="0 0 600 680" className="h-full w-full" role="img" aria-label="Illustratie van een geverfde muur met kleurstalen">
      <defs>
        <filter id="pw-plaster" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" seed="7" />
          <feColorMatrix values="0 0 0 0 0.54  0 0 0 0 0.6  0 0 0 0 0.51  0 0 0 0.55 0" />
          <feComposite in2="SourceGraphic" operator="in" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <filter id="pw-rough" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.6" numOctaves="2" seed="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="18" />
        </filter>
        <filter id="pw-streak">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.22" numOctaves="3" seed="11" />
          <feColorMatrix values="0 0 0 0 0.98  0 0 0 0 0.86  0 0 0 0 0.62  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <linearGradient id="pw-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect width="600" height="680" fill="#9AA892" filter="url(#pw-plaster)" />
      <g filter="url(#pw-rough)">
        <rect x="-20" y="250" width="660" height="150" fill="#C8893B" />
      </g>
      <rect x="-20" y="250" width="660" height="150" fill="#C8893B" filter="url(#pw-streak)" opacity="0.9" />
      <rect width="600" height="680" fill="url(#pw-light)" />
      {/* roller */}
      <g transform="translate(455 222) rotate(-8)">
        <rect x="0" y="0" width="128" height="58" rx="29" fill="#C8893B" />
        <rect x="0" y="0" width="128" height="58" rx="29" fill="url(#pw-light)" />
        <path d="M128 29 h22 v120 h-10" fill="none" stroke="#1F2B25" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="128" y="146" width="24" height="120" rx="12" fill="#1F2B25" />
      </g>
    </svg>
  );
}

function SwatchFan() {
  return (
    <div className="pointer-events-none absolute -bottom-6 -left-10 h-[300px] w-[300px] sm:-left-16" aria-hidden>
      {swatches.map((s, i) => (
        <div
          key={s.code}
          className="absolute bottom-0 left-[110px] h-[250px] w-[78px] origin-[50%_92%] rounded-[10px] shadow-[0_18px_40px_-18px_rgba(30,42,36,0.55)] ring-1 ring-black/5"
          style={{ background: s.color, transform: `rotate(${-42 + i * 14}deg)` }}
        >
          <div className="absolute inset-x-0 bottom-0 rounded-b-[10px] bg-[#FBF8F2] px-2 pb-2 pt-1.5">
            <p className="font-fraunces text-[11px] leading-tight text-[#1E2A24]">{s.name}</p>
            <p className="text-[9px] tracking-wide text-[#1E2A24]/55">{s.code}</p>
          </div>
          <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#FBF8F2]/80" />
        </div>
      ))}
    </div>
  );
}

export function PainterSite() {
  return (
    <div className="min-h-screen bg-[#F3EEE5] font-sans text-[#1E2A24] antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#1E2A24]/10 bg-[#F3EEE5]/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[#2E4237]">
              <span className="absolute inset-y-0 right-0 w-1/2 bg-[#C8893B]" />
              <span className="relative h-3 w-3 rounded-full bg-[#F3EEE5]" />
            </span>
            <span className="font-fraunces text-[22px] font-semibold tracking-[-0.02em]">Kleurwerk</span>
          </a>
          <nav className="hidden items-center gap-8 text-[15px] text-[#1E2A24]/75 md:flex" aria-label="Hoofdmenu concept">
            <a href="#diensten" className="hover:text-[#1E2A24]">Diensten</a>
            <a href="#kleuren" className="hover:text-[#1E2A24]">Kleuren</a>
            <a href="#werkwijze" className="hover:text-[#1E2A24]">Werkwijze</a>
            <a href="#advies" className="hover:text-[#1E2A24]">Contact</a>
          </nav>
          <a href="#advies" className="rounded-full bg-[#2E4237] px-5 py-2.5 text-[14px] font-medium text-[#F3EEE5] transition hover:bg-[#1E2A24]">
            Kleuradvies aanvragen
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1E2A24]/15 px-3.5 py-1.5 text-[13px] text-[#1E2A24]/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8893B]" />
            Schilderwerk binnen &amp; buiten
          </p>
          <h1 className="font-fraunces text-[52px] font-[420] leading-[0.98] tracking-[-0.035em] sm:text-[76px] lg:text-[88px]" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}>
            Vakwerk in <em className="font-[380] text-[#A9533A]">elke</em> laag.
          </h1>
          <p className="mt-7 max-w-[30rem] text-[18px] leading-relaxed text-[#1E2A24]/72">
            Van een frisse woonkamer tot complete buitenkozijnen: wij schilderen met oog voor detail, goede voorbereiding en verf die lang mooi blijft.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#advies" className="rounded-full bg-[#C8893B] px-7 py-4 text-[15px] font-medium text-[#1E2A24] shadow-[0_12px_30px_-14px_rgba(168,98,30,0.8)] transition hover:bg-[#D6974A]">
              Plan een kleuradvies
            </a>
            <a href="#diensten" className="rounded-full border border-[#1E2A24]/20 px-7 py-4 text-[15px] font-medium transition hover:border-[#1E2A24]/45">
              Bekijk onze diensten
            </a>
          </div>
          <dl className="mt-12 grid max-w-[30rem] grid-cols-3 gap-6 border-t border-[#1E2A24]/12 pt-6 text-[14px]">
            <div><dt className="text-[#1E2A24]/55">Werkgebied</dt><dd className="mt-1 font-medium">Regio en omgeving</dd></div>
            <div><dt className="text-[#1E2A24]/55">Voor</dt><dd className="mt-1 font-medium">Particulier &amp; zakelijk</dd></div>
            <div><dt className="text-[#1E2A24]/55">Offerte</dt><dd className="mt-1 font-medium">Vrijblijvend</dd></div>
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="aspect-[6/6.8] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(30,42,36,0.6)]">
            <PlasterArt />
          </div>
          <SwatchFan />
          <div className="absolute -right-2 top-8 rounded-2xl bg-[#FBF8F2] px-4 py-3 shadow-[0_20px_40px_-20px_rgba(30,42,36,0.5)] sm:-right-6">
            <p className="text-[12px] text-[#1E2A24]/55">Kleur van het seizoen</p>
            <p className="font-fraunces text-[18px]">Okergeel KW 27</p>
          </div>
        </div>
      </section>

      {/* Palette */}
      <section id="kleuren" className="border-y border-[#1E2A24]/10 bg-[#EDE6DA]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-3 sm:grid-cols-6">
          {swatches.map((s) => (
            <div key={s.code} className="group border-r border-[#1E2A24]/8 p-4 last:border-r-0 sm:p-5">
              <div className="h-16 rounded-lg ring-1 ring-black/5 transition-transform duration-500 group-hover:-translate-y-1 sm:h-24" style={{ background: s.color }} />
              <p className="mt-3 font-fraunces text-[15px]">{s.name}</p>
              <p className="text-[12px] text-[#1E2A24]/50">{s.code}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="diensten" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-fraunces text-[40px] font-[420] leading-[1.02] tracking-[-0.03em] sm:text-[54px]">
            Alles voor een strak resultaat.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-[22px] bg-[#1E2A24]/10 sm:grid-cols-2">
            {services.map((s, i) => (
              <article key={s.title} className="bg-[#F3EEE5] p-7 transition hover:bg-[#FBF8F2]">
                <span className="mb-8 block h-9 w-9 rounded-full" style={{ background: swatches[[2, 5, 3, 4][i]].color }} />
                <h3 className="font-fraunces text-[22px] tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#1E2A24]/70">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="werkwijze" className="bg-[#2E4237] text-[#F3EEE5]">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-24">
          <h2 className="max-w-[18ch] font-fraunces text-[38px] font-[400] leading-[1.04] tracking-[-0.03em] sm:text-[50px]">
            Goed schilderwerk begint met voorbereiding.
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              ["Opname", "We bekijken de klus samen en bespreken wensen, kleuren en planning."],
              ["Voorbereiding", "Afplakken, schuren, repareren. Het onzichtbare werk dat het verschil maakt."],
              ["Oplevering", "We lopen alles samen na en laten je huis netter achter dan we het aantroffen."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t border-[#F3EEE5]/20 pt-6">
                <span className="font-fraunces text-[15px] text-[#D8C3A0]">Stap {i + 1}</span>
                <h3 className="mt-2 font-fraunces text-[24px]">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#F3EEE5]/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Advice form */}
      <section id="advies" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-start gap-10 overflow-hidden rounded-[28px] bg-[#FBF8F2] p-7 shadow-[0_30px_70px_-45px_rgba(30,42,36,0.6)] sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="font-fraunces text-[38px] font-[420] leading-[1.04] tracking-[-0.03em] sm:text-[48px]">
              Plan een vrijblijvend kleuradvies.
            </h2>
            <p className="mt-5 max-w-[28rem] text-[16px] leading-relaxed text-[#1E2A24]/70">
              Vertel kort wat je wilt laten schilderen. We nemen contact op om een moment te plannen.
            </p>
          </div>
          <form className="grid gap-4" aria-label="Kleuradvies aanvragen (voorbeeldformulier)">
            <label className="grid gap-1.5 text-[14px]">
              Naam
              <input className="h-12 rounded-xl border border-[#1E2A24]/15 bg-white px-4 text-[15px] outline-none focus:border-[#2E4237]" placeholder="Je naam" />
            </label>
            <label className="grid gap-1.5 text-[14px]">
              Wat wil je laten schilderen?
              <select className="h-12 rounded-xl border border-[#1E2A24]/15 bg-white px-4 text-[15px]" defaultValue="binnen">
                <option value="binnen">Binnenschilderwerk</option>
                <option value="buiten">Buitenschilderwerk</option>
                <option value="beide">Binnen en buiten</option>
              </select>
            </label>
            <button type="button" className="mt-2 h-12 rounded-full bg-[#2E4237] text-[15px] font-medium text-[#F3EEE5] transition hover:bg-[#1E2A24]">
              Verstuur aanvraag
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#1E2A24]/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-8 text-[13px] text-[#1E2A24]/55 sm:flex-row sm:justify-between sm:px-8">
          <p>Kleurwerk Schilders is een fictief bedrijf.</p>
          <p>Conceptontwerp door Tam de Jong</p>
        </div>
      </footer>
    </div>
  );
}
