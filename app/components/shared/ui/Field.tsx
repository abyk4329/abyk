"use client";

import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import neuStyles from "@/app/styles/neu.module.css";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  hint?: ReactNode;
  htmlFor?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export function Field({
  children,
  className,
  label,
  hint,
  htmlFor,
  labelProps,
  ...props
}: FieldProps) {
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  return (
    <div className={cn(neuStyles.neuField, className)} {...props}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className={cn(neuStyles.neuLabel, labelClassName)}
          {...restLabelProps}
        >
          {label}
        </label>
      ) : null}

      {children}

      {hint ? <p className={neuStyles.neuHint}>{hint}</p> : null}
    </div>
  );
}
