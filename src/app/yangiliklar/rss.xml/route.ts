import { site } from "@/config/site";
import { newsCategories, newsCopy } from "@/content/news";
import { articlePath, plainText, sortedNews } from "@/lib/news";

export const dynamic = "force-static";

function xml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** RFC 822 sana (RSS talabi): Toshkent vaqti bilan tush payti — kun hech qaysi mintaqada siljimaydi. */
function rfc822(iso: string) {
  return new Date(`${iso}T12:00:00+05:00`).toUTCString();
}

/**
 * Yangiliklar lentasi (RSS 2.0): Telegram botlari, RSS o'quvchilar va agregatorlar uchun. Mutlaq manzil kerak —
 * domen (SITE_URL) berilmagan lokal build'da havolalar nisbiy qoladi.
 */
export function GET() {
  const base = site.url ?? "";
  const items = sortedNews
    .map((article) => {
      const link = `${base}${articlePath(article.slug)}`;
      return [
        "    <item>",
        `      <title>${xml(article.title)}</title>`,
        `      <link>${xml(link)}</link>`,
        `      <guid isPermaLink="true">${xml(link)}</guid>`,
        `      <pubDate>${rfc822(article.date)}</pubDate>`,
        `      <category>${xml(newsCategories[article.category])}</category>`,
        `      <description>${xml(plainText(article.summary))}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DeutschUz — yangiliklar</title>
    <link>${xml(`${base}${newsCopy.path}/`)}</link>
    <description>${xml(newsCopy.metaDescription)}</description>
    <language>uz</language>
${site.url ? `    <atom:link href="${xml(`${base}${newsCopy.path}/rss.xml`)}" rel="self" type="application/rss+xml" />\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
