"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import "@/design/index.css";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn("neuInput", className)}
      {...props}
    />
  )
);

Input.displayName = "Input";
