import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Sahifa topilmadi",
  robots: { index: false },
};

/** 404 — umumiy layout ichida (navigatsiya va footer bilan). */
export default function NotFound() {
  return (
    <main id="asosiy" tabIndex={-1} className="surface-dark relative isolate flex min-h-svh flex-col bg-navy-900 text-paper outline-none">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-70" />
      <div className="container-page flex flex-1 flex-col items-start justify-center pb-24 pt-32">
        <p className="font-serif text-[clamp(4rem,3rem+5vw,7rem)] italic leading-none text-sun">Hoppla!</p>
        <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
          Bu sahifa topilmadi.
        </h1>
        <p className="mt-4 max-w-[32rem] text-[17px] leading-relaxed text-paper/70">
          Havola eskirgan yoki manzil xato yozilgan boʻlishi mumkin. «Hoppla» — nemischa «voy» degani.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 text-[15px] font-semibold text-navy-900 transition-transform hover:-translate-y-px active:scale-[0.98]"
        >
          <ArrowLeft aria-hidden className="size-[18px] transition-transform group-hover:-translate-x-0.5" />
          Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  );
}
