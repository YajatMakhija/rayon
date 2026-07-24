import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google tag (gtag.js) for Google Ads conversion tracking.
 * Loaded via next/script with `afterInteractive` so it does not block
 * first paint. Renders nothing when `googleTagId` is empty.
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
