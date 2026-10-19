import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { site, storesAvailable } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { InPageNavigation } from "@/components/motion/InPageNavigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/* Shriftlar loyihaning o'zida (OFL): build tarmoqsiz ishlaydi, faqat lotin qismi oldindan yuklanadi. */
const onest = localFont({
  src: "./fonts/onest-latin-wght-normal.woff2",
  variable: "--font-onest",
  weight: "100 900",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const instrument = localFont({
  src: "./fonts/instrument-serif-latin-400-italic.woff2",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});

const description =
  "Nemis tilini oʻzbek tili orqali oʻrgatuvchi mobil ilova: 65 000+ soʻzli internetsiz lugʻat, A1–C1 grammatika, kartochkalar, oʻyinlar va AI bilan gapirish mashqlari. iPhone va Android uchun.";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  ...pageMetadata({ path: "/", description }),
  title: { default: "DeutschUz — Nemis tilini oʻzbekcha oʻrganing", template: "%s — DeutschUz" },
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#101a35",
  colorScheme: "light",
};

/**
 * .js — scroll-reveal animatsiyalarini yoqadi. Agar sayt skripti 3 soniyada ishga tushmasa (tarmoq xatosi),
 * kontent yashirin qolmasligi uchun hammasi ko'rsatiladi.
 */
const revealScript =
  'document.documentElement.classList.add("js");setTimeout(function(){if(!window.__dzReveal)document.documentElement.classList.add("no-reveal")},3000);';

/** Navigatsiya va footer barcha sahifalarda umumiy — sahifalar orasida qayta yuklanmaydi. */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uz" className={`${onest.variable} ${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        <a
          href="#asosiy"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-navy-900"
        >
          Asosiy mazmunga oʻtish
        </a>
        <MotionProvider>
          <Navbar statusNote={storesAvailable ? "App Store va Google Playʼda" : "Tez orada App Store va Google Playʼda"} />
          {children}
          <Footer privacyUrl={site.privacyUrl} termsUrl={site.termsUrl} />
        </MotionProvider>
        <RevealObserver />
        <InPageNavigation />
      </body>
    </html>
  );
}
