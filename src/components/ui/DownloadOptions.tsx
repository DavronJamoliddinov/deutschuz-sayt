"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Clock, Copy, Monitor, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { downloadCopy, type Platform } from "@/content/download";
import { cn } from "@/lib/cn";

const ORDER: Platform[] = ["ios", "android", "desktop"];
const ICONS: Record<Platform, LucideIcon> = { ios: Smartphone, android: Smartphone, desktop: Monitor };

const noopSubscribe = () => () => {};

/** Brauzerdagi qurilmani aniqlash (iPadOS o'zini Mac deb ko'rsatadi — sensorli ekran bo'yicha ajratiladi). */
function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const iPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || iPadOS) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

/**
 * Yuklab olish: qurilma avtomatik aniqlanadi va ajratib ko'rsatiladi, boshqasini qo'lda tanlash mumkin.
 * Havola bo'lmasa (ilova hali do'konda yo'q / kompyuter versiyasi yo'q) — soxta tugma emas, aniq izoh.
 * Statik HTML'da (JS'siz) hamma platformalar holati ro'yxat bo'lib ko'rinadi.
 */
export function DownloadOptions({
  appStoreUrl,
  googlePlayUrl,
  className,
}: {
  appStoreUrl: string | null;
  googlePlayUrl: string | null;
  className?: string;
}) {
  const detected = useSyncExternalStore(noopSubscribe, detectPlatform, () => null);
  const [chosen, setChosen] = useState<Platform | null>(null);
  const selected = chosen ?? detected;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const urls: Record<Platform, string | null> = { ios: appStoreUrl, android: googlePlayUrl, desktop: null };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const focused = refs.current.findIndex((el) => el === document.activeElement);
    const from = focused >= 0 ? focused : Math.max(0, ORDER.indexOf(selected ?? "ios"));
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (from + 1) % ORDER.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (from - 1 + ORDER.length) % ORDER.length;
    const target = ORDER[next];
    if (!target) return;
    event.preventDefault();
    setChosen(target);
    refs.current[next]?.focus();
  };

  return (
    <div className={cn("w-full max-w-[38rem]", className)}>
      <div
        role="radiogroup"
        aria-label={downloadCopy.groupLabel}
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-1 rounded-2xl bg-white/[0.06] p-1 ring-1 ring-inset ring-white/10"
      >
        {ORDER.map((key, index) => {
          const Icon = ICONS[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (selected === null && index === 0) ? 0 : -1}
              onClick={() => setChosen(key)}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-center transition-[background-color,color] duration-300",
                isSelected ? "bg-paper text-navy-900 shadow-[0_8px_20px_-10px_rgb(0_0_0/0.5)]" : "text-paper/80 hover:bg-white/[0.06]",
              )}
            >
              <span className="flex items-center gap-1.5 text-[14.5px] font-semibold">
                <Icon aria-hidden className="size-4" />
                {downloadCopy.platforms[key].label}
              </span>
              {/* Belgi joyi hamma tugmada band (aniqlanmaganida `invisible` — ekran o'quvchiga ham ko'rinmaydi): statik HTML
                  gidratsiyadan keyingi balandlikda bo'ladi, tor ekranda ikki qatorga o'ralsa ham tugmalar sakramaydi. */}
              <span
                className={cn(
                  "text-[11px] font-medium",
                  detected !== key ? "invisible" : isSelected ? "text-coral-700" : "text-sun",
                )}
              >
                {downloadCopy.detected}
              </span>
            </button>
          );
        })}
      </div>

      {/* Balandlik zaxirasi: statik HTML'dagi obzor gidratsiyadan keyin tanlangan panelga almashganda pastdagi kontent
          siljimaydi (CLS 0) va platformalar orasida almashtirganda sahifa sakramaydi. lg — kompyuter paneli balandligi. */}
      <div className="mt-3 min-h-[9.625rem] lg:min-h-[16.5rem]" aria-live="polite">
        {selected === null ? <Overview urls={urls} /> : <PlatformPanel platform={selected} url={urls[selected]} urls={urls} />}
      </div>
    </div>
  );
}

function StoreLink({ store, url }: { store: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-14 items-center gap-3 rounded-2xl bg-sun px-5 py-3 font-semibold text-navy-900 transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-[#ffdb63]"
    >
      <span className="text-[16px]">{downloadCopy.available(store)}</span>
      <ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only">(yangi oynada)</span>
    </a>
  );
}

function MissingCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-[15px] font-semibold text-paper">
        <Clock aria-hidden className="size-4 text-sun" />
        {title}
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-paper/70">{text}</p>
    </div>
  );
}

function PlatformPanel({ platform, url, urls }: { platform: Platform; url: string | null; urls: Record<Platform, string | null> }) {
  const info = downloadCopy.platforms[platform];
  if (platform === "desktop") return <DesktopPanel urls={urls} />;
  const store = info.store ?? "";
  return (
    <div className="flex flex-col gap-2">
      {url ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StoreLink store={store} url={url} />
          <span className="text-[13.5px] text-paper/65">{info.hint}</span>
        </div>
      ) : (
        <MissingCard title={downloadCopy.missingTitle(store)} text={downloadCopy.missingText(store)} />
      )}
    </div>
  );
}

function DesktopPanel({ urls }: { urls: Record<Platform, string | null> }) {
  const pageUrl = useSyncExternalStore(
    noopSubscribe,
    () => `${window.location.origin}/yuklab-olish/`,
    () => "",
  );
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10">
      <div className="text-[15px] font-semibold text-paper">{downloadCopy.desktopTitle}</div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-paper/70">{downloadCopy.desktopText}</p>
      {pageUrl && (
        <div className="mt-3">
          <p className="text-[13px] text-paper/65">{downloadCopy.desktopPhone}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <code className="rounded-lg bg-black/25 px-2.5 py-1.5 text-[13px] text-paper/90">{pageUrl}</code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-white/10 px-3 text-[13px] font-semibold text-paper transition-colors hover:bg-white/15"
            >
              {copied ? <Check aria-hidden className="size-4 text-sun" /> : <Copy aria-hidden className="size-4" />}
              {copied ? downloadCopy.copied : downloadCopy.copy}
            </button>
          </div>
        </div>
      )}
      <StoreStatusList urls={urls} className="mt-4" />
    </div>
  );
}

/** JS'siz holat va kompyuter paneli uchun: har bir do'kon — havola yoki «tez orada». */
function StoreStatusList({ urls, className }: { urls: Record<Platform, string | null>; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper/55">{downloadCopy.storesTitle}</p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {(["ios", "android"] as const).map((key) => {
          const info = downloadCopy.platforms[key];
          const url = urls[key];
          return (
            <li key={key} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5">
              <span className="text-[14px] font-medium text-paper">
                {info.store} <span className="text-paper/55">· {info.label}</span>
              </span>
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-sun underline-offset-4 hover:underline">
                  Ochish
                </a>
              ) : (
                <span className="text-[12.5px] text-paper/55">{downloadCopy.soon}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Overview({ urls }: { urls: Record<Platform, string | null> }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10">
      <StoreStatusList urls={urls} />
      {/* Telefonda kerak emas (u yerda «kompyuter versiyasi yo'q» izohi ortiqcha) — obzor telefon kartasi balandligida qoladi. */}
      <p className="mt-3 hidden text-[13px] leading-relaxed text-paper/60 sm:block">{downloadCopy.desktopText}</p>
    </div>
  );
}
