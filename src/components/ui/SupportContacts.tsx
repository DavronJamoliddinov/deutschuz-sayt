import { Mail, Send } from "lucide-react";
import { support, supportCopy } from "@/content/support";
import { cn } from "@/lib/cn";

const contacts = [
  { href: `mailto:${support.email}`, label: supportCopy.email, value: support.email, Icon: Mail, external: false },
  { href: support.telegramUrl, label: supportCopy.telegram, value: `@${support.telegram}`, Icon: Send, external: true },
] as const;

/** Tor ekranda email faqat «@» oldidan bo'linadi (deutschuz.com / @gmail.com), so'z o'rtasidan emas. */
function breakable(value: string) {
  const at = value.indexOf("@");
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
}

/**
 * Qo'llab-quvvatlash: email va Telegram. tone="dark" — footer (to'q fon, oddiy havolalar),
 * "light" — sahifa ichida (bosiladigan kartalar).
 */
export function SupportContacts({
  tone = "light",
  columns = 2,
  className,
}: {
  tone?: "light" | "dark";
  /** Kartalar keng ekranda yonma-yon (2) yoki ustma-ust (1 — tor yon ustunda). */
  columns?: 1 | 2;
  className?: string;
}) {
  if (tone === "dark") {
    return (
      <ul className={cn("space-y-1", className)}>
        {contacts.map(({ href, label, value, Icon, external }) => (
          <li key={href}>
            <a
              href={href}
              aria-label={`${label}: ${value}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-9 items-center gap-2.5 rounded text-[15px] text-paper/75 transition-colors hover:text-sun"
            >
              <Icon aria-hidden className="size-4 shrink-0" />
              {value}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}>
      {contacts.map(({ href, label, value, Icon, external }) => (
        <li key={href}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex min-h-16 items-center gap-4 rounded-[20px] bg-paper-2 p-4 ring-1 ring-inset ring-ink/[0.06] transition-shadow hover:ring-ink/20"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 text-sun">
              <Icon aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] text-ink-3">{label}</span>
              <span className="block text-[16px] font-semibold tracking-[-0.01em]">{breakable(value)}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
