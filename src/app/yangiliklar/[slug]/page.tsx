import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { channel } from "@/content/support";
import { newsCategories, newsCopy } from "@/content/news";
import { articlePath, getArticle, otherNews, readingMinutes, sortedNews } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { ArticleBody, ArticleHeader, KeyStats, SourceList, TableOfContents } from "@/components/news/ArticleParts";
import { NewsCard } from "@/components/news/NewsCards";
import { ShareBar } from "@/components/news/ShareBar";
import { FinalCTA } from "@/components/sections/FinalCTA";

/** Statik eksport: har bir maqola build'da alohida HTML; ro'yxatda yo'q manzil — 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return sortedNews.map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    path: articlePath(article.slug),
    title: article.title,
    description: article.summary,
    ...(article.ogImage ? { image: { url: article.ogImage, alt: article.title } } : {}),
    article: { publishedTime: article.date, modifiedTime: article.updated, section: newsCategories[article.category] },
  });
}

/** Qidiruv tizimlari uchun: NewsArticle (manbalar — isBasedOn) va sahifa yo'li. «<» belgisi skriptni yopolmasin. */
function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const path = articlePath(article.slug);
  const url = site.url ? `${site.url}${path}` : null;
  const minutes = readingMinutes(article);
  const more = otherNews(article.slug);
  const organization = {
    "@type": "Organization",
    name: site.name,
    ...(site.url ? { url: `${site.url}/`, logo: `${site.url}/icon.png` } : {}),
    sameAs: [channel.url],
  };

  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.summary,
            datePublished: article.date,
            dateModified: article.updated ?? article.date,
            inLanguage: "uz",
            articleSection: newsCategories[article.category],
            author: organization,
            publisher: organization,
            isBasedOn: article.sources.map((source) => source.url),
            ...(url ? { mainEntityOfPage: url, url } : {}),
            ...(site.url ? { image: [`${site.url}${article.ogImage ?? "/og.png"}`] } : {}),
          },
          ...(site.url
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: `${site.url}/` },
                    { "@type": "ListItem", position: 2, name: newsCopy.eyebrow, item: `${site.url}${newsCopy.path}/` },
                    { "@type": "ListItem", position: 3, name: article.title, item: url },
                  ],
                },
              ]
            : []),
        ]}
      />

      <article aria-labelledby="article-title">
        <ArticleHeader article={article} minutes={minutes} />
        <KeyStats article={article} />

        <div className="container-page grid gap-12 pb-20 pt-14 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:pb-24">
          <div className="min-w-0">
            <ArticleBody article={article} />
            <SourceList sources={article.sources} />
            <p className="mt-10 max-w-[68ch] rounded-[20px] bg-paper-2 p-5 text-[14px] leading-[1.65] text-ink-3 ring-1 ring-inset ring-line">
              {newsCopy.disclaimer}
            </p>
          </div>

          <aside aria-label="Maqola boʻyicha" className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <TableOfContents article={article} />
            <div className="rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.06]">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">{newsCopy.share}</p>
              <div className="mt-3.5">
                <ShareBar path={path} title={article.title} url={url} />
              </div>
            </div>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-news" className="cv-auto border-t border-line bg-paper-2 py-16 sm:py-20 [contain-intrinsic-size:auto_720px]">
          <div className="container-page">
            <h2 id="more-news" className="font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.2rem)] font-semibold tracking-[-0.03em] text-ink">
              {newsCopy.more}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((other, index) => (
                <li key={other.slug} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                  <NewsCard article={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCTA />
    </main>
  );
}
