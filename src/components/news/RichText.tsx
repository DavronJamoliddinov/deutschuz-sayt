import type { ReactNode } from "react";
import Link from "next/link";
import { isSafeHref } from "@/lib/news";

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

const linkClass =
  "font-medium text-app-text underline decoration-app-text/35 underline-offset-[3px] transition-colors hover:decoration-app-text";

/**
 * Yangilik matnidagi ikki xil belgilash: `**qalin**` va `[havola](manzil)`. Ichki manzil — Next Link, tashqi — yangi
 * oynada. Boshqa HTML yo'q (matn React orqali chiqadi — xavfsiz). Havolalar build'da tekshirilgan (lib/news.ts).
 */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, label, href, bold] = match;
    if (bold !== undefined) {
      parts.push(
        <strong key={index} className="font-semibold text-ink">
          {bold}
        </strong>,
      );
    } else if (label !== undefined && href !== undefined && isSafeHref(href)) {
      parts.push(
        href.startsWith("/") ? (
          <Link key={index} href={href} className={linkClass}>
            {label}
          </Link>
        ) : (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>
        ),
      );
    } else {
      parts.push(match[0]);
    }
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
