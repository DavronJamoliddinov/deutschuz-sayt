import type { Metadata } from "next";
import { site } from "@/config/site";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "DeutschUz — nemis tilini oʻzbekcha tushunib oʻrganing" };

type PageMetadataInput = {
  path: string;
  title?: string;
  description: string;
  /** Sahifaning o'z ijtimoiy tarmoq rasmi (1200×630, public/ ichida). Bo'lmasa — umumiy og.png. */
  image?: { url: `/${string}`; alt: string };
  /** Yangilik maqolasi: Open Graph turi «article», nashr va yangilanish sanasi (YYYY-MM-DD). */
  article?: { publishedTime: string; modifiedTime?: string; section?: string };
};

/**
 * Sahifa metadata'si. Next ichki obyektlarni (openGraph, twitter) chuqur birlashtirmaydi — shuning uchun har sahifa
 * to'liq to'plamni oladi. Canonical va Open Graph rasmi faqat domen (SITE_URL) berilganda qo'shiladi.
 */
export function pageMetadata({ path: route, title, description, image, article }: PageMetadataInput): Metadata {
  // next.config: trailingSlash — sahifalarning haqiqiy manzili "/narxlar/"
  const path = route.endsWith("/") ? route : `${route}/`;
  const ogTitle = title ? `${title} — ${site.name}` : `${site.name} — Nemis tilini oʻzbekcha oʻrganing`;
  const ogImage = image ? { ...OG_IMAGE, ...image } : OG_IMAGE;
  return {
    ...(title ? { title } : {}),
    description,
    ...(site.url ? { alternates: { canonical: path } } : {}),
    openGraph: {
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            ...(article.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
            ...(article.section ? { section: article.section } : {}),
          }
        : { type: "website" as const }),
      locale: "uz_UZ",
      siteName: site.name,
      title: ogTitle,
      description,
      ...(site.url ? { url: path, images: [ogImage] } : {}),
    },
    twitter: {
      card: site.url ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
      ...(site.url ? { images: [ogImage.url] } : {}),
    },
  };
}
