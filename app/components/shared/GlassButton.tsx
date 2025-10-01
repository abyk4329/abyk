"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function GlassButton({ 
  children, 
  variant = "primary", 
  className = "",
  ...props 
}: GlassButtonProps) {
  const baseStyles = `
    group relative px-4 py-2 
    backdrop-blur-xl 
    rounded-full 
    transition-all duration-300 
    min-w-[100px] 
    flex items-center justify-center
    touch-manipulation
    select-none
    overflow-hidden
    
    /* Touch feedback - mobile */
    active:scale-95
    active:shadow-inner
    
    /* Frosted glass effect */
    shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_2px_8px_0_rgba(255,255,255,0.3)]
    
    /* Hover effect - desktop */
    hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.3),inset_0_2px_12px_0_rgba(255,255,255,0.4)]
    hover:scale-[1.03]
    
    /* Focus visible for accessibility */
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-[#87674F]
    
    /* Disabled state */
    disabled:opacity-60
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    disabled:active:scale-100
    
    /* Prevent double-tap zoom on iOS */
    [&]:touch-action-manipulation
  `;
  
  const variantStyles = {
    primary: `
      bg-white/20
      
      hover:bg-white/30
      hover:backdrop-blur-2xl
      
      active:bg-white/25
      
      /* Light shine effect */
      before:absolute before:inset-0 
      before:rounded-full
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0
      before:transition-opacity before:duration-300
      hover:before:opacity-100
    `,
    secondary: `
      bg-white/15
      
      hover:bg-white/25
      
      active:bg-white/20
    `
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 group-hover:!text-[#87674F] group-active:!text-[#5e4934]">
        {children}
      </span>
    </button>
  );
}