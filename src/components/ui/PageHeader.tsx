import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Ichki sahifalarning sarlavhasi: qorong'i band (navigatsiya qorong'i tepaga moslangan), sahifa yo'li, h1 va kirish.
 * Bo'limning o'z sarlavha matni shu yerga ko'chiriladi — sahifada bir xil matn ikki marta takrorlanmaydi.
 */
export function PageHeader({
  id,
  crumb,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="surface-dark relative isolate overflow-hidden bg-navy-900 text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_10%_-20%,#1d2f5c_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-70" />
        {/* Yuqoridan px'da: band balandligi o'zgarsa ham (yuklab olish paneli gidratsiyadan keyin) nur siljimaydi — CLS 0. */}
        <div className="absolute -right-[10%] -top-[190px] size-[620px] rounded-full bg-[radial-gradient(circle,rgb(255_212_71/0.13),transparent_62%)]" />
        <div className="absolute -bottom-[60%] left-[30%] size-[520px] rounded-full bg-[radial-gradient(circle,rgb(240_100_85/0.12),transparent_65%)]" />
      </div>

      <div className="container-page relative pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <nav aria-label="Sahifa yoʻli" className="hero-in" style={delay(0)}>
          <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-paper/60">
            <li>
              <Link href="/" className="rounded transition-colors hover:text-paper">
                Bosh sahifa
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-paper/85">
              {crumb}
            </li>
          </ol>
        </nav>
        <p
          className="hero-in mt-8 inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sun"
          style={delay(60)}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-sun" />
          {eyebrow}
        </p>
        <h1
          id={id}
          className="hero-in mt-4 max-w-[22ch] font-display text-[clamp(2.3rem,1.5rem+3.6vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance"
          style={delay(120)}
        >
          {title}
        </h1>
        {lead && (
          <p className="hero-in mt-6 max-w-[44rem] text-[17.5px] leading-[1.65] text-paper/75 sm:text-[19px]" style={delay(200)}>
            {lead}
          </p>
        )}
        {children && (
          <div className="hero-in mt-9" style={delay(280)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
