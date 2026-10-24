import { typo } from "@/lib/typography";

/**
 * Saytdagi bir martalik Premium to'lovi (Payme, so'mda) — loyiha egasi qarori (2026-10-23): obuna emas, kartadan
 * avtomatik pul yechilmaydi; muddat tugagach xohlasa yana sotib oladi. Narx so'mda, yonida do'kondagi dollar narxi.
 * Narxlar va rejalar ilova serveridan keladi (WEB_PRICES_UZS) — sahifada raqam yozilmaydi.
 * Ilovada bu sahifaga havola yo'q (do'kon qoidalari) — foydalanuvchi saytga o'zi kiradi.
 */
export const premiumPage = typo({
  path: "/premium",
  crumb: "Premium",
  eyebrow: "Saytda toʻlov",
  title: "Premium — soʻmda, Payme orqali.",
  lead: "Ilovadagi Foydalanuvchi IDʼingizni kiriting, muddatni tanlang va Uzcard yoki Humo kartasi bilan toʻlang. Toʻlov bir martalik — kartadan avtomatik pul yechilmaydi.",
  metaTitle: "Premium — saytda toʻlov",
  metaDescription:
    "DeutschUz Premiumʼni soʻmda sotib oling: 1, 3, 6 oy yoki 1 yil, Uzcard va Humo kartalari, Payme orqali. Bir martalik toʻlov — avtomatik yangilanmaydi.",
} as const);

export const checkoutCopy = typo({
  formLabel: "Premium sotib olish",
  stepPlan: "Muddatni tanlang",
  stepId: "Foydalanuvchi ID",
  idPlaceholder: "$RCAnonymousID:…",
  idHint: "Ilovada: Profil → Sozlamalar → «Foydalanuvchi ID» — bosing, nusxa olinadi. Premium shu hisobga beriladi.",
  idInvalid: "ID notoʻgʻri koʻrinadi — ilovadan qayta nusxa oling",
  stepCard: "Karta",
  cardLabel: "Karta raqami",
  cardPlaceholder: "0000 0000 0000 0000",
  cardInvalid: "Karta raqami 16 ta raqamdan iborat",
  expireLabel: "Amal qilish muddati",
  expirePlaceholder: "OO/YY",
  expireInvalid: "Kartadagi muddat: OO/YY, masalan 03/29",
  pay: "{amount} toʻlash",
  secure: "Toʻlov Payme orqali. Karta raqamini saqlamaymiz — u faqat toʻlov uchun Paymeʼga uzatiladi.",
  agree: "Toʻlash tugmasini bosib, {terms}ga rozilik bildirasiz.",
  terms: "Foydalanish shartlari",
  popular: "Eng mashhur",
  perMonth: "oyiga",
  smsTitle: "SMS kodni kiriting",
  smsSent: "Kod {phone} raqamiga yuborildi.",
  smsSentUnknown: "Kod kartaga ulangan telefon raqamiga yuborilgan.",
  smsLabel: "SMS kod",
  smsInvalid: "SMS koddagi raqamlarni kiriting",
  confirm: "Tasdiqlash",
  resend: "Kodni qayta yuborish",
  resendIn: "Kodni qayta yuborish — {time}",
  resent: "Kod qayta yuborildi.",
  back: "Kartani oʻzgartirish",
  processing: "Toʻlov amalga oshirilmoqda…",
  processingNote: "Sahifani yopmang — odatda bir necha soniya.",
  processingLong: "Toʻlov holati hali aniqlanmadi. Sahifani keyinroq yangilang — natija shu yerda chiqadi; kartadan pul ikki marta yechilmaydi.",
  successTitle: "Toʻlov qabul qilindi",
  successUntil: "Premium {date} gacha faol.",
  successReopen: "Ilovani yoping va qayta oching — Premium oʻzi ochiladi.",
  pendingGrant: "Premium bir necha daqiqada faollashadi — keyin ilovani qayta oching.",
  pendingLong: "15 daqiqada faollashmasa, buyurtma raqami bilan qoʻllab-quvvatlashga yozing.",
  testDone: "Sinov toʻlovi muvaffaqiyatli. Sinov rejimida Premium berilmaydi.",
  orderNo: "Buyurtma",
  amount: "Summa",
  card: "Karta",
  plan: "Muddat",
  failedTitle: "Toʻlov amalga oshmadi",
  expiredTitle: "Kutish vaqti tugadi",
  expiredText: "SMS kod 15 daqiqa ichida kiritilmadi. Kartadan pul yechilmadi — qaytadan boshlang.",
  retry: "Qaytadan boshlash",
  again: "Yana sotib olish",
  testBanner: "Sinov rejimi: haqiqiy pul yechilmaydi, faqat Payme test kartasi ishlaydi.",
  disabledTitle: "Saytda toʻlov hozircha yopiq",
  disabled: "Premiumʼni ilova ichida — App Store yoki Google Play orqali — sotib olishingiz mumkin.",
  loadTitle: "Narxlar yuklanmadi",
  loadError: "Internetni tekshirib, sahifani yangilang.",
  reload: "Sahifani yangilash",
  network: "Server bilan aloqa yoʻq — internetni tekshirib, qayta urinib koʻring.",
  loading: "Narxlar yuklanmoqda…",
  noscript: "Toʻlov uchun brauzerda JavaScript yoqilgan boʻlishi kerak.",
} as const);

export const premiumSteps = typo([
  { title: "IDʼni nusxalang", text: "Ilovada Profil → Sozlamalar → «Foydalanuvchi ID» ni bosing — u nusxalanadi." },
  { title: "Muddat va karta", text: "1, 3, 6 oy yoki 1 yil. Uzcard yoki Humo kartasi, SMS kod bilan tasdiqlanadi." },
  { title: "Premium ochiladi", text: "Toʻlovdan keyin ilovani qayta oching — barcha darajalar, grammatika va AI mashqlari ochiq." },
]);

export const premiumNotes = typo({
  stepsTitle: "Qanday ishlaydi",
  notesTitle: "Bilish muhim",
  items: [
    "Toʻlov bir martalik: muddat tugagach kartadan avtomatik pul yechilmaydi. Xohlasangiz, yana sotib olasiz.",
    "Premium faol boʻlsa, yangi muddat joriy muddat tugaganidan keyin qoʻshiladi — kunlar kuyib ketmaydi.",
    "Narx soʻmda. Dollardagi summa — App Store va Google Playʼdagi narx, maʼlumot uchun.",
    "App Store yoki Google Play obunangiz boʻlsa, avval uni doʻkon sozlamalarida bekor qiling — aks holda ikkalasi bir vaqtda ishlaydi.",
  ],
} as const);

/** «Narxlar» sahifasidagi havola — faqat to'lov jonli bo'lganda (site.webPayments). */
export const premiumCta = typo({
  title: "Soʻmda, Uzcard yoki Humo bilan",
  text: "Premiumʼni saytda Payme orqali sotib olishingiz ham mumkin — bir martalik toʻlov, avtomatik yangilanmaydi.",
  button: "Saytda sotib olish",
} as const);
