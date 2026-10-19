import type { CSSProperties } from "react";
import { factsBand } from "@/content/home";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";

/** Ilova kontentining raqamlari (foydalanuvchilar statistikasi emas — u hali yo'q). Hero ustiga chiqib turadi. */
export function FactsBand() {
  return (
    <section aria-labelledby="facts-title" className="relative z-10 -mt-20 sm:-mt-24">
      <div className="container-page">
        <div
          data-reveal
          style={{ "--reveal-y": "36px" } as CSSProperties}
          className="rounded-[28px] bg-white px-6 py-8 shadow-[0_40px_80px_-40px_rgb(16_26_53/0.45)] ring-1 ring-ink/[0.06] sm:px-10 sm:py-10"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id="facts-title" className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-coral-700">
              {factsBand.title}
            </h2>
            <p className="text-[13px] text-ink-3">{factsBand.note}</p>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-0">
            {factsBand.items.map((item, index) => (
              <div
                key={item.label}
                className={cn("flex flex-col gap-2", index > 0 && "lg:border-l lg:border-line lg:pl-7", index < 5 && "lg:pr-4")}
              >
                <dt className="order-2 text-[14.5px] leading-snug">
                  <span className="font-semibold text-ink">{item.label}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-3">{item.hint}</span>
                </dt>
                <dd className="order-1 font-display text-[clamp(2rem,1.55rem+1.5vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                  <CountUp value={item.value} suffix={"suffix" in item ? item.suffix : ""} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
