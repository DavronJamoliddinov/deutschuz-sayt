import type { Metadata } from "next";
import { site } from "@/config/site";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "DeutschUz — nemis tilini oʻzbekcha tushunib oʻrganing" };

/**
 * Sahifa metadata'si. Next ichki obyektlarni (openGraph, twitter) chuqur birlashtirmaydi — shuning uchun har sahifa
 * to'liq to'plamni oladi. Canonical va Open Graph rasmi faqat domen (SITE_URL) berilganda qo'shiladi.
 */
export function pageMetadata({ path: route, title, description }: { path: string; title?: string; description: string }): Metadata {
  // next.config: trailingSlash — sahifalarning haqiqiy manzili "/narxlar/"
  const path = route.endsWith("/") ? route : `${route}/`;
  const ogTitle = title ? `${title} — ${site.name}` : `${site.name} — Nemis tilini oʻzbekcha oʻrganing`;
  return {
    ...(title ? { title } : {}),
    description,
    ...(site.url ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale: "uz_UZ",
      siteName: site.name,
      title: ogTitle,
      description,
      ...(site.url ? { url: path, images: [OG_IMAGE] } : {}),
    },
    twitter: {
      card: site.url ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
      ...(site.url ? { images: [OG_IMAGE.url] } : {}),
    },
  };
}
