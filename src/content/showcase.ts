import { typo } from "@/lib/typography";

export type ShowcaseKey = "dictionary" | "learn" | "grammar" | "reading" | "videos";

export type ShowcaseTab = {
  key: ShowcaseKey;
  label: string;
  title: string;
  points: string[];
  screenLabel: string;
};

export const showcaseIntro = typo({
  eyebrow: "Ilova ichida",
  title: "Har bir ekran — oʻrganish uchun.",
  lead: "Asosiy boʻlimlar qanday koʻrinishini tanlab koʻring.",
  note: "Ekranlar ilovaning soddalashtirilgan koʻrinishi.",
} as const);

export const showcaseTabs: ShowcaseTab[] = typo([
  {
    key: "dictionary",
    label: "Lugʻat",
    title: "Har bir soʻz — toʻliq maʼlumot bilan",
    points: ["Artikl rangda: der, die, das", "Koʻplik, feʼl shakllari va talaffuz", "Eng mos natija birinchi chiqadi"],
    screenLabel:
      "Lugʻat ekrani: «haus» soʻrovi boʻyicha eng mos natija «das Haus — uy, bino» va boshqa natijalar: die Hausaufgabe, der Haushalt, die Hausfrau",
  },
  {
    key: "learn",
    label: "Yodlash",
    title: "Kartochkalar va takrorlash",
    points: ["20 soʻzlik qismlar, osondan qiyinga", "A1–A2 soʻzlari rasmlar bilan", "Testda 80% — qism yopiladi"],
    screenLabel: "Yodlash ekrani: «der Bahnhof — vokzal» kartochkasi, misol gap va «Yana koʻrsat», «Bildim» tugmalari",
  },
  {
    key: "grammar",
    label: "Grammatika",
    title: "Qoidalar oʻzbek tilida",
    points: ["Jadvallar va talaffuzli misollar", "Har darsda 10 ta mashq", "Tipik xatolar tahlili"],
    screenLabel:
      "Grammatika darsi «Nominativ va Akkusativ»: artikllar jadvali, misol gap va toʻgʻri bajarilgan mashq",
  },
  {
    key: "reading",
    label: "Matnlar",
    title: "Oʻqing va tushuning",
    points: ["Soʻzni bosing — tarjimasi pastda", "Bosgan soʻzlaringiz kartochkalarga", "Matn oxirida tushunish savollari"],
    screenLabel:
      "Oʻqish matni: «Anzeigen» soʻzi bosilgan, pastda «die Anzeige — eʼlon» tarjimasi va «Kartochkalarga qoʻshish» tugmasi",
  },
  {
    key: "videos",
    label: "Videolar",
    title: "Nemischa nutqni tinglang",
    points: ["Karaoke subtitr: aytilayotgan soʻz ajraladi", "Soʻzni bosing — lugʻatdan tarjima", "Sekin (0,75×) va gapma-gap rejimi"],
    screenLabel:
      "Video dars ekrani: pleyer, aytilayotgan soʻzi ajratilgan nemischa subtitr va uning oʻzbekcha tarjimasi",
  },
]);
