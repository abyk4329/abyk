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
  textClassName?: string;
}

const BASE_CLASSES = cn(
  "group relative inline-flex min-w-[100px] items-center justify-center overflow-hidden rounded-full px-4 py-2",
  "transition-all duration-300 touch-manipulation select-none border-0",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#87674F]",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "disabled:hover:scale-100 disabled:active:scale-100"
);

const VARIANT_CLASSES: Record<GlassButtonVariant, string> = {
  primary: cn(
    "bg-[linear-gradient(145deg,rgb(255,255,255),rgb(248,244,240))]",
    "shadow-[10px_10px_20px_rgba(159,133,114,0.15),-10px_-10px_20px_rgba(255,255,255,0.9),inset_1px_1px_3px_rgba(255,255,255,0.7)]",
    "hover:shadow-[12px_12px_24px_rgba(159,133,114,0.18),-12px_-12px_24px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(255,255,255,0.8)]",
    "hover:transform hover:translate-y-[-2px]",
    "active:shadow-[inset_5px_5px_10px_rgba(159,133,114,0.15),inset_-5px_-5px_10px_rgba(255,255,255,0.8),1px_1px_3px_rgba(159,133,114,0.08)]",
    "active:transform active:scale-[0.97] active:translate-y-[1px]"
  ),
  secondary: cn(
    "bg-[linear-gradient(145deg,rgb(255,255,255),rgb(248,244,240))]",
    "shadow-[10px_10px_20px_rgba(159,133,114,0.15),-10px_-10px_20px_rgba(255,255,255,0.9),inset_1px_1px_3px_rgba(255,255,255,0.7)]",
    "hover:shadow-[12px_12px_24px_rgba(159,133,114,0.18),-12px_-12px_24px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(255,255,255,0.8)]",
    "hover:transform hover:translate-y-[-2px]",
    "active:shadow-[inset_5px_5px_10px_rgba(159,133,114,0.15),inset_-5px_-5px_10px_rgba(255,255,255,0.8),1px_1px_3px_rgba(159,133,114,0.08)]",
    "active:transform active:scale-[0.97] active:translate-y-[1px]"
  ),
};

const DEFAULT_TEXT_CLASS = "text-[#87674F]";

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      type = "button",
      textClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
        {...props}
      >
        <span
          className={cn(
            "relative z-10 transition-colors duration-300 font-semibold text-shadow-sm",
            textClassName ?? DEFAULT_TEXT_CLASS
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
