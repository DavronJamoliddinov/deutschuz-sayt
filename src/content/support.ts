import { typo } from "@/lib/typography";

/**
 * Qo'llab-quvvatlash aloqasi — loyiha egasi bergan (2026-10-28): email va Telegram, telefon hozircha yo'q.
 * Ilovada (Profil → Yordam), hisob xatlarida, shartlar va maxfiylik siyosatida ham shu manzillar.
 */
export const support = {
  email: "deutschuz.com@gmail.com",
  telegram: "deutschuz_admin",
  telegramUrl: "https://t.me/deutschuz_admin",
} as const;

/** Telegram kanali (loyiha egasi, 2026-11-18) — qoʻllab-quvvatlash akkauntidan alohida: yangiliklar va eʼlonlar. */
export const channel = {
  handle: "DeutschUz_com",
  url: "https://t.me/DeutschUz_com",
} as const;

export const channelCopy = typo({
  title: "Telegram kanalimiz",
  newsTitle: "Yangiliklarni Telegramʼda kuzating",
  lead: "Germaniyada oʻqish va ishlash boʻyicha yangiliklar hamda ilova yangilanishlari — kanalimizda.",
  join: "Kanalga oʻtish",
} as const);

export const supportCopy = typo({
  title: "Qoʻllab-quvvatlash",
  pageTitle: "Javob topmadingizmi? Bizga yozing",
  lead: "Savol, taklif yoki toʻlov boʻyicha muammo boʻlsa — emailga yoki Telegramʼga yozing. Ilovadagi Foydalanuvchi IDʼni (Profil → Sozlamalar → «Foydalanuvchi ID») va toʻlov boʻlsa buyurtma raqamini qoʻshing — tezroq yordam beramiz.",
  email: "Email",
  telegram: "Telegram",
  paymentHelp: "Toʻlov boʻyicha savol boʻlsa, buyurtma raqami bilan yozing:",
} as const);
