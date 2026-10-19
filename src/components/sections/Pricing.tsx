import type { CSSProperties } from "react";
import { Check, Info } from "lucide-react";
import { freeTier, plans, premiumTier, pricingIntro, pricingNotes, savingsPercent } from "@/content/pricing";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { UsdRate } from "@/lib/rate";
import { approxSum, dmy, groupDigits, usd } from "@/lib/format";
import { cn } from "@/lib/cn";

/** withHeader={false} — alohida sahifada: sarlavha PageHeader'da (h1), bu yerda faqat kontent, rejalar h2. */
export function Pricing({ rate, withHeader = true }: { rate: UsdRate; withHeader?: boolean }) {
  const Heading = withHeader ? "h3" : "h2";
  const sumNote = pricingNotes.sum.replace("{rate}", groupDigits(rate.rate)).replace("{date}", dmy(rate.date));

  return (
    <section
      id="narxlar"
      aria-labelledby={withHeader ? "pricing-title" : undefined}
      className={cn("cv-auto relative", withHeader ? "py-24 sm:py-32 lg:py-36" : "py-16 sm:py-20 lg:py-24")}
    >
      <div className="container-page">
        {withHeader && (
          <SectionHeader id="pricing-title" eyebrow={pricingIntro.eyebrow} title={pricingIntro.title} lead={pricingIntro.lead} align="center" />
        )}

        <div className={cn("grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6", withHeader && "mt-14 lg:mt-16")}>
          <article
            data-reveal
            className="flex flex-col rounded-[28px] bg-white p-7 shadow-card ring-1 ring-ink/[0.07] sm:p-9"
            aria-labelledby="plan-free"
          >
            <Heading id="plan-free" className="font-display text-[22px] font-semibold tracking-[-0.025em]">
              {freeTier.name}
            </Heading>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-[56px] font-semibold leading-none tracking-[-0.045em]">{freeTier.price}</span>
              <span className="text-[16px] text-ink-3">{freeTier.period}</span>
            </p>
            <ul className="mt-8 space-y-3.5">
              {freeTier.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug text-ink-2">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-paper-2 text-ink">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article
            data-reveal
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
            aria-labelledby="plan-premium"
            className="surface-dark relative isolate flex flex-col overflow-hidden rounded-[28px] bg-navy-900 p-7 text-paper sm:p-9"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-24 -top-24 size-[360px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.2),transparent_65%)]" />
              <div className="absolute inset-0 bg-grid-dark mask-radial opacity-40" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Heading id="plan-premium" className="font-display text-[22px] font-semibold tracking-[-0.025em]">
                {premiumTier.name}
              </Heading>
              <span className="rounded-full bg-sun/15 px-3 py-1 text-[12.5px] font-semibold text-sun ring-1 ring-inset ring-sun/30">
                {premiumTier.tagline}
              </span>
            </div>

            <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {premiumTier.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug text-paper/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sun text-navy-900">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <ul className="mt-10 grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4">
              {plans.map((plan) => {
                const savings = savingsPercent(plan);
                return (
                  <li
                    key={plan.months}
                    className={cn(
                      "relative flex min-h-[150px] flex-col gap-0 rounded-2xl p-4 transition-transform duration-300 ease-out-expo hover:-translate-y-0.5",
                      plan.featured
                        ? "bg-paper text-ink shadow-[0_0_0_2px_var(--color-sun),0_18px_40px_-16px_rgb(255_212_71/0.45)]"
                        : "bg-white/[0.05] ring-1 ring-inset ring-white/[0.12]",
                    )}
                  >
                    {plan.featured && (
                      <span className="absolute -top-3 left-3 whitespace-nowrap rounded-full bg-sun px-2.5 py-0.5 text-[11.5px] font-semibold text-navy-900">
                        {premiumTier.featuredLabel}
                      </span>
                    )}
                    <span className="flex items-center justify-between gap-2">
                      <span className={cn("text-[14px] font-semibold", plan.featured ? "text-ink-2" : "text-paper/80")}>{plan.label}</span>
                      {savings > 0 && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[12px] font-semibold tabular-nums",
                            plan.featured ? "bg-das/12 text-das" : "bg-[#5fd496]/15 text-[#8be0b0]",
                          )}
                        >
                          −{savings}%
                        </span>
                      )}
                    </span>
                    <span className="mt-3 font-display text-[26px] font-semibold leading-none tracking-[-0.035em] tabular-nums">
                      {usd(plan.price)}
                    </span>
                    <span className={cn("mt-1.5 text-[12.5px] tabular-nums", plan.featured ? "text-ink-3" : "text-paper/60")}>
                      {approxSum(plan.price, rate.rate)}
                    </span>
                    <span
                      className={cn(
                        "mt-auto border-t pt-3 text-[12.5px] tabular-nums",
                        plan.featured ? "border-ink/10 text-ink-2" : "border-white/10 text-paper/70",
                      )}
                    >
                      {premiumTier.perMonth} {usd(plan.price / plan.months)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>

        <ul data-reveal className="mx-auto mt-8 grid max-w-[60rem] gap-2.5 text-[13.5px] leading-relaxed text-ink-3">
          {[pricingNotes.base, sumNote, pricingNotes.billing].map((note) => (
            <li key={note} className="flex gap-2.5">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
