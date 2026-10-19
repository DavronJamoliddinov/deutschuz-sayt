import Image from "next/image";
import logoMark from "@/assets/brand/logo-mark.png";
import { cn } from "@/lib/cn";

/**
 * Rasmiy DeutschUz belgisi (loyiha egasi bergan rasm: assets/brand/deutschuz-logo-original.png).
 * Faqat oq fon va soya olib tashlangan; logotipning ranglari va proporsiyasi o'zgartirilmagan.
 * Yonida «DeutschUz» yozuvi turganda alt bo'sh (ekran o'quvchi nomni ikki marta o'qimasin).
 */
export function LogoMark({ size = 32, alt = "", className }: { size?: number; alt?: string; className?: string }) {
  return (
    <Image
      src={logoMark}
      alt={alt}
      width={size}
      height={size}
      loading="eager"
      className={cn("shrink-0 select-none", className)}
      draggable={false}
    />
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={34} />
      <span
        className={cn("font-display text-[19px] font-semibold tracking-[-0.03em]", tone === "dark" ? "text-paper" : "text-ink")}
      >
        Deutsch<span className={tone === "dark" ? "text-sun" : "text-coral-700"}>Uz</span>
      </span>
    </span>
  );
}
