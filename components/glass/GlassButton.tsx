"use client";

import React from "react";

interface GlassButtonProps {
  children: React.ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

export function GlassButton({
  children,
  size = 64,
  onClick,
  className = "",
}: GlassButtonProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
  relative overflow-hidden rounded-full border border-white/20 
  bg-transparent transition-all duration-300 
  hover:shadow-[0_10px_24px_rgba(167,131,90,0.25)] hover:border-white/30
  active:scale-95 group
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Soft gold glow on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-full blur-md bg-[radial-gradient(circle_at_center,rgba(190,157,118,0.45),rgba(190,157,118,0)_65%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full w-full text-espresso/80 group-hover:text-espresso transition-colors duration-300">
        {children}
      </div>
    </button>
  );
}
