import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost-dark" | "ghost-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-sun text-navy-900 shadow-[0_10px_30px_-10px_rgb(255_212_71/0.55)] hover:bg-[#ffdb63] hover:shadow-[0_16px_36px_-12px_rgb(255_212_71/0.7)]",
  dark: "bg-navy-900 text-paper shadow-[0_10px_30px_-12px_rgb(16_26_53/0.55)] hover:bg-navy-800",
  "ghost-dark": "text-paper ring-1 ring-inset ring-white/20 hover:bg-white/[0.06] hover:ring-white/40",
  "ghost-light": "text-ink ring-1 ring-inset ring-ink/15 hover:bg-ink/[0.04] hover:ring-ink/30",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
};

/**
 * Barcha harakat tugmalari — haqiqiy havolalar. Sayt ichidagi sahifalar ("/...") Next Link bilan ochiladi
 * (sahifa qayta yuklanmaydi), tashqi manzillar — oddiy havola.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[-0.01em]",
    "transition-[background-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
    size === "lg" ? "h-14 px-7 text-[16px]" : "h-12 px-6 text-[15px]",
    variants[variant],
    className,
  );
  const content = (
    <>
      {variant === "primary" && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out-expo group-hover:translate-x-[420%] group-hover:opacity-100" />
        </span>
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative size-[18px] transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
