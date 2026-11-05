import { typo } from "@/lib/typography";

/**
 * Yuklab olish manzillari. Haqiqiy holat (CLAUDE.md): iPhone va Android uchun ilova; do'kon sahifalari ilova chiqqach paydo
 * bo'ladi (APP_STORE_URL, GOOGLE_PLAY_URL — build sozlamasi); iPhone'ga bosh ekran orqali o'rnatiladigan veb-ilova — WEB_APP_URL.
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
  /** Veb-ilova (WEB_APP_URL berilganda). */
  web: {
    ios: {
      action: "iPhoneʼga oʻrnatish",
      hint: "Safariʼda ochiladi: hisobga kirasiz va bir daqiqada bosh ekranga qoʻshasiz. Hisobingiz va progressingiz saqlanadi.",
    },
    android: {
      action: "Brauzerda oʻrnatish",
      hint: "Chromeʼda ochiladi va bir bosishda telefoningizga oʻrnatiladi.",
    },
    desktop: {
      title: "Kompyuterda — brauzer orqali",
      text: "Alohida kompyuter dasturi yoʻq, lekin DeutschUz brauzerda ham ishlaydi: hisobingiz va progressingiz telefondagi bilan bir xil.",
      action: "Brauzerda ochish",
    },
    overview: "Hozirdan brauzer orqali:",
  },
  storeSoon: (store: string) => `${store} — tez orada`,
  copy: "Havolani nusxalash",
  copied: "Nusxalandi",
  storesTitle: "Telefon uchun manzillar",
  soon: "tez orada",
});
