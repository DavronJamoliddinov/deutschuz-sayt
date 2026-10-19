import { Info } from "lucide-react";
import { levels, levelsIntro } from "@/content/levels";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LevelTrack } from "./LevelTrack";
import { cn } from "@/lib/cn";

/** withHeader={false} — alohida sahifada: sarlavha PageHeader'da (h1), bu yerda faqat kontent, darajalar h2. */
export function LearningPath({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section
      id="darajalar"
      aria-labelledby={withHeader ? "levels-title" : undefined}
      className={cn("cv-auto relative bg-paper-2", withHeader ? "py-24 sm:py-32 lg:py-36" : "py-16 sm:py-20 lg:py-24")}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-page">
        {withHeader && <SectionHeader id="levels-title" eyebrow={levelsIntro.eyebrow} title={levelsIntro.title} lead={levelsIntro.lead} />}
        <div className={cn(withHeader && "mt-14 lg:mt-16")}>
          <LevelTrack
            levels={levels}
            headingLevel={withHeader ? "h3" : "h2"}
            labels={{ pending: levelsIntro.pendingLabel, vocabulary: levelsIntro.vocabularyLabel, topics: levelsIntro.topicsLabel }}
          />
        </div>
        <p data-reveal className="mt-14 flex max-w-[52rem] gap-3 rounded-2xl bg-white px-5 py-4 text-[14px] leading-relaxed text-ink-2 ring-1 ring-ink/[0.06]">
          <Info aria-hidden className="mt-0.5 size-[18px] shrink-0 text-ink-3" />
          {levelsIntro.note}
        </p>
      </div>
    </section>
  );
}
