import type { ReactNode } from 'react';

interface NeuCardProps {
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'styled';
  width?: string;
  height?: string;
}

export default function NeuCard({
  children,
  className = '',
  hover = true,
  variant = 'default',
  width = '190px',
  height = '254px',
}: NeuCardProps) {
  if (variant === 'styled') {
    return (
      <div
        className={`styled-card ${className}`}
        style={{
          width,
          height,
          borderRadius: '30px',
          background: '#e0e0e0',
          boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
          transition: 'all 0.3s ease',
        }}
      />
    );
  }

  return (
    <div
      className={`neu-raised-min rounded-xl p-6 ${
        hover ? 'hover:shadow-neu-inset transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
