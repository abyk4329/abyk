import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

/**
 * Responsive page wrapper with consistent horizontal/vertical paddings and max-widths.
 * Keeps the layout predictable across pages and avoids inline spacing.
 */

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "3xl": "max-w-[1536px]",
  full: "max-w-full",
};

const BASE_CONTAINER = "mx-auto flex w-full flex-col";
const PAD_X = "px-5 sm:px-8 lg:px-12"; // horizontal page gutters
const PAD_Y = "py-6 sm:py-8 lg:py-12"; // vertical rhythm (optional per page)

type BaseProps = {
  children: ReactNode;
  className?: string;
  /** container max-width */
  maxWidth?: MaxWidth;
  /** apply horizontal paddings */
  paddedX?: boolean;
  /** apply vertical paddings */
  paddedY?: boolean;
  /** center children horizontally (flex items-center) */
  center?: boolean;
  /** take full viewport height (min-h-screen) */
  fullHeight?: boolean;
};

export type PageLayoutProps<E extends ElementType = "section"> = BaseProps & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className">;

export function PageLayout<E extends ElementType = "section">({
  children,
  as,
  className,
  maxWidth = "xl",
  paddedX = true,
  paddedY = false,
  center = false,
  fullHeight = false,
  ...rest
}: PageLayoutProps<E>) {
  const Component = (as ?? "section") as ElementType;
  const maxWidthClass = MAX_WIDTH_CLASS[maxWidth] ?? MAX_WIDTH_CLASS.lg;

  const classes = [
    BASE_CONTAINER,
    maxWidthClass,
    paddedX ? PAD_X : "",
    paddedY ? PAD_Y : "",
    center ? "items-center" : "",
    fullHeight ? "min-h-screen" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      data-max-width={maxWidth}
      data-padded-x={paddedX ? "true" : "false"}
      data-padded-y={paddedY ? "true" : "false"}
      data-center={center ? "true" : "false"}
      data-full-height={fullHeight ? "true" : "false"}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Component>
  );
}

export default PageLayout;
