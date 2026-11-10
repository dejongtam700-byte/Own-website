/**
 * Conceptontwerp — fictief hoveniersbedrijf "Groenveld Tuinontwerp".
 * Dit is een ontwerpvoorbeeld, geen bestaand bedrijf of echte klant.
 */

function Landscape() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="gv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9D3BC" />
          <stop offset="0.55" stopColor="#E7E2CF" />
          <stop offset="1" stopColor="#EFE7D2" />
        </linearGradient>
        <radialGradient id="gv-sun" cx="0.72" cy="0.3" r="0.35">
          <stop offset="0" stopColor="#FFF6DD" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFF6DD" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gv-h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9B496" /><stop offset="1" stopColor="#97A483" /></linearGradient>
        <linearGradient id="gv-h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7E9068" /><stop offset="1" stopColor="#6A7D57" /></linearGradient>
        <linearGradient id="gv-h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4F6340" /><stop offset="1" stopColor="#3F5133" /></linearGradient>
        <linearGradient id="gv-h4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#33432B" /><stop offset="1" stopColor="#253221" /></linearGradient>
        <linearGradient id="gv-path" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D9CDB0" /><stop offset="1" stopColor="#C4B48F" /></linearGradient>
        <filter id="gv-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <linearGradient id="gv-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stopColor="#1F2A1B" stopOpacity="0" />
          <stop offset="1" stopColor="#1F2A1B" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#gv-sky)" />
      <rect width="1440" height="760" fill="url(#gv-sun)" />
      <path d="M0 380 C 220 330 420 360 620 330 C 840 300 1060 350 1440 310 L1440 760 L0 760Z" fill="url(#gv-h1)" />
      {/* distant tree line */}
      {Array.from({ length: 26 }).map((_, i) => (
        <ellipse key={i} cx={30 + i * 56 + (i % 3) * 9} cy={352 - (i % 4) * 7 + (i > 13 ? -14 : 0)} rx={30 + (i % 3) * 6} ry={24 + (i % 2) * 8} fill="#8C9B79" opacity="0.9" />
      ))}
      <path d="M0 450 C 260 400 520 440 760 410 C 1000 380 1200 420 1440 390 L1440 760 L0 760Z" fill="url(#gv-h2)" />
      {/* cypresses */}
      {[180, 214, 1180, 1214, 1248].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={392 - (i % 2) * 10} rx="15" ry={62 + (i % 2) * 10} fill="#3E5233" />
          <ellipse cx={x - 4} cy={384 - (i % 2) * 10} rx="6" ry={44} fill="#53683F" opacity="0.6" />
        </g>
      ))}
      {/* rounded tree */}
      <g>
        <rect x="914" y="372" width="10" height="70" fill="#3B3226" />
        <circle cx="900" cy="350" r="46" fill="#4C6139" />
        <circle cx="942" cy="340" r="52" fill="#56703F" />
        <circle cx="922" cy="306" r="40" fill="#62804A" />
        <circle cx="934" cy="318" r="22" fill="#7B9A5E" opacity="0.6" />
      </g>
      <path d="M0 540 C 300 490 600 520 900 495 C 1140 476 1300 500 1440 488 L1440 760 L0 760Z" fill="url(#gv-h3)" />
      {/* hedges */}
      {[60, 250, 440].map((x) => (
        <rect key={x} x={x} y="520" width="160" height="56" rx="28" fill="#2F3F27" />
      ))}
      {[1010, 1200].map((x) => (
        <rect key={x} x={x} y="508" width="170" height="58" rx="29" fill="#2F3F27" />
      ))}
      {/* path */}
      <path d="M700 760 C 690 680 760 620 820 580 C 860 552 880 530 870 505 L 905 505 C 922 530 905 560 870 590 C 810 640 800 700 860 760Z" fill="url(#gv-path)" />
      <path d="M0 640 C 340 600 660 640 980 615 C 1200 598 1340 612 1440 604 L1440 760 L0 760Z" fill="url(#gv-h4)" />
      {/* grass strokes */}
      {Array.from({ length: 70 }).map((_, i) => {
        const x = (i * 97) % 1440;
        const y = 650 + ((i * 37) % 100);
        return <path key={i} d={`M${x} ${y} q 4 -18 10 -26`} stroke="#4A5E3A" strokeWidth="2" fill="none" opacity="0.7" />;
      })}
      <rect width="1440" height="760" fill="url(#gv-shade)" />
      <rect width="1440" height="760" filter="url(#gv-grain)" />
    </svg>
  );
}

const seasons = [
  { name: "Lente", text: "Snoeien, bemesten en nieuwe beplanting.", color: "#B9C99B" },
  { name: "Zomer", text: "Gazononderhoud en water geven op maat.", color: "#7E9A5B" },
  { name: "Herfst", text: "Blad ruimen en de tuin winterklaar maken.", color: "#C08A4E" },
  { name: "Winter", text: "Ontwerpen en plannen voor het nieuwe seizoen.", color: "#8A9AA0" },
];

export function LandscaperSite() {
  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans text-[#25301F] antialiased">
      {/* Hero */}
      <section id="top" className="relative isolate flex min-h-[640px] flex-col overflow-hidden text-[#F7F3E8] sm:min-h-[720px]">
        <Landscape />
        <header className="relative z-10">
          <div className="mx-auto grid h-[84px] max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10">
            <nav className="hidden gap-7 text-[14px] text-[#25301F]/80 md:flex" aria-label="Hoofdmenu concept">
              <a href="#aanpak" className="hover:text-[#25301F]">Aanpak</a>
              <a href="#seizoenen" className="hover:text-[#25301F]">Onderhoud</a>
            </nav>
            <a href="#top" className="col-start-1 text-[#25301F] md:col-start-2">
              <span className="font-instrument text-[30px] leading-none tracking-[-0.01em]">Groenveld</span>
              <span className="ml-2 align-middle text-[11px] tracking-[0.12em] text-[#25301F]/65">tuinontwerp</span>
            </a>
            <div className="flex justify-end">
              <a href="#gesprek" className="rounded-full bg-[#25301F] px-5 py-2.5 text-[14px] text-[#F2EEE3] transition hover:bg-[#1A2316]">Tuingesprek plannen</a>
            </div>
          </div>
        </header>
        <div className="relative z-10 mx-auto mt-auto w-full max-w-[1280px] px-5 pb-12 sm:px-10 sm:pb-16">
          <h1 className="max-w-[13ch] font-instrument text-[56px] leading-[0.95] tracking-[-0.02em] drop-shadow-[0_2px_24px_rgba(20,28,16,0.35)] sm:text-[92px] lg:text-[112px]">
            Tuinen die met de <em>seizoenen</em> meegroeien.
          </h1>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34rem] text-[17px] leading-relaxed text-[#F7F3E8]/88">
              Ontwerp, aanleg en onderhoud van tuinen waar je het hele jaar van geniet. Rustig, doordacht en met respect voor wat er al groeit.
            </p>
            <a href="#gesprek" className="w-fit rounded-full bg-[#F2EEE3] px-7 py-4 text-[15px] font-medium text-[#25301F] transition hover:bg-white">
              Plan een tuingesprek
            </a>
          </div>
        </div>
      </section>

      {/* Aanpak */}
      <section id="aanpak" className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-instrument text-[44px] leading-[1] tracking-[-0.015em] sm:text-[60px]">
            Van eerste schets tot <em>laatste plant</em>.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-[6px] bg-[#25301F]/15 sm:grid-cols-3">
            {[
              ["Ontwerp", "Een plan op schaal, afgestemd op licht, grond en hoe je de tuin wilt gebruiken."],
              ["Aanleg", "Bestrating, borders en beplanting, vakkundig aangelegd door één vast team."],
              ["Onderhoud", "Periodiek of eenmalig, zodat je tuin er elk seizoen verzorgd bij ligt."],
            ].map(([t, d], i) => (
              <article key={t} className="flex min-h-[260px] flex-col bg-[#F2EEE3] p-7">
                <svg viewBox="0 0 48 48" className="h-10 w-10 text-[#5E7350]" aria-hidden>
                  {i === 0 && <path d="M8 40 L8 12 L24 6 L40 12 L40 40 M8 26 H40 M24 6 V40" fill="none" stroke="currentColor" strokeWidth="2" />}
                  {i === 1 && <path d="M24 42 V20 M24 26 C 14 26 10 18 10 10 C 20 10 24 16 24 26 M24 22 C 32 22 38 16 38 8 C 30 8 24 12 24 22" fill="none" stroke="currentColor" strokeWidth="2" />}
                  {i === 2 && <path d="M10 38 L30 18 M26 14 L34 22 M30 10 L38 18 M8 40 L14 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
                </svg>
                <h3 className="mt-auto font-instrument text-[30px] leading-none">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#25301F]/70">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Seizoenen */}
      <section id="seizoenen" className="bg-[#25301F] text-[#F2EEE3]">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="max-w-[16ch] font-instrument text-[42px] leading-[1] sm:text-[56px]">Onderhoud dat het jaar volgt.</h2>
            <p className="max-w-[26rem] text-[15px] leading-relaxed text-[#F2EEE3]/70">Elk seizoen vraagt iets anders van je tuin. We stemmen het onderhoud daarop af.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s) => (
              <article key={s.name} className="group rounded-[18px] border border-[#F2EEE3]/12 p-6 transition hover:bg-[#F2EEE3]/5">
                <span className="block h-24 rounded-[12px] transition-transform duration-700 group-hover:scale-[1.02]" style={{ background: `linear-gradient(160deg, ${s.color}, #25301F)` }} />
                <h3 className="mt-5 font-instrument text-[28px] leading-none">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#F2EEE3]/65">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gesprek */}
      <section id="gesprek" className="mx-auto max-w-[1280px] px-5 py-20 text-center sm:px-10 lg:py-28">
        <h2 className="mx-auto max-w-[18ch] font-instrument text-[46px] leading-[1] tracking-[-0.015em] sm:text-[68px]">
          Benieuwd wat er mogelijk is in <em>jouw tuin</em>?
        </h2>
        <p className="mx-auto mt-6 max-w-[32rem] text-[17px] leading-relaxed text-[#25301F]/70">
          We komen graag langs voor een vrijblijvend tuingesprek en denken mee over wat bij jou en je tuin past.
        </p>
        <a href="#top" className="mt-9 inline-flex rounded-full bg-[#25301F] px-8 py-4 text-[15px] font-medium text-[#F2EEE3] transition hover:bg-[#1A2316]">
          Plan een tuingesprek
        </a>
      </section>

      <footer className="border-t border-[#25301F]/12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-8 text-[13px] text-[#25301F]/55 sm:flex-row sm:justify-between sm:px-10">
          <p>Groenveld Tuinontwerp is een fictief bedrijf.</p>
          <p>Conceptontwerp door Tam de Jong</p>
        </div>
      </footer>
    </div>
  );
}
