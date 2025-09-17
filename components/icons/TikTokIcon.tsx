import React from "react";

export function TikTokIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 3c.2 1.8 1.2 5 5 5" strokeLinecap="round" />
      <path
        d="M16 3v11.5a4.5 4.5 0 1 1-4.5-4.5c.5 0 .9.1 1.3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
