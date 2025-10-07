/**
 * Core Email Styles
 * Shared styles for all email templates in the application
 * Uses neumorphism design system matching the website and PDF aesthetics
 */

export const EMAIL_FONTS = `
  /* Gmail strips @import rules; rely on system fallbacks for maximum compatibility. */
`;

export const EMAIL_BASE_STYLES = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Assistant', sans-serif;
    background-color: #f8f6f2;
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
    background-color: #f8f6f2;
  }

  a {
    color: #87674F;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
  }

  a:hover, a:focus-visible {
    color: #5e4934;
    text-decoration-color: #5e4934;
  }

  hr.email-divider {
    border: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(135,103,79,0) 0%, rgba(135,103,79,0.25) 50%, rgba(135,103,79,0) 100%);
    margin: 32px auto;
    width: 82%;
  }
`;

export const EMAIL_HEADER_STYLES = `
  .header {
    background-color: #f8f6f2;
    padding: 24px 20px;
    border: none;
    box-shadow: 5px 5px 10px #d1cfcc, -5px -5px 10px #ffffff;
  }
  
  .header-title {
    font-family: 'Assistant', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #5e4934;
    margin-bottom: 4px;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.9);
  }
  
  .header-subtitle {
    font-family: 'Assistant', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.13em;
    color: #9f8572;
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
    background: #f8f6f2;
    border: none;
    border-radius: 32px;
    padding: 40px 24px;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 15px 15px 30px #d1cfcc, -15px -15px 30px #ffffff;
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
    background: #f8f6f2;
    color: rgb(94, 73, 52);
    box-shadow: 8px 8px 16px #d1cfcc, -8px -8px 16px #ffffff;
  }
  
  .button-primary:hover {
    box-shadow: inset 8px 8px 16px #d1cfcc, inset -8px -8px 16px #ffffff;
  }
  
  .button-secondary {
    background: #f8f6f2;
    color: rgb(94, 73, 52);
    box-shadow: 5px 5px 10px #d1cfcc, -5px -5px 10px #ffffff;
  }
  
  .button-secondary:hover {
    box-shadow: inset 5px 5px 10px #d1cfcc, inset -5px -5px 10px #ffffff;
  }
`;

export const EMAIL_SOCIAL_STYLES = `
  .share-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(209, 207, 204, 0.5);
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .social-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #f8f6f2;
    border: none;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 8px 8px 16px #d1cfcc, -8px -8px 16px #ffffff;
  }
  
  .social-button:hover {
    box-shadow: inset 8px 8px 16px #d1cfcc, inset -8px -8px 16px #ffffff;
  }
`;

export const EMAIL_FOOTER_STYLES = `
  .footer {
    background-color: #f8f6f2;
    padding: 32px 20px;
    border: none;
    box-shadow: 0 -5px 10px #d1cfcc, 0 5px 10px #ffffff;
  }
  
  .footer-text {
    font-family: 'Assistant', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #87674F;
    line-height: 1.6;
    margin-bottom: 12px;
    text-align: center;
  }
  
  .footer-link {
    color: #87674F;
    text-decoration: none;
    border-bottom: 1px solid rgba(135, 103, 79, 0.3);
  }
  
  .footer-link:hover {
    color: #5e4934;
    border-bottom-color: #5e4934;
  }
  
  .footer-copyright {
    display: inline-block;
    background: #f8f6f2;
    box-shadow: inset 5px 5px 10px #d1cfcc, inset -5px -5px 10px #ffffff;
    padding: 8px 24px;
    border-radius: 24px;
    border: none;
  }
  
  .footer-copyright-text {
    font-family: 'Assistant', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #5e4934;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.9);
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
    .buttons-container > .button {
      font-size: 16px !important;
      padding: 14px 18px !important;
    }

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
