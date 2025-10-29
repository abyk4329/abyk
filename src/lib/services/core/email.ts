import { BRAND } from './branding';

export const EMAIL_PALETTE = {
  surface: '#f6f2ec',
  textPrimary: '#473b31',
  textBody: '#5e4934',
  accent: '#a88652',
  accentLight: '#d4bd96',
  shadowBase: 'rgba(55, 44, 35, 0.22)',
  shadowHighlight: 'rgba(255, 255, 255, 0.82)',
} as const;

export const EMAIL_GRADIENTS = {
  canvas: 'linear-gradient(140deg, #f8f4ef 0%, #f1e8dd 100%)',
  glassCard:
    'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(241,232,221,0.9) 100%)',
  glassCardCompact:
    'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(241,232,221,0.88) 100%)',
  codeContainer:
    'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(208,192,170,0.6) 100%)',
  panelHighlight:
    'linear-gradient(140deg, rgba(255,255,255,0.9) 0%, rgba(232,219,202,0.9) 100%)',
  primaryButton:
    'linear-gradient(145deg, #fdfaf5 0%, rgba(168,134,82,0.28) 100%)',
  secondaryButton:
    'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(226,213,195,0.85) 100%)',
} as const;

export const EMAIL_SHADOWS = {
  glassCard: '0 28px 48px rgba(55, 44, 35, 0.18)',
  glassCardCompact: '0 18px 32px rgba(55, 44, 35, 0.18)',
  codeContainer:
    'inset 4px 4px 12px rgba(55, 44, 35, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.95)',
  infoCard: '0 20px 32px rgba(55, 44, 35, 0.14)',
  primaryButton:
    '0 16px 28px rgba(168, 134, 82, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  secondaryButton:
    '0 12px 20px rgba(71, 59, 49, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.78)',
} as const;

type SocialLink = {
  href: string;
  title: string;
  icon?: string;
};

type GenerateBaseEmailOptions = {
  title: string;
  content: string;
  preheader?: string;
  customStyles?: string;
  socialLinks?: SocialLink[];
};

const BASE_EMAIL_STYLES = `
  :root { color-scheme: only light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background: ${EMAIL_GRADIENTS.canvas};
    font-family: 'Assistant', Arial, sans-serif;
    color: ${EMAIL_PALETTE.textBody};
  }
  .email-body {
    width: 100%;
    background: ${EMAIL_GRADIENTS.canvas};
    padding: 32px 12px;
  }
  .email-wrapper {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    border-spacing: 0;
  }
  .glass-card {
    background: ${EMAIL_GRADIENTS.glassCard};
    box-shadow: ${EMAIL_SHADOWS.glassCard};
    border-radius: 40px;
    padding: 48px 32px;
    border: 1px solid ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.6)};
  }
  .email-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .email-logo {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${EMAIL_PALETTE.accent};
    margin-bottom: 12px;
  }
  .email-preheader {
    display: none;
    visibility: hidden;
    opacity: 0;
    height: 0;
    width: 0;
    overflow: hidden;
  }
  .email-social {
    margin: 36px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  .email-social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background: ${EMAIL_GRADIENTS.secondaryButton};
    box-shadow: ${EMAIL_SHADOWS.secondaryButton};
    border: 1px solid ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.6)};
  }
  .email-footer {
    margin-top: 40px;
    text-align: center;
    font-size: 13px;
    line-height: 1.6;
    color: ${withOpacity('#473b31', 0.7)};
  }
  @media (max-width: 600px) {
    .glass-card {
      padding: 32px 20px;
      border-radius: 32px;
      background: ${EMAIL_GRADIENTS.glassCardCompact};
      box-shadow: ${EMAIL_SHADOWS.glassCardCompact};
    }
  }
`;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function withOpacity(hex: string, opacity: number): string {
  const sanitized = hex.replace('#', '');
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : sanitized;
  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const safeOpacity = Math.min(Math.max(opacity, 0), 1);
  return `rgba(${r}, ${g}, ${b}, ${safeOpacity.toFixed(3)})`;
}

export function generateBaseEmail({
  title,
  content,
  preheader,
  customStyles,
  socialLinks = [],
}: GenerateBaseEmailOptions): string {
  const socialHtml = socialLinks.length
    ? `<div class="email-social">${socialLinks
        .map((link) => {
          const icon = link.icon ?? escapeHtml(link.title);
          return `<a href="${link.href}" title="${escapeHtml(
            link.title
          )}" target="_blank" rel="noopener noreferrer">${icon}</a>`;
        })
        .join('')}</div>`
    : '';

  const combinedStyles = `${BASE_EMAIL_STYLES}\n${customStyles ?? ''}`;

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
${combinedStyles}
    </style>
  </head>
  <body class="email-body">
    ${
      preheader
        ? `<div class="email-preheader">${escapeHtml(preheader)}</div>`
        : ''
    }
    <table role="presentation" class="email-wrapper">
      <tr>
        <td>
          <table role="presentation" width="100%">
            <tr>
              <td>
                <div class="glass-card">
                  <header class="email-header">
                    <div class="email-logo">${escapeHtml(BRAND.shortName)}</div>
                    <div style="font-size:20px;font-weight:700;color:${
                      EMAIL_PALETTE.textPrimary
                    };">${escapeHtml(BRAND.appName)}</div>
                  </header>
                  <main class="email-content">
                    ${content}
                  </main>
                  ${socialHtml}
                  <footer class="email-footer">
                    © ${new Date().getFullYear()} ${escapeHtml(
    BRAND.appName
  )} · כל הזכויות שמורות
                  </footer>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
