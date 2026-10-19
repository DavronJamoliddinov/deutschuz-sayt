import type { Metadata } from "next";
import { faqIntro } from "@/content/faq";
import { storesAvailable } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMetadata({
  path: "/savollar",
  title: "Savollar",
  description:
    "DeutschUz haqida koʻp soʻraladigan savollar: kimlar uchun, darajalar, bepul imkoniyatlar, obuna va toʻlov, internetsiz ishlash, AI va kirill alifbosi.",
});

export default function FaqPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Savollar" eyebrow={faqIntro.eyebrow} title={faqIntro.title} lead={faqIntro.lead} />
      <FAQ storesAvailable={storesAvailable} withHeader={false} />
      <FinalCTA />
    </main>
  );
}
