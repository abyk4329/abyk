import { HTMLAttributes, ReactNode, createElement } from "react";
import styles from "./NeuroCard.module.css";

const join = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type Variant = "main" | "secondary" | "inset" | "cta";

type AsElement = "section" | "article" | "div";

interface NeuroCardProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  as?: AsElement;
  /** Visual treatment pulled from the neumorphic system. Defaults to `main`. */
  variant?: Variant;
  /** Apply the hero-card width treatment used by the primary flow screens. */
  hero?: boolean;
  /** Optional hero group to control vertical offset via global styles. */
  heroGroup?: "a" | "b";
  /** Adds a light lift interaction on hover/focus. */
  interactive?: boolean;
  children: ReactNode;
}

const variantMap: Record<Variant, string[]> = {
  main: ["neuro-card-main", styles.main],
  secondary: ["neuro-card-secondary", styles.secondary],
  inset: ["neuro-card-inset", styles.inset],
  cta: ["neuro-card-main", styles.cta],
};

export function NeuroCard({
  as = "section",
  variant = "main",
  hero = false,
  heroGroup,
  interactive = false,
  className,
  children,
  ...rest
}: NeuroCardProps) {
  const variantClasses = variantMap[variant] ?? variantMap.main;
  const combined = join(
    styles.root,
    ...variantClasses,
    hero ? styles.hero : undefined,
    hero ? "hero-card" : undefined,
    interactive ? styles.interactive : undefined,
    className
  );

  const dataProps = heroGroup ? { "data-hero-group": heroGroup } : undefined;
  const props = { className: combined, ...(dataProps ?? {}), ...rest };

  return createElement(as, props, children);
}

interface CardStackProps {
  children: ReactNode;
  className?: string;
  dense?: boolean;
}

export function CardStack({ children, className, dense = false }: CardStackProps) {
  return (
    <div className={join(styles.stack, dense ? styles.stackTight : undefined, className)}>
      {children}
    </div>
  );
}
