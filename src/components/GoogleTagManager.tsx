import Script from "next/script";

const DEFAULT_CONTAINER_ID = "GTM-5TQQHXPF";

function containerId(): string | null {
  const id = process.env.NEXT_PUBLIC_GTM_ID ?? DEFAULT_CONTAINER_ID;
  return id.startsWith("GTM-") ? id : null;
}

/** The <script> half — render once, as high in <head> as possible. */
export function GoogleTagManagerScript() {
  const id = containerId();
  if (!id) return null;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
      `.trim()}
    </Script>
  );
}

/** The <noscript> half — render once, immediately after the opening <body>. */
export function GoogleTagManagerNoscript() {
  const id = containerId();
  if (!id) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
