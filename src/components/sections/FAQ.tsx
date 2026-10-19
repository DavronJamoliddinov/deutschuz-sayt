import { faqIntro, getFaq } from "@/content/faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "./Accordion";
import { cn } from "@/lib/cn";

/** withHeader={false} — alohida sahifada: sarlavha PageHeader'da (h1), savollar (h2) markazda bitta ustunda. */
export function FAQ({ storesAvailable, withHeader = true }: { storesAvailable: boolean; withHeader?: boolean }) {
  const items = getFaq({ storesAvailable });

  if (!withHeader) {
    return (
      <section id="savollar" className="cv-auto relative bg-paper-2 py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
        <div className="container-page">
          <div data-reveal className="mx-auto max-w-[56rem]">
            <Accordion items={items} headingLevel="h2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="savollar" aria-labelledby="faq-title" className={cn("cv-auto relative bg-paper-2 py-24 sm:py-32 lg:py-36")}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-32">
            <SectionHeader id="faq-title" eyebrow={faqIntro.eyebrow} title={faqIntro.title} lead={faqIntro.lead} />
          </div>
        </div>
        <div data-reveal>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
