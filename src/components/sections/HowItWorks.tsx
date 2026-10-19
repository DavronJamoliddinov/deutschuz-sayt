import type { CSSProperties, ReactNode } from "react";
import { Flame, Repeat2, Sparkles } from "lucide-react";
import { howItWorks } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Ring } from "@/components/mockups/parts";
import { cn } from "@/lib/cn";

const VISUALS: ReactNode[] = [<LevelVisual key="level" />, <GoalVisual key="goal" />, <ReviewVisual key="review" />];

/** withHeader={false} — alohida sahifada: sarlavha PageHeader'da (h1), bu yerda faqat kontent, qadamlar h2. */
export function HowItWorks({ withHeader = true }: { withHeader?: boolean }) {
  const Heading = withHeader ? "h3" : "h2";
  return (
    <section
      id="qanday-ishlaydi"
      aria-labelledby={withHeader ? "how-title" : undefined}
      className={cn("cv-auto relative", withHeader ? "py-24 sm:py-32 lg:py-36" : "py-16 sm:py-20 lg:py-24")}
    >
      <div className="container-page">
        {withHeader && (
          <SectionHeader id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} lead={howItWorks.lead} align="center" />
        )}

        <ol className={cn("relative grid gap-5 lg:grid-cols-3 lg:gap-6", withHeader && "mt-14 lg:mt-16")}>
          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
              className="relative flex flex-col rounded-[26px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06] sm:p-7"
            >
              <div className="flex h-[78px] items-start justify-between gap-4">
                <span
                  aria-hidden
                  className="font-display text-[64px] font-semibold leading-[0.85] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgb(16_26_53/0.2)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div aria-hidden className="relative z-10">
                  {VISUALS[index]}
                </div>
              </div>
              <Heading className="mt-8 font-display text-[22px] font-semibold tracking-[-0.03em]">
                <span className="sr-only">{index + 1}-qadam: </span>
                {step.title}
              </Heading>
              <p className="mt-2.5 text-[15.5px] leading-[1.6] text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function VisualFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl bg-paper-2 p-3 ring-1 ring-ink/5", className)}>{children}</div>;
}

function LevelVisual() {
  return (
    <VisualFrame className="w-[150px]">
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Mos daraja</div>
      <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[11.5px] font-semibold">
        {["A1", "A2", "B1", "B2"].map((level) => (
          <span
            key={level}
            className={cn("rounded-md py-1", level === "A2" ? "bg-navy-900 text-sun" : "bg-white text-ink-3")}
          >
            {level}
          </span>
        ))}
      </div>
    </VisualFrame>
  );
}

function GoalVisual() {
  return (
    <VisualFrame className="flex w-[150px] items-center gap-2.5">
      <Ring value={0.7} size={38} stroke={4.5} color="#1E6BF0" />
      <div className="leading-tight">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Bugun</div>
        <div className="font-display text-[15px] font-semibold">14/20 soʻz</div>
      </div>
    </VisualFrame>
  );
}

function ReviewVisual() {
  return (
    <VisualFrame className="w-[150px] space-y-1.5">
      <div className="flex items-center gap-1.5 text-[11.5px] font-semibold">
        <Repeat2 className="size-3.5 text-app-text" />
        Takrorlash
        <span className="ml-auto inline-flex items-center gap-0.5 text-pl">
          <Flame className="size-3 fill-current" />7
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-[11px] text-ink-2">
        <Sparkles className="size-3 text-app-text" />
        Wie geht’s?
      </div>
    </VisualFrame>
  );
}
