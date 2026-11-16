import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { downloadPage, navLinks } from "@/content/navigation";
import { premiumPage } from "@/content/premium";
import { articlePath, sortedNews } from "@/lib/news";

export const dynamic = "force-static";

/** Sitemap mutlaq manzil talab qiladi: domen (SITE_URL) berilmaguncha bo'sh qoladi. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const paths = ["/", ...navLinks.map((link) => link.href), downloadPage.href, ...(site.webPayments ? [premiumPage.path] : [])];
  const pages: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${site.url}${path === "/" ? "/" : `${path}/`}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
  // Maqolalar: sana — maqolaning o'zi (har build'da «bugun» emas), qidiruv tizimi keraksiz qayta o'qimaydi.
  const articles: MetadataRoute.Sitemap = sortedNews.map((article) => ({
    url: `${site.url}${articlePath(article.slug)}`,
    lastModified: new Date(`${article.updated ?? article.date}T12:00:00+05:00`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));
  return [...pages, ...articles];
}
