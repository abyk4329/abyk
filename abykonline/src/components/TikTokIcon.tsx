interface TikTokIconProps {
  className?: string;
  strokeWidth?: number;
}

export function TikTokIcon({ className = "w-5 h-5", strokeWidth = 1.5 }: TikTokIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* TikTok icon - clean line art style to match lucide icons */}
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
    </svg>
  );
}