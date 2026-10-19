import { typo } from "@/lib/typography";

/** Saytning alohida sahifalari (App Router: src/app/<slug>/page.tsx). */
export type NavLink = { href: `/${string}`; label: string; description: string };

export const navLinks: NavLink[] = typo([
  {
    href: "/imkoniyatlar",
    label: "Imkoniyatlar",
    description: "Lugʻat, yodlash, oʻyinlar, grammatika, oʻqish matnlari va videolar — bitta ilovada.",
  },
  {
    href: "/qanday-ishlaydi",
    label: "Qanday ishlaydi",
    description: "Darajani aniqlash, har kungi qisqa mashgʻulot va oʻz vaqtida takrorlash.",
  },
  {
    href: "/darajalar",
    label: "Darajalar",
    description: "A1 dan C1 gacha: har bir darajada nimalar borligi.",
  },
  {
    href: "/narxlar",
    label: "Narxlar",
    description: "Bepul imkoniyatlar va Premium obuna rejalari.",
  },
  {
    href: "/savollar",
    label: "Savollar",
    description: "Ilova, darajalar va obuna haqida qisqa javoblar.",
  },
]);

/** Asosiy harakat — yuklab olish sahifasi (qurilmaga mos do'kon yoki «hali mavjud emas» izohi). */
export const startCta = { href: "/yuklab-olish", label: "Oʻrganishni boshlash" } as const;

export const downloadPage = typo({
  href: "/yuklab-olish",
  label: "Yuklab olish",
  eyebrow: "Yuklab olish",
  title: "DeutschUzʼni telefoningizga oʻrnating.",
  lead: "DeutschUz — iPhone va Android uchun mobil ilova. Qurilmangiz avtomatik aniqlanadi, boshqasini oʻzingiz tanlashingiz mumkin.",
} as const);
