// Central branding & product identity shared across modules
export const BRAND = {
  appName: "Awakening by Ksenia",
  shortName: "ABYK",
  ownerEmail: "awakening.by.ksenia@gmail.com",
  siteUrl: "https://abyk.online",
  supportEmail: "support@abyk.online",
  copyrightHolder: "Awakening by Ksenia",
  year: new Date().getFullYear(),
  disclaimer:
    "לשימוש אישי בלבד. אין להפיץ או למכור מחדש את התוכן ללא אישור מפורש.",
  footerLines: [
    "נוצר אוטומטית על בסיס אלגוריתם נומרולוגי פנימי",
    "המידע אינו מהווה ייעוץ פיננסי / רגשי / רפואי",
  ],
} as const;

export type BrandInfo = typeof BRAND;
