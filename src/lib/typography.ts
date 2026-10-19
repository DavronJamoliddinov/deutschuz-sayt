const DASH_WITH_SPACE = / — /g;
const NBSP = " ";

/**
 * Kontent matnlariga tipografiya qoidasi: tire oldidagi bo'shliq bo'linmas bo'ladi — tire hech qachon yangi
 * qatorni boshlamaydi (o'zbek va rus matn terish an'anasi). Obyekt va massivlarni chuqur aylanib chiqadi;
 * funksiyalar (masalan, ikonka komponentlari) va boshqa qiymatlar o'zgarmaydi.
 */
export function typo<T>(value: T): T {
  if (typeof value === "string") return value.replace(DASH_WITH_SPACE, `${NBSP}— `) as T;
  if (Array.isArray(value)) return value.map((item) => typo(item)) as T;
  // React komponentlari (masalan, forwardRef ikonkalar) — oddiy obyekt bo'lsa ham tegilmaydi
  if (value !== null && typeof value === "object" && "$$typeof" in value) return value;
  if (value !== null && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, typo(item)])) as T;
  }
  return value;
}
