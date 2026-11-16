import { news, newsCopy, type NewsArticle, type NewsBlock } from "@/content/news";

const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
const ISO_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/** "2026-11-02" → "2026-yil 2-noyabr" (o'zbek rasmiy yozuvi). */
export function uzDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}-yil ${d}-${MONTHS[(m ?? 1) - 1]}`;
}

/** Ichki sahifa ("/...") yoki https havola — boshqasi (javascript:, http:) qabul qilinmaydi. */
export function isSafeHref(href: string): boolean {
  if (href.startsWith("/")) return !href.startsWith("//");
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}

/** Matndagi belgilashni olib tashlaydi: `[a](b)` → "a", `**a**` → "a" (meta, RSS, so'zlar soni uchun). */
export function plainText(text: string): string {
  return text.replace(INLINE, (_m, label?: string, _href?: string, bold?: string) => label ?? bold ?? "");
}

function blockText(block: NewsBlock): string[] {
  switch (block.type) {
    case "h2":
    case "p":
      return [block.text];
    case "list":
      return block.items;
    case "units":
      return [block.caption];
    case "steps":
      return [block.title, ...block.items.flatMap((item) => [item.title, item.text])];
    case "callout":
    case "app":
      return [block.title, block.text];
  }
}

/** O'qish vaqti: o'zbekcha matn uchun daqiqasiga ~180 so'z. */
export function readingMinutes(article: NewsArticle): number {
  const text = [article.title, article.lead, ...article.body.flatMap(blockText)].map(plainText).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function articlePath(slug: string): `/${string}/` {
  return `${newsCopy.path}/${slug}/`;
}

/** Maqoladagi bo'limlar (mundarija). */
export function headings(article: NewsArticle) {
  return article.body.filter((block): block is Extract<NewsBlock, { type: "h2" }> => block.type === "h2");
}

/**
 * Build paytidagi tekshiruv: xato bo'lsa sayt yig'ilmaydi — buzilgan havola, mavjud bo'lmagan manba yoki noto'g'ri
 * sana saytga chiqmaydi.
 */
function validate(articles: NewsArticle[]) {
  const slugs = new Set<string>();
  for (const article of articles) {
    const where = `news.ts → ${article.slug}`;
    if (!SLUG.test(article.slug)) throw new Error(`${where}: slug faqat kichik lotin harflari, raqam va «-»`);
    if (slugs.has(article.slug)) throw new Error(`${where}: slug takrorlangan`);
    slugs.add(article.slug);
    for (const date of [article.date, article.updated, ...article.sources.map((source) => source.date)]) {
      if (date !== undefined && !ISO_DATE.test(date)) throw new Error(`${where}: sana YYYY-MM-DD bo'lishi kerak — ${date}`);
    }
    if (article.updated && article.updated < article.date) throw new Error(`${where}: updated sanasi date'dan oldin`);
    if (article.summary.length > 200) throw new Error(`${where}: summary 200 belgidan uzun (${article.summary.length})`);
    if (article.sources.length === 0) throw new Error(`${where}: manbasiz maqola chiqmaydi`);
    for (const source of article.sources) {
      if (!isSafeHref(source.url)) throw new Error(`${where}: manba havolasi https emas — ${source.url}`);
    }

    const ids = new Set<string>();
    const texts: string[] = [article.lead, article.summary];
    for (const block of article.body) {
      if (block.type === "h2") {
        if (ids.has(block.id)) throw new Error(`${where}: bo'lim id takrorlangan — ${block.id}`);
        ids.add(block.id);
      }
      if ("cite" in block && block.cite) {
        for (const index of block.cite) {
          if (!Number.isInteger(index) || index < 0 || index >= article.sources.length) {
            throw new Error(`${where}: cite ${index} — sources ro'yxatida bunday manba yo'q`);
          }
        }
      }
      if (block.type === "units" && (block.filled < 0 || block.filled > block.total)) {
        throw new Error(`${where}: units — filled 0…total oralig'ida bo'lishi kerak`);
      }
      texts.push(...blockText(block));
    }
    for (const text of texts) {
      for (const match of text.matchAll(INLINE)) {
        const href = match[2];
        if (href !== undefined && !isSafeHref(href)) throw new Error(`${where}: havola ichki yoki https bo'lishi kerak — ${href}`);
        if (href?.startsWith(`${newsCopy.path}/`)) {
          const target = href.slice(newsCopy.path.length + 1).replace(/\/$/, "");
          if (!articles.some((other) => other.slug === target)) throw new Error(`${where}: mavjud bo'lmagan maqolaga havola — ${href}`);
        }
      }
    }
  }
}

validate(news);

/** Yangisi birinchi. */
export const sortedNews: NewsArticle[] = [...news].sort((a, b) => b.date.localeCompare(a.date));

/** Yangiliklar sahifasi boshidagi katta kartochka: `featured` belgilangani, bo'lmasa eng yangisi. */
export const featuredNews: NewsArticle | undefined = news.find((article) => article.featured) ?? sortedNews[0];

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((article) => article.slug === slug);
}

/** Maqola ostidagi «Boshqa yangiliklar»: yangisi birinchi, o'zi chiqmaydi. */
export function otherNews(slug: string, limit = 3): NewsArticle[] {
  return sortedNews.filter((article) => article.slug !== slug).slice(0, limit);
}
