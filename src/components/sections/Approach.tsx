import type { CSSProperties, ReactNode } from "react";
import { Check, Volume2, Wifi, WifiOff } from "lucide-react";
import { approach } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Waveform } from "@/components/mockups/parts";
import { ScriptToggle } from "./ScriptToggle";
import { cn } from "@/lib/cn";

export function Approach() {
  return (
    <section id="yondashuv" aria-labelledby="approach-title" className="cv-auto relative py-24 sm:py-32 lg:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader id="approach-title" eyebrow={approach.eyebrow} title={approach.title} lead={approach.lead} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          <Card title={approach.direct.title} text={approach.direct.text} className="sm:col-span-2" delay={0}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Homonym
                n={1}
                plural="die Banken"
                meaning="bank (moliya muassasasi)"
                de="Ich gehe heute zur Bank."
                uz="Bugun bankka boraman."
              />
              <Homonym n={2} plural="die Bänke" meaning="oʻrindiq, skameyka" de="Wir sitzen auf der Bank." uz="Biz skameykada oʻtiribmiz." />
            </div>
          </Card>

          <Card title={approach.examples.title} text={approach.examples.text} delay={60}>
            <div className="rounded-2xl bg-app-bg p-4 text-app-ink">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[17px] font-bold tracking-[-0.02em]">abfahren</span>
                <span className="text-[14px] text-app-muted">joʻnamoq</span>
              </div>
              <div className="mt-3 flex items-start gap-2 text-[14.5px] font-medium leading-snug">
                <Volume2 aria-hidden className="mt-[3px] size-3.5 shrink-0 text-app-text" />
                <span>
                  Der Zug <span className="rounded bg-sun/50 px-1">fährt</span> um acht Uhr <span className="rounded bg-sun/50 px-1">ab</span>.
                </span>
              </div>
              <div className="mt-0.5 pl-[22px] text-[13.5px] text-app-muted">Poyezd soat sakkizda joʻnaydi.</div>
            </div>
          </Card>

          <Card title={approach.script.title} text={approach.script.text} delay={120}>
            <ScriptToggle />
          </Card>

          <Card title={approach.audio.title} text={approach.audio.text} delay={60}>
            <div className="flex items-center gap-4 rounded-2xl bg-navy-900 p-4 text-paper">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sun text-navy-900">
                <Volume2 aria-hidden className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[15px] font-semibold">
                    <span className="text-[#8db4ff]">der</span> Bahnhof
                  </span>
                  <span className="text-[11.5px] text-paper/60">Wikimedia Commons</span>
                </div>
                <Waveform className="mt-1.5 h-6 justify-between gap-0" barClassName="bg-sun/70" />
              </div>
            </div>
          </Card>

          <Card title={approach.offline.title} text={approach.offline.text} delay={120}>
            <ul className="grid gap-2 text-[14px]">
              {["Lugʻat va talaffuz", "Kartochkalar va oʻyinlar", "Grammatika va matnlar"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 rounded-xl bg-paper-2 px-3 py-2.5">
                  <WifiOff aria-hidden className="size-4 text-ink-3" />
                  <span className="font-medium">{item}</span>
                  <Check aria-hidden className="ml-auto size-4 text-das" strokeWidth={2.5} />
                </li>
              ))}
              <li className="flex items-center gap-2.5 rounded-xl border border-dashed border-ink/20 px-3 py-2.5">
                <Wifi aria-hidden className="size-4 text-ink-3" />
                <span className="text-ink-2">AI va videolar — internet bilan</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  text,
  children,
  className,
  delay,
}: {
  title: string;
  text: string;
  children: ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn("flex flex-col rounded-[24px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06] sm:p-7", className)}
    >
      <h3 className="font-display text-[20px] font-semibold leading-tight tracking-[-0.025em] text-ink">{title}</h3>
      <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-2">{text}</p>
      <div className="mt-6 flex-1 content-end">{children}</div>
    </article>
  );
}

function Homonym({ n, plural, meaning, de, uz }: { n: number; plural: string; meaning: string; de: string; uz: string }) {
  return (
    <div className="rounded-2xl bg-app-bg p-4 text-app-ink">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[13px] font-semibold text-die">die</span>
        <span className="text-[19px] font-bold tracking-[-0.02em]">
          Bank<sup className="ml-0.5 text-[11px] font-semibold text-app-text">{n}</sup>
        </span>
        <span className="ml-auto text-[11.5px] text-app-muted">{plural}</span>
      </div>
      <div className="mt-1 text-[15px] font-semibold text-app-text">{meaning}</div>
      <div className="mt-3 text-[13.5px] font-medium">{de}</div>
      <div className="text-[13px] text-app-muted">{uz}</div>
    </div>
  );
}
