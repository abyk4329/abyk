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
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 active:scale-95 group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Light sweep */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute inset-0 translate-x-[-100%] skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
      </span>
      <span className="relative z-10 text-espresso/80 transition-colors duration-300 group-hover:text-espresso">
        {children}
      </span>
    </a>
  );
}
