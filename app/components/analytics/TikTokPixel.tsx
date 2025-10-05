"use client";

import { useEffect } from "react";
import Script from "next/script";

const STORAGE_KEY = "abyk-cookie-consent";
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "D3C3JDBC77UEJB9H374G";

/**
 * TikTok Pixel component
 * Only loads after user accepts cookies
 */
export function TikTokPixel() {
  useEffect(() => {
    // Check if user has accepted cookies
    const hasConsent = () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === "accepted";
      } catch {
        return false;
      }
    };

    // Initialize TikTok Pixel if consent given
    if (hasConsent() && typeof window !== "undefined") {
      // TikTok Pixel will be loaded via Script component
      // This effect can trigger page view events
      if (window.ttq) {
        window.ttq.page();
      }
    }
  }, []);

  // Don't render script if no pixel ID
  if (!TIKTOK_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  // Only initialize if consent is given
  try {
    const consent = window.localStorage.getItem('${STORAGE_KEY}');
    if (consent === 'accepted') {
      ttq.load('${TIKTOK_PIXEL_ID}');
      ttq.page();
    }
  } catch (e) {
    console.warn('TikTok Pixel: Failed to check consent', e);
  }
}(window, document, 'ttq');
          `,
        }}
      />
    </>
  );
}

// TypeScript declaration for TikTok Pixel
declare global {
  interface Window {
    ttq?: {
      load: (pixelId: string) => void;
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
      instances: (pixelId: string) => unknown;
      debug: (enabled: boolean) => void;
      _i?: Record<string, unknown[]>;
      _t?: Record<string, number>;
      _o?: Record<string, unknown>;
    };
    TiktokAnalyticsObject?: string;
  }
}

export default TikTokPixel;
