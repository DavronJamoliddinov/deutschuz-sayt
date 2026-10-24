import type { Metadata } from "next";
import { pricingIntro } from "@/content/pricing";
import { premiumCta, premiumPage } from "@/content/premium";
import { site } from "@/config/site";
import { getUsdRate } from "@/lib/rate";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  path: "/narxlar",
  title: "Narxlar",
  description:
    "DeutschUz narxlari: lugʻat doim bepul, Premium — 1, 3, 6 oylik va yillik obuna. Obuna ilova ichida, App Store yoki Google Play orqali rasmiylashtiriladi.",
});

export default async function PricingPage() {
  const rate = await getUsdRate();
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb="Narxlar" eyebrow={pricingIntro.eyebrow} title={pricingIntro.title} lead={pricingIntro.lead} />
      <Pricing rate={rate} withHeader={false} />
      {site.webPayments && (
        <section aria-labelledby="web-pay-title" className="pb-16 sm:pb-20">
          <div className="container-page">
            <div className="flex flex-col items-start gap-6 rounded-[28px] bg-white p-7 shadow-card ring-1 ring-ink/[0.07] sm:p-9 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 id="web-pay-title" className="font-display text-[22px] font-semibold tracking-[-0.025em]">
                  {premiumCta.title}
                </h2>
                <p className="mt-2 max-w-[40rem] text-[15.5px] leading-relaxed text-ink-2">{premiumCta.text}</p>
              </div>
              <ButtonLink href={premiumPage.path} variant="dark" arrow className="shrink-0">
                {premiumCta.button}
              </ButtonLink>
            </div>
          </div>
        </section>
      )}
      <FinalCTA />
    </main>
  );
}
