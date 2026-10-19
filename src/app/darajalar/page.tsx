import type { Metadata } from "next";
import { levelsIntro } from "@/content/levels";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { LearningPath } from "@/components/sections/LearningPath";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMetadata({
  path: "/darajalar",
  title: "Darajalar",
  description:
    "A1 dan C1 gacha: har bir darajada grammatika darslari, oʻqish matnlari, video darslar va Goethe hamda telc formatidagi gapirish mashqlari.",
});

export default function LevelsPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Darajalar" eyebrow={levelsIntro.eyebrow} title={levelsIntro.title} lead={levelsIntro.lead} />
      <LearningPath withHeader={false} />
      <FinalCTA />
    </main>
  );
}
