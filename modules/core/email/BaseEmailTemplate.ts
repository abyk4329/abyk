/**
 * Base Email Template
 * Provides the HTML structure for all emails with header, footer, and content slot
 */

import { BRAND } from "../branding";
import { getBaseEmailStyles } from "./styles";

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
        href: "https://wa.me/?text=",
        title: "שיתוף בווטסאפ",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    },
    {
        href: "https://www.instagram.com/awakening_byksenia/",
        title: "Instagram",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    },
    {
        href: "https://www.tiktok.com/@awakening_byksenia",
        title: "TikTok",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    },
    {
        href: "mailto:?subject=",
        title: "שיתוף במייל",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    },
];

const INLINE_STYLES = {
    body: "margin:0;padding:0;background-color:#f8f6f2;direction:rtl;text-align:center;font-family:'Assistant', Arial, sans-serif;",
    container: "width:100%;max-width:600px;margin:0 auto;padding:0 24px;background-color:#f8f6f2;",
    header: "background-color:#f8f6f2;padding:24px 20px;border:none;box-shadow:5px 5px 10px #d1cfcc,-5px -5px 10px #ffffff;",
    headerTitle: "font-family:'Assistant', Arial, sans-serif;font-size:20px;font-weight:700;letter-spacing:0.15em;color:#5e4934;margin-bottom:4px;text-transform:uppercase;text-align:center;text-shadow:1px 1px 2px rgba(255,255,255,0.9);",
    headerSubtitle: "font-family:'Assistant', Arial, sans-serif;font-size:11px;font-weight:500;letter-spacing:0.13em;color:#9f8572;text-transform:uppercase;text-align:center;",
    mainContent: "padding:48px 20px;width:100%;box-sizing:border-box;",
    glassCard: "background:#f8f6f2;border:none;border-radius:32px;padding:40px 24px;width:100%;box-sizing:border-box;box-shadow:15px 15px 30px #d1cfcc,-15px -15px 30px #ffffff;margin:0 auto;",
    shareSection: "margin-top:32px;padding-top:24px;border-top:1px solid rgba(209,207,204,0.5);",
    socialLinks: "display:flex;justify-content:center;gap:16px;flex-wrap:wrap;",
    socialButton: "display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;background:#f8f6f2;border:none;text-decoration:none;box-shadow:8px 8px 16px #d1cfcc,-8px -8px 16px #ffffff;margin:0 8px 12px;",
    footer: "background-color:#f8f6f2;padding:32px 20px;border:none;box-shadow:0 -5px 10px #d1cfcc,0 5px 10px #ffffff;",
    footerText: "font-family:'Assistant', Arial, sans-serif;font-size:14px;font-weight:400;color:#87674F;line-height:1.6;margin-bottom:12px;text-align:center;",
    footerSecondaryText: "font-family:'Assistant', Arial, sans-serif;font-size:12px;font-weight:400;color:#9f8572;line-height:1.6;margin-top:16px;text-align:center;",
    footerLink: "color:#87674F;text-decoration:none;border-bottom:1px solid rgba(135,103,79,0.3);",
    copyright: "display:inline-block;background:#f8f6f2;box-shadow:inset 5px 5px 10px #d1cfcc,inset -5px -5px 10px #ffffff;padding:8px 24px;border-radius:24px;border:none;",
    copyrightText: "font-family:'Assistant', Arial, sans-serif;font-size:11px;font-weight:700;color:#5e4934;letter-spacing:0.15em;text-transform:uppercase;text-shadow:1px 1px 2px rgba(255,255,255,0.9);margin:0;",
};

/**
 * Generates the social links section HTML
 */
function generateSocialLinks(links: SocialLink[]): string {
    const socialButtons = links
        .map(
            (link) => `
        <a href="${link.href}" class="social-button" title="${link.title}" style="${INLINE_STYLES.socialButton}">
      ${link.icon}
    </a>
  `
        )
        .join("");

    return `
        <div class="share-section" style="${INLINE_STYLES.shareSection}">
            <div class="social-links" style="${INLINE_STYLES.socialLinks}">
        ${socialButtons}
      </div>
    </div>
  `;
}

/**
 * Generates complete email HTML with base template structure
 */
export function generateBaseEmail(options: BaseEmailOptions): string {
    const { title, customStyles = "", content, socialLinks, preheader } = options;

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
    ${preheader ? `<div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ""}
    
    <div class="email-container" style="${INLINE_STYLES.container}">
        <!-- Header -->
        <div class="header" style="${INLINE_STYLES.header}">
            <div class="header-title" style="${INLINE_STYLES.headerTitle}">${BRAND.appName.toUpperCase()}</div>
            <div class="header-subtitle" style="${INLINE_STYLES.headerSubtitle}">YOUR PERSONAL SPACE FOR GROWTH</div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content" style="${INLINE_STYLES.mainContent}">
            <div class="glass-card" style="${INLINE_STYLES.glassCard}">
                ${content}
                
                <!-- Social Links -->
                ${socialLinksHtml}
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer" style="${INLINE_STYLES.footer}">
            <p class="footer-text" style="${INLINE_STYLES.footerText}">
                <a href="${BRAND.siteUrl}/#/terms-privacy" class="footer-link" style="${INLINE_STYLES.footerLink}">תנאי שימוש ומדיניות פרטיות</a>
            </p>
            <p class="footer-text" style="${INLINE_STYLES.footerSecondaryText}">
                מייל זה נשלח אליך כי ביצעת רכישה באתר שלנו.<br>
                לשאלות ובירורים: ${BRAND.ownerEmail}
            </p>
            
            <!-- Copyright -->
            <div style="text-align: center; margin-top: 24px;">
                <div class="footer-copyright" style="${INLINE_STYLES.copyright}">
                    <p class="footer-copyright-text" style="${INLINE_STYLES.copyrightText}">
                        ${BRAND.copyrightHolder} © ${BRAND.year}
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}
