import type { Metadata } from "next";
import { featuresIntro } from "@/content/features";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Features } from "@/components/sections/Features";
import { ReadingSpotlight } from "@/components/sections/ReadingSpotlight";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMetadata({
  path: "/imkoniyatlar",
  title: "Imkoniyatlar",
  description:
    "DeutschUz imkoniyatlari: 65 000+ soʻzli internetsiz lugʻat, FSRS kartochkalar, 7 ta oʻyin, A1–C1 grammatika, darajaga mos AI bilan gapirish, oʻqish matnlari va video darslar.",
});

export default function FeaturesPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Imkoniyatlar" eyebrow={featuresIntro.eyebrow} title={featuresIntro.title} lead={featuresIntro.lead} />
      <Features withHeader={false} />
      <ReadingSpotlight />
      <FinalCTA />
    </main>
  );
}
