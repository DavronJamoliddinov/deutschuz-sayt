import type { Metadata } from "next";
import { pricingIntro } from "@/content/pricing";
import { getUsdRate } from "@/lib/rate";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

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
      <FinalCTA />
    </main>
  );
}
