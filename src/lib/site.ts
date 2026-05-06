export const SITE_URL = "https://meetjain.xyz" as const;

const CALENDLY_BASE = "https://calendly.com/meetjaiin/30min";

/** Booking link with default UTMs so Calendly / GA4 can attribute traffic to meetjain.xyz. */
export function getCalendlyBookingUrl(
  extraParams?: Record<string, string>,
): string {
  const url = new URL(CALENDLY_BASE);
  url.searchParams.set("utm_source", "meetjain.xyz");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "portfolio_booking");
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}
