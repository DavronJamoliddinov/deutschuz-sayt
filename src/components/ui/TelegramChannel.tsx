import { Send } from "lucide-react";
import { channel, channelCopy } from "@/content/support";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Footer: kanal havolasi (to'q fon, qo'llab-quvvatlash havolalari bilan bir xil ko'rinish). */
export function TelegramChannelLink({ className }: { className?: string }) {
  return (
    <a
      href={channel.url}
      {...external}
      aria-label={`${channelCopy.title}: @${channel.handle}`}
      className={cn(
        "inline-flex min-h-9 items-center gap-2.5 rounded text-[15px] text-paper/75 transition-colors hover:text-sun",
        className,
      )}
    >
      <Send aria-hidden className="size-4 shrink-0" />@{channel.handle}
    </a>
  );
}

/** Sahifa ichidagi karta (Yangiliklar): sarlavha, qisqa matn va kanalga o'tish tugmasi. */
export function TelegramChannelCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-[26px] bg-white p-6 shadow-card ring-1 ring-ink/[0.06] sm:flex-row sm:items-center sm:p-7",
        className,
      )}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy-900 text-sun">
        <Send aria-hidden className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-ink">{channelCopy.newsTitle}</h2>
        <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-2">{channelCopy.lead}</p>
      </div>
      <ButtonLink href={channel.url} variant="dark" arrow {...external} className="shrink-0 self-start sm:self-auto">
        {channelCopy.join}
      </ButtonLink>
    </div>
  );
}
