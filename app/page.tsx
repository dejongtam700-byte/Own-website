import { About } from "@/components/site/About";
import { Benefits } from "@/components/site/Benefits";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Portfolio } from "@/components/site/Portfolio";
import { PricingCTA } from "@/components/site/PricingCTA";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Benefits />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <PricingCTA />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
