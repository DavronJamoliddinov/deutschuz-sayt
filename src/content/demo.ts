import { facts } from "./facts";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

export type Article = "der" | "die" | "das";

export type DemoCard = {
  article?: Article;
  word: string;
  /** Otlarda — ko'plik, fe'llarda — asosiy shakllar. */
  forms: string;
  formsLabel: string;
  uz: string;
  exampleDe: string;
  exampleUz: string;
};

export type QuizItem = { word: string; article: Article; uz: string; tip?: string };

export const demoIntro = typo({
  eyebrow: "Sinab koʻring",
  title: "Kartochkani aylantiring, artiklni toping.",
  lead: "Ilovadagi ikki mashqning soddalashtirilgan namunasi — shu yerning oʻzida ishlaydi, roʻyxatdan oʻtish shart emas.",
  stepsTitle: "Ilovada har bir daraja 20 soʻzlik qismlarga boʻlingan:",
  steps: [
    { title: "Kartochkalar", text: "«Bildim» yoki «Yana koʻrsat» — soʻz bilan tanishasiz." },
    { title: "Test", text: "80% va undan yuqori natija qismni yopadi." },
    { title: "Takrorlash", text: "Soʻzlar FSRS jadvali boʻyicha oʻz vaqtida qaytadi." },
  ],
  note: `Namunada 6 ta A1 soʻzi. Ilovada A1–B2 boʻyicha ${groupDigits(facts.learningWords)} ta soʻz va ${facts.games} ta oʻyin bor.`,
  tabs: { cards: "Kartochkalar", quiz: "der · die · das" },
} as const);

export const demoCards: DemoCard[] = [
  {
    article: "die",
    word: "Sprache",
    forms: "die Sprachen",
    formsLabel: "koʻpligi",
    uz: "til",
    exampleDe: "Ich lerne eine neue Sprache.",
    exampleUz: "Men yangi til oʻrganyapman.",
  },
  {
    article: "der",
    word: "Bahnhof",
    forms: "die Bahnhöfe",
    formsLabel: "koʻpligi",
    uz: "vokzal",
    exampleDe: "Der Bahnhof ist nicht weit.",
    exampleUz: "Vokzal uzoq emas.",
  },
  {
    article: "das",
    word: "Brot",
    forms: "die Brote",
    formsLabel: "koʻpligi",
    uz: "non",
    exampleDe: "Ich kaufe jeden Morgen Brot.",
    exampleUz: "Men har kuni ertalab non sotib olaman.",
  },
  {
    article: "die",
    word: "Wohnung",
    forms: "die Wohnungen",
    formsLabel: "koʻpligi",
    uz: "kvartira, turar joy",
    exampleDe: "Die Wohnung hat drei Zimmer.",
    exampleUz: "Kvartirada uchta xona bor.",
  },
  {
    article: "der",
    word: "Termin",
    forms: "die Termine",
    formsLabel: "koʻpligi",
    uz: "belgilangan vaqt, qabul",
    exampleDe: "Ich habe morgen einen Termin beim Arzt.",
    exampleUz: "Ertaga shifokorga qabulim bor.",
  },
  {
    word: "lernen",
    forms: "lernt · lernte · hat gelernt",
    formsLabel: "shakllari",
    uz: "oʻrganmoq",
    exampleDe: "Wir lernen jeden Tag Deutsch.",
    exampleUz: "Biz har kuni nemis tilini oʻrganamiz.",
  },
];

export const quizItems: QuizItem[] = [
  { word: "Tisch", article: "der", uz: "stol" },
  { word: "Lampe", article: "die", uz: "chiroq" },
  { word: "Fenster", article: "das", uz: "deraza" },
  {
    word: "Zeitung",
    article: "die",
    uz: "gazeta",
    tip: "-ung bilan tugaydigan otlar doim die: die Zeitung, die Wohnung, die Übung.",
  },
  { word: "Schlüssel", article: "der", uz: "kalit" },
  {
    word: "Mädchen",
    article: "das",
    uz: "qiz bola",
    tip: "-chen va -lein qoʻshimchali otlar doim das: das Mädchen, das Brötchen.",
  },
];
