import { newsCategories, newsCopy, type NewsArticle } from "@/content/news";
import { uzDate } from "@/lib/news";
import { cn } from "@/lib/cn";

/** Toifa, sana va (ixtiyoriy) o'qish vaqti. Tuzatilgan maqolada «yangilangan» sanasi ham. */
export function NewsMeta({
  article,
  tone = "light",
  minutes,
  className,
}: {
  article: NewsArticle;
  tone?: "light" | "dark";
  minutes?: number;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13.5px]", dark ? "text-paper/70" : "text-ink-3", className)}>
      <span
        className={cn(
          "inline-flex h-7 items-center rounded-full px-3 text-[11.5px] font-semibold uppercase tracking-[0.13em]",
          dark ? "bg-sun/[0.14] text-sun" : "bg-coral/10 text-coral-700",
        )}
      >
        {newsCategories[article.category]}
      </span>
      <time dateTime={article.date}>{uzDate(article.date)}</time>
      {/* Ajratuvchi «·» keyingi bo'lak bilan birga ko'chadi — qator oxirida yolg'iz qolmaydi. */}
      {minutes !== undefined && (
        <span className="whitespace-nowrap">
          <span aria-hidden className="mr-3">
            ·
          </span>
          {minutes} {newsCopy.minutes}
        </span>
      )}
      {article.updated && (
        <span className="whitespace-nowrap">
          <span aria-hidden className="mr-3">
            ·
          </span>
          {newsCopy.updated}: <time dateTime={article.updated}>{uzDate(article.updated)}</time>
        </span>
      )}
    </p>
  );
}
