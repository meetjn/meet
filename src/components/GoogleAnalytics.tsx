import Script from "next/script";

const DEFAULT_MEASUREMENT_ID = "G-7J0BV6KCNJ";

/**
 * GA4 via gtag.js. Override with NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local if needed.
 */
export function GoogleAnalytics() {
  const measurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? DEFAULT_MEASUREMENT_ID;
  if (!measurementId.startsWith("G-")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');
        `.trim()}
      </Script>
    </>
  );
}
