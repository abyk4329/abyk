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
        bg-white/10 backdrop-blur-md transition-all duration-300 
        hover:bg-white/20 hover:border-white/30 hover:scale-105
        active:scale-95 group
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Light sweep effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full w-full text-espresso/80 group-hover:text-espresso transition-colors duration-300">
        {children}
      </div>
    </button>
  );
}
