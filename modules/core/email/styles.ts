/**
 * Core Email Styles
 * Shared styles for all email templates in the application
 * Uses neumorphism design system matching the website and PDF aesthetics
 */

export const EMAIL_FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
`;

export const EMAIL_BASE_STYLES = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Assistant', sans-serif;
    background: linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(245, 241, 237) 100%);
    direction: rtl;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background: linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(245, 241, 237) 100%);
  }
`;

export const EMAIL_HEADER_STYLES = `
  .header {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240));
    padding: 24px 20px;
    border: none;
    box-shadow: 
      0 10px 30px rgba(159, 133, 114, 0.15),
      0 4px 16px rgba(255, 255, 255, 0.8),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
  }
  
  .header-title {
    font-family: 'Assistant', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #5e4934;
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  
  .header-subtitle {
    font-family: 'Assistant', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.13em;
    color: #9f8572;
    text-transform: uppercase;
  }
`;

export const EMAIL_CONTENT_STYLES = `
  .main-content {
    padding: 48px 20px;
  }
  
  .glass-card {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(242, 238, 234));
    border: none;
    border-radius: 32px;
    padding: 40px 24px;
    box-shadow: 
      30px 30px 90px rgba(159, 133, 114, 0.25),
      -30px -30px 90px rgba(255, 255, 255, 0.9),
      inset 2px 2px 6px rgba(255, 255, 255, 0.8),
      inset -2px -2px 6px rgba(211, 198, 189, 0.1);
    margin: 0 auto;
  }
`;

export const EMAIL_BUTTON_STYLES = `
  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
    padding: 0 16px;
  }
  
  .button {
    display: inline-block;
    text-decoration: none;
    font-family: 'Assistant', sans-serif;
    font-size: 18px;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 50px;
    transition: all 0.5s ease;
    text-align: center;
  }
  
  .button-primary {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240));
    color: rgb(94, 73, 52);
    border: none;
    box-shadow: 
      12px 12px 24px rgba(159, 133, 114, 0.2),
      -12px -12px 24px rgba(255, 255, 255, 0.9),
      inset 1px 1px 3px rgba(255, 255, 255, 0.6);
  }
  
  .button-primary:hover {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240));
    transform: translateY(-2px);
    box-shadow: 
      14px 14px 28px rgba(159, 133, 114, 0.25),
      -14px -14px 28px rgba(255, 255, 255, 1),
      inset 1px 1px 3px rgba(255, 255, 255, 0.7);
  }
  
  .button-secondary {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(245, 241, 237));
    color: rgb(94, 73, 52);
    border: none;
    box-shadow: 
      10px 10px 20px rgba(159, 133, 114, 0.15),
      -10px -10px 20px rgba(255, 255, 255, 0.9),
      inset 1px 1px 3px rgba(255, 255, 255, 0.6);
  }
  
  .button-secondary:hover {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(245, 241, 237));
    transform: translateY(-1px);
    box-shadow: 
      12px 12px 24px rgba(159, 133, 114, 0.2),
      -12px -12px 24px rgba(255, 255, 255, 1),
      inset 1px 1px 3px rgba(255, 255, 255, 0.7);
  }
`;

export const EMAIL_SOCIAL_STYLES = `
  .share-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(159, 133, 114, 0.1);
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
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240));
    border: none;
    text-decoration: none;
    transition: all 0.4s ease;
    box-shadow: 
      10px 10px 20px rgba(159, 133, 114, 0.15),
      -10px -10px 20px rgba(255, 255, 255, 0.9),
      inset 2px 2px 5px rgba(255, 255, 255, 0.7),
      inset -2px -2px 5px rgba(211, 198, 189, 0.08);
  }
  
  .social-button:hover {
    background: linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240));
    transform: translateY(-2px);
    box-shadow: 
      12px 12px 24px rgba(159, 133, 114, 0.18),
      -12px -12px 24px rgba(255, 255, 255, 1),
      inset 2px 2px 5px rgba(255, 255, 255, 0.8),
      inset -2px -2px 5px rgba(211, 198, 189, 0.1);
  }
`;

export const EMAIL_FOOTER_STYLES = `
  .footer {
    background: linear-gradient(180deg, rgb(250, 248, 246) 0%, rgb(253, 252, 251) 100%);
    padding: 32px 20px;
    border: none;
    box-shadow: 
      0 -10px 30px rgba(159, 133, 114, 0.15),
      0 4px 16px rgba(255, 255, 255, 0.8),
      inset 0 2px 4px rgba(255, 255, 255, 0.9);
  }
  
  .footer-text {
    font-family: 'Assistant', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #87674F;
    line-height: 1.6;
    margin-bottom: 12px;
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
    background: linear-gradient(145deg, rgb(245, 241, 237), rgb(253, 252, 251));
    box-shadow: 
      inset 8px 8px 16px rgba(159, 133, 114, 0.15),
      inset -8px -8px 16px rgba(255, 255, 255, 0.9),
      1px 1px 3px rgba(159, 133, 114, 0.06);
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
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    margin: 0;
  }
`;

export const EMAIL_RESPONSIVE_STYLES = `
  @media (max-width: 600px) {
    .button {
      font-size: 16px;
      padding: 14px 24px;
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
