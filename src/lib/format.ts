const NBSP = " ";

/** 65000 → "65 000" (bo'linmas bo'shliq bilan — raqam qatorda uzilmaydi). */
export function groupDigits(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** 4.99 → "$4.99" (do'konlar O'zbekistonda dollarda hisoblaydi). */
export function usd(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** So'mdagi taxminiy summa, minggacha yaxlitlangan (ilovadagidek). */
export function approxSum(usdValue: number, rate: number): string {
  return `≈${NBSP}${groupDigits(Math.round((usdValue * rate) / 1000) * 1000)}${NBSP}soʻm`;
}

/** "2026-09-30" → "30.09.2026" */
export function dmy(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}.${m}.${y}`;
}
