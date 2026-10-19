import type { CSSProperties } from "react";
import { finalCta } from "@/content/home";
import { site, storesAvailable } from "@/config/site";
import { DownloadOptions } from "@/components/ui/DownloadOptions";
import { Phone } from "@/components/mockups/Phone";
import { HomeScreen } from "@/components/mockups/screens/HomeScreen";

/** Yakuniy chaqiriq — barcha sahifalarning oxirida. Do'kon manzillari sayt sozlamasidan (src/config/site.ts). */
export function FinalCTA() {
  return (
    <section
      id="yuklab-olish"
      aria-labelledby="cta-title"
      className="cv-auto surface-dark relative isolate overflow-hidden bg-navy-900 text-paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_100%,rgb(30_107_240/0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-60" />
        <div className="absolute -left-[10%] top-[-30%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.13),transparent_62%)]" />
      </div>

      <div className="container-page grid items-end gap-6 pt-24 sm:pt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10 lg:pt-32">
        <div className="pb-4 lg:pb-32">
          <p data-reveal className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sun">
            <span aria-hidden className="size-1.5 rounded-full bg-sun" />
            {finalCta.eyebrow}
          </p>
          <h2
            id="cta-title"
            data-reveal
            style={{ "--reveal-delay": "70ms" } as CSSProperties}
            className="mt-5 max-w-[21ch] font-display text-[clamp(2.2rem,1.4rem+3vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance"
          >
            {finalCta.title}
          </h2>
          <p data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties} className="mt-6 max-w-[34rem] text-[17.5px] leading-[1.65] text-paper/70">
            {storesAvailable ? finalCta.textLive : finalCta.textSoon}
          </p>
          <div data-reveal style={{ "--reveal-delay": "210ms" } as CSSProperties} className="mt-9">
            <DownloadOptions appStoreUrl={site.appStoreUrl} googlePlayUrl={site.googlePlayUrl} />
          </div>
        </div>

        <div className="relative mx-auto h-[400px] w-full max-w-[420px] overflow-hidden sm:h-[460px] lg:mr-0 lg:h-[540px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-[18%] size-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.22),transparent_62%)]"
          />
          <div
            data-reveal
            style={{ "--reveal-y": "80px" } as CSSProperties}
            className="absolute left-1/2 top-6 -translate-x-1/2 sm:top-8"
          >
            <div className="origin-top scale-[0.86] sm:scale-100 lg:rotate-[-4deg]">
              <Phone label={finalCta.visualLabel} tab="home">
                <HomeScreen />
              </Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
