import { facts } from "./facts";
import { typo } from "@/lib/typography";

export const examIntro = typo({
  eyebrow: "Imtihonga tayyorgarlik",
  title: "Goethe va telc formatida gapirishni mashq qiling.",
  lead: "AI imtihonchi yoki suhbatdosh rolida savol beradi, javobingizdagi xatoni tuzatadi va oxirida mezonlar boʻyicha baho beradi.",
  /**
   * Darajaga moslik qanday ishlaydi (CLAUDE.md, 12_sprechen): har bir vazifa ma'lum darajaga tegishli (`level`), ilova AI
   * proksiga faqat `task_id` va suhbat tarixini yuboradi, vazifaning AI yo'riqnomasi serverda — suhbat o'sha vazifa doirasida.
   */
  flowTitle: "Darajangizga mos suhbat",
  flow: [
    { title: "Darajani tanlang", text: "A1, A2, B1 yoki B2." },
    { title: "Vazifani tanlang", text: "Imtihon qismi yoki hayotiy vaziyat — har biri shu darajaga moʻljallangan." },
    { title: "AI bilan gapiring", text: "Ilova AIʼga tanlangan vazifani yuboradi — suhbat shu vazifa va daraja doirasida boradi." },
  ],
  points: [
    { title: "Har bir daraja va Teil", text: "A1–B2, Goethe va telc: har bir qism uchun 4 tadan variant." },
    { title: "Teil kartasi", text: "Format, davomiylik va maslahatlar — suhbatdan oldin." },
    { title: "«Yordam» tugmasi", text: "3 ta javob varianti, nemischa va oʻzbekcha tarjimasi bilan." },
    { title: "Ovoz yoki matn", text: "Gapiring yoki yozib javob bering — tanlov sizda." },
  ],
  situationsTitle: `Hayotiy vaziyatlar — ${facts.situationCategories} ta boʻlim`,
  situations: [
    "Tanishuv",
    "Sogʻliq",
    "Ish",
    "Oʻqish",
    "Idora ishlari",
    "Uy",
    "Xarid",
    "Sayohat",
    "Fikr bildirish",
    "Erkin suhbat",
  ],
  note: "Premium · kunlik limit bilan. AI nutqingizning matnini koʻradi — talaffuz baholanmaydi.",
  chatLabel:
    "Gapirish mashqi namunasi: AI imtihonchi «Wie heißen Sie?» deb soʻraydi, foydalanuvchi javobidagi «von Usbekistan» xatosi «aus Usbekistan» deb tuzatiladi",
  readiness: {
    title: "Imtihonga tayyorlik",
    caption: "Koʻrsatkich toʻrt yoʻnalishdan yigʻiladi. Raqamlar — namuna.",
    parts: [
      { label: "Soʻz boyligi", weight: 40, filled: 0.7 },
      { label: "Oʻyinlar", weight: 20, filled: 0.8 },
      { label: "Grammatika", weight: 20, filled: 0.55 },
      { label: "Gapirish", weight: 20, filled: 0.4 },
    ],
  },
} as const);
