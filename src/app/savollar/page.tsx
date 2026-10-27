import type { Metadata } from "next";
import { faqIntro } from "@/content/faq";
import { storesAvailable } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SupportContacts } from "@/components/ui/SupportContacts";
import { supportCopy } from "@/content/support";

export const metadata: Metadata = pageMetadata({
  path: "/savollar",
  title: "Savollar",
  description:
    "DeutschUz haqida koʻp soʻraladigan savollar: kimlar uchun, darajalar, bepul imkoniyatlar, obuna va toʻlov, internetsiz ishlash, AI va kirill alifbosi. Qoʻllab-quvvatlash: email va Telegram.",
});

export default function FaqPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Savollar" eyebrow={faqIntro.eyebrow} title={faqIntro.title} lead={faqIntro.lead} />
      <FAQ storesAvailable={storesAvailable} withHeader={false} />
      {/* App Store Connect «Support URL»: https://deutschuz.com/savollar/#aloqa */}
      <section id="aloqa" aria-labelledby="aloqa-title" className="relative scroll-mt-28 bg-paper-2 pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page">
          <div data-reveal className="mx-auto max-w-[56rem] rounded-[28px] bg-paper p-6 ring-1 ring-inset ring-ink/[0.06] sm:p-8">
            <h2 id="aloqa-title" className="font-display text-[22px] font-semibold tracking-[-0.025em] sm:text-[26px]">
              {supportCopy.pageTitle}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{supportCopy.lead}</p>
            <SupportContacts className="mt-6" />
          </div>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
