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
}

export function GlassIconLink({
  href,
  label,
  size = 48,
  target = "_blank",
  rel = "noreferrer",
  children,
  className = "",
}: GlassIconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target={target}
      rel={rel}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent transition-all duration-300 hover:shadow-[0_10px_24px_rgba(167,131,90,0.25)] hover:border-white/30 active:scale-95 group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Soft gold glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 rounded-full blur-md bg-[radial-gradient(circle_at_center,rgba(190,157,118,0.45),rgba(190,157,118,0)_65%)]" />
      </span>
      <span className="relative z-10 text-espresso/80 transition-colors duration-300 group-hover:text-espresso">
        {children}
      </span>
    </a>
  );
}
