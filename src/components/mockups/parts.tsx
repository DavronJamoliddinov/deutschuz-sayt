import { Volume2 } from "lucide-react";
import type { Article } from "@/content/demo";
import { cn } from "@/lib/cn";

export const articleText: Record<Article | "pl", string> = {
  der: "text-der",
  die: "text-die",
  das: "text-das",
  pl: "text-pl",
};

export const articleBg: Record<Article, string> = {
  der: "bg-der",
  die: "bg-die",
  das: "bg-das",
};

/** «der Bahnhof» — artikl rangda, so'z qalin. */
export function ArticleWord({
  article,
  word,
  className,
  articleClassName,
}: {
  article?: Article;
  word: string;
  className?: string;
  articleClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-[0.3em]", className)}>
      {article && <span className={cn("font-semibold", articleText[article], articleClassName)}>{article}</span>}
      <span>{word}</span>
    </span>
  );
}

export function SpeakerDot({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full bg-app text-white", className)}
      style={{ width: size, height: size }}
    >
      <Volume2 aria-hidden style={{ width: size * 0.5, height: size * 0.5 }} />
    </span>
  );
}

/** Progress halqasi (statik SVG). value: 0..1 */
export function Ring({
  value,
  size = 44,
  stroke = 5,
  color = "#1E6BF0",
  track = "rgba(21,27,46,0.1)",
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className={cn("shrink-0 -rotate-90", className)}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
      />
    </svg>
  );
}

const WAVE = [6, 10, 16, 9, 20, 14, 24, 12, 18, 8, 15, 22, 11, 17, 7, 13, 19, 9, 6];

export function Waveform({ className, barClassName }: { className?: string; barClassName?: string }) {
  return (
    <span aria-hidden className={cn("flex h-6 items-center gap-[3px]", className)}>
      {WAVE.map((h, i) => (
        <span key={i} className={cn("w-[3px] rounded-full", barClassName)} style={{ height: h }} />
      ))}
    </span>
  );
}

/** «der Bahnhof» kartochkasi uchun oddiy rasm (ilovadagi SVG rasmlar uslubida — yassi, yumshoq ranglar). */
export function StationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 168 112" aria-hidden className={className}>
      <rect x="8" y="98" width="152" height="7" rx="3.5" fill="#E4E7EE" />
      <path d="M26 52 84 20l58 32z" fill="#F06455" />
      <rect x="34" y="52" width="100" height="46" rx="3" fill="#FFE29A" />
      <rect x="34" y="52" width="100" height="7" fill="#F4C95D" />
      <circle cx="84" cy="40" r="10" fill="#fff" stroke="#151B2E" strokeWidth="2.4" />
      <path d="M84 34.5V40l4 2.4" fill="none" stroke="#151B2E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M72 98V76a12 12 0 0 1 24 0v22z" fill="#1E6BF0" />
      <rect x="44" y="66" width="16" height="16" rx="3" fill="#fff" />
      <rect x="108" y="66" width="16" height="16" rx="3" fill="#fff" />
      <path d="M44 74h16M108 74h16" stroke="#E4E7EE" strokeWidth="2" />
    </svg>
  );
}
