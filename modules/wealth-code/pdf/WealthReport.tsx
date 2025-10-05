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
    fontFamily: "Assistant", // registered in core config if fonts exist
    direction: "rtl",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
  color: PDF_COLORS.accent,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
  color: PDF_COLORS.accentLight,
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 12,
    color: PDF_COLORS.accent,
    textAlign: "right",
    direction: "rtl",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 8,
    color: PDF_COLORS.accentLight,
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
  backgroundColor: PDF_COLORS.surfaceAlt,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  codeText: {
    fontSize: 20,
    fontWeight: 700,
  color: PDF_COLORS.accent,
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

  return (
    <Document title={`Wealth Code Report - ${code}`}>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
  <Text style={styles.title}>{BRAND.appName.toUpperCase()}</Text>
        <Text style={styles.subtitle}>הפירוש המלא לקוד העושר האישי שלך</Text>

        <View style={styles.codeBox}>
          <Text style={styles.codeText}>קוד העושר שלך: {code}</Text>
          {userName && <Text style={[styles.paragraph, { textAlign: "center", marginTop: 8 }]}>עבור: {userName}</Text>}
        </View>

        <Text style={styles.sectionTitle}>מבנה הקוד</Text>
        <Text style={styles.paragraph}>{codeStructures[codeType]}</Text>

        <View style={styles.divider} />

        <Text style={styles.footer}>
          {BRAND.appName}{"\n"}
          {BRAND.ownerEmail}{"\n"}
          {BRAND.disclaimer}
        </Text>
      </Page>

      {/* Full Interpretation for Each Digit - All content on ONE page */}
      {uniqueDigits.map((digit) => {
        const interp = digitInterpretations[digit];
        if (!interp) return null;

        return (
          <Page key={digit} size="A4" style={styles.page}>
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

            <Text style={styles.sectionSubtitle}>תחומים מתאימים לקריירה ולשליחות</Text>
            <Text style={styles.paragraph}>{interp.careers}</Text>

            <Text style={styles.sectionSubtitle}>דוגמה יומית לתרגול</Text>
            <Text style={styles.paragraph}>{interp.dailyPractice}</Text>

            <Text style={styles.sectionSubtitle}>שורה תחתונה</Text>
            <Text style={styles.paragraph}>{interp.bottomLine}</Text>
          </Page>
        );
      })}

      {/* Daily Application Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>יישום יומי</Text>
        <Text style={styles.sectionSubtitle}>{dailyApplication.title}</Text>
        <Text style={styles.paragraph}>{dailyApplication.content}</Text>

        <View style={styles.divider} />

        <Text style={styles.footer}>
          © {BRAND.year} {BRAND.copyrightHolder}{"\n"}
          {BRAND.disclaimer}
        </Text>
      </Page>
    </Document>
  );
}

export function createWealthReportDocument(props: WealthReportProps) {
  return React.createElement(WealthReport, props);
}