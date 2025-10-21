/**
 * Core Email Styles
 * Shared styles for all email templates in the application
 * Uses neumorphism design system matching the website and PDF aesthetics
 */

import {
  EMAIL_GRADIENTS,
  EMAIL_PALETTE,
  EMAIL_SHADOWS,
  withOpacity,
} from './tokens';

export const EMAIL_FONTS = `
  /* Gmail strips @import rules; rely on system fallbacks for maximum compatibility. */
`;

export const EMAIL_BASE_STYLES = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  td {
    vertical-align: top;
  }
  
  body {
    font-family: 'Assistant', sans-serif;
    background-color: ${EMAIL_PALETTE.surface};
    direction: rtl;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  
  .email-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 24px;
    background-color: ${EMAIL_PALETTE.surface};
  }

  a {
    color: ${EMAIL_PALETTE.accent};
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
  }

  a:hover, a:focus-visible {
    color: ${EMAIL_PALETTE.accentStrong};
    text-decoration-color: ${EMAIL_PALETTE.accentStrong};
  }

  hr.email-divider {
    border: 0;
    height: 1px;
    background: ${EMAIL_GRADIENTS.divider};
    margin: 32px auto;
    width: 82%;
  }
`;

export const EMAIL_HEADER_STYLES = `
  .header {
    background-color: ${EMAIL_PALETTE.surface};
    padding: 24px 20px;
    border: none;
    box-shadow: ${EMAIL_SHADOWS.header};
  }
  
  .header-title {
    font-family: 'Assistant', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: ${EMAIL_PALETTE.textPrimary};
    margin-bottom: 4px;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 1px 1px 2px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.9)};
  }
  
  .header-subtitle {
    font-family: 'Assistant', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.13em;
    color: ${EMAIL_PALETTE.textSecondary};
    text-transform: uppercase;
    text-align: center;
  }
`;

export const EMAIL_CONTENT_STYLES = `
  .main-content {
    padding: 48px 20px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .glass-card {
    background: ${EMAIL_PALETTE.surface};
    border: none;
    border-radius: 32px;
    padding: 40px 24px;
    width: 100%;
    box-sizing: border-box;
    box-shadow: ${EMAIL_SHADOWS.card};
    margin: 0 auto;
  }
`;

export const EMAIL_BUTTON_STYLES = `
  .buttons-container {
    display: block;
    margin-bottom: 32px;
    padding: 0 16px;
  }

  .buttons-container > a,
  .buttons-container > .button {
    display: block;
  }

  .button {
    display: inline-block;
    text-decoration: none;
    font-family: 'Assistant', sans-serif;
    font-size: 18px;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 50px;
    transition: all 0.2s ease;
    text-align: center;
    border: none;
  }
  
  .button-primary {
    background: ${EMAIL_PALETTE.surface};
    color: ${EMAIL_PALETTE.textPrimary};
    box-shadow: ${EMAIL_SHADOWS.buttonRaisedLg};
  }
  
  .button-primary:hover {
    box-shadow: ${EMAIL_SHADOWS.insetLg};
  }
  
  .button-secondary {
    background: ${EMAIL_PALETTE.surface};
    color: ${EMAIL_PALETTE.textPrimary};
    box-shadow: ${EMAIL_SHADOWS.buttonRaisedMd};
  }
  
  .button-secondary:hover {
    box-shadow: ${EMAIL_SHADOWS.insetMd};
  }
`;

export const EMAIL_SOCIAL_STYLES = `
  .share-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid ${withOpacity(EMAIL_PALETTE.shadowSoft, 0.5)};
  }

  .social-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: ${EMAIL_PALETTE.surface};
    border: none;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: ${EMAIL_SHADOWS.buttonRaisedLg};
  }
  
  .social-button:hover {
    box-shadow: ${EMAIL_SHADOWS.insetLg};
  }
`;

export const EMAIL_FOOTER_STYLES = `
  .footer {
    background-color: ${EMAIL_PALETTE.surface};
    padding: 32px 20px;
    border: none;
    box-shadow: ${EMAIL_SHADOWS.footer};
  }
  
  .footer-text {
    font-family: 'Assistant', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: ${EMAIL_PALETTE.accent};
    line-height: 1.6;
    margin-bottom: 12px;
    text-align: center;
  }
  
  .footer-link {
    color: ${EMAIL_PALETTE.accent};
    text-decoration: none;
    border-bottom: 1px solid ${withOpacity(EMAIL_PALETTE.accent, 0.3)};
  }
  
  .footer-link:hover {
    color: ${EMAIL_PALETTE.accentStrong};
    border-bottom-color: ${EMAIL_PALETTE.accentStrong};
  }
  
  .footer-copyright {
    display: inline-block;
    background: ${EMAIL_PALETTE.surface};
    box-shadow: ${EMAIL_SHADOWS.copyrightInset};
    padding: 8px 24px;
    border-radius: 24px;
    border: none;
  }
  
  .footer-copyright-text {
    font-family: 'Assistant', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: ${EMAIL_PALETTE.textPrimary};
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px ${withOpacity(EMAIL_PALETTE.shadowHighlight, 0.9)};
    margin: 0;
  }
`;

export const EMAIL_RESPONSIVE_STYLES = `
  @media (max-width: 600px) {
    body {
      padding: 0 !important;
    }

    .email-container {
      padding: 0 16px !important;
    }

    .header {
      padding: 20px 16px !important;
    }

    .header-title {
      font-size: 18px !important;
      letter-spacing: 0.12em !important;
    }

    .header-subtitle {
      font-size: 10px !important;
      letter-spacing: 0.11em !important;
    }

    .main-content {
      padding: 32px 12px !important;
    }

    .glass-card {
      padding: 28px 16px !important;
      border-radius: 28px !important;
    }

    .buttons-container {
      padding: 0 !important;
      margin-bottom: 28px !important;
    }

    .buttons-container > a,
      box-shadow: ${EMAIL_SHADOWS.buttonRaisedMd} !important;
      font-size: 16px !important;
      padding: 14px 18px !important;
    }
      box-shadow: ${EMAIL_SHADOWS.insetMd} !important;
    .button {
      font-size: 16px;
      padding: 14px 20px;
    }
    
    .social-button {
      width: 48px;
      height: 48px;
    }
    
    .footer-copyright {
      padding: 6px 16px;
    }
    
    .footer-copyright-text {
      font-size: 10px;
    }
  }

  @media (max-width: 420px) {
    .email-container {
      padding: 0 12px !important;
    }

    .glass-card {
      padding: 24px 12px !important;
      border-radius: 24px !important;
    }

    .buttons-container > a,
    .buttons-container > .button {
      font-size: 15px !important;
      padding: 12px 16px !important;
      line-height: 1.4 !important;
    }
  }
`;

/**
 * Combines all base email styles
 */
export function getBaseEmailStyles(): string {
  return `
    ${EMAIL_FONTS}
    ${EMAIL_BASE_STYLES}
    ${EMAIL_HEADER_STYLES}
    ${EMAIL_CONTENT_STYLES}
    ${EMAIL_BUTTON_STYLES}
    ${EMAIL_SOCIAL_STYLES}
    ${EMAIL_FOOTER_STYLES}
    ${EMAIL_RESPONSIVE_STYLES}
  `;
}
