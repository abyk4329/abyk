'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonInsetVariant = 'primary' | 'secondary';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  inset?: boolean;
  insetVariant?: IconButtonInsetVariant;
}

const SIZE_CLASSNAME: Record<IconButtonSize, string> = {
  sm: 'icon-button--size-sm',
  md: 'icon-button--size-md',
  lg: 'icon-button--size-lg',
};

const INSET_CLASSNAME: Record<IconButtonInsetVariant, string> = {
  primary: 'icon-button--inset-primary',
  secondary: 'icon-button--inset-secondary',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = 'md',
      inset = false,
      insetVariant = 'primary',
      className,
      type = 'button',
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
          'icon-button',
          SIZE_CLASSNAME[size],
          inset ? 'icon-button--inset' : undefined,
          inset ? INSET_CLASSNAME[insetVariant] : undefined,
          className
        )}
        {...props}
      >
        <span className="icon-button-inner">{children}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
