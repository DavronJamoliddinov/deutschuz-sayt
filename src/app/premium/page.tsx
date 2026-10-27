import type { Metadata } from "next";
import { Info } from "lucide-react";
import { site } from "@/config/site";
import { premiumNotes, premiumPage, premiumSteps } from "@/content/premium";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { PremiumCheckout } from "@/components/sections/PremiumCheckout";
import { SupportContacts } from "@/components/ui/SupportContacts";
import { supportCopy } from "@/content/support";

export const metadata: Metadata = {
  ...pageMetadata({ path: premiumPage.path, title: premiumPage.metaTitle, description: premiumPage.metaDescription }),
  // Sinov kassasi paytida sahifa qidiruv tizimlariga chiqmaydi (havola ham berilmaydi) — config/site.ts, webPayments.
  ...(site.webPayments ? {} : { robots: { index: false, follow: false } }),
};

/** Saytdagi bir martalik Premium to'lovi (Payme). To'lov formasi — brauzerda, narxlar ilova serveridan. */
export default function PremiumPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb={premiumPage.crumb} eyebrow={premiumPage.eyebrow} title={premiumPage.title} lead={premiumPage.lead} />
      <section aria-labelledby="page-title" className="py-12 sm:py-16 lg:py-20">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <PremiumCheckout api={site.payApi} termsUrl={site.termsUrl} />

          <aside className="grid gap-8 lg:sticky lg:top-28">
            <div>
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.025em]">{premiumNotes.stepsTitle}</h2>
              <ol className="mt-5 grid gap-4">
                {premiumSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-[15px] font-semibold text-sun">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{step.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[24px] bg-paper-2 p-6 ring-1 ring-inset ring-ink/[0.06]">
              <h2 className="font-display text-[18px] font-semibold tracking-[-0.02em]">{premiumNotes.notesTitle}</h2>
              <ul className="mt-4 grid gap-3 text-[14.5px] leading-relaxed text-ink-2">
                {premiumNotes.items.map((note) => (
                  <li key={note} className="flex gap-2.5">
                    <Info aria-hidden className="mt-1 size-4 shrink-0 text-ink-3" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[14.5px] leading-relaxed text-ink-2">{supportCopy.paymentHelp}</p>
              <SupportContacts columns={1} className="mt-3" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
