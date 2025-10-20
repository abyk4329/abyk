import type { HTMLAttributes } from "react";

import "@/design/index.css";
import { cn } from "@/lib/utils";

// Dark mode is managed globally via the `.dark` class on <html>.
// This component no longer sets a per-card theme attribute.

export type CardVariant = "elevated" | "inset" | "flat";
export type CardRadius = "lg" | "md";
export type CardPadding = "lg" | "md" | "none";
export type CardElement = "div" | "section" | "article" | "aside";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: CardRadius;
  padding?: CardPadding;
  as?: CardElement;
}

const VARIANT_CLASS_MAP: Record<CardVariant, string[]> = {
  elevated: ["neuCard"],
  inset: ["neuCard", "neuCard--inset"],
  flat: ["neuCard", "neuCard--flat"],
};

const RADIUS_CLASS_MAP: Record<CardRadius, string | undefined> = {
  lg: undefined,
  md: "neuCard--tight",
};

const PADDING_CLASS_MAP: Record<CardPadding, string | undefined> = {
  lg: "neuCard--pad-lg",
  md: "neuCard--pad-md",
  none: undefined,
};

export function Card({
  variant = "elevated",
  radius = "lg",
  padding = "lg",
  as = "div",
  className,
  ...props
}: CardProps) {
  const Component = as;
  const variantClasses = VARIANT_CLASS_MAP[variant];
  const radiusClass = RADIUS_CLASS_MAP[radius];
  const paddingClass = PADDING_CLASS_MAP[padding];

  return (
    <Component
      data-variant={variant}
      data-radius={radius}
      data-padding={padding}
      className={cn(...variantClasses, radiusClass, paddingClass, className)}
      {...props}
    />
  );
}

export default Card;
