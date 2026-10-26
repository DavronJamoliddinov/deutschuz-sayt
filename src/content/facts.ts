/**
 * Ilova kontentining tasdiqlangan raqamlari. Manba — ilova loyihasining CLAUDE.md fayli (2026-10 holati).
 * Saytdagi barcha raqamlar shu yerdan olinadi: kontent o'zgarsa, faqat shu faylni yangilang.
 * Foydalanuvchilar soni, reyting, sharhlar kabi ma'lumotlar yo'q — ular saytda ko'rsatilmaydi.
 */
export const facts = {
  /** Lug'atdagi jami so'zlar: A1–B2 (5 344) + kengaytirilgan lug'at (59 960) = 65 304. Ilovada «65 000+». */
  dictionaryWords: 65_000,
  /** A1–B2 o'quv so'zlari; har bir ma'noda nemischa misol gap va o'zbekcha tarjimasi bor. */
  learningWords: 5_344,
  senses: 7_327,
  /** 14_forms.py: lug'at so'zlarining barcha tuslanish/turlanish shakllari (~350 ming). */
  wordForms: 350_000,
  /** Grammatika: A1 14, A2 20, B1 20, B2 18, C1 16. */
  grammarLessons: 88,
  /** Gapirish: imtihon formatidagi 92 + hayotiy vaziyatlar 185. */
  speakingTasks: 277,
  situationCategories: 10,
  /** Video darslar: A1–B2, har darajada 30 ta (C1 — subtitrlari tayyorlanmoqda). */
  videos: 120,
  /** O'qish matnlari: A1–C1 — har darajada 30 tadan. */
  texts: 150,
  /** der/die/das, tarjima, yozib tarjima, so'z shakllari, tinglab tushunish, diktant, gap tuzish. */
  games: 7,
  topics: 20,
  /** A1–A2 so'zlari uchun chizilgan rasmlar. */
  wordImages: 1_292,
  asOf: "2026-yil oktabr",
} as const;
