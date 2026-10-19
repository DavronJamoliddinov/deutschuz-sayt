import { typo } from "@/lib/typography";

/**
 * Yuklab olish manzillari. Haqiqiy holat (CLAUDE.md): ilova faqat iPhone va Android uchun, veb yoki kompyuter versiyasi yo'q;
 * do'kon sahifalari ilova chiqqach paydo bo'ladi (APP_STORE_URL, GOOGLE_PLAY_URL — build sozlamasi).
 */
export type Platform = "ios" | "android" | "desktop";

export const downloadCopy = typo({
  groupLabel: "Qurilmani tanlang",
  detected: "Sizning qurilmangiz",
  platforms: {
    ios: { label: "iPhone", store: "App Store", hint: "iPhone va iPad uchun" },
    android: { label: "Android", store: "Google Play", hint: "Android telefon va planshetlar uchun" },
    desktop: { label: "Kompyuter", store: null, hint: "Windows, macOS, Linux" },
  },
  available: (store: string) => `${store}ʼdan yuklab olish`,
  missingTitle: (store: string) => `${store} sahifasi hali yoʻq`,
  missingText: (store: string) =>
    `DeutschUz hali ${store}ʼga chiqmagan. Ilova chiqishi bilan yuklab olish havolasi shu yerda paydo boʻladi.`,
  desktopTitle: "Kompyuter uchun versiya yoʻq",
  desktopText: "DeutschUz — telefon ilovasi: iPhone va Android uchun. Kompyuter dasturi yoki veb-versiya chiqarilmagan.",
  desktopPhone: "Telefoningizda shu sahifani oching:",
  copy: "Havolani nusxalash",
  copied: "Nusxalandi",
  storesTitle: "Telefon uchun manzillar",
  soon: "tez orada",
});
