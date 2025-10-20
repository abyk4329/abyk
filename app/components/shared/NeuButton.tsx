"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import "@/design/index.css";
import { cn } from "@/lib/utils";

type NeuButtonVariant = "primary" | "secondary" | "cta";

export interface NeuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: NeuButtonVariant;
  textClassName?: string;
}

// Map variants to shared style classes
const VARIANT_CLASSES: Record<NeuButtonVariant, string> = {
  cta: "ctaButton",
  primary: "primaryButton",
  secondary: "secondaryButton",
};

export const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
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
        className={cn(VARIANT_CLASSES[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeuButton.displayName = "NeuButton";
