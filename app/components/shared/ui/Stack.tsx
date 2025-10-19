"use client";

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import neuStyles from "@/app/styles/neu.module.css";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  tight?: boolean;
}

export function Stack({ tight = false, className, ...props }: StackProps) {
  return (
    <div
      className={cn(
        neuStyles.neuStack,
        tight ? neuStyles.neuStackTight : undefined,
        className
      )}
      {...props}
    />
  );
}
