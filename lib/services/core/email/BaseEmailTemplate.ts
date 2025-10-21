/**
 * Base Email Template
 * Provides the HTML structure for all emails with header, footer, and content slot
 */

import { BRAND } from '../branding';
import { getBaseEmailStyles } from './styles';
import { EMAIL_PALETTE, EMAIL_SHADOWS, withOpacity } from './tokens';

export interface SocialLink {
  href: string;
  title: string;
  icon: string;
}

export interface BaseEmailOptions {
  /** Email title (for <title> tag) */
  title: string;
  /** Additional custom styles specific to this email */
  customStyles?: string;
  /** Main content HTML to inject into the email body */
  content: string;
  /** Optional: Override default social links */
  socialLinks?: SocialLink[];
  /** Optional: Add custom preheader text */
  preheader?: string;
}

/**
 * Default social media links for all emails
 */
export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://wa.me/?text=',
    title: 'שיתוף בווטסאפ',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    href: 'https://www.instagram.com/awakening.by.ksenia/',
    title: 'Instagram',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    href: 'https://www.tiktok.com/@awakening.by.ksenia',
    title: 'TikTok',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    href: 'mailto:?subject=',
    title: 'שיתוף במייל',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
];

const INLINE_STYLES = {
  body: `margin:0;padding:0;background-color:${EMAIL_PALETTE.surface};direction:rtl;text-align:center;font-family:'Assistant', Arial, sans-serif;`,
  outerTable: `width:100%;border-collapse:collapse;background-color:${EMAIL_PALETTE.surface};`,
  outerCell: 'padding:0;',
  innerTable: `width:100%;max-width:600px;border-collapse:collapse;background-color:${EMAIL_PALETTE.surface};margin:0 auto;`,
  header: `background-color:${EMAIL_PALETTE.surface};padding:24px 20px;border:none;box-shadow:${EMAIL_SHADOWS.header};`,
  headerTitle: `font-family:'Assistant', Arial, sans-serif;font-size:20px;font-weight:700;letter-spacing:0.15em;color:${
    EMAIL_PALETTE.textPrimary
  };margin-bottom:4px;text-transform:uppercase;text-align:center;text-shadow:1px 1px 2px ${withOpacity(
    EMAIL_PALETTE.shadowHighlight,
    0.9
  )};`,
  headerSubtitle: `font-family:'Assistant', Arial, sans-serif;font-size:11px;font-weight:500;letter-spacing:0.13em;color:${EMAIL_PALETTE.textSecondary};text-transform:uppercase;text-align:center;`,
  mainContentCell: 'padding:32px 0 0 0;',
  glassCard: `background:${EMAIL_PALETTE.surface};border:none;border-radius:32px;padding:40px 24px;width:100%;box-sizing:border-box;box-shadow:${EMAIL_SHADOWS.card};margin:0 auto;`,
  shareSection: `margin-top:32px;padding-top:24px;border-top:1px solid ${withOpacity(
    EMAIL_PALETTE.shadowSoft,
    0.5
  )};`,
  socialButton: `display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;background:${EMAIL_PALETTE.surface};border:none;text-decoration:none;box-shadow:${EMAIL_SHADOWS.buttonRaisedLg};margin:0 8px 12px;`,
  footer: `background-color:${EMAIL_PALETTE.surface};padding:32px 20px;border:none;box-shadow:${EMAIL_SHADOWS.footer};`,
  footerText: `font-family:'Assistant', Arial, sans-serif;font-size:14px;font-weight:400;color:${EMAIL_PALETTE.accent};line-height:1.6;margin-bottom:12px;text-align:center;`,
  footerSecondaryText: `font-family:'Assistant', Arial, sans-serif;font-size:12px;font-weight:400;color:${EMAIL_PALETTE.textSecondary};line-height:1.6;margin-top:16px;text-align:center;`,
  footerLink: `color:${
    EMAIL_PALETTE.accent
  };text-decoration:none;border-bottom:1px solid ${withOpacity(
    EMAIL_PALETTE.accent,
    0.3
  )};`,
  copyright: `display:inline-block;background:${EMAIL_PALETTE.surface};box-shadow:${EMAIL_SHADOWS.copyrightInset};padding:8px 24px;border-radius:24px;border:none;`,
  copyrightText: `font-family:'Assistant', Arial, sans-serif;font-size:11px;font-weight:700;color:${
    EMAIL_PALETTE.textPrimary
  };letter-spacing:0.15em;text-transform:uppercase;text-shadow:1px 1px 2px ${withOpacity(
    EMAIL_PALETTE.shadowHighlight,
    0.9
  )};margin:0;`,
};

/**
 * Generates the social links section HTML
 */
function generateSocialLinks(links: SocialLink[]): string {
  const socialButtons = links
    .map(
      (link) => `
                <td align="center" style="padding:0 8px 12px;">
                    <a href="${link.href}" class="social-button" title="${link.title}" style="${INLINE_STYLES.socialButton}">
                        ${link.icon}
                    </a>
                </td>
            `
    )
    .join('');

  return `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${INLINE_STYLES.shareSection}">
                <tr>
                    <td align="center">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                            <tr>
                                ${socialButtons}
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
}

/**
 * Generates complete email HTML with base template structure
 */
export function generateBaseEmail(options: BaseEmailOptions): string {
  const { title, customStyles = '', content, socialLinks, preheader } = options;

  const socialLinksHtml = socialLinks
    ? generateSocialLinks(socialLinks)
    : generateSocialLinks(DEFAULT_SOCIAL_LINKS);

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        ${getBaseEmailStyles()}
        ${customStyles}
    </style>
</head>
<body style="${INLINE_STYLES.body}">
    ${
      preheader
        ? `<div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>`
        : ''
    }
    
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${
          INLINE_STYLES.outerTable
        }">
            <tr>
                <td align="center" style="${INLINE_STYLES.outerCell}">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${
                      INLINE_STYLES.innerTable
                    }">
                        <tr>
                            <td style="${INLINE_STYLES.header}" align="center">
                                <div class="header-title" style="${
                                  INLINE_STYLES.headerTitle
                                }">${BRAND.appName.toUpperCase()}</div>
                                <div class="header-subtitle" style="${
                                  INLINE_STYLES.headerSubtitle
                                }">YOUR PERSONAL SPACE FOR GROWTH</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="${
                              INLINE_STYLES.mainContentCell
                            }" align="center">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <td style="${
                                          INLINE_STYLES.glassCard
                                        }" align="center">
                                            ${content}
                                            ${socialLinksHtml}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="${INLINE_STYLES.footer}" align="center">
                                <p class="footer-text" style="${
                                  INLINE_STYLES.footerText
                                }">
                                    <a href="${
                                      BRAND.siteUrl
                                    }/#/terms-privacy" class="footer-link" style="${
    INLINE_STYLES.footerLink
  }">תנאי שימוש ומדיניות פרטיות</a>
                                </p>
                                <p class="footer-text" style="${
                                  INLINE_STYLES.footerSecondaryText
                                }">
                                    מייל זה נשלח אליך כי ביצעת רכישה באתר שלנו.<br>
                                    לשאלות ובירורים: ${BRAND.ownerEmail}
                                </p>
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto 0;">
                                    <tr>
                                        <td style="${INLINE_STYLES.copyright}">
                                            <p class="footer-copyright-text" style="${
                                              INLINE_STYLES.copyrightText
                                            }">
                                                ${BRAND.copyrightHolder} © ${
    BRAND.year
  }
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
</body>
</html>`;
}
