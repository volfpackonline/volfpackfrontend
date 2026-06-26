import Script from "next/script";

/**
 * Microsoft Clarity (session replay + heatmaps). Loaded once for all routes via
 * the root layout. The project ID can be overridden with NEXT_PUBLIC_CLARITY_ID;
 * otherwise it falls back to the VolfPack project tag.
 */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "xd0x1wmlud";

export function Clarity() {
  if (!CLARITY_ID) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}
