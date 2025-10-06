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

/**
 * Generates the social links section HTML
 */
function generateSocialLinks(links: SocialLink[]): string {
    const socialButtons = links
        .map(
            (link) => `
    <a href="${link.href}" class="social-button" title="${link.title}">
      ${link.icon}
    </a>
  `
        )
        .join("");

    return `
    <div class="share-section">
      <div class="social-links">
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
<body>
    ${preheader ? `<div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ""}
    
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="header-title">${BRAND.appName.toUpperCase()}</div>
            <div class="header-subtitle">YOUR PERSONAL SPACE FOR GROWTH</div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <div class="glass-card">
                ${content}
                
                <!-- Social Links -->
                ${socialLinksHtml}
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text" style="text-align: center;">
                <a href="${BRAND.siteUrl}/#/terms-privacy" class="footer-link">תנאי שימוש ומדיניות פרטיות</a>
            </p>
            <p class="footer-text" style="margin-top: 16px; font-size: 12px; color: #9f8572; text-align: center;">
                מייל זה נשלח אליך כי ביצעת רכישה באתר שלנו.<br>
                לשאלות ובירורים: ${BRAND.ownerEmail}
            </p>
            
            <!-- Copyright -->
            <div style="text-align: center; margin-top: 24px;">
                <div class="footer-copyright">
                    <p class="footer-copyright-text">
                        ${BRAND.copyrightHolder} © ${BRAND.year}
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}
