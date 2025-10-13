import { BRAND } from "@/lib/core/branding";

const SHARE_TEXT = "גלו את קוד העושר שלכם עם ABYK";

export function shareWithFriends() {
  if (typeof window === "undefined") {
    return;
  }

  const shareUrl = BRAND.siteUrl;
  const sharePayload = {
    title: BRAND.appName,
    text: SHARE_TEXT,
    url: shareUrl,
  } as ShareData;

  const fallbackUrl = `https://wa.me/?text=${encodeURIComponent(
    `${SHARE_TEXT} ${shareUrl}`
  )}`;

  if (navigator.share) {
    navigator.share(sharePayload).catch(() => {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    });
    return;
  }

  window.open(fallbackUrl, "_blank", "noopener,noreferrer");
}
