"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

type GlassButtonVariant = "primary" | "secondary";

export interface GlassButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: GlassButtonVariant;
}

const BASE_CLASSES = cn(
  "group relative inline-flex min-w-[100px] items-center justify-center overflow-hidden rounded-full px-4 py-2",
  "transition-all duration-300 backdrop-blur-xl touch-manipulation select-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#87674F]",
  "active:scale-95 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-60",
  "disabled:hover:scale-100 disabled:active:scale-100"
);

const VARIANT_CLASSES: Record<GlassButtonVariant, string> = {
  primary: cn(
    "bg-white/20 shadow-[0_8px_32px_rgba(94,73,52,0.2),inset_0_2px_8px_rgba(255,255,255,0.3)]",
    "hover:bg-white/30 hover:backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(94,73,52,0.3),inset_0_2px_12px_rgba(255,255,255,0.4)]",
    "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
    "before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100"
  ),
  secondary: cn(
    "bg-white/15 shadow-[0_6px_24px_rgba(94,73,52,0.15),inset_0_1px_4px_rgba(255,255,255,0.25)]",
    "hover:bg-white/25 hover:shadow-[0_10px_32px_rgba(94,73,52,0.22),inset_0_1px_6px_rgba(255,255,255,0.35)]"
  ),
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    { children, className, variant = "primary", type = "button", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
        {...props}
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#87674F] group-active:text-[#5e4934]">
          {children}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
