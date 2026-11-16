import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsCopy } from "@/content/news";
import { featuredNews, sortedNews } from "@/lib/news";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeaturedNews, NewsRow } from "@/components/news/NewsCards";
import { BadgeCheck, PRINCIPLE_ICONS } from "@/components/news/principles";

/**
 * Bosh sahifadagi yangiliklar: asosiy xabar (katta karta) va yana ikkitasi. Nega nemis tili hozir kerakligini
 * rasmiy raqam bilan ko'rsatadi; batafsili — /yangiliklar/ sahifasida.
 */
export function NewsSpotlight() {
  const featured = featuredNews;
  if (!featured) return null;
  const others = sortedNews.filter((article) => article.slug !== featured.slug).slice(0, 2);
  return (
    <section aria-labelledby="news-title" className="cv-auto relative pb-4 pt-20 sm:pt-24 lg:pt-28 [contain-intrinsic-size:auto_900px]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeader id="news-title" eyebrow={newsCopy.home.eyebrow} title={newsCopy.home.title} lead={newsCopy.home.lead} />
          <Link
            href={newsCopy.path}
            data-reveal
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-[background-color,box-shadow] duration-300 hover:bg-ink/[0.04] hover:ring-ink/30"
          >
            {newsCopy.all}
            <ArrowRight aria-hidden className="size-[18px] transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div data-reveal style={{ "--reveal-y": "36px" } as CSSProperties}>
            <FeaturedNews article={featured} heading="h3" />
          </div>
          <div className="flex flex-col gap-4">
            <ul className="grid gap-4">
              {others.map((article, index) => (
                <li key={article.slug} data-reveal style={{ "--reveal-delay": `${80 + index * 70}ms` } as CSSProperties}>
                  <NewsRow article={article} />
                </li>
              ))}
            </ul>
            {/* Tahririyat qoidalari — nega bu yangiliklarga ishonish mumkin (ro'yxat sahifasida batafsil). */}
            <div
              data-reveal
              style={{ "--reveal-delay": "220ms" } as CSSProperties}
              className="flex flex-1 flex-col rounded-[22px] bg-paper-2 p-6 ring-1 ring-inset ring-line"
            >
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">{newsCopy.principlesTitle}</p>
              <ul className="mt-5 flex flex-1 flex-col justify-around gap-5">
                {newsCopy.principles.map((item, index) => {
                  const Icon = PRINCIPLE_ICONS[index] ?? BadgeCheck;
                  return (
                    <li key={item.title} className="flex gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-900 text-sun">
                        <Icon aria-hidden className="size-[18px]" />
                      </span>
                      <span>
                        <span className="block font-semibold leading-snug text-ink">{item.title}</span>
                        <span className="mt-1 block text-[14px] leading-[1.55] text-ink-2">{item.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
