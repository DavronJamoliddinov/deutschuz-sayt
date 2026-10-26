import { typo } from "@/lib/typography";

/**
 * Darajalar bo'yicha mavjud kontent (CLAUDE.md: 7-bo'lim — grammatika, 17 — videolar, 20 — matnlar,
 * 12 — gapirish). «pending» — rejada bor, lekin hali tayyor emas: saytda «tayyorlanmoqda» deb ko'rsatiladi.
 */
export type Level = {
  code: "A1" | "A2" | "B1" | "B2" | "C1";
  name: string;
  summary: string;
  items: string[];
  pending?: string[];
  vocabulary: string;
  topics: string[];
};

export const levelsIntro = typo({
  eyebrow: "Darajalar",
  title: "A1 dan C1 gacha — aniq yoʻl xaritasi.",
  lead: "Har bir darajada nimalar borligini oldindan bilasiz: Goethe roʻyxatlari asosidagi soʻzlar, oʻzbekcha grammatika va imtihon formatidagi mashqlar.",
  note: "DeutschUz rasmiy sertifikat bermaydi. Sertifikat Goethe-Institut yoki telc imtihonini topshirib olinadi — ilova unga tayyorlanishga yordam beradi.",
  pendingLabel: "tayyorlanmoqda",
  vocabularyLabel: "Soʻzlar",
  topicsLabel: "Grammatikadan",
} as const);

export const levels: Level[] = typo([
  {
    code: "A1",
    name: "Boshlangʻich",
    summary: "Oʻzingizni tanishtirish, oddiy savollar va kundalik iboralar.",
    items: ["14 ta grammatika darsi", "30 ta oʻqish matni", "30 ta video dars", "Goethe va telc formatida gapirish"],
    vocabulary: "Goethe A1 roʻyxati asosida",
    topics: ["alifbo va talaffuz", "sein va haben", "artikllar", "modal feʼllar"],
  },
  {
    code: "A2",
    name: "Asosiy",
    summary: "Kundalik vaziyatlar: xarid, yoʻl, uy va ish haqida suhbat.",
    items: ["20 ta grammatika darsi", "30 ta oʻqish matni", "30 ta video dars", "Goethe va telc formatida gapirish"],
    vocabulary: "Goethe A2 roʻyxati asosida",
    topics: ["Perfekt", "Dativ", "sifat qoʻshimchalari", "weil, dass, wenn"],
  },
  {
    code: "B1",
    name: "Oʻrta",
    summary: "Ish, oʻqish va sayohatda erkin muloqot, oʻz fikrini bildirish.",
    items: ["20 ta grammatika darsi", "30 ta oʻqish matni", "30 ta video dars", "Goethe va telc formatida gapirish"],
    vocabulary: "Goethe B1 roʻyxati asosida",
    topics: ["Präteritum", "Passiv", "Konjunktiv II", "nisbiy gaplar"],
  },
  {
    code: "B2",
    name: "Oʻrtadan yuqori",
    summary: "Murakkab matnlar, munozara va rasmiy uslub.",
    items: ["18 ta grammatika darsi", "30 ta oʻqish matni", "30 ta video dars", "Goethe va telc formatida gapirish"],
    vocabulary: "Chastota boʻyicha tanlangan",
    topics: ["Konjunktiv I", "Partizipialattribute", "nominal uslub"],
  },
  {
    code: "C1",
    name: "Ilgʻor",
    summary: "Kasbiy va ilmiy matnlar, nozik grammatik uslublar.",
    items: ["16 ta grammatika darsi", "30 ta oʻqish matni"],
    pending: ["Video darslar"],
    vocabulary: "Kengaytirilgan lugʻat",
    topics: ["iqtibos: laut, zufolge", "Gerundiv", "matn bogʻlanishi"],
  },
]);
