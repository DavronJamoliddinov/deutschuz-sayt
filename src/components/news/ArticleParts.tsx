import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, Info, ShieldAlert, ShieldCheck } from "lucide-react";
import { newsCopy, type NewsArticle, type NewsBlock, type NewsSource } from "@/content/news";
import { navLinks, startCta } from "@/content/navigation";
import { headings, uzDate } from "@/lib/news";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { NewsMeta } from "./NewsMeta";
import { RichText } from "./RichText";
import { UnitGrid } from "./UnitGrid";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const newsLabel = navLinks.find((link) => link.href === newsCopy.path)?.label ?? newsCopy.eyebrow;

/** Maqola sarlavhasi: qorong'i band (navigatsiya qorong'i tepaga moslangan), sahifa yo'li, toifa, sana, h1, kirish. */
export function ArticleHeader({ article, minutes }: { article: NewsArticle; minutes: number }) {
  return (
    <header className="surface-dark relative isolate overflow-hidden bg-navy-900 text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_10%_-20%,#1d2f5c_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-70" />
        <div className="absolute -right-[10%] -top-[190px] size-[620px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.13),transparent_62%)]" />
      </div>
      <div className="container-page relative pb-32 pt-28 sm:pb-36 sm:pt-36 lg:pt-40">
        <nav aria-label="Sahifa yoʻli" className="hero-in" style={delay(0)}>
          <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-paper/60">
            <li>
              <Link href="/" className="rounded transition-colors hover:text-paper">
                Bosh sahifa
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href={newsCopy.path} className="rounded transition-colors hover:text-paper">
                {newsLabel}
              </Link>
            </li>
            <li aria-hidden className="hidden sm:block">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="hidden max-w-[34ch] truncate font-medium text-paper/85 sm:block">
              {article.title}
            </li>
          </ol>
        </nav>
        <NewsMeta article={article} tone="dark" minutes={minutes} className="hero-in mt-8" />
        <h1
          id="article-title"
          className="hero-in mt-5 max-w-[24ch] font-display text-[clamp(2.05rem,1.35rem+2.9vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.038em] text-balance"
          style={delay(100)}
        >
          {article.title}
        </h1>
        <p className="hero-in mt-6 max-w-[46rem] text-[17.5px] leading-[1.65] text-paper/75 sm:text-[19px]" style={delay(180)}>
          {article.lead}
        </p>
      </div>
    </header>
  );
}

/** Asosiy raqamlar — sarlavha bandiga chiqib turadigan oq karta (bosh sahifadagi raqamlar paneli kabi). */
export function KeyStats({ article }: { article: NewsArticle }) {
  return (
    <div className="container-page relative z-10 -mt-20 sm:-mt-24">
      <section
        aria-labelledby="key-numbers"
        data-reveal
        style={{ "--reveal-y": "36px" } as CSSProperties}
        className="rounded-[28px] bg-white px-6 py-7 shadow-[0_40px_80px_-40px_rgb(16_26_53/0.45)] ring-1 ring-ink/[0.06] sm:px-9 sm:py-8"
      >
        <h2 id="key-numbers" className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-coral-700">
          {newsCopy.keyNumbers}
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4 lg:gap-x-0">
          {article.stats.map((stat, index) => (
            <div key={stat.label} className={cn("flex flex-col gap-2", index > 0 && "lg:border-l lg:border-line lg:pl-7", "lg:pr-4")}>
              <dt className="order-2 text-[14px] leading-snug text-ink-2">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(1.75rem,1.4rem+1.3vw,2.55rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                <span className={cn(stat.accent && "bg-[linear-gradient(transparent_58%,rgb(255_212_71/0.75)_58%)] px-0.5")}>
                  {stat.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

/** Fakt yonidagi manba belgisi: nashr nomi, bosilsa manbaning o'zi yangi oynada ochiladi. */
function Cite({ indices, sources }: { indices?: number[]; sources: NewsSource[] }) {
  if (!indices?.length) return null;
  return (
    <span className="ml-1.5 inline-flex flex-wrap gap-1 align-[0.12em]">
      {indices.map((index) => {
        const source = sources[index];
        if (!source) return null;
        return (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${newsCopy.sourceLabel}: ${source.outlet} — ${source.title}`}
            title={source.title}
            className="inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-full bg-paper-2 px-2.5 text-[12px] font-medium leading-none text-ink-3 ring-1 ring-inset ring-line transition-colors hover:text-ink hover:ring-ink/25"
          >
            {source.official && <ShieldCheck aria-hidden className="size-3 text-das" />}
            {source.outlet}
          </a>
        );
      })}
    </span>
  );
}

const paragraph = "mt-5 max-w-[68ch] text-[17.5px] leading-[1.75] text-ink-2 text-pretty";

function Block({ block, sources }: { block: NewsBlock; sources: NewsSource[] }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-14 scroll-mt-28 font-display text-[clamp(1.55rem,1.25rem+1.1vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink text-balance first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className={paragraph}>
          <RichText text={block.text} />
          <Cite indices={block.cite} sources={sources} />
        </p>
      );
    case "list":
      return (
        <div className="mt-6 max-w-[68ch]">
          <ul className="space-y-3.5">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3.5 text-[17px] leading-[1.7] text-ink-2">
                <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-[3px] bg-sun ring-1 ring-navy-900/25" />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
          {block.cite?.length ? (
            <p className="mt-4 flex flex-wrap items-center text-[13px] text-ink-3">
              {newsCopy.sourceLabel}:
              <Cite indices={block.cite} sources={sources} />
            </p>
          ) : null}
        </div>
      );
    case "units":
      return (
        <figure className="surface-dark relative isolate my-10 overflow-hidden rounded-[28px] bg-navy-900 p-6 text-paper sm:p-9">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-50" />
          <UnitGrid
            total={block.total}
            filled={block.filled}
            label={`${block.unit}. ${block.filledLabel}, ${block.emptyLabel}.`}
            className="grid-cols-9 sm:grid-cols-15"
          />
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-paper/75">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-3 rounded-[4px] bg-sun" />
              {block.filledLabel}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-3 rounded-[4px] bg-white/[0.1] ring-1 ring-inset ring-white/20" />
              {block.emptyLabel}
            </li>
            <li className="text-paper/60">{block.unit}</li>
          </ul>
          <figcaption className="mt-6 border-t border-white/10 pt-5 font-display text-[clamp(1.2rem,1rem+0.8vw,1.55rem)] font-semibold leading-snug tracking-[-0.02em] text-paper">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "steps":
      return (
        <section aria-label={block.title} className="mt-10 rounded-[28px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06] sm:p-8">
          <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">{block.title}</h3>
          <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-7">
            {block.items.map((item, index) => (
              <li key={item.title}>
                <span
                  aria-hidden
                  className="grid size-9 place-items-center rounded-full bg-navy-900 font-display text-[15px] font-semibold text-sun"
                >
                  {index + 1}
                </span>
                <h4 className="mt-4 text-[16.5px] font-semibold leading-snug text-ink">{item.title}</h4>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-2">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    case "callout": {
      const warning = block.tone === "warning";
      const Icon = warning ? ShieldAlert : Info;
      return (
        <aside
          aria-label={block.title}
          className={cn(
            "mt-8 flex max-w-[68ch] gap-4 rounded-[22px] p-5 ring-1 ring-inset sm:p-6",
            warning ? "bg-sun-soft ring-sun/50" : "bg-app/[0.06] ring-app/15",
          )}
        >
          <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", warning ? "text-coral-700" : "text-app-text")} />
          <div>
            <p className="font-semibold text-ink">{block.title}</p>
            <p className="mt-1.5 text-[15.5px] leading-[1.65] text-ink-2">
              <RichText text={block.text} />
              <Cite indices={block.cite} sources={sources} />
            </p>
          </div>
        </aside>
      );
    }
    case "app":
      return (
        <aside
          aria-label={block.title}
          className="surface-dark relative isolate my-10 overflow-hidden rounded-[28px] bg-navy-900 p-6 text-paper sm:p-8"
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[320px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.16),transparent_62%)]" />
          <div className="flex items-start gap-4">
            <LogoMark size={44} />
            <div>
              <p className="font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em]">
                {block.title}
              </p>
              <p className="mt-2 max-w-[38rem] text-[15.5px] leading-[1.65] text-paper/75">{block.text}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={startCta.href} arrow>
              {newsCopy.appCta}
            </ButtonLink>
            <ButtonLink href="/darajalar" variant="ghost-dark">
              A1–C1 darajalari
            </ButtonLink>
          </div>
        </aside>
      );
  }
}

export function ArticleBody({ article }: { article: NewsArticle }) {
  return (
    <div className="min-w-0">
      {article.body.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} sources={article.sources} />
      ))}
    </div>
  );
}

export function SourceList({ sources }: { sources: NewsSource[] }) {
  return (
    <section id="manbalar" aria-labelledby="sources-title" className="mt-16 max-w-[68ch] border-t border-line pt-10">
      <h2 id="sources-title" className="font-display text-[clamp(1.4rem,1.2rem+0.8vw,1.8rem)] font-semibold tracking-[-0.03em] text-ink">
        {newsCopy.sourcesTitle}
      </h2>
      <p className="mt-2 text-[15px] text-ink-3">{newsCopy.sourcesLead}</p>
      <ol className="mt-6 space-y-3">
        {sources.map((source, index) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-[20px] bg-white p-4 shadow-card ring-1 ring-ink/[0.06] transition-shadow hover:ring-ink/20 sm:p-5"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper-2 text-[13px] font-semibold text-ink-3">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-ink-3">
                  <span className="font-semibold text-ink">{source.outlet}</span>
                  {source.official && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-das/10 px-2 py-0.5 text-[11.5px] font-semibold text-das">
                      <ShieldCheck aria-hidden className="size-3" />
                      {newsCopy.official}
                    </span>
                  )}
                  {source.date && <time dateTime={source.date}>{uzDate(source.date)}</time>}
                </span>
                <span className="mt-1.5 block text-[15.5px] font-medium leading-snug text-ink transition-colors group-hover:text-app-text">
                  {source.title}
                </span>
                <span className="mt-1 block truncate text-[12.5px] text-ink-3">{new URL(source.url).hostname.replace(/^www\./, "")}</span>
              </span>
              <ExternalLink aria-hidden className="mt-1 size-4 shrink-0 text-ink-3" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Mundarija — faqat keng ekranda (yon ustunda); telefonda maqola qisqa, sahifa o'zi yetarli. */
export function TableOfContents({ article }: { article: NewsArticle }) {
  const items = [...headings(article).map((h) => ({ id: h.id, text: h.text })), { id: "manbalar", text: newsCopy.sourcesTitle }];
  return (
    <nav aria-labelledby="toc-title" className="hidden rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.06] lg:block">
      <p id="toc-title" className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">
        {newsCopy.contents}
      </p>
      <ol className="mt-3 space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-xl px-2.5 py-2 text-[14.5px] leading-snug text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
