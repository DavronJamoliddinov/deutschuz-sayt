/**
 * Sayt sozlamalari. Qiymat bo'lmasa (null) tegishli havola, tugma yoki meta-teg chiqmaydi —
 * sayt mavjud bo'lmagan manzilga yo'naltirmaydi.
 *
 * Build paytida muhit o'zgaruvchilari bilan beriladi (masalan `SITE_URL=https://... npm run build`)
 * yoki shu yerda to'g'ridan-to'g'ri yoziladi. Faqat server komponentlarida o'qing:
 * brauzer kodida process.env bo'sh bo'ladi.
 */
function env(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value.replace(/\/+$/, "") : null;
}

/**
 * Do'kon havolasi faqat rasmiy do'kon domenida bo'lishi mumkin — aks holda build to'xtaydi: noto'g'ri yoki soxta
 * «yuklab olish» havolasi saytga chiqmaydi.
 */
function storeUrl(name: string, host: string): string | null {
  const value = env(name);
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name}: manzil noto'g'ri — ${value}`);
  }
  if (url.protocol !== "https:" || url.hostname !== host) {
    throw new Error(`${name}: faqat https://${host}/… manzili qabul qilinadi, berilgani — ${value}`);
  }
  return value;
}

export const site = {
  name: "DeutschUz",
  /** Saytning asosiy manzili: canonical, Open Graph rasmi, sitemap. Domen ulangach yoziladi. */
  url: env("SITE_URL"),
  /**
   * Do'kon sahifalari — ilova chiqqach to'ldiriladi (Android: applicationId `uz.deutschuz.deutschuz`).
   * Bo'sh bo'lsa sayt havola bermaydi: «… sahifasi hali yoʻq» / «tez orada».
   */
  appStoreUrl: storeUrl("APP_STORE_URL", "apps.apple.com"),
  googlePlayUrl: storeUrl("GOOGLE_PLAY_URL", "play.google.com"),
  /** Ilova loyihasidagi deploy/site/ sahifalari (serverda /privacy, /terms). Joylangach yoziladi. */
  privacyUrl: env("PRIVACY_URL"),
  termsUrl: env("TERMS_URL"),
  /**
   * Saytdagi bir martalik Premium to'lovi (/premium, Payme): ilova serverining to'lov API'si. Bo'sh — sahifa o'z
   * domenidagi /v1/pay/* ni chaqiradi (serverda Caddy uni ilova serveriga uzatadi). Lokal sinov:
   * PAY_API=http://127.0.0.1:8787 (serverda SITE_ORIGINS ga sahifa manzili qo'shiladi).
   */
  payApi: env("PAY_API") ?? "",
  /**
   * WEB_PAYMENTS=1 — saytdagi to'lov jonli kassada ishlayapti: «Narxlar» va «Savollar» da havola, /premium qidiruv
   * tizimlari va sitemap'da. Sinov kassasi paytida bo'sh: sahifa ochiladi, lekin hech qayerdan havola berilmaydi.
   */
  webPayments: env("WEB_PAYMENTS") === "1",
} as const;

export const storesAvailable = Boolean(site.appStoreUrl || site.googlePlayUrl);
