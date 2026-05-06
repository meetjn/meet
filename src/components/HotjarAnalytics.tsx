import Script from "next/script";

/**
 * Set NEXT_PUBLIC_HOTJAR_ID in .env.local to your Hotjar site ID (numeric).
 * Create a site at https://www.hotjar.com/ — the ID appears in the tracking snippet.
 */
export function HotjarAnalytics() {
  const raw = process.env.NEXT_PUBLIC_HOTJAR_ID;
  if (!raw) return null;
  const hjid = Number.parseInt(raw, 10);
  if (!Number.isFinite(hjid) || hjid <= 0) return null;

  return (
    <Script id="hotjar-analytics" strategy="afterInteractive">
      {`
(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:${hjid},hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `.trim()}
    </Script>
  );
}
