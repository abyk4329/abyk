"use client"

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-normal tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C3AE]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        brand:
          "border border-transparent bg-[#BFA38F] text-white shadow-[0_18px_38px_-20px_rgba(135,103,79,0.6)] backdrop-blur-sm hover:bg-[#AA8C74] hover:shadow-[0_22px_48px_-18px_rgba(135,103,79,0.72)] active:scale-[0.97] disabled:bg-[#D8C8BC] disabled:text-white/80 disabled:shadow-none",
        subtle:
          "border border-[#FAFAFA]/40 bg-[#FAFAFA] text-[#8B4513] shadow-sm hover:bg-white hover:shadow-md active:scale-[0.99]",
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