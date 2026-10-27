import Link from "next/link";
import { footer } from "@/content/home";
import { downloadPage, navLinks } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { SupportContacts } from "@/components/ui/SupportContacts";
import { supportCopy } from "@/content/support";

const linkClass =
  "rounded underline decoration-paper/30 underline-offset-[3px] transition-colors hover:text-paper hover:decoration-sun";

export function Footer({ privacyUrl, termsUrl }: { privacyUrl: string | null; termsUrl: string | null }) {
  const legal = [
    privacyUrl ? { href: privacyUrl, label: "Maxfiylik siyosati" } : null,
    termsUrl ? { href: termsUrl, label: "Foydalanish shartlari" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <footer className="cv-auto surface-dark relative overflow-hidden bg-navy-950 text-paper [contain-intrinsic-size:auto_420px]">
      <div className="container-page grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.25fr_0.6fr_1fr] lg:gap-16">
        <div className="md:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-[26rem] text-[15px] leading-[1.7] text-paper/65">{footer.description}</p>
          <h2 className="mt-8 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-paper/50">{supportCopy.title}</h2>
          <SupportContacts tone="dark" className="mt-3" />
        </div>

        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-paper/50">
            Sahifa
          </h2>
          <ul className="mt-4 space-y-1">
            {[...navLinks, downloadPage].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-9 items-center rounded text-[15px] text-paper/75 transition-colors hover:text-sun"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-paper/50">{footer.sourcesTitle}</h2>
          <p className="mt-4 text-[14px] leading-[1.75] text-paper/65">
            Lugʻat maʼlumotlari —{" "}
            <a href="https://www.wiktionary.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Wiktionary
            </a>{" "}
            (
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              CC BY-SA
            </a>
            ). Soʻzlar talaffuzi —{" "}
            <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Wikimedia Commons
            </a>{" "}
            mualliflari. Toʻliq roʻyxat ilovadagi «Manbalar va litsenziyalar» boʻlimida.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-7 text-[13px] leading-[1.6] text-paper/55 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>
              © <CurrentYear buildYear={new Date().getFullYear()} /> DeutschUz
            </p>
            {legal.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-paper">
                {item.label}
              </a>
            ))}
          </div>
          <p className="max-w-[44rem] lg:text-right">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
