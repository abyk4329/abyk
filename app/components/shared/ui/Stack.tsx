"use client";

import type { HTMLAttributes } from "react";

import "@/design/index.css";
import { cn } from "@/lib/utils";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  tight?: boolean;
}

export function Stack({ tight = false, className, ...props }: StackProps) {
  return (
    <div
      className={cn(
        "neuStack",
        tight ? "neuStackTight" : undefined,
        className
      )}
      {...props}
    />
  );
}
