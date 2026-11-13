/**
 * Ilova kontentining tasdiqlangan raqamlari. Manba — ilova loyihasining CLAUDE.md fayli va ilova bazasi (2026-11-14 holati).
 * Saytdagi barcha raqamlar shu yerdan olinadi: kontent o'zgarsa, faqat shu faylni yangilang.
 * Foydalanuvchilar soni, reyting, sharhlar kabi ma'lumotlar yo'q — ular saytda ko'rsatilmaydi.
 */
export const facts = {
  /** Lug'atdagi jami so'zlar (ilova bazasi, 2026-11): 65 469. Ilovada «65 000+». */
  dictionaryWords: 65_000,
  /** A1–C1 o'quv so'zlari (A1 841, A2 1 603, B1 1 845, B2 2 019, C1 4 080); har bir ma'noda nemischa misol gap va o'zbekcha
   * tarjimasi bor. */
  learningWords: 10_388,
  senses: 13_637,
  /** 14_forms.py: lug'at so'zlarining barcha tuslanish/turlanish shakllari (~350 ming). */
  wordForms: 350_000,
  /** Grammatika: A1 14, A2 20, B1 20, B2 18, C1 16. */
  grammarLessons: 88,
  /** Gapirish: imtihon formatidagi 92 + hayotiy vaziyatlar 185. */
  speakingTasks: 277,
  situationCategories: 10,
  /** Video darslar: A1–C1, har darajada 30 ta, hammasi subtitrli. */
  videos: 150,
  /** O'qish matnlari: A1–C1 — har darajada 30 tadan. */
  texts: 150,
  /** der/die/das, tarjima, yozib tarjima, so'z shakllari, tinglab tushunish, diktant, gap tuzish. */
  games: 7,
  topics: 20,
  /** A1–A2 so'zlari uchun chizilgan rasmlar. */
  wordImages: 1_292,
  asOf: "2026-yil noyabr",
} as const;
