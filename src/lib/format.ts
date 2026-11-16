const NBSP = " ";

/** 65000 → "65 000" (bo'linmas bo'shliq bilan — raqam qatorda uzilmaydi). */
export function groupDigits(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}
