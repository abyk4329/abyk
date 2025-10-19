"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import styles from "./IconButton.module.css";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonInsetVariant = "primary" | "secondary";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  inset?: boolean;
  insetVariant?: IconButtonInsetVariant;
}

const SIZE_CLASSNAME: Record<IconButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const INSET_CLASSNAME: Record<IconButtonInsetVariant, string> = {
  primary: styles.iconButtonInsetPrimary,
  secondary: styles.iconButtonInsetSecondary,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = "md",
      inset = false,
      insetVariant = "primary",
      className,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          styles.iconButton,
          SIZE_CLASSNAME[size],
          inset ? styles.iconButtonInset : undefined,
          inset ? INSET_CLASSNAME[insetVariant] : undefined,
          className
        )}
        {...props}
      >
        <span className={styles.iconButtonInner}>{children}</span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
