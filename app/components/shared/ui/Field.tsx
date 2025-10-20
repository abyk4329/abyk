"use client";

import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

import "@/design/index.css";
import { cn } from "@/lib/utils";

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
    <div className={cn("neuField", className)} {...props}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className={cn("neuLabel", labelClassName)}
          {...restLabelProps}
        >
          {label}
        </label>
      ) : null}

      {children}

      {hint ? <p className="neuHint">{hint}</p> : null}
    </div>
  );
}
