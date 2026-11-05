import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CreditCard, Smartphone } from "lucide-react";
import { downloadPage } from "@/content/navigation";
import { site, storesAvailable } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { DownloadOptions } from "@/components/ui/DownloadOptions";

export const metadata: Metadata = pageMetadata({
  path: "/yuklab-olish",
  title: "Yuklab olish",
  description: storesAvailable
    ? "DeutschUz ilovasini yuklab oling: iPhone uchun App Store, Android uchun Google Play. Lugʻat doim bepul."
    : site.webAppUrl
      ? "DeutschUzʼni iPhoneʼga hozirdan oʻrnating: brauzer orqali, bir daqiqada. App Store va Google Play tez orada. Lugʻat doim bepul."
      : "DeutschUz — iPhone va Android uchun mobil ilova. App Store va Google Play sahifalari ilova chiqishi bilan shu yerda paydo boʻladi.",
});

/** Faqat CLAUDE.md da tasdiqlangan faktlar: freemium, lug'at bepul, Premium ilova ichida, veb-ilova joylangan bo'lsa — brauzerda ham. */
const facts = [
  {
    icon: BookOpen,
    title: "Lugʻat — doim bepul",
    text: "65 000+ soʻz, qidiruv va talaffuz bepul; A1 boʻyicha tanishuv qismi ham bepul.",
    link: { href: "/narxlar", label: "Bepul va Premium" },
  },
  {
    icon: CreditCard,
    title: "Premium — ilova ichida",
    text: site.webAppUrl
      ? "Premium ilova ichida rasmiylashtiriladi: soʻmda, bir martalik toʻlov (Payme, Click, Uzum, Google Pay) — kartadan avtomatik yechilmaydi."
      : "Obuna ilova ichida App Store yoki Google Play orqali rasmiylashtiriladi.",
    link: { href: "/narxlar", label: "Narxlar" },
  },
  {
    icon: Smartphone,
    title: site.webAppUrl ? "Telefon uchun, brauzerda ham" : "Faqat telefon uchun",
    text: site.webAppUrl
      ? "iPhone va Android uchun. Alohida kompyuter dasturi yoʻq, lekin brauzerda ham ishlaydi: hisob va progress bir xil."
      : "iPhone va Android. Kompyuter dasturi chiqarilmagan.",
    link: { href: "/savollar", label: "Savollar" },
  },
];

export default function DownloadPage() {
  return (
    <main id="asosiy" tabIndex={-1} className="outline-none">
      <PageHeader id="page-title" crumb={downloadPage.label} eyebrow={downloadPage.eyebrow} title={downloadPage.title} lead={downloadPage.lead}>
        <DownloadOptions appStoreUrl={site.appStoreUrl} googlePlayUrl={site.googlePlayUrl} webAppUrl={site.webAppUrl} />
      </PageHeader>

      <section aria-label="Yuklab olish haqida" className="relative py-16 sm:py-20">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-3">
            {facts.map(({ icon: Icon, title, text, link }) => (
              <li key={title} data-reveal className="flex flex-col rounded-[24px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06]">
                <span className="grid size-10 place-items-center rounded-xl bg-navy-900 text-sun">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-[19px] font-semibold tracking-[-0.02em]">{title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-ink-2">{text}</p>
                <Link
                  href={link.href}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded text-[14.5px] font-semibold text-app-text underline-offset-4 hover:underline"
                >
                  {link.label}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
