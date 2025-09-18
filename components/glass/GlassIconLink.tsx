"use client";

import React from "react";

interface GlassIconLinkProps {
  href: string;
  label: string;
  size?: number;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  showLabel?: boolean;
  text?: string;
}

export function GlassIconLink({
  href,
  label,
  size = 48,
  target = "_blank",
  rel = "noreferrer",
  children,
  className = "",
  showLabel = false,
  text,
}: GlassIconLinkProps) {
  const horizontalPad = showLabel
    ? `${Math.max(12, Math.floor(size * 0.3))}px`
    : undefined;
  return (
    <a
      href={href}
      aria-label={label}
      target={target}
      rel={rel}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent transition-all duration-300 hover:shadow-[0_10px_24px_rgba(167,131,90,0.25)] hover:border-white/30 active:scale-95 group ${className}`}
      style={{
        height: `${size}px`,
        // When label is shown, allow horizontal padding; otherwise make it a circle
        width: showLabel ? "auto" : `${size}px`,
        paddingLeft: horizontalPad,
        paddingRight: horizontalPad,
      }}
    >
      {/* Soft gold glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 rounded-full blur-md bg-[radial-gradient(circle_at_center,rgba(190,157,118,0.45),rgba(190,157,118,0)_65%)]" />
      </span>
      <span className="relative z-10 flex items-center gap-2 text-espresso/80 transition-colors duration-300 group-hover:text-espresso">
        <span style={{ lineHeight: 0 }}>{children}</span>
        {showLabel && (
          <span className="hidden md:inline text-ms--1 text-espresso/80 group-hover:text-espresso">
            {text ?? label}
          </span>
        )}
      </span>
    </a>
  );
}
