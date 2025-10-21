import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react';
import { Children } from 'react';

import { cn } from '@/lib/utils';

type HeaderAlign = 'center' | 'start';
/**
 * Keep width map in sync with the utility classes in design/themes/layout-shell.css.
 */
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type ContentSpacing = 'default' | 'tight';

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
  full: 'shellMaxFull',
  lg: 'shellMaxLg',
  md: 'shellMaxMd',
  sm: 'shellMaxSm',
  xl: 'shellMaxXl',
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

export type PageShellProps<E extends ElementType = 'section'> =
  PageShellBaseProps & {
    as?: E;
  } & Omit<ComponentPropsWithoutRef<E>, 'as' | 'className' | 'style'> & {
      className?: string;
      style?: CSSProperties;
    };

export function PageShell<E extends ElementType = 'section'>({
  children,
  as,
  className,
  style,
  heading,
  accent,
  subtitle,
  leading,
  actions,
  headerAlign = 'center',
  maxWidth = 'xl',
  contentSpacing = 'default',
  contentClassName,
  padX,
  padY,
  ...rest
}: PageShellProps<E>) {
  const Component = (as ?? 'section') as ElementType;
  const childArray = Children.toArray(children);
  const isSingleChild = childArray.length === 1;

  const headerAlignmentClass =
    headerAlign === 'start' ? 'shellHeaderStart' : undefined;
  const actionsAlignmentClass =
    headerAlign === 'start' ? 'shellActionsStart' : undefined;
  const contentAlignmentClass =
    headerAlign === 'start' ? 'shellContentStart' : undefined;
  const spacingClass =
    contentSpacing === 'tight' ? 'shellContentTight' : undefined;

  const styleVars: CSSProperties = {
    ...(padX ? ({ ['--shell-pad-x' as any]: padX } as CSSProperties) : null),
    ...(padY ? ({ ['--shell-pad-y' as any]: padY } as CSSProperties) : null),
    ...style,
  };

  return (
    <Component
      className={cn('pageShell', className)}
      data-header-align={headerAlign}
      data-content-spacing={contentSpacing}
      data-max-width={maxWidth}
      data-single-child={isSingleChild ? 'true' : 'false'}
      {...(rest as Record<string, unknown>)}
      style={styleVars}
    >
      <div className={cn('shellInner', MAX_WIDTH_CLASS[maxWidth])}>
        {heading || subtitle || leading || actions ? (
          <header className={cn('shellHeader', headerAlignmentClass)}>
            {leading ? <div className="shellLeading">{leading}</div> : null}

            {heading ? (
              <h1 className="shellTitle">
                {heading}
                {accent ? (
                  <span className="shellTitleAccent"> {accent}</span>
                ) : null}
              </h1>
            ) : null}

            {subtitle ? <p className="shellSubtitle">{subtitle}</p> : null}

            {actions ? (
              <div className={cn('shellActions', actionsAlignmentClass)}>
                {actions}
              </div>
            ) : null}
          </header>
        ) : null}

        <div
          className={cn(
            'shellContent',
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
