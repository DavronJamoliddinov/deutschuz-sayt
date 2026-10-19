"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Check, CircleDashed } from "lucide-react";
import type { Level } from "@/content/levels";
import { cn } from "@/lib/cn";

type Labels = { pending: string; vocabulary: string; topics: string };

/**
 * Darajalar yo'li. Scroll davomida tugunlar navbat bilan «yonadi», ular orasidagi chiziq to'ladi
 * (o'tishlar CSS'da). JS bo'lmasa ham barcha kontent ko'rinadi — faqat bezak holati o'zgarmaydi.
 */
export function LevelTrack({
  levels,
  labels,
  headingLevel: Heading = "h3",
}: {
  levels: Level[];
  labels: Labels;
  headingLevel?: "h2" | "h3";
}) {
  const ref = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 65%"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(levels.length, Math.max(1, Math.floor(progress * (levels.length - 1) + 1.15)));
    setReached((current) => (current === next ? current : next));
  });

  return (
    <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
      {levels.map((level, index) => {
        const isReached = index < reached;
        const lineFilled = index + 1 < reached;
        return (
          <li
            key={level.code}
            data-reveal
            style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-5 lg:block"
          >
            {index < levels.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[27px] top-14 h-[calc(100%-1rem)] w-[2px] overflow-hidden rounded-full bg-ink/10 lg:left-14 lg:top-[27px] lg:h-[2px] lg:w-[calc(100%-2rem)]"
              >
                <span
                  className={cn(
                    "absolute inset-0 origin-top bg-gradient-to-b from-sun to-coral transition-[scale] duration-700 ease-out-expo lg:origin-left lg:bg-gradient-to-r",
                    lineFilled ? "scale-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100",
                  )}
                />
              </span>
            )}

            <span
              className={cn(
                "relative z-10 grid size-14 place-items-center rounded-full font-display text-[17px] font-semibold tracking-[-0.02em] transition-[background-color,color,box-shadow] duration-500",
                isReached
                  ? "bg-navy-900 text-sun shadow-[0_0_0_6px_rgb(255_212_71/0.2)]"
                  : "bg-white text-ink-3 shadow-[inset_0_0_0_1.5px_rgb(16_26_53/0.12)]",
              )}
            >
              {level.code}
            </span>

            <div className="lg:mt-6 lg:pr-2">
              <Heading className="font-display text-[21px] font-semibold tracking-[-0.025em]">
                <span className="sr-only">{level.code} — </span>
                {level.name}
              </Heading>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{level.summary}</p>

              <ul className="mt-4 space-y-2 text-[14px]">
                {level.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-das" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
                {level.pending?.map((item) => (
                  <li key={item} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-3">
                    <CircleDashed aria-hidden className="size-4 shrink-0" />
                    <span>{item}</span>
                    <span className="rounded-full bg-sun-soft px-2 py-0.5 text-[11.5px] font-semibold text-[#7a5a00]">{labels.pending}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[13px] leading-snug text-ink-3">
                <span className="font-semibold text-ink-2">{labels.vocabulary}:</span> {level.vocabulary}
              </p>
              <p className="sr-only">{labels.topics}:</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {level.topics.map((topic) => (
                  <li key={topic} className="rounded-full bg-white px-2.5 py-1 text-[12px] text-ink-2 ring-1 ring-ink/[0.06]">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
