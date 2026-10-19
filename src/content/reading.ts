import type { Article } from "./demo";
import { facts } from "./facts";
import { typo } from "@/lib/typography";

/**
 * O'qish matni namunasi — saytdagi ilova ekrani maketidagi matn (ReadingScreen). Tuzilma ilovadagi matnlar formatiga
 * yaqin (CLAUDE.md, 20-bo'lim: har so'z lug'at yozuviga ulanadi, ismlar ulanmaydi, so'z shakli lemmaga bog'lanadi).
 * Ilovaning haqiqiy matnlari va lug'ati ilova loyihasida — bu yerda faqat namoyish uchun bitta qisqa matn.
 */
export type ReadingEntry = { lemma: string; article?: Article; uz: string };
export type ReadingWord = { w: string; id: string | null; form?: string };
export type ReadingSentence = { uz: string; parts: Array<string | ReadingWord> };

const word = (w: string, id: string | null, form?: string): ReadingWord => ({ w, id, ...(form ? { form } : {}) });

export const readingDictionary: Record<string, ReadingEntry> = typo({
  suchen: { lemma: "suchen", uz: "qidirmoq" },
  ein: { lemma: "ein", uz: "bir (noaniq artikl)" },
  Wohnung: { lemma: "Wohnung", article: "die", uz: "kvartira, turar joy" },
  in: { lemma: "in", uz: "-da, ichida" },
  jeder: { lemma: "jeder", uz: "har, har bir" },
  Tag: { lemma: "Tag", article: "der", uz: "kun" },
  lesen: { lemma: "lesen", uz: "oʻqimoq" },
  er: { lemma: "er", uz: "u (erkak jinsi)" },
  Anzeige: { lemma: "Anzeige", article: "die", uz: "eʼlon" },
  Internet: { lemma: "Internet", article: "das", uz: "internet" },
  endlich: { lemma: "endlich", uz: "nihoyat" },
  finden: { lemma: "finden", uz: "topmoq" },
  klein: { lemma: "klein", uz: "kichik" },
  mit: { lemma: "mit", uz: "bilan" },
  Balkon: { lemma: "Balkon", article: "der", uz: "balkon" },
  sie: { lemma: "sie", uz: "u (ayol jinsi)" },
  sein: { lemma: "sein", uz: "boʻlmoq" },
  hell: { lemma: "hell", uz: "yorugʻ" },
  und: { lemma: "und", uz: "va" },
  nicht: { lemma: "nicht", uz: "emas (inkor)" },
  teuer: { lemma: "teuer", uz: "qimmat" },
} satisfies Record<string, ReadingEntry>);

export const readingText = typo({
  title: "Eine neue Wohnung",
  titleUz: "Yangi kvartira",
  level: "A2",
  sentences: [
    {
      uz: "Aziz Kyolnda kvartira qidiryapti.",
      parts: [
        word("Aziz", null),
        " ",
        word("sucht", "suchen", "«sucht» — 3-shaxs birlik: u qidiradi"),
        " ",
        word("eine", "ein", "ayol jinsidagi ot oldida: eine Wohnung"),
        " ",
        word("Wohnung", "Wohnung"),
        " ",
        word("in", "in"),
        " ",
        word("Köln", null),
        ".",
      ],
    },
    {
      uz: "U har kuni internetda eʼlonlarni oʻqiydi.",
      parts: [
        word("Jeden", "jeder", "«jeden Tag» — har kuni"),
        " ",
        word("Tag", "Tag"),
        " ",
        word("liest", "lesen", "«liest» — 3-shaxs birlik: u oʻqiydi"),
        " ",
        word("er", "er"),
        " ",
        word("Anzeigen", "Anzeige", "koʻplik: die Anzeigen"),
        " ",
        word("im", "in", "«im» = in + dem: internetda"),
        " ",
        word("Internet", "Internet"),
        ".",
      ],
    },
    {
      uz: "Nihoyat, u balkonli kichik kvartira topadi.",
      parts: [
        word("Endlich", "endlich"),
        " ",
        word("findet", "finden", "«findet» — 3-shaxs birlik: u topadi"),
        " ",
        word("er", "er"),
        " ",
        word("eine", "ein", "ayol jinsidagi ot oldida: eine Wohnung"),
        " ",
        word("kleine", "klein", "ot oldida sifat qoʻshimcha oladi: eine kleine Wohnung"),
        " ",
        word("Wohnung", "Wohnung"),
        " ",
        word("mit", "mit"),
        " ",
        word("Balkon", "Balkon"),
        ".",
      ],
    },
    {
      uz: "U yorugʻ va qimmat emas.",
      parts: [
        word("Sie", "sie", "gap boshida bosh harf bilan; bu yerda: die Wohnung"),
        " ",
        word("ist", "sein", "«ist» — 3-shaxs birlik (sein)"),
        " ",
        word("hell", "hell"),
        " ",
        word("und", "und"),
        " ",
        word("nicht", "nicht"),
        " ",
        word("teuer", "teuer"),
        ".",
      ],
    },
  ] satisfies ReadingSentence[],
});

export const readingIntro = typo({
  eyebrow: "Oʻqish matnlari",
  title: "Notanish soʻzni bosing — tarjimasi shu yerning oʻzida.",
  lead: "Ilovadagi matnlarda har bir soʻz lugʻatga ulangan: bosilgan soʻzning tarjimasi pastda chiqadi, matn esa joyida qoladi. Quyidagi namunada sinab koʻring.",
  points: [
    `A1, A2 va B1 darajalarida ${facts.texts} ta matn (har birida 30 tadan); B2 va C1 matnlari tayyorlanmoqda.`,
    "Soʻzni bosing yoki Tab bilan tanlang — tarjima va shakl izohi darhol chiqadi.",
    "Siz bosgan soʻzlar roʻyxati: ilovada ularni bir bosishda kartochkalarga qoʻshasiz.",
    "Gap tarjimasi, tinglash va matn oxirida tushunish savollari.",
    "Har darajada dastlabki 5 ta matn bepul.",
  ],
  note: "Namuna matn shu sahifa uchun. Ilovadagi matnlar va ularning lugʻati ilovaning oʻzida.",
  hint: "Soʻzni bosing — tarjimasi shu yerda chiqadi.",
  tappedTitle: "Siz bosgan soʻzlar",
  sentenceLabel: "Gap tarjimasi",
  textLabel: "Matn — soʻzni tanlang",
});
