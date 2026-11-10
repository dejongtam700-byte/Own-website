/**
 * Conceptontwerp — fictieve autogarage "Garage Noordkade".
 * Dit is een ontwerpvoorbeeld, geen bestaand bedrijf of echte klant.
 */

const wide = { fontVariationSettings: '"wdth" 125' } as const;

function Car() {
  return (
    <svg viewBox="0 0 900 380" className="h-auto w-full" role="img" aria-label="Illustratie van een auto in een studio">
      <defs>
        <radialGradient id="gn-spot" cx="0.5" cy="0.42" r="0.5">
          <stop offset="0" stopColor="#F2C230" stopOpacity="0.16" />
          <stop offset="0.6" stopColor="#F2C230" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gn-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5A616B" />
          <stop offset="0.35" stopColor="#2C3138" />
          <stop offset="0.62" stopColor="#1A1E23" />
          <stop offset="1" stopColor="#0E1013" />
        </linearGradient>
        <linearGradient id="gn-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A4654" />
          <stop offset="0.5" stopColor="#141A21" />
          <stop offset="1" stopColor="#0B0E12" />
        </linearGradient>
        <linearGradient id="gn-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C2026" />
          <stop offset="1" stopColor="#121417" />
        </linearGradient>
        <radialGradient id="gn-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gn-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8B939E" />
          <stop offset="0.55" stopColor="#3A4048" />
          <stop offset="1" stopColor="#1B1F24" />
        </radialGradient>
      </defs>
      <rect width="900" height="380" fill="url(#gn-spot)" />
      <ellipse cx="450" cy="318" rx="380" ry="26" fill="url(#gn-shadow)" />
      {/* body */}
      <path
        d="M96 276 C 92 248 104 226 140 216 L 262 194 C 312 150 376 120 456 116 L 560 116 C 628 118 676 146 722 186 L 784 198 C 818 205 836 226 836 254 L 836 270 C 836 280 829 286 818 286 L 96 286 C 90 286 96 282 96 276 Z"
        fill="url(#gn-body)"
      />
      {/* window */}
      <path d="M 300 196 C 340 160 390 138 456 134 L 548 134 C 600 136 640 156 684 192 Z" fill="url(#gn-glass)" />
      <path d="M 492 134 L 486 196" stroke="#0B0E12" strokeWidth="7" />
      {/* highlights */}
      <path d="M 150 222 L 262 202 C 312 160 380 128 456 124 L 560 124 C 626 126 672 152 716 190 L 784 204" fill="none" stroke="#B7BFC9" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M 120 246 L 820 246" stroke="#F2C230" strokeOpacity="0.85" strokeWidth="2.5" />
      <path d="M 818 214 C 828 220 832 228 832 236 L 806 236 C 804 226 808 218 818 214Z" fill="#F7E7B0" />
      <rect x="98" y="232" width="22" height="9" rx="4" fill="#C2432F" />
      {/* door line + handle */}
      <path d="M 486 200 L 492 282" stroke="#0B0E12" strokeOpacity="0.8" strokeWidth="2" />
      <rect x="520" y="214" width="34" height="6" rx="3" fill="#7A828D" />
      {/* wheel arches */}
      <path d="M 190 286 a 72 72 0 0 1 144 0 Z" fill="#0A0B0D" />
      <path d="M 610 286 a 72 72 0 0 1 144 0 Z" fill="#0A0B0D" />
      {[262, 682].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="286" r="58" fill="#0D0F12" />
          <circle cx={cx} cy="286" r="40" fill="url(#gn-rim)" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={cx + Math.cos(a) * 10} y1={286 + Math.sin(a) * 10} x2={cx + Math.cos(a) * 36} y2={286 + Math.sin(a) * 36} stroke="#20252B" strokeWidth="5" />;
          })}
          <circle cx={cx} cy="286" r="10" fill="#2A2F36" stroke="#F2C230" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

function Plate() {
  return (
    <div className="flex h-[58px] w-full max-w-[300px] overflow-hidden rounded-[8px] border-2 border-[#111] bg-[#F2B705] shadow-[0_14px_30px_-16px_rgba(242,183,5,0.7)]">
      <div className="flex w-10 flex-col items-center justify-end bg-[#1D3E9A] pb-1.5 text-[13px] font-bold text-white">
        <span className="mb-1 text-[8px] leading-none text-[#F2C230]">★★★</span>NL
      </div>
      <label className="sr-only" htmlFor="gn-kenteken">Kenteken</label>
      <input
        id="gn-kenteken"
        defaultValue="XK-482-B"
        className="w-full bg-transparent px-3 text-center text-[28px] font-extrabold uppercase tracking-[0.08em] text-[#111] outline-none"
        style={wide}
      />
    </div>
  );
}

const services = [
  { title: "APK-keuring", text: "Snel ingepland, duidelijk advies en geen onverwachte reparaties zonder overleg." },
  { title: "Onderhoud", text: "Kleine en grote beurten volgens fabrieksvoorschrift, voor elk merk." },
  { title: "Diagnose", text: "Storingslampje aan? We lezen uit, zoeken de oorzaak en leggen het helder uit." },
  { title: "Banden & uitlijnen", text: "Wisselen, opslaan en uitlijnen, zodat je veilig en zuinig rijdt." },
  { title: "Airco-service", text: "Controle, reiniging en bijvullen voor een frisse auto in de zomer." },
  { title: "Remmen", text: "Remschijven en blokken gecontroleerd en vervangen waar nodig." },
];

export function GarageSite() {
  return (
    <div className="min-h-screen bg-[#121417] font-archivo text-[#EDEFF2] antialiased">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#121417]/90 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[6px] bg-[#F2C230] text-[15px] font-black text-[#121417]" style={wide}>N</span>
            <span className="leading-none">
              <span className="block text-[17px] font-extrabold uppercase tracking-[0.02em]" style={wide}>Noordkade</span>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-white/50">Garage</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-[14px] text-white/65 md:flex" aria-label="Hoofdmenu concept">
            <a href="#diensten" className="hover:text-white">Diensten</a>
            <a href="#plannen" className="hover:text-white">Afspraak</a>
            <a href="#openingstijden" className="hover:text-white">Openingstijden</a>
          </nav>
          <a href="#plannen" className="rounded-[8px] bg-[#F2C230] px-4 py-2.5 text-[14px] font-bold text-[#121417] transition hover:bg-[#FFD24A]">
            Afspraak maken
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-24 lg:pt-20">
          <div>
            <p className="mb-5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#F2C230]">
              <span className="h-px w-8 bg-[#F2C230]" /> Alle merken welkom
            </p>
            <h1 className="text-[46px] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] sm:text-[68px] lg:text-[76px]" style={wide}>
              Onderhoud zonder gedoe.
            </h1>
            <p className="mt-6 max-w-[30rem] text-[17px] leading-relaxed text-white/65">
              Vul je kenteken in, kies wat je auto nodig heeft en plan direct een moment dat jou uitkomt.
            </p>
            <div id="plannen" className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Plate />
              <button type="button" className="h-[58px] rounded-[8px] bg-white px-6 text-[15px] font-bold text-[#121417] transition hover:bg-[#F2C230]">
                Plan je APK
              </button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/55">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F2C230]" />Wachten mogelijk</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F2C230]" />Vervangend vervoer op aanvraag</li>
            </ul>
          </div>
          <div className="relative">
            <Car />
            <div className="absolute right-2 top-0 rounded-[10px] border border-white/10 bg-[#1C2026]/90 px-4 py-3 backdrop-blur sm:right-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Volgende vrije plek</p>
              <p className="mt-1 text-[18px] font-bold" style={wide}>Morgen 08:30</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diensten" className="border-t border-white/8 bg-[#16191D]">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="text-[34px] font-extrabold uppercase leading-[0.95] sm:text-[48px]" style={wide}>Wat we doen</h2>
            <p className="max-w-[26rem] text-[15px] text-white/55">Eén garage voor alles wat je auto nodig heeft. Altijd eerst overleg voordat we iets vervangen.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[12px] bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article key={s.title} className="group relative bg-[#16191D] p-7 transition hover:bg-[#1C2026]">
                <span className="text-[13px] font-bold text-[#F2C230]" style={wide}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[21px] font-bold uppercase tracking-[0.01em]" style={wide}>{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/58">{s.text}</p>
                <span className="absolute inset-x-7 bottom-0 h-[2px] origin-left scale-x-0 bg-[#F2C230] transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="openingstijden" className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <h2 className="text-[34px] font-extrabold uppercase leading-[0.95] sm:text-[48px]" style={wide}>Zo plan je een afspraak</h2>
          <ol className="mt-10 space-y-6">
            {["Vul je kenteken in", "Kies wat je auto nodig heeft", "Kies een dag en tijd"].map((t, i) => (
              <li key={t} className="flex items-center gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#F2C230]/50 text-[15px] font-bold text-[#F2C230]">{i + 1}</span>
                <span className="text-[18px] font-semibold">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-[#1A1D22] p-7">
          <h3 className="text-[18px] font-bold uppercase" style={wide}>Openingstijden</h3>
          <dl className="mt-6 divide-y divide-white/8 text-[15px]">
            {[["Maandag t/m vrijdag", "08:00 – 17:30"], ["Zaterdag", "09:00 – 13:00"], ["Zondag", "Gesloten"]].map(([d, t]) => (
              <div key={d} className="flex justify-between py-3.5"><dt className="text-white/60">{d}</dt><dd className="font-semibold">{t}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-8 text-[13px] text-white/45 sm:flex-row sm:justify-between sm:px-8">
          <p>Garage Noordkade is een fictief bedrijf.</p>
          <p>Conceptontwerp door Tam de Jong</p>
        </div>
      </footer>
    </div>
  );
}
