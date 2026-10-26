import type { LucideIcon } from "lucide-react";
import { Bell, Gauge, LayoutGrid, Sparkles } from "lucide-react";
import { facts } from "./facts";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

export const featuresIntro = typo({
  eyebrow: "Imkoniyatlar",
  title: "Lugʻatdan imtihongacha — hammasi bitta ilovada.",
  lead: "Har bir boʻlim keyingisini toʻldiradi: matnda uchragan soʻzni bir bosishda kartochkaga qoʻshasiz, oʻyinda xato qilgan soʻzlaringiz esa «Qiyin soʻzlar»da jamlanadi.",
} as const);

export type FeatureTile = {
  key: "dictionary" | "learn" | "games" | "grammar" | "speaking" | "reading" | "videos";
  kicker: string;
  title: string;
  text: string;
  badge?: "Bepul" | "Premium";
  link?: { href: string; label: string };
};

export const featureTiles: FeatureTile[] = typo([
  {
    key: "dictionary",
    kicker: "Lugʻat",
    title: `${groupDigits(facts.dictionaryWords)}+ soʻz — internetsiz`,
    text: "Artikl rangi, koʻplik va feʼl shakllari, maʼnolar, misollar va talaffuz. Nemischadan oʻzbekchaga va aksincha, istalgan shakl bilan qidiring: «ging» yozsangiz, gehen topiladi.",
    badge: "Bepul",
  },
  {
    key: "learn",
    kicker: "Yodlash",
    title: "Aqlli takrorlash",
    text: "FSRS algoritmi har bir soʻzni unutishingizdan oldin qaytaradi. Daraja 20 soʻzlik qismlarga boʻlingan: avval kartochkalar, keyin test.",
  },
  {
    key: "games",
    kicker: "Oʻyinlar",
    title: `${facts.games} ta oʻyin, osondan qiyinga`,
    text: "Har bir oʻyin oʻsha 20 soʻzlik qismlar bilan ishlaydi — natija foizda saqlanadi, xatolar takrorlashga tushadi.",
  },
  {
    key: "grammar",
    kicker: "Grammatika",
    title: `${facts.grammarLessons} ta dars: A1 dan C1 gacha`,
    text: "Qoida oʻzbek tilida, jadvallar, talaffuzli misollar, tipik xatolar va har darsda 10 ta mashq — javobni yozib tekshirasiz.",
  },
  {
    key: "speaking",
    kicker: "Gapirish",
    title: "AI bilan suhbat",
    text: "Tanlagan darajangiz (A1–B2) boʻyicha Goethe va telc imtihon qismlari hamda hayotiy vaziyatlar: AI javobingizni tuzatadi va oxirida baholaydi.",
    badge: "Premium",
  },
  {
    key: "reading",
    kicker: "Oʻqish",
    title: `${facts.texts} ta matn: A1–C1`,
    text: "Notanish soʻzni bosing — tarjimasi pastda chiqadi va oʻqish davom etadi. Matn oxirida tushunish savollari.",
    link: { href: "/imkoniyatlar#oqish-namuna", label: "Namunani sinab koʻring" },
  },
  {
    key: "videos",
    kicker: "Videolar",
    title: `${facts.videos} ta video dars`,
    text: "A1–B2 boʻyicha nemis tilidagi darslar. Subtitrli darslarda karaoke matn, tarjima, sekin rejim va gapma-gap tinglash.",
  },
]);

export const gameNames = [
  "der · die · das",
  "Tarjima",
  "Yozib tarjima",
  "Soʻz shakllari",
  "Tinglab tushunish",
  "Diktant",
  "Gap tuzish",
] as const;

export type SmallFeature = { icon: LucideIcon; title: string; text: string; premium?: boolean };

export const smallFeatures: SmallFeature[] = typo([
  { icon: LayoutGrid, title: "Mavzular", text: `${facts.topics} ta mavzu boʻyicha soʻz toʻplamlari — bir bosishda kartochkalarga.` },
  { icon: Sparkles, title: "AI tushuntir", text: "Tushunmagan soʻz yoki gapingizni AI oʻzbek tilida tushuntiradi.", premium: true },
  { icon: Bell, title: "Kunlik maqsad", text: "Streak, eslatma va yutuqlar har kuni mashgʻulotga qaytaradi." },
  { icon: Gauge, title: "Imtihonga tayyorlik", text: "Soʻz boyligi, oʻyinlar, grammatika va gapirish boʻyicha umumiy koʻrsatkich." },
]);

export const extraFeatures = [
  "Qiyin soʻzlar",
  "Sevimlilar",
  "Yaqinda ochilganlar",
  "Kun soʻzi",
  "Qorongʻi rejim",
  "«Tarjimada xato» xabari",
] as const;
