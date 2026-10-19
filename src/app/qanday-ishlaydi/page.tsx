import type { Metadata } from "next";
import { howItWorks } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMetadata({
  path: "/qanday-ishlaydi",
  title: "Qanday ishlaydi",
  description:
    "DeutschUz bilan oʻrganish: birinchi ochilishda darajani aniqlash, har kungi qisqa mashgʻulotlar, FSRS boʻyicha takrorlash va AI bilan gapirish.",
});

export default function HowItWorksPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Qanday ishlaydi" eyebrow={howItWorks.eyebrow} title={howItWorks.title} lead={howItWorks.lead} />
      <HowItWorks withHeader={false} />
      <FinalCTA />
    </main>
  );
}
