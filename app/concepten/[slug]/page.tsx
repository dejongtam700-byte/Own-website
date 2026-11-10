import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptView } from "@/components/concepts/ConceptView";
import { concepts, type ConceptSlug } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return concepts.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = concepts.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `Conceptontwerp ${c.industry.toLowerCase()}: ${c.name}`,
    description: `Conceptontwerp door Tam de Jong voor een ${c.industry.toLowerCase()}. ${c.name} is een fictief bedrijf; dit is een ontwerpvoorbeeld.`,
    openGraph: { images: [{ url: `/concepts/${c.slug}-desktop.webp`, width: 1440, height: 900 }] },
  };
}

export default async function ConceptPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!concepts.some((c) => c.slug === slug)) notFound();
  return <ConceptView slug={slug as ConceptSlug} />;
}
