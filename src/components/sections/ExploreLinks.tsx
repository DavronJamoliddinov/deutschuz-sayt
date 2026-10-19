import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { explore } from "@/content/home";
import { navLinks } from "@/content/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Bosh sahifadan alohida sahifalarga yo'l: kontent takrorlanmaydi, faqat qisqa tavsif va havola. */
export function ExploreLinks() {
  return (
    <section aria-labelledby="explore-title" className="cv-auto relative bg-paper-2 py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-page">
        <SectionHeader id="explore-title" eyebrow={explore.eyebrow} title={explore.title} lead={explore.lead} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {navLinks.map((link, index) => (
            <li key={link.href} data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}>
              <Link
                href={link.href}
                className="group flex h-full flex-col rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">{link.label}</span>
                <span className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-ink-2">{link.description}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-app-text">
                  {explore.open}
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
