import React from "react";

export function EmailIcon({
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
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="4" y="6" width="16" height="12" rx="2" />
    </svg>
  );
}
