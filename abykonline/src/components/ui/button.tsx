"use client"

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-normal tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7957A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        brand:
          "border border-transparent bg-[rgba(149,112,82,0.7)] text-white shadow-[0_24px_50px_-24px_rgba(149,112,82,0.7)] hover:bg-[rgba(149,112,82,0.85)] hover:shadow-[0_32px_70px_-28px_rgba(149,112,82,0.75)] active:scale-[0.98]",
        subtle:
          "border border-white/25 bg-white/12 text-[#5E4934] shadow-[0_20px_40px_-25px_rgba(94,73,52,0.55)] hover:bg-white/20 hover:shadow-[0_28px_55px_-28px_rgba(94,73,52,0.55)] active:scale-[0.99]",
      },
      size: {
        default: "min-h-[2.75rem] px-5 py-2.5",
        sm: "min-h-[2.25rem] px-3.5 py-1.5 text-sm",
        lg: "min-h-[3.25rem] px-7 py-3.5 text-lg",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };