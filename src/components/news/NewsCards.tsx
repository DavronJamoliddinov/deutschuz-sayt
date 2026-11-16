import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsCopy, type NewsArticle } from "@/content/news";
import { articlePath, readingMinutes } from "@/lib/news";
import { cn } from "@/lib/cn";
import { NewsCover } from "./NewsCover";
import { NewsMeta } from "./NewsMeta";

type Heading = "h2" | "h3";

/** Butun karta bosiladi (sarlavha havolasi kartani qoplaydi), fokus halqasi esa kartaning o'zida chiziladi. */
const stretched = "after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:outline-none";
const focusRing = "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-app";

/**
 * Asosiy yangilik — qorong'i katta karta: matn va vizual. Keng joyda yonma-yon, tor joyda (bosh sahifadagi ustun,
 * telefon) ustma-ust — konteyner o'lchamiga qarab (@container), ekran o'lchamiga emas.
 */
export function FeaturedNews({ article, heading = "h2" }: { article: NewsArticle; heading?: Heading }) {
  const H = heading;
  return (
    <div className="@container">
      <article
        className={cn(
          "surface-dark group relative isolate grid overflow-hidden rounded-[32px] bg-navy-900 text-paper shadow-[0_40px_80px_-40px_rgb(16_26_53/0.55)] ring-1 ring-white/[0.06] @3xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
          focusRing,
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-dark mask-radial opacity-60" />
          <div className="absolute -right-[20%] -top-[40%] size-[560px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.14),transparent_62%)]" />
        </div>
        <div className="flex flex-col p-7 sm:p-10 @5xl:p-12">
          <NewsMeta article={article} tone="dark" minutes={readingMinutes(article)} />
          <H className="mt-5 font-display text-[clamp(1.7rem,1.25rem+1.5vw,2.55rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-balance">
            <Link href={articlePath(article.slug)} className={stretched}>
              {article.title}
            </Link>
          </H>
          <p className="mt-5 max-w-[38rem] text-[16.5px] leading-[1.65] text-paper/75">{article.summary}</p>
          <span
            aria-hidden
            className="mt-8 inline-flex h-11 items-center gap-2 self-start rounded-full bg-sun pl-5 pr-4 text-[14.5px] font-semibold text-navy-900 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
          >
            {newsCopy.readMore}
            <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="flex items-center border-t border-white/10 p-7 sm:p-10 @3xl:border-l @3xl:border-t-0 @5xl:p-12">
          <NewsCover cover={article.cover} size="lg" />
        </div>
      </article>
    </div>
  );
}

/** Yangiliklar to'ridagi karta: tepada vizual, ostida toifa, sana, sarlavha va qisqa mazmun. */
export function NewsCard({ article, heading = "h3" }: { article: NewsArticle; heading?: Heading }) {
  const H = heading;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-card ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift",
        focusRing,
      )}
    >
      <div className="surface-dark relative isolate flex min-h-[230px] items-center bg-navy-900 p-6 text-paper">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-60" />
        <NewsCover cover={article.cover} size="md" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <NewsMeta article={article} />
        <H className="mt-3.5 font-display text-[21px] font-semibold leading-[1.22] tracking-[-0.022em] text-ink text-balance">
          <Link href={articlePath(article.slug)} className={stretched}>
            {article.title}
          </Link>
        </H>
        <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">{article.summary}</p>
        <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-app-text">
          {newsCopy.readMore}
          <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

/** Ixcham qator (bosh sahifa): kichik belgi — maqolaning asosiy raqami, toifa, sana va sarlavha. */
export function NewsRow({ article, heading = "h3" }: { article: NewsArticle; heading?: Heading }) {
  const H = heading;
  const key = article.stats.find((stat) => stat.accent) ?? article.stats[0];
  return (
    <article
      className={cn(
        "group relative flex gap-4 rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift",
        focusRing,
      )}
    >
      {key && (
        <span
          aria-hidden
          className="grid size-16 shrink-0 place-items-center rounded-2xl bg-navy-900 px-1 text-center font-display text-[17px] font-semibold leading-none tracking-[-0.03em] text-sun"
        >
          {key.value}
        </span>
      )}
      <div className="min-w-0">
        <NewsMeta article={article} />
        <H className="mt-2 font-display text-[17.5px] font-semibold leading-[1.28] tracking-[-0.018em] text-ink text-pretty">
          <Link href={articlePath(article.slug)} className={stretched}>
            {article.title}
          </Link>
        </H>
      </div>
    </article>
  );
}
