import { facts } from "./facts";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

/**
 * Narxlar va bepul/Premium chegarasi — loyiha egasi qarorlari (CLAUDE.md, 9-bo'lim: 2026-09-25 va 2026-09-26).
 * Saytda sotib olish tugmasi yo'q: obuna faqat ilova ichida, do'kon to'lovi orqali rasmiylashtiriladi.
 */
export type Plan = { months: number; label: string; price: number; featured?: boolean };

export const plans: Plan[] = [
  { months: 1, label: "1 oy", price: 4.99 },
  { months: 3, label: "3 oy", price: 11.99 },
  { months: 6, label: "6 oy", price: 19.99, featured: true },
  { months: 12, label: "1 yil", price: 29.99 },
];

const monthly = plans[0]?.price ?? 4.99;

/** Oylik rejaga nisbatan tejash, pastga yaxlitlangan — ilovadagi hisob bilan bir xil (3 oy → 19%). */
export function savingsPercent(plan: Plan): number {
  return Math.floor((1 - plan.price / (plan.months * monthly)) * 100);
}

export const pricingIntro = typo({
  eyebrow: "Narxlar",
  /* «Toʻliq kurs» orasida bo'linmas bo'shliq — sarlavha «… bepul.» / «Toʻliq kurs — Premium.» bo'lib bo'linadi. */
  title: "Lugʻat — bepul. Toʻliq kurs — Premium.",
  lead: "Lugʻatdan istalgancha bepul foydalaning. Premium barcha darajalar, grammatika, oʻqish matnlari va AI mashqlarini ochadi.",
} as const);

export const freeTier = typo({
  name: "Bepul",
  price: "$0",
  period: "doim",
  items: [
    `Toʻliq lugʻat: ${groupDigits(facts.dictionaryWords)}+ soʻz, qidiruv va talaffuz`,
    "Oʻyinlar: A1 ning dastlabki 5 ta qismi",
    "Kartochkalar: A1 ning dastlabki 100 soʻzi, kuniga 10 tadan",
    "Grammatika: A1 dan 2 ta dars",
    "Oʻqish matnlari: har darajadan 5 tadan",
    "Mavzular: dastlabki 2 ta mavzu, A1 soʻzlari",
  ],
} as const);

export const premiumTier = typo({
  name: "Premium",
  tagline: "Hamma narsa ochiq",
  items: [
    "A1–B2: barcha oʻyinlar va kartochkalar",
    `${facts.grammarLessons} ta grammatika darsi, A1–C1`,
    `Barcha oʻqish matnlari va ${facts.topics} ta mavzu`,
    "«AI tushuntir», gapirish mashqlari va AI yordamchi — kunlik limit bilan",
    "Kengaytirilgan lugʻat uchun oflayn talaffuz paketi",
  ],
  featuredLabel: "Tavsiya etamiz",
  perMonth: "oyiga",
} as const);

export const pricingNotes = typo({
  base: "Narxlar — App Store va Google Playʼdagi asosiy narxlar, AQSh dollarida. Boshqa mamlakatlarda doʻkon narxni mahalliy valyutada koʻrsatadi.",
  /** {rate} va {date} build paytida qo'yiladi. */
  sum: "Soʻmdagi summa Markaziy bank kursi boʻyicha taxminiy: 1 USD = {rate} soʻm ({date}). Aniq summani bankingiz belgilaydi.",
  billing:
    "Obuna ilova ichida rasmiylashtiriladi va avtomatik yangilanadi; uni istalgan vaqtda App Store yoki Google Play sozlamalarida bekor qilasiz. Bepul sinov muddati yoʻq.",
} as const);
