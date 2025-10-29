import type { ReactNode } from 'react';

interface NeuBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

export default function NeuBadge({
  children,
  variant = 'default',
}: NeuBadgeProps) {
  const variantClasses = {
    default: 'bg-surface text-text',
    accent: 'bg-gradient-to-r from-accent to-support text-white',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold neu-raised-min ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
