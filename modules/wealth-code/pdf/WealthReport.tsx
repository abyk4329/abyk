import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { BRAND, PDF_COLORS, registerHebrewFonts, PDF_LAYOUT } from "@/modules/core";
import { digitInterpretations } from "../data/digitInterpretations";
import { dailyApplication } from "../data/dailyApplication";
import { codeStructures } from "../data/codeStructures";

// Ensure fonts are registered (idempotent)
registerHebrewFonts();

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: PDF_COLORS.bg,
    color: PDF_COLORS.text,
    fontFamily: "Assistant",
    direction: "rtl",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
    color: "#473B31",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#5e4934",
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 12,
    color: "#473B31",
    textAlign: "right",
    direction: "rtl",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 8,
    color: "#5e4934",
    textAlign: "right",
    direction: "rtl",
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: "right",
    direction: "rtl",
  },
  bulletItem: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 6,
    marginRight: 12,
    textAlign: "right",
    direction: "rtl",
  },
  divider: {
    borderBottomWidth: 0.5,
  borderBottomColor: PDF_COLORS.divider,
    marginVertical: 16,
  },
  footer: {
    fontSize: 9,
  color: PDF_COLORS.accentLight,
    textAlign: "center",
    marginTop: 20,
  },
  codeBox: {
    backgroundColor: "#f5f1ed",
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  codeText: {
    fontSize: 36,
    fontWeight: 300,
    letterSpacing: 8,
    color: "#5e4934",
  },
});

export type WealthReportProps = {
  code: string;
  userName?: string;
};

function getCodeType(code: string): "master" | "repeating" | "diverse" {
  const uniqueDigits = new Set(code.split(""));
  if (uniqueDigits.size === 1) return "master";
  if (uniqueDigits.size < code.length) return "repeating";
  return "diverse";
}

export function WealthReport({ code, userName }: WealthReportProps) {
  const uniqueDigits = Array.from(new Set(code.split("").map(Number)));
  const codeType = getCodeType(code);
  
  // Get code type label in Hebrew
  const codeTypeLabel = 
    codeType === "master" ? "קוד מאסטר" :
    codeType === "repeating" ? "קוד עם ספרות חוזרות" :
    "קוד מגוון";

  return (
    <Document title={`Wealth Code Report - ${code}`}>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AWAKENING BY KSENIA</Text>
        <Text style={styles.subtitle}>הפירוש המלא לקוד העושר האישי שלך</Text>

        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{code}</Text>
          {userName && <Text style={[styles.paragraph, { textAlign: "center", marginTop: 12 }]}>עבור: {userName}</Text>}
        </View>

        <View style={styles.divider} />

        <Text style={[styles.footer, { marginTop: 40 }]}>
          Awakening by Ksenia © 2025{"\n"}
          לשימוש אישי בלבד{"\n"}
          אין להפיץ או למכור מחדש את התוכן ללא אישור מפורש
        </Text>
      </Page>

      {/* Code Structure & Daily Application Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>משמעות הספרות בקוד האישי</Text>
        <Text style={styles.paragraph}>{codeStructures.intro}</Text>

        <Text style={styles.sectionSubtitle}>{codeTypeLabel}</Text>
        <Text style={styles.paragraph}>{codeStructures[codeType]}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>יישום הקוד בחיי היומיום</Text>
        <Text style={styles.paragraph}>{dailyApplication.content}</Text>
      </Page>

      {/* Full Interpretation for Each Digit - Split across TWO pages */}
      {uniqueDigits.map((digit) => {
        const interp = digitInterpretations[digit];
        if (!interp) return null;

        return (
          <React.Fragment key={digit}>
            {/* Page 1: Digit, Essence, Gifts, Blocks, Red Flags, Growth */}
            <Page size="A4" style={styles.page}>
              <Text style={styles.sectionTitle}>
                {interp.number}. {interp.title}
              </Text>

              <Text style={styles.sectionSubtitle}>מהות הספרה</Text>
              <Text style={styles.paragraph}>{interp.essence}</Text>

              <Text style={styles.sectionSubtitle}>מתנות מרכזיות</Text>
              {interp.gifts.map((gift, idx) => (
                <Text key={idx} style={styles.bulletItem}>
                  • {gift}
                </Text>
              ))}

              <Text style={styles.sectionSubtitle}>חסימות ואתגרים עיקריים</Text>
              {interp.blocks.map((block, idx) => (
                <Text key={idx} style={styles.bulletItem}>
                  • {block}
                </Text>
              ))}

              <Text style={styles.sectionSubtitle}>נורות אדומות – סימנים לחוסר איזון</Text>
              <Text style={styles.paragraph}>{interp.redFlags}</Text>

              <Text style={styles.sectionSubtitle}>מוקדי צמיחה והתפתחות</Text>
              {interp.growth.map((item, idx) => (
                <Text key={idx} style={styles.bulletItem}>
                  • {item}
                </Text>
              ))}
            </Page>

            {/* Page 2: Careers, Daily Practice, Bottom Line */}
            <Page size="A4" style={styles.page}>
              <Text style={styles.sectionTitle}>
                {interp.number}. {interp.title} (המשך)
              </Text>

              <Text style={styles.sectionSubtitle}>תחומים מתאימים לקריירה ולשליחות</Text>
              <Text style={styles.paragraph}>{interp.careers}</Text>

              <Text style={styles.sectionSubtitle}>דוגמה יומית לתרגול</Text>
              <Text style={styles.paragraph}>{interp.dailyPractice}</Text>

              <Text style={styles.sectionSubtitle}>שורה תחתונה</Text>
              <Text style={styles.paragraph}>{interp.bottomLine}</Text>
            </Page>
          </React.Fragment>
        );
      })}

      {/* Footer Page with Copyright */}
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={[styles.footer, { textAlign: "center", direction: "rtl" }]}>
            Awakening by Ksenia © 2025{"\n\n"}
            לשימוש אישי בלבד{"\n"}
            אין להפיץ או למכור מחדש את התוכן ללא אישור מפורש
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export function createWealthReportDocument(props: WealthReportProps) {
  return React.createElement(WealthReport, props);
}