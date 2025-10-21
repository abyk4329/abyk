'use client';

interface CodeInsetProps {
  code: string;
  size?: 'lg' | 'xl';
  className?: string;
}

export function CodeInset({ code, size = 'xl', className }: CodeInsetProps) {
  const rootClassName = ['wealthCodeInsetWrapper', className]
    .filter(Boolean)
    .join(' ');
  const innerClassName = [
    'wealthCodeInset',
    size === 'xl' ? 'wealthCodeInsetSizeXl' : 'wealthCodeInsetSizeLg',
  ].join(' ');

  return (
    <div className={rootClassName}>
      <div className={innerClassName}>
        <span className="wealthCodeInsetCode">{code}</span>
      </div>
    </div>
  );
}
