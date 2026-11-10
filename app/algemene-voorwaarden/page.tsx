import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/site/LegalPlaceholder";

export const metadata: Metadata = { title: "Algemene voorwaarden", robots: { index: false, follow: true } };

export default function TermsPage() {
  return <LegalPlaceholder title="Algemene voorwaarden" />;
}
