const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * "2026-07-10" -> "Jul 10, 2026". Hand-rolled instead of Intl so server and
 * client always agree byte-for-byte (no locale/ICU drift -> no hydration
 * mismatch).
 */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}
