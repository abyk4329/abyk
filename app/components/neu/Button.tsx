"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "gold" | "cta" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * הווריאציה של הכפתור
   * - primary: כפתור ראשי (ברירת מחדל)
   * - secondary: כפתור משני
   * - gold: כפתור זהב לקריאה לפעולה
   * - cta: אליאס לזהב לצורך תאימות לאחור
   * - ghost: כפתור מינימליסטי ללא נפח
   */
  variant?: ButtonVariant;

  /**
   * גודל הכפתור
   * - sm: קטן
   * - md: בינוני (ברירת מחדל)
   * - lg: גדול
   */
  size?: ButtonSize;

  /**
   * איקון לפני הטקסט (אופציונלי)
   */
  icon?: ReactNode;

  /**
   * האם הכפתור לוקח רוחב מלא
   */
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  disabled = false,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const variantClass = useMemo(() => {
    switch (variant) {
      case "secondary":
        return styles.variantSecondary;
      case "gold":
      case "cta":
        return styles.variantGold;
      case "ghost":
        return styles.variantGhost;
      case "primary":
      default:
        return styles.variantPrimary;
    }
  }, [variant]);

  const handleMouseDown = () => {
    if (!disabled && variant !== "secondary") {
      setIsPressed(true);
    }
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  return (
    <button
      type={type}
      onMouseDown={handleMouseDown}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleRelease}
      disabled={disabled}
      className={cn(
        styles.button,
        variantClass,
        styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        isPressed && variant !== "secondary" && styles.pressed,
        className
      )}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
}

export default Button;
