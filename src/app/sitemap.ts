import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { downloadPage, navLinks } from "@/content/navigation";
import { premiumPage } from "@/content/premium";

export const dynamic = "force-static";

/** Sitemap mutlaq manzil talab qiladi: domen (SITE_URL) berilmaguncha bo'sh qoladi. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const paths = ["/", ...navLinks.map((link) => link.href), downloadPage.href, ...(site.webPayments ? [premiumPage.path] : [])];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "/" : `${path}/`}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
