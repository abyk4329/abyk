import type { ButtonHTMLAttributes } from 'react';

interface NeuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export default function NeuButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: NeuButtonProps) {
  const variantClasses = {
    primary: 'btn-secondary',
    secondary: 'btn-ghost',
    accent: 'btn-primary',
  };

  return (
    <button
      {...props}
      className={`btn ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
