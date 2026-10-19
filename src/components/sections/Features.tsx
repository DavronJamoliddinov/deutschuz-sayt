import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BookText,
  CirclePlay,
  GraduationCap,
  Headphones,
  Keyboard,
  Languages,
  Layers,
  Lightbulb,
  MessagesSquare,
  PenLine,
  Play,
  Puzzle,
  Search,
  Shapes,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { extraFeatures, featureTiles, featuresIntro, gameNames, smallFeatures, type FeatureTile } from "@/content/features";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const TILE_ICON: Record<FeatureTile["key"], LucideIcon> = {
  dictionary: BookOpen,
  learn: Layers,
  games: Puzzle,
  grammar: GraduationCap,
  speaking: MessagesSquare,
  reading: BookText,
  videos: CirclePlay,
};

const TILE_LAYOUT: Record<FeatureTile["key"], string> = {
  dictionary: "md:col-span-2 lg:col-span-7",
  learn: "lg:col-span-5",
  games: "lg:col-span-5",
  grammar: "md:col-span-2 lg:col-span-7",
  speaking: "lg:col-span-4",
  reading: "lg:col-span-4",
  videos: "md:col-span-2 lg:col-span-4",
};

const VISUALS: Record<FeatureTile["key"], () => ReactNode> = {
  dictionary: DictionaryVisual,
  learn: LearnVisual,
  games: GamesVisual,
  grammar: GrammarVisual,
  speaking: SpeakingVisual,
  reading: ReadingVisual,
  videos: VideosVisual,
};

/** withHeader={false} — alohida sahifada: sarlavha PageHeader'da (h1), bu yerda faqat kontent, kartalar h2. */
export function Features({ withHeader = true }: { withHeader?: boolean }) {
  const Heading = withHeader ? "h3" : "h2";
  return (
    <section
      id="imkoniyatlar"
      aria-labelledby={withHeader ? "features-title" : undefined}
      className={cn("cv-auto relative bg-paper-2", withHeader ? "py-24 sm:py-32 lg:py-36" : "py-16 sm:py-20 lg:py-24")}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-page">
        {withHeader && (
          <SectionHeader id="features-title" eyebrow={featuresIntro.eyebrow} title={featuresIntro.title} lead={featuresIntro.lead} align="center" />
        )}

        <div className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-12", withHeader && "mt-14 lg:mt-16")}>
          {featureTiles.map((tile, index) => {
            const Icon = TILE_ICON[tile.key];
            const Visual = VISUALS[tile.key];
            return (
              <article
                key={tile.key}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-[26px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06] sm:p-7",
                  "transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift",
                  TILE_LAYOUT[tile.key],
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-[10px] bg-navy-900 text-sun">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-3">{tile.kicker}</span>
                  {tile.badge && (
                    <span
                      className={cn(
                        "ml-auto rounded-full px-2.5 py-1 text-[11.5px] font-semibold",
                        tile.badge === "Bepul" ? "bg-das/10 text-das" : "bg-sun-soft text-[#7a5a00]",
                      )}
                    >
                      {tile.badge}
                    </span>
                  )}
                </div>
                <Heading className="mt-5 font-display text-[22px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[24px]">
                  {tile.title}
                </Heading>
                <p className="mt-2.5 max-w-[34rem] text-[15px] leading-[1.6] text-ink-2">{tile.text}</p>
                {tile.link && (
                  <Link
                    href={tile.link.href}
                    className="mt-3 inline-flex w-fit items-center gap-1.5 rounded text-[14.5px] font-semibold text-app-text underline-offset-4 hover:underline"
                  >
                    {tile.link.label}
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                )}
                <div className="mt-7 flex flex-1 flex-col justify-center">
                  <Visual />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {smallFeatures.map(({ icon: Icon, title, text, premium }, index) => (
            <article
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
              className="rounded-[22px] bg-white p-5 ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-paper-2 text-navy-900">
                  <Icon aria-hidden className="size-5" />
                </span>
                {premium && <span className="rounded-full bg-sun-soft px-2.5 py-1 text-[11.5px] font-semibold text-[#7a5a00]">Premium</span>}
              </div>
              <Heading className="mt-4 font-display text-[18px] font-semibold tracking-[-0.02em]">{title}</Heading>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink-2">{text}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[14px]">
          <span className="mr-1 font-semibold text-ink-2">Yana:</span>
          {extraFeatures.map((item) => (
            <span key={item} className="rounded-full bg-white px-3.5 py-1.5 text-ink-2 ring-1 ring-ink/[0.07]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Plitka vizuallari (illyustratsiya: bosilmaydi) ---------- */

function DictionaryVisual() {
  const chips: [string, string][] = [
    ["Häusern", "Haus"],
    ["strasse", "Straße"],
    ["fährt", "fahren"],
    ["кўча", "die Straße"],
  ];
  return (
    <div aria-hidden className="rounded-[20px] bg-app-bg p-4 text-app-ink sm:p-5">
      <div className="flex h-11 items-center gap-2.5 rounded-xl bg-white px-3.5 text-[15px] shadow-[0_1px_2px_rgb(21_27_46/0.06)]">
        <Search className="size-4 text-app-muted" />
        <span className="font-medium">ging</span>
        <span className="-ml-1.5 h-[18px] w-[2px] rounded-full bg-app" />
      </div>
      <div className="mt-3 rounded-xl bg-white p-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[19px] font-bold tracking-[-0.02em]">gehen</span>
          <span className="rounded-full bg-app/10 px-2.5 py-1 text-[11.5px] font-semibold text-app-text">«ging» shakli</span>
        </div>
        <div className="mt-0.5 text-[14.5px] text-[#3a4258]">bormoq, yurmoq</div>
        <div className="mt-1.5 text-[12.5px] text-app-muted">geht · ging · ist gegangen</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[12.5px]">
        {chips.map(([from, to]) => (
          <span key={from} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
            <span className="font-medium">{from}</span>
            <ArrowRight className="size-3 text-app-muted" />
            <span className="text-app-text">{to}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function LearnVisual() {
  return (
    <div aria-hidden className="relative px-2 pb-7">
      <div className="absolute inset-x-10 bottom-0 top-8 -rotate-[4deg] rounded-[20px] bg-[#FFF1C2] ring-1 ring-ink/5 transition-transform duration-700 ease-out-expo group-hover:-translate-x-3 group-hover:-rotate-[7deg]" />
      <div className="absolute inset-x-6 bottom-3 top-4 rotate-[3deg] rounded-[20px] bg-[#E4EDFF] ring-1 ring-ink/5 transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-hover:rotate-[6deg]" />
      <div className="relative rounded-[20px] bg-white p-4 text-app-ink shadow-card ring-1 ring-ink/5">
        <div className="flex justify-between text-[11.5px] font-medium text-app-muted">
          <span>A1 · 5-qism</span>
          <span className="tabular-nums">12/20</span>
        </div>
        <div className="mt-3 text-center">
          <div className="text-[22px] font-bold tracking-[-0.02em]">
            <span className="text-[15px] font-semibold text-die">die</span> Wohnung
          </div>
          <div className="text-[14.5px] text-app-muted">kvartira</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[12.5px] font-semibold">
          <span className="rounded-xl bg-app-bg py-2 text-center text-[#3a4258]">Yana koʻrsat</span>
          <span className="rounded-xl bg-app py-2 text-center text-white">Bildim</span>
        </div>
      </div>
    </div>
  );
}

function GamesVisual() {
  const icons: LucideIcon[] = [Shapes, Languages, PenLine, Shapes, Headphones, Keyboard, Puzzle];
  return (
    <ul aria-label="Oʻyinlar roʻyxati" className="flex flex-wrap gap-2">
      {gameNames.map((name, index) => {
        const Icon = icons[index] ?? Puzzle;
        const isArticles = index === 0;
        return (
          <li
            key={name}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5",
              isArticles ? "bg-navy-900 text-paper" : "bg-paper-2 text-ink",
            )}
            style={{ transitionDelay: `${index * 30}ms` }}
          >
            {isArticles ? (
              <span aria-hidden className="flex gap-1">
                <span className="size-2 rounded-full bg-[#7fa7ff]" />
                <span className="size-2 rounded-full bg-[#ff8a8a]" />
                <span className="size-2 rounded-full bg-[#5fd496]" />
              </span>
            ) : (
              <Icon aria-hidden className="size-4 text-ink-3" />
            )}
            {name}
          </li>
        );
      })}
    </ul>
  );
}

function GrammarVisual() {
  const rows = [
    ["der", "den", "Ich sehe den Mann."],
    ["ein", "einen", "Ich kaufe einen Tisch."],
  ];
  return (
    <div aria-hidden className="grid gap-3 sm:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[20px] bg-app-bg p-4 text-app-ink">
        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-app-muted">Akkusativ · erkak jinsi</div>
        <div className="mt-2.5 space-y-2">
          {rows.map(([from, to, example]) => (
            <div key={from} className="rounded-xl bg-white px-3.5 py-2.5">
              <div className="flex items-center gap-2 text-[15px] font-semibold">
                <span className="text-[#3a4258]">{from}</span>
                <ArrowRight className="size-3.5 text-app-muted" />
                <span className="text-der">{to}</span>
              </div>
              <div className="mt-0.5 text-[12.5px] text-app-muted">{example}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex-1 rounded-[20px] bg-[#FFF1F0] p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-coral-700">
            <Lightbulb className="size-3.5" />
            Tipik xato
          </div>
          <div className="mt-2 text-[14px]">
            <span className="text-ink-3 line-through decoration-die/70">einen Buch</span>
            <ArrowRight className="mx-1.5 inline size-3.5 text-ink-3" />
            <span className="font-semibold text-das">ein Buch</span>
          </div>
          <div className="mt-1 text-[12.5px] leading-snug text-ink-2">das Buch — oʻrta jins, artikl oʻzgarmaydi.</div>
        </div>
        <div className="flex items-center justify-between rounded-[20px] bg-navy-900 px-4 py-3 text-paper">
          <span className="text-[13px] font-medium text-paper/75">Har darsda</span>
          <span className="font-display text-[17px] font-semibold">10 ta mashq</span>
        </div>
      </div>
    </div>
  );
}

function SpeakingVisual() {
  return (
    <div aria-hidden className="space-y-2.5 rounded-[20px] bg-app-bg p-4 text-app-ink">
      <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5">
        <div className="text-[14px] font-semibold">Was machen Sie am Wochenende?</div>
        <div className="text-[12.5px] text-app-muted">Dam olish kunlari nima qilasiz?</div>
      </div>
      <div className="ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-md bg-app px-3.5 py-2.5 text-[14px] text-white transition-transform duration-500 ease-out-expo group-hover:-translate-x-1">
        Ich gehe mit Freunden ins Kino.
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-soft px-3 py-1.5 text-[12px] font-semibold text-navy-900">
          <Lightbulb className="size-3.5" />
          Yordam
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-app-muted">
          <Sparkles className="size-3.5 text-app-text" />
          AI suhbatdosh
        </span>
      </div>
    </div>
  );
}

function ReadingVisual() {
  return (
    <div aria-hidden className="relative rounded-[20px] bg-app-bg p-4 pb-[86px] text-app-ink">
      <p className="text-[15px] leading-[1.75]">
        Jeden Tag liest er <span className="rounded-[5px] bg-sun/60 px-1 font-medium">Anzeigen</span> im Internet. Endlich findet er
        eine kleine Wohnung.
      </p>
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3.5 shadow-[0_10px_24px_-14px_rgb(21_27_46/0.35)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
        <div className="flex items-baseline justify-between">
          <span className="text-[16px] font-bold">
            <span className="text-[13px] font-semibold text-die">die</span> Anzeige
          </span>
          <span className="text-[14px] text-app-text">eʼlon</span>
        </div>
        <div className="mt-0.5 text-[12px] text-app-muted">+ Kartochkalarga qoʻshish</div>
      </div>
    </div>
  );
}

function VideosVisual() {
  return (
    <div aria-hidden className="overflow-hidden rounded-[20px] bg-navy-900 text-paper">
      <div className="relative aspect-[16/8] bg-[linear-gradient(140deg,#22356a,#0e1630_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_75%_20%,rgb(255_212_71/0.22),transparent_70%)]" />
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy-900 transition-transform duration-500 ease-out-expo group-hover:scale-110">
          <Play className="size-[18px] translate-x-px fill-current" />
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[11.5px] font-semibold">0,75×</span>
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[15px] font-semibold leading-snug">
          Ich fahre jeden Morgen mit dem <span className="rounded bg-sun px-1 text-navy-900">Bus</span>{" "}
          <span className="text-paper/60">zur Arbeit.</span>
        </p>
        <p className="mt-1 text-[12.5px] text-paper/65">Men har kuni ertalab ishga avtobusda boraman.</p>
      </div>
    </div>
  );
}
