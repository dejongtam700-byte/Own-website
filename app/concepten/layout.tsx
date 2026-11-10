import { Archivo, Fraunces, Instrument_Serif } from "next/font/google";

// Lettertypen die alleen de conceptdemo's gebruiken — worden niet op de homepage geladen.
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "opsz"], style: ["normal", "italic"], variable: "--font-fraunces-var", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-var", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo-var", display: "swap" });

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fraunces.variable} ${instrument.variable} ${archivo.variable}`}>{children}</div>;
}
