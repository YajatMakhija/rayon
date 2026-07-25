import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google tag (gtag.js) — GA4.
 * Loaded once sitewide via next/script. Renders nothing when ID is empty.
 */
export function GoogleTag() {
  const id = site.googleTagId;
  if (!id) return null;

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
