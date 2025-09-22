import { generateEmailHTML, generateEmailSubject, generateEmailText } from './EmailTemplate';

interface EmailData {
  wealthCode: number;
  customerName?: string;
  customerEmail: string;
  codeStructure: {
    digits: number[];
    allSame: boolean;
    hasRepeats: boolean;
    allDifferent: boolean;
    repeatedDigits: { digit: number; count: number }[];
  };
}

interface EmailServiceConfig {
  // Your email service configuration
  serviceUrl: string; // e.g., EmailJS, SendGrid, etc.
  apiKey?: string;
  templateId?: string;
}

export class EmailService {
  private config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.config = config;
  }

  // Generate email data for sending
  generateEmailData(data: EmailData) {
    // Create URLs for viewing and downloading
    const baseUrl = window.location.origin;
    const viewUrl = `${baseUrl}?page=thank-you&code=${data.wealthCode}`;
    const downloadUrl = `${baseUrl}/api/download-pdf?code=${data.wealthCode}`;

    const emailData = {
      wealthCode: data.wealthCode,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      viewUrl,
      downloadUrl,
      codeStructure: data.codeStructure
    };

    return {
      to: data.customerEmail,
      subject: generateEmailSubject(data.wealthCode),
      html: generateEmailHTML(emailData),
      text: generateEmailText(emailData)
    };
  }

  // Send email using EmailJS (browser-based solution)
  async sendEmailWithEmailJS(data: EmailData, emailJSConfig: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  }) {
    try {
      // Load EmailJS dynamically
      const emailjs = await import('emailjs-com');
      
      const emailData = this.generateEmailData(data);
      
      const templateParams = {
        to_email: emailData.to,
        subject: emailData.subject,
        html_content: emailData.html,
        text_content: emailData.text,
        wealth_code: data.wealthCode,
        customer_name: data.customerName || 'לקוח יקר',
        view_url: emailData.html.match(/href="([^"]*view[^"]*)"/)?.[1] || '',
        download_url: emailData.html.match(/href="([^"]*download[^"]*)"/)?.[1] || ''
      };

      const result = await emailjs.default.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        templateParams,
        emailJSConfig.publicKey
      );

      return {
        success: true,
        messageId: result.text,
        message: 'המייל נשלח בהצלחה!'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה בשליחת המייל',
        message: 'שגיאה בשליחת המייל. נסה שוב מאוחר יותר.'
      };
    }
  }

  // Mock email send for development/demo
  async mockSendEmail(data: EmailData) {
    const emailData = this.generateEmailData(data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('📧 Mock email sent:', {
      to: emailData.to,
      subject: emailData.subject,
      wealthCode: data.wealthCode
    });

    // Store in localStorage for demo purposes
    const emailLog = JSON.parse(localStorage.getItem('emailLog') || '[]');
    emailLog.push({
      timestamp: new Date().toISOString(),
      to: emailData.to,
      subject: emailData.subject,
      wealthCode: data.wealthCode,
      html: emailData.html.substring(0, 200) + '...'
    });
    localStorage.setItem('emailLog', JSON.stringify(emailLog));

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
      message: 'המייל נשלח בהצלחה! (מצב דמו)'
    };
  }

  // Send using backend API (recommended for production)
  async sendEmailViaAPI(data: EmailData, apiEndpoint: string) {
    try {
      const emailData = this.generateEmailData(data);
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text,
          metadata: {
            wealthCode: data.wealthCode,
            customerName: data.customerName
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        messageId: result.messageId,
        message: 'המייל נשלח בהצלחה!'
      };
    } catch (error) {
      console.error('Error sending email via API:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה בשליחת המייל',
        message: 'שגיאה בשליחת המייל. נסה שוב מאוחר יותר.'
      };
    }
  }
}

// Default instance for easy use
export const emailService = new EmailService({
  serviceUrl: '/api/send-email' // Default API endpoint
});

// Email sending function for the app
export async function sendWealthCodeEmail(data: EmailData): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  // In development mode, use mock email
  if (process.env.NODE_ENV === 'development') {
    return emailService.mockSendEmail(data);
  }

  // Try to send via API first
  try {
    return await emailService.sendEmailViaAPI(data, '/api/send-email');
  } catch (apiError) {
    console.warn('API email failed, trying EmailJS fallback');
    
    // Fallback to EmailJS if available
    const emailJSConfig = {
      serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
      templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
      publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''
    };

    if (emailJSConfig.serviceId && emailJSConfig.templateId && emailJSConfig.publicKey) {
      return await emailService.sendEmailWithEmailJS(data, emailJSConfig);
    }

    // Ultimate fallback to mock
    return emailService.mockSendEmail(data);
  }
}