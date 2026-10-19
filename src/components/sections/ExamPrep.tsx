import type { CSSProperties } from "react";
import { Info } from "lucide-react";
import { examIntro } from "@/content/exam";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChatThread } from "@/components/mockups/ChatThread";

const PART_COLORS = ["#1E6BF0", "#F06455", "#E8B10C", "#1E8449"];

export function ExamPrep() {
  return (
    <section
      id="imtihon"
      aria-labelledby="exam-title"
      className="cv-auto surface-dark relative isolate overflow-hidden bg-navy-900 py-24 text-paper sm:py-32 lg:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-50" />
        <div className="absolute right-[-12%] top-[8%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(240_100_85/0.16),transparent_64%)]" />
        <div className="absolute bottom-[-20%] left-[30%] size-[520px] rounded-full bg-[radial-gradient(circle,rgb(30_107_240/0.2),transparent_65%)]" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeader id="exam-title" tone="dark" eyebrow={examIntro.eyebrow} title={examIntro.title} lead={examIntro.lead} />

          <div data-reveal className="mt-10">
            <p className="text-[14.5px] font-semibold text-paper/85">{examIntro.flowTitle}</p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-3">
              {examIntro.flow.map((step, index) => (
                <li key={step.title} className="relative rounded-2xl bg-sun/[0.08] p-4 ring-1 ring-inset ring-sun/25">
                  <span className="font-display text-[13px] font-semibold text-sun">{index + 1}</span>
                  <div className="mt-1 text-[15px] font-semibold">{step.title}</div>
                  <div className="mt-1 text-[13.5px] leading-relaxed text-paper/70">{step.text}</div>
                </li>
              ))}
            </ol>
          </div>

          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {examIntro.points.map((point, index) => (
              <li
                key={point.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                className="rounded-2xl bg-white/[0.045] p-4 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-white/[0.07]"
              >
                <div className="text-[15.5px] font-semibold">{point.title}</div>
                <div className="mt-1 text-[14px] leading-relaxed text-paper/65">{point.text}</div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-9">
            <p className="text-[14.5px] font-semibold text-paper/85">{examIntro.situationsTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {examIntro.situations.map((situation) => (
                <li key={situation} className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[13.5px] text-paper/80 ring-1 ring-inset ring-white/10">
                  {situation}
                </li>
              ))}
            </ul>
          </div>

          <p data-reveal className="mt-8 flex gap-2.5 text-[13.5px] leading-relaxed text-paper/60">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
            {examIntro.note}
          </p>
        </div>

        <div className="relative">
          <div data-reveal style={{ "--reveal-y": "40px" } as CSSProperties} className="lg:ml-10">
            <ChatThread label={examIntro.chatLabel} />
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "200ms", "--reveal-y": "40px" } as CSSProperties}
            className="relative z-10 mx-auto mt-5 w-full max-w-[360px] sm:mx-0 lg:-ml-4"
          >
            <ReadinessCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadinessCard() {
  const { readiness } = examIntro;
  const total = Math.round(readiness.parts.reduce((sum, part) => sum + part.weight * part.filled, 0));
  return (
    <figure className="rounded-[24px] bg-white p-5 text-ink shadow-[0_30px_60px_-24px_rgb(3_7_18/0.7)]">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <SegmentedRing parts={readiness.parts.map((part, i) => ({ ...part, color: PART_COLORS[i] ?? "#1E6BF0" }))} />
          <div className="absolute inset-0 grid place-items-center text-center">
            <span>
              <span className="block font-display text-[26px] font-semibold leading-none tracking-[-0.04em]">{total}%</span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">namuna</span>
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="font-display text-[17px] font-semibold tracking-[-0.02em]">{readiness.title}</div>
          <ul className="mt-2 space-y-1">
            {readiness.parts.map((part, i) => (
              <li key={part.label} className="flex items-center gap-2 text-[12.5px] text-ink-2">
                <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: PART_COLORS[i] }} />
                {part.label}
                <span className="ml-auto pl-2 font-semibold tabular-nums text-ink-3">{part.weight}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 border-t border-line pt-3 text-[12px] leading-snug text-ink-3">{readiness.caption}</figcaption>
    </figure>
  );
}

/** Har bir yo'nalish halqada og'irligiga teng yoy; yoyning to'lgan qismi — shu yo'nalishdagi natija. */
function SegmentedRing({
  parts,
  size = 112,
  stroke = 11,
}: {
  parts: { label: string; weight: number; filled: number; color: string }[];
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gap = 5;
  const lengthOf = (weight: number) => (weight / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="-rotate-90">
      {parts.map((part, index) => {
        const segment = Math.max(lengthOf(part.weight) - gap, 0);
        const filled = segment * part.filled;
        const start = parts.slice(0, index).reduce((sum, previous) => sum + lengthOf(previous.weight), 0);
        return (
          <g key={part.label}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgb(16 26 53 / 0.08)"
              strokeWidth={stroke}
              strokeDasharray={`${segment} ${c - segment}`}
              strokeDashoffset={-start}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={part.color}
              strokeWidth={stroke}
              strokeDasharray={`${filled} ${c - filled}`}
              strokeDashoffset={-start}
            />
          </g>
        );
      })}
    </svg>
  );
}
