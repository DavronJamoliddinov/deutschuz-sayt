import type { CSSProperties } from "react";
import { demoIntro } from "@/content/demo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoWidget } from "./DemoWidget";

export function VocabularyDemo() {
  return (
    <section
      id="sinab-koring"
      aria-labelledby="demo-title"
      className="cv-auto surface-dark relative isolate overflow-hidden bg-navy-900 py-24 text-paper sm:py-32 lg:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-60" />
        <div className="absolute -left-[10%] top-[20%] size-[560px] rounded-full bg-[radial-gradient(circle,rgb(30_107_240/0.25),transparent_65%)]" />
        <div className="absolute -right-[8%] bottom-[-10%] size-[520px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.12),transparent_62%)]" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div>
          <SectionHeader id="demo-title" tone="dark" eyebrow={demoIntro.eyebrow} title={demoIntro.title} lead={demoIntro.lead} />
          <div className="mt-10" data-reveal style={{ "--reveal-delay": "180ms" } as CSSProperties}>
            <p className="text-[14.5px] font-semibold text-paper/85">{demoIntro.stepsTitle}</p>
            <ol className="relative mt-5 space-y-3">
              <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-sun/60 via-white/15 to-transparent" />
              {demoIntro.steps.map((step, index) => (
                <li key={step.title} className="relative flex gap-4">
                  <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-navy-800 font-display text-[15px] font-semibold text-sun ring-1 ring-sun/40">
                    {index + 1}
                  </span>
                  <div className="pt-1.5">
                    <div className="text-[16px] font-semibold">{step.title}</div>
                    <div className="mt-0.5 text-[14.5px] leading-relaxed text-paper/65">{step.text}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms", "--reveal-y": "40px" } as CSSProperties}>
          <DemoWidget />
          <p className="mt-5 text-center text-[13.5px] text-paper/60">{demoIntro.note}</p>
        </div>
      </div>
    </section>
  );
}
