/**
 * USD → so'm kursi: build paytida O'zbekiston Markaziy bankining ochiq JSON'idan olinadi (ilovadagi
 * `uzs_rate.dart` bilan bir manba). Tarmoq bo'lmasa yoki javob kutilmagan bo'lsa — CLAUDE.md dagi
 * oxirgi qayd etilgan kurs. Sayt statik, shuning uchun sahifada kurs sanasi ham ko'rsatiladi.
 */
export type UsdRate = { rate: number; date: string; live: boolean };

const FALLBACK: UsdRate = { rate: 11_821, date: "2026-09-30", live: false };
const CBU_URL = "https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/";

export async function getUsdRate(): Promise<UsdRate> {
  try {
    const response = await fetch(CBU_URL, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) return FALLBACK;
    const data: unknown = await response.json();
    const item = Array.isArray(data) ? (data[0] as Record<string, unknown> | undefined) : undefined;
    const rate = Number(String(item?.Rate ?? "").replace(",", "."));
    const date = String(item?.Date ?? "");
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date);
    if (!match || !Number.isFinite(rate) || rate < 5_000 || rate > 50_000) return FALLBACK;
    return { rate, date: `${match[3]}-${match[2]}-${match[1]}`, live: true };
  } catch {
    return FALLBACK;
  }
}
