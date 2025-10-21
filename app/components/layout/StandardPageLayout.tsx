'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { SocialLinks } from './SocialLinks';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
  sm: 'max-w-[480px]',
  md: 'max-w-[640px]',
  lg: 'max-w-[900px]',
  xl: 'max-w-[1200px]',
  full: 'max-w-full',
};

interface StandardPageLayoutProps {
  children: ReactNode;
  showSocial?: boolean;
  maxWidth?: MaxWidth;
  className?: string;
  contentClassName?: string;
}

export function StandardPageLayout({
  children,
  showSocial = false,
  maxWidth = 'md',
  className,
  contentClassName,
}: StandardPageLayoutProps) {
  const containerClassName = cn(
    'hero-shell',
    'standardPageContainer',
    className
  );

  const innerClassName = cn(
    'w-full',
    'standardPageContent',
    MAX_WIDTH_CLASS[maxWidth],
    contentClassName
  );

  return (
    <div className={containerClassName}>
      <div className={innerClassName}>
        {children}
        {showSocial ? <SocialLinks /> : null}
      </div>
    </div>
  );
}
