import { facts } from "./facts";
import { storeNames } from "./home";
import type { StoreState } from "@/config/site";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

/**
 * Narxlar va bepul/Premium chegarasi — loyiha egasi qarorlari (CLAUDE.md, 9-bo'lim: 2026-09-25 va 2026-09-26).
 * Narxlar so'mda: Google Play'dagi obunalar O'zbekistonda so'mda qo'yilgan (docs/store/play/obunalar.txt, 2026-11-10) va
 * saytdagi bir martalik to'lov (Payme, /premium, ilova serveridagi WEB_PRICES_UZS) — xuddi shu summalar. Narx o'zgarsa —
 * uchala joyda birga. To'lov jonli bo'lganda (site.webPayments) har reja kartasi /premium/?plan=<key> ga olib boradi —
 * [key] ilova serveridagi reja kaliti (backend/ai_proxy/payments.py, PLANS).
 */
export type Plan = { key: "1m" | "3m" | "6m" | "12m"; months: number; label: string; uzs: number; featured?: boolean };

export const plans: Plan[] = [
  { key: "1m", months: 1, label: "1 oy", uzs: 59_000 },
  { key: "3m", months: 3, label: "3 oy", uzs: 142_000 },
  { key: "6m", months: 6, label: "6 oy", uzs: 236_000, featured: true },
  { key: "12m", months: 12, label: "1 yil", uzs: 355_000 },
];

const monthly = plans[0]?.uzs ?? 59_000;

/** Oylik rejaga nisbatan tejash, pastga yaxlitlangan — ilovadagi hisob bilan bir xil (3 oy → 19%). */
export function savingsPercent(plan: Plan): number {
  return Math.floor((1 - plan.uzs / (plan.months * monthly)) * 100);
}

/** Oyiga to'g'ri keladigan summa, yuzgacha yaxlitlangan: 142 000 / 3 → «47 300». */
export function perMonthUzs(plan: Plan): string {
  return groupDigits(Math.round(plan.uzs / plan.months / 100) * 100);
}

export const pricingIntro = typo({
  eyebrow: "Narxlar",
  /* «Toʻliq kurs» orasida bo'linmas bo'shliq — sarlavha «… bepul.» / «Toʻliq kurs — Premium.» bo'lib bo'linadi. */
  title: "Lugʻat — bepul. Toʻliq kurs — Premium.",
  lead: "Lugʻatdan istalgancha bepul foydalaning. Premium barcha darajalar, grammatika, oʻqish matnlari va AI mashqlarini ochadi.",
} as const);

export const freeTier = typo({
  name: "Bepul",
  price: "0",
  currency: "soʻm",
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
    "A1–C1: barcha oʻyinlar va kartochkalar",
    `${facts.grammarLessons} ta grammatika darsi, A1–C1`,
    `Barcha oʻqish matnlari va ${facts.topics} ta mavzu`,
    "«AI tushuntir», gapirish mashqlari va AI yordamchi — kunlik limit bilan",
    "Kengaytirilgan lugʻat uchun oflayn talaffuz paketi",
  ],
  featuredLabel: "Tavsiya etamiz",
  currency: "soʻm",
  perMonth: "oyiga ≈",
  /** Reja kartasidagi havola — faqat saytdagi to'lov jonli bo'lganda. */
  buy: "Saytda olish",
} as const);

/** Narxlar ostidagi izohlar — qaysi do'konda chiqqaniga va saytdagi to'lov ochiqligiga qarab. */
export function pricingNotes(stores: StoreState, webPayments: boolean): string[] {
  const store = storeNames(stores);
  return typo([
    `Narxlar soʻmda — ilova ichidagi ${store} obunasi narxi.`,
    `Obuna avtomatik yangilanadi; uni istalgan vaqtda ${store} sozlamalarida bekor qilasiz. Bepul sinov muddati yoʻq.`,
    ...(webPayments
      ? ["Saytda — xuddi shu narxda bir martalik toʻlov (Payme): muddat tugagach kartadan avtomatik pul yechilmaydi."]
      : []),
  ]);
}
