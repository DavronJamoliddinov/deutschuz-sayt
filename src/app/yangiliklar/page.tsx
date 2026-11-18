import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { newsCopy } from "@/content/news";
import { featuredNews, sortedNews } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { SupportContacts } from "@/components/ui/SupportContacts";
import { TelegramChannelCard } from "@/components/ui/TelegramChannel";
import { channelCopy } from "@/content/support";
import { FeaturedNews, NewsCard } from "@/components/news/NewsCards";
import { BadgeCheck, PRINCIPLE_ICONS } from "@/components/news/principles";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  ...pageMetadata({ path: newsCopy.path, title: "Yangiliklar", description: newsCopy.metaDescription }),
  ...(site.url
    ? {
        alternates: {
          canonical: `${newsCopy.path}/`,
          types: { "application/rss+xml": [{ url: `${newsCopy.path}/rss.xml`, title: "DeutschUz — yangiliklar" }] },
        },
      }
    : {}),
};

export default function NewsPage() {
  const rest = sortedNews.filter((article) => article.slug !== featuredNews?.slug);
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Yangiliklar" eyebrow={newsCopy.eyebrow} title={newsCopy.title} lead={newsCopy.lead} />

      <section aria-label="Asosiy yangilik" className="relative z-10 -mt-10 sm:-mt-12">
        <div className="container-page">
          {featuredNews && (
            <div data-reveal style={{ "--reveal-y": "36px" } as CSSProperties}>
              <FeaturedNews article={featuredNews} heading="h2" />
            </div>
          )}
        </div>
      </section>

      {rest.length > 0 && (
        <section aria-labelledby="all-news" className="py-16 sm:py-20">
          <div className="container-page">
            <h2 id="all-news" className="font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.2rem)] font-semibold tracking-[-0.03em] text-ink">
              {newsCopy.all}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                <li key={article.slug} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                  <NewsCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-label={channelCopy.title} className={rest.length > 0 ? "pb-16 sm:pb-20" : "py-16 sm:py-20"}>
        <div className="container-page" data-reveal>
          <TelegramChannelCard />
        </div>
      </section>

      <section aria-labelledby="principles-title" className="cv-auto border-t border-line bg-paper-2 py-16 sm:py-20 [contain-intrinsic-size:auto_560px]">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2
              id="principles-title"
              className="font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.2rem)] font-semibold tracking-[-0.03em] text-ink"
            >
              {newsCopy.principlesTitle}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {newsCopy.principles.map((item, index) => {
                const Icon = PRINCIPLE_ICONS[index] ?? BadgeCheck;
                return (
                  <li key={item.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                    className="rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.06]"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-navy-900 text-sun">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-4 text-[16.5px] font-semibold leading-snug text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-2">{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="self-start rounded-[26px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06] sm:p-7">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-ink">{newsCopy.errorsTitle}</h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{newsCopy.errorsText}</p>
            <SupportContacts columns={1} className="mt-5" />
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
