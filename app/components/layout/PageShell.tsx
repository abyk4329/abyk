import { Children } from "react";
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import styles from "./PageShell.module.css";

type HeaderAlign = "center" | "start";
/**
 * Keep width map in sync with PageShell.module.css
 */
type MaxWidth = "sm" | "md" | "lg" | "xl" | "full";

type ContentSpacing = "default" | "tight";

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
  full: styles.shellMaxFull,
  lg: styles.shellMaxLg,
  md: styles.shellMaxMd,
  sm: styles.shellMaxSm,
  xl: styles.shellMaxXl,
};

export type PageShellBaseProps = {
  heading?: ReactNode;
  accent?: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  actions?: ReactNode;
  headerAlign?: HeaderAlign;
  maxWidth?: MaxWidth;
  contentSpacing?: ContentSpacing;
  contentClassName?: string;
  /**
   * Override horizontal/vertical padding via CSS vars.
   * Example: padX="0" (no side gutters), padY="2rem".
   */
  padX?: string;
  padY?: string;
};

export type PageShellProps<E extends ElementType = "section"> =
  PageShellBaseProps & {
    as?: E;
  } & Omit<ComponentPropsWithoutRef<E>, "as" | "className" | "style"> & {
      className?: string;
      style?: CSSProperties;
    };

export function PageShell<E extends ElementType = "section">({
  children,
  as,
  className,
  style,
  heading,
  accent,
  subtitle,
  leading,
  actions,
  headerAlign = "center",
  maxWidth = "xl",
  contentSpacing = "default",
  contentClassName,
  padX,
  padY,
  ...rest
}: PageShellProps<E>) {
  const Component = (as ?? "section") as ElementType;
  const childArray = Children.toArray(children);
  const isSingleChild = childArray.length === 1;

  const headerAlignmentClass =
    headerAlign === "start" ? styles.shellHeaderStart : undefined;
  const actionsAlignmentClass =
    headerAlign === "start" ? styles.shellActionsStart : undefined;
  const contentAlignmentClass =
    headerAlign === "start" ? styles.shellContentStart : undefined;
  const spacingClass =
    contentSpacing === "tight" ? styles.shellContentTight : undefined;

  const styleVars: CSSProperties = {
    ...(padX ? ({ ["--shell-pad-x" as any]: padX } as CSSProperties) : null),
    ...(padY ? ({ ["--shell-pad-y" as any]: padY } as CSSProperties) : null),
    ...style,
  };

  return (
    <Component
      className={cn(styles.shell, className)}
      data-header-align={headerAlign}
      data-content-spacing={contentSpacing}
      data-max-width={maxWidth}
      data-single-child={isSingleChild ? "true" : "false"}
      {...(rest as Record<string, unknown>)}
      style={styleVars}
    >
      <div className={cn(styles.shellInner, MAX_WIDTH_CLASS[maxWidth])}>
        {heading || subtitle || leading || actions ? (
          <header className={cn(styles.shellHeader, headerAlignmentClass)}>
            {leading ? (
              <div className={styles.shellLeading}>{leading}</div>
            ) : null}

            {heading ? (
              <h1 className={styles.shellTitle}>
                {heading}
                {accent ? (
                  <span className={styles.shellTitleAccent}> {accent}</span>
                ) : null}
              </h1>
            ) : null}

            {subtitle ? (
              <p className={styles.shellSubtitle}>{subtitle}</p>
            ) : null}

            {actions ? (
              <div className={cn(styles.shellActions, actionsAlignmentClass)}>
                {actions}
              </div>
            ) : null}
          </header>
        ) : null}

        <div
          className={cn(
            styles.shellContent,
            contentAlignmentClass,
            spacingClass,
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </Component>
  );
}

export default PageShell;
