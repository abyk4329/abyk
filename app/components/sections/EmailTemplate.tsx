interface EmailTemplateProps {
  code: string;
  interpretationsUrl: string;
  pdfUrl: string;
}

export function EmailTemplate({ code, interpretationsUrl, pdfUrl }: EmailTemplateProps) {
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://abyk.online").replace(/\/$/, "");
    const shareUrl = `${baseUrl}/`;
    const whatsappConsultation = "https://wa.me/972525606008?text=" + encodeURIComponent("היי, אשמח לתיאום יעוץ אישי");
    const calculatorUrl = `${baseUrl}/calculator`;
  
  return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>הפירוש המלא לקוד האישי שלך</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Assistant', sans-serif;
            background: linear-gradient(135deg, #FDFCFB 0%, #EAE0D8 100%);
            direction: rtl;
            text-align: center;
            padding: 0;
            margin: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #FDFCFB;
        }
        
        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 24px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 12px 0 rgba(94, 73, 52, 0.08);
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
        
        .main-content {
            padding: 48px 20px;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            padding: 40px 24px;
            box-shadow: 
                0 8px 32px 0 rgba(94, 73, 52, 0.15),
                inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
            margin: 0 auto;
        }
        
        .main-title {
            font-family: 'Assistant', sans-serif;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.2;
            color: #5e4934;
            margin-bottom: 20px;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .code-label {
            font-family: 'Assistant', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #87674F;
            margin-bottom: 12px;
        }
        
        .code-display {
            font-family: 'Assistant', sans-serif;
            font-size: 48px;
            font-weight: 300;
            letter-spacing: 0.15em;
            color: #5e4934;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 32px;
        }
        
        .message {
            font-family: 'Assistant', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.5;
            color: #473B31;
            margin-bottom: 32px;
            padding: 0 16px;
        }
        
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
            background: rgba(255, 255, 255, 0.15);
            color: #5e4934;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(20px);
            box-shadow: 
                0 6px 20px rgba(94, 73, 52, 0.15),
                inset 0 1px 2px 0 rgba(255, 255, 255, 0.4);
        }
        
        .button-primary:hover {
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.4);
            transform: scale(1.02);
            box-shadow: 
                0 8px 24px rgba(94, 73, 52, 0.2),
                inset 0 2px 4px 0 rgba(255, 255, 255, 0.5);
        }
        
        .button-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: #5e4934;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(16px);
            box-shadow: 
                0 4px 24px rgba(94, 73, 52, 0.1),
                inset 0 1px 2px 0 rgba(255, 255, 255, 0.4);
        }
        
        .button-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transform: scale(1.02);
            box-shadow: 
                0 6px 20px rgba(94, 73, 52, 0.15),
                inset 0 2px 4px 0 rgba(255, 255, 255, 0.5);
        }
        
        .share-section {
            margin-top: 40px;
            padding-top: 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .share-title {
            font-family: 'Assistant', sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #5e4934;
            margin-bottom: 20px;
        }
        
        .button-share {
            background: rgba(255, 255, 255, 0.15);
            color: #5e4934;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(20px);
            box-shadow: 
                0 6px 20px rgba(94, 73, 52, 0.15),
                inset 0 1px 2px 0 rgba(255, 255, 255, 0.4);
            font-size: 19px;
            padding: 16px 40px;
        }
        
        .button-share:hover {
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.4);
            transform: scale(1.02);
            box-shadow: 
                0 8px 24px rgba(94, 73, 52, 0.2),
                inset 0 2px 4px 0 rgba(255, 255, 255, 0.5);
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 24px;
            flex-wrap: wrap;
        }
        
        .social-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(16px);
            text-decoration: none;
            transition: all 0.5s ease;
            box-shadow: 
                0 4px 12px rgba(135, 103, 79, 0.15),
                inset 0 1px 2px 0 rgba(255, 255, 255, 0.3);
        }
        
        .social-button:hover {
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
            box-shadow: 
                0 6px 20px rgba(135, 103, 79, 0.25),
                inset 0 2px 4px 0 rgba(255, 255, 255, 0.4);
        }
        
        .footer {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 32px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 -2px 12px 0 rgba(94, 73, 52, 0.08);
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
        
        @media (max-width: 600px) {
            .main-title {
                font-size: 26px;
            }
            
            .code-display {
                font-size: 36px;
            }
            
            .message {
                font-size: 16px;
            }
            
            .button {
                font-size: 16px;
                padding: 14px 24px;
            }
            
            .button-share {
                font-size: 18px;
                padding: 18px 36px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="header-title">AWAKENING BY KSENIA</div>
            <div class="header-subtitle">YOUR PERSONAL SPACE FOR GROWTH</div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <div class="glass-card">
                <h1 class="main-title">תודה על הרכישה!</h1>
                
                <div class="code-label">קוד העושר שלך</div>
                <div class="code-display">${code}</div>
                
                <p class="message">
                    הפירוש המלא לקוד האישי שלך נשלח במייל וממתין לך לצפייה ולהורדה.
                </p>
                
                <div class="buttons-container">
                    <a href="${interpretationsUrl}" class="button button-primary">
                        לצפייה באתר
                    </a>
                    
                    <a href="${pdfUrl}" class="button button-primary">
                        להורדה כ-PDF
                    </a>

                    <a href="${calculatorUrl}" class="button button-secondary">
                        לחישוב קוד נוסף
                    </a>
                    
                    <a href="${whatsappConsultation}" class="button button-secondary">
                        לתיאום יעוץ אישי
                    </a>
                </div>
                
                <!-- Share Section -->
                <div class="share-section">
                    <h2 class="share-title">שתפו עם חברים</h2>
                    
                    <a href="${shareUrl}" class="button button-share">
                        גלו את קוד העושר שלכם
                    </a>
                    
                    <div class="social-links">
                        <a href="https://wa.me/?text=${encodeURIComponent('גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית\n' + shareUrl)}" class="social-button" title="שיתוף בווטסאפ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        
                        <a href="https://www.instagram.com/awakening_byksenia/" class="social-button" title="Instagram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        
                        <a href="https://www.tiktok.com/@awakening_byksenia" class="social-button" title="TikTok">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        
                        <a href="mailto:?subject=${encodeURIComponent('גלו את קוד העושר הנומרולוגי שלכם')}&body=${encodeURIComponent('גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית\n\n' + shareUrl)}" class="social-button" title="שיתוף במייל">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                © 2025 Awakening by Ksenia. כל הזכויות שמורות.
            </p>
            <p class="footer-text">
                <a href="https://abyk.online/#/terms-privacy" class="footer-link">תנאי שימוש ומדיניות פרטיות</a>
            </p>
            <p class="footer-text" style="margin-top: 16px; font-size: 12px; color: #9f8572;">
                מייל זה נשלח אליך כי ביצעת רכישה באתר שלנו.<br>
                לשאלות ובירורים: awakening.by.ksenia@gmail.com
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

// Helper function to generate email HTML
export function generatePurchaseEmail(code: string): string {
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://abyk.online").replace(/\/$/, "");
    const interpretationsUrl = `${baseUrl}/interpretations?code=${code}`;
    const pdfUrl = `${baseUrl}/api/generate-pdf?code=${code}`;
  
  return EmailTemplate({ code, interpretationsUrl, pdfUrl });
}
