import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/site/LegalPlaceholder";

export const metadata: Metadata = { title: "Privacyverklaring", robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return <LegalPlaceholder title="Privacyverklaring" />;
}
