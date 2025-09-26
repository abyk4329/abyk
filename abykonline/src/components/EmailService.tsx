import { generateEmailHTML, generateEmailSubject, generateEmailText } from "./EmailTemplate";

type RepeatedDigit = { digit: number; count: number };
export type CodeStructureSummary = {
  digits: number[];
  allSame: boolean;
  hasRepeats: boolean;
  allDifferent: boolean;
  repeatedDigits: RepeatedDigit[];
  type?: "master" | "repeated" | "diverse";
};

export interface EmailData {
  wealthCode: number;
  customerEmail: string;
  customerName?: string; // אופציונלי למטא-דאטה בלבד, לא לתבנית
  codeStructure?: CodeStructureSummary;
}

interface EmailServiceConfig {
  serviceUrl: string; // API endpoint (e.g., '/api/send-email')
  apiKey?: string;
  templateId?: string;
}

export class EmailService {
  private config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.config = config;
  }

  private getBaseUrl(): string {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || "https://abyk.online";
  }

  // Generate email payload for sending
  generateEmailData(data: EmailData) {
    const baseUrl = this.getBaseUrl();
    const codeStr = String(data.wealthCode);
    const codeEnc = encodeURIComponent(codeStr);

    // Canonical links
    const viewUrl = `${baseUrl}/interpretations?code=${codeEnc}&utm_source=email&utm_campaign=delivery`;
  const downloadUrl = `${baseUrl}/api/download-pdf?code=${codeEnc}`;

    // חשוב: לא מעבירים customerName לתבנית המייל (היא ניטרלית)
    const templateData = {
      wealthCode: data.wealthCode,
      viewUrl,
      downloadUrl,
      // do not pass codeStructure; template resolves it internally
    } as const;

    const subject = generateEmailSubject(codeStr);
    const html = generateEmailHTML(templateData);
    const text = generateEmailText(templateData);

    return {
      to: data.customerEmail,
      subject,
      html,
      text,
      // שימושים חיצוניים (EmailJS / לוגים / מטא)
      viewUrl,
      downloadUrl,
      wealthCode: data.wealthCode,
      customerName: data.customerName, // לשימוש במטא בלבד, לא בטמפלייט
    };
  }

  // Send email using EmailJS (browser)
  async sendEmailWithEmailJS(
    data: EmailData,
    emailJSConfig: { serviceId: string; templateId: string; publicKey: string }
  ) {
    try {
      const emailjs = await import("@emailjs/browser");
      const payload = this.generateEmailData(data);

      const templateParams = {
        to_email: payload.to,
        subject: payload.subject,
        html_content: payload.html,
        text_content: payload.text,
        wealth_code: String(payload.wealthCode),
        // ניטרלי: לא משתמשים בשם בתוך התבנית; שומר למייל/CRM אם חייבים
        customer_name: data.customerName || "",
        view_url: payload.viewUrl,
        download_url: payload.downloadUrl,
      };

      const result = await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        templateParams,
        emailJSConfig.publicKey
      );

      return { success: true, messageId: result.text, message: "המייל נשלח בהצלחה!" };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "שגיאה בשליחת המייל",
        message: "שגיאה בשליחת המייל. נסה שוב מאוחר יותר.",
      };
    }
  }

  // Mock email send for development/demo
  async mockSendEmail(data: EmailData) {
    const payload = this.generateEmailData(data);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock email sent in development mode
    if (typeof window !== "undefined") {
      const emailLog = JSON.parse(localStorage.getItem("emailLog") || "[]");
      emailLog.push({
        timestamp: new Date().toISOString(),
        to: payload.to,
        subject: payload.subject,
        wealthCode: payload.wealthCode,
        html: payload.html.substring(0, 200) + "...",
      });
      localStorage.setItem("emailLog", JSON.stringify(emailLog));
    }

    return { success: true, messageId: `mock_${Date.now()}`, message: "המייל נשלח בהצלחה! (מצב דמו)" };
  }

  // Send using backend API (recommended for production)
  async sendEmailViaAPI(data: EmailData, apiEndpoint: string) {
    try {
      const payload = this.generateEmailData(data);

      const response = await fetch(apiEndpoint || this.config.serviceUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          metadata: {
            wealthCode: payload.wealthCode,
            customerName: data.customerName || "", // מטא בלבד
            viewUrl: payload.viewUrl,
            downloadUrl: payload.downloadUrl,
          },
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json().catch(() => ({}));
      return { success: true, messageId: result.messageId, message: "המייל נשלח בהצלחה!" };
    } catch (error) {
      console.error("Error sending email via API:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "שגיאה בשליחת המייל",
        message: "שגיאה בשליחת המייל. נסה שוב מאוחר יותר.",
      };
    }
  }
}

// Default instance for easy use
export const emailService = new EmailService({
  serviceUrl: "/api/send-email",
});

// App helper
export async function sendWealthCodeEmail(
  data: EmailData
): Promise<{ success: boolean; message: string; error?: string }> {
  if (process.env.NODE_ENV === "development") {
    return emailService.mockSendEmail(data);
  }

  try {
    return await emailService.sendEmailViaAPI(data, "/api/send-email");
  } catch {
    console.warn("API email failed, trying EmailJS fallback");

    const emailJSConfig = {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    };

    if (emailJSConfig.serviceId && emailJSConfig.templateId && emailJSConfig.publicKey) {
      return await emailService.sendEmailWithEmailJS(data, emailJSConfig);
    }

    return emailService.mockSendEmail(data);
  }
}