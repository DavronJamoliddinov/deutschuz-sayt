"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Check, Link2, Send } from "lucide-react";
import { newsCopy } from "@/content/news";

function telegramShare(url: string, text: string) {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

/** Eski brauzerlar va http (lokal sinov) uchun: Clipboard API bo'lmasa — yashirin maydon orqali nusxalash. */
function copyFallback(text: string) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  try {
    return document.execCommand("copy");
  } finally {
    field.remove();
  }
}

/**
 * Maqolani ulashish: Telegram (o'zbek auditoriyasi asosan shu yerda) va havolani nusxalash. Havola sahifaning o'z
 * manzilidan olinadi (`#bo'lim` siz) — domen build sozlamasiga bog'liq emas.
 */
export function ShareBar({ path, title, url }: { path: string; title: string; url: string | null }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const resolve = () => url ?? new URL(path, window.location.origin).href;

  const onTelegram = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = telegramShare(resolve(), title);
  };

  const onCopy = async () => {
    const link = resolve();
    let ok = false;
    try {
      await navigator.clipboard.writeText(link);
      ok = true;
    } catch {
      ok = copyFallback(link);
    }
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      <a
        href={telegramShare(url ?? path, title)}
        onClick={onTelegram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-900 px-4 text-[14px] font-semibold text-paper transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-px hover:bg-navy-800 active:scale-[0.98]"
      >
        <Send aria-hidden className="size-4" />
        {newsCopy.shareTelegram}
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[14px] font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-[background-color,box-shadow] duration-300 hover:bg-ink/[0.04] hover:ring-ink/30"
      >
        {copied ? <Check aria-hidden className="size-4 text-das" /> : <Link2 aria-hidden className="size-4" />}
        {copied ? newsCopy.copied : newsCopy.copyLink}
      </button>
      <span role="status" className="sr-only">
        {copied ? newsCopy.copied : ""}
      </span>
    </div>
  );
}
