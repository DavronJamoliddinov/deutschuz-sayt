import type { CSSProperties } from "react";
import { Check, Info } from "lucide-react";
import { readingIntro } from "@/content/reading";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ReadingDemo } from "./ReadingDemo";

/** O'qish matnlari: haqiqiy darajalar (A1–B1, B2/C1 tayyorlanmoqda) va ishlaydigan «so'zni bosing» namunasi. */
export function ReadingSpotlight() {
  return (
    <section id="oqish-namuna" aria-labelledby="reading-title" className="cv-auto relative py-20 sm:py-28 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <SectionHeader id="reading-title" eyebrow={readingIntro.eyebrow} title={readingIntro.title} lead={readingIntro.lead} />
          <ul className="mt-8 space-y-3">
            {readingIntro.points.map((point, index) => (
              <li
                key={point}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
                className="flex gap-3 text-[15.5px] leading-snug text-ink-2"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-das/12 text-das">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms", "--reveal-y": "36px" } as CSSProperties}>
          <ReadingDemo />
          <p className="mt-4 flex gap-2 text-[13px] leading-relaxed text-ink-3">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
            {readingIntro.note}
          </p>
        </div>
      </div>
    </section>
  );
}
