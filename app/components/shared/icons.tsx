import type { SVGProps } from "react";

import { ICON_STROKE } from "@/lib/constants";

/**
 * TikTok stroke icon tuned for neumorphic styling with a sculpted stem and note head.
 */
export function TikTokStrokeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE.default}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M14 4v10" />
      <path d="M14 6.25c1.15 1.6 2.78 2.55 4.5 2.65" />
      <path d="M6.8 16.6c0-2.4 1.94-4.35 4.35-4.35s4.35 1.95 4.35 4.35-1.95 4.35-4.35 4.35c-1.45 0-2.76-.7-3.6-1.8" />
    </svg>
  );
}
