import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-[100svh] flex-col items-start justify-center py-32">
      <h1 className="display text-[clamp(3rem,10vw,7rem)]">Pagina niet gevonden.</h1>
      <p className="mt-6 max-w-[32rem] text-mist">Deze pagina bestaat niet (meer). Ga terug naar de homepage om verder te kijken.</p>
      <Link href="/" className="btn btn-primary mt-10">Naar de homepage</Link>
    </main>
  );
}
