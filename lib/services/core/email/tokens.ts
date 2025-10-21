const normalizeHex = (hex: string) => {
  const value = hex.replace('#', '').trim();
  if (value.length === 3) {
    return value
      .split('')
      .map((char) => char + char)
      .join('');
  }
  return value;
};

export const withOpacity = (hexColor: string, alpha: number): string => {
  const hex = normalizeHex(hexColor);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const EMAIL_PALETTE = {
  surface: '#f8f6f2',
  surfaceAlt: '#f8f4f0',
  accent: '#87674f',
  accentStrong: '#5e4934',
  textPrimary: '#5e4934',
  textSecondary: '#9f8572',
  textBody: '#473b31',
  shadowSoft: '#d1cfcc',
  shadowHighlight: '#ffffff',
  warmShadow: '#d3c6bd',
} as const;

const layeredShadow = (...layers: string[]) => layers.join(', ');

const dualShadow = (offset: number, blur: number) =>
  `${offset}px ${offset}px ${blur}px ${EMAIL_PALETTE.shadowSoft}, -${offset}px -${offset}px ${blur}px ${EMAIL_PALETTE.shadowHighlight}`;

const insetShadow = (offset: number, blur: number) =>
  `inset ${offset}px ${offset}px ${blur}px ${EMAIL_PALETTE.shadowSoft}, inset -${offset}px -${offset}px ${blur}px ${EMAIL_PALETTE.shadowHighlight}`;

const verticalShadow = (offset: number, blur: number) =>
  `0 -${offset}px ${blur}px ${EMAIL_PALETTE.shadowSoft}, 0 ${offset}px ${blur}px ${EMAIL_PALETTE.shadowHighlight}`;

export const EMAIL_SHADOWS = {
  header: dualShadow(5, 10),
  card: dualShadow(15, 30),
  buttonRaisedLg: dualShadow(8, 16),
  buttonRaisedMd: dualShadow(5, 10),
  insetLg: insetShadow(8, 16),
  insetMd: insetShadow(5, 10),
  footer: verticalShadow(5, 10),
  copyrightInset: insetShadow(5, 10),
  accentInset: `inset 4px 4px 10px ${withOpacity(
    EMAIL_PALETTE.textSecondary,
    0.12
  )}, inset -4px -4px 10px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.85)}`,
  glassCard: layeredShadow(
    `18px 18px 36px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.18)}`,
    `-18px -18px 36px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.95)}`,
    `inset 1px 1px 3px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.5)}`
  ),
  glassCardCompact: layeredShadow(
    `12px 12px 24px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.16)}`,
    `-12px -12px 24px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.92)}`,
    `inset 1px 1px 2px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.4)}`
  ),
  codeContainer: layeredShadow(
    `inset 10px 10px 20px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.2)}`,
    `inset -10px -10px 20px ${withOpacity(
      EMAIL_PALETTE.shadowHighlight,
      0.88
    )}`,
    `2px 2px 4px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.08)}`
  ),
  infoCard: layeredShadow(
    `inset 4px 4px 10px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.12)}`,
    `inset -4px -4px 10px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.85)}`,
    `0 0 0 1px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.4)}`
  ),
  primaryButton: layeredShadow(
    `8px 8px 18px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.16)}`,
    `-8px -8px 18px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.92)}`,
    `inset 1px 1px 2px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.5)}`
  ),
  secondaryButton: layeredShadow(
    `6px 6px 14px ${withOpacity(EMAIL_PALETTE.textSecondary, 0.14)}`,
    `-6px -6px 14px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.88)}`,
    `inset 1px 1px 2px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.4)}`
  ),
} as const;

export const EMAIL_GRADIENTS = {
  divider: `linear-gradient(90deg, ${withOpacity(
    EMAIL_PALETTE.accent,
    0
  )} 0%, ${withOpacity(EMAIL_PALETTE.accent, 0.25)} 50%, ${withOpacity(
    EMAIL_PALETTE.accent,
    0
  )} 100%)`,
  glassCard: `linear-gradient(145deg, ${EMAIL_PALETTE.shadowHighlight}, ${EMAIL_PALETTE.surfaceAlt})`,
  glassCardCompact: `linear-gradient(145deg, ${EMAIL_PALETTE.shadowHighlight}, ${EMAIL_PALETTE.surface})`,
  codeContainer: `linear-gradient(145deg, ${EMAIL_PALETTE.surfaceAlt}, ${EMAIL_PALETTE.shadowHighlight})`,
  primaryButton: `linear-gradient(145deg, ${EMAIL_PALETTE.shadowHighlight}, ${EMAIL_PALETTE.surface})`,
  secondaryButton: `linear-gradient(145deg, ${withOpacity(
    EMAIL_PALETTE.surface,
    0.95
  )}, ${EMAIL_PALETTE.surfaceAlt})`,
  panelHighlight: `linear-gradient(150deg, ${withOpacity(
    EMAIL_PALETTE.shadowHighlight,
    0.75
  )}, ${withOpacity(EMAIL_PALETTE.surfaceAlt, 0.65)})`,
} as const;
