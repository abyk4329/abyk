'use client';

import styles from './CodeInset.module.css';

interface CodeInsetProps {
  code: string;
  size?: 'lg' | 'xl';
  className?: string;
}

export function CodeInset({ code, size = 'xl', className }: CodeInsetProps) {
  const rootClassName = [styles.codeInsetWrapper, className]
    .filter(Boolean)
    .join(' ');
  const innerClassName = [
    styles.codeInsetInner,
    size === 'xl' ? styles.sizeXl : styles.sizeLg,
  ].join(' ');

  return (
    <div className={rootClassName}>
      <div className={innerClassName}>
        <span className={styles.code}>{code}</span>
      </div>
    </div>
  );
}
