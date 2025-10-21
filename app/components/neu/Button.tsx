'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'cta' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  disabled = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const normalizedVariant = useMemo<Exclude<ButtonVariant, 'cta'>>(
    () => (variant === 'cta' ? 'gold' : variant),
    [variant]
  );

  const variantClass = useMemo(() => {
    switch (normalizedVariant) {
      case 'secondary':
        return 'btn-variant-secondary';
      case 'gold':
        return 'btn-variant-gold';
      case 'ghost':
        return 'btn-variant-ghost';
      case 'primary':
      default:
        return 'btn-variant-primary';
    }
  }, [normalizedVariant]);

  const sizeClass = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'btn-size-sm';
      case 'lg':
        return 'btn-size-lg';
      case 'md':
      default:
        return 'btn-size-md';
    }
  }, [size]);

  const handleMouseDown = () => {
    if (!disabled && variant !== 'secondary') {
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
      data-pressed={
        !disabled && isPressed && normalizedVariant !== 'secondary'
          ? 'true'
          : undefined
      }
      className={cn(
        'btn',
        variantClass,
        sizeClass,
        fullWidth && 'btn-full',
        className
      )}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
}

export default Button;
