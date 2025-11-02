import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { PDF_COLORS, registerHebrewFonts } from '../../src/lib/services/core';
import { codeStructures } from '../data/codeStructures';
import { dailyApplication } from '../data/dailyApplication';
import { digitInterpretations } from '../data/digitInterpretations';

// Ensure fonts are registered (idempotent)
registerHebrewFonts();

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: PDF_COLORS.bg,
    color: PDF_COLORS.text,
    fontFamily: 'Assistant',
    direction: 'rtl',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
    color: '#473B31',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#5e4934',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 12,
    color: '#473B31',
    textAlign: 'right',
    direction: 'rtl',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 8,
    color: '#5e4934',
    textAlign: 'right',
    direction: 'rtl',
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: 'right',
    direction: 'rtl',
  },
  bulletItem: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 6,
    marginRight: 12,
    textAlign: 'right',
    direction: 'rtl',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_COLORS.divider,
    marginVertical: 16,
  },
  footer: {
    fontSize: 9,
    color: PDF_COLORS.accentLight,
    textAlign: 'center',
    marginTop: 20,
  },
  codeBox: {
    backgroundColor: '#f5f1ed',
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  codeText: {
    fontSize: 36,
    fontWeight: 300,
    letterSpacing: 8,
    color: '#5e4934',
  },
});

export type WealthReportProps = {
  code: string;
  userName?: string;
};

type CodeType = 'master' | 'repeating' | 'diverse';

function getCodeType(code: string): CodeType {
  const uniqueDigits = new Set(code.split(''));
  if (uniqueDigits.size === 1) return 'master';
  if (uniqueDigits.size < code.length) return 'repeating';
  return 'diverse';
}

export function WealthReport({ code, userName }: WealthReportProps) {
  const uniqueDigits = Array.from(new Set(code.split(''))).map((value) =>
    Number(value)
  );
  const codeType = getCodeType(code);

  const codeTypeLabel =
    codeType === 'master'
      ? 'קוד מאסטר'
      : codeType === 'repeating'
      ? 'קוד עם ספרות חוזרות'
      : 'קוד מגוון';

  return (
    <Document title={`Wealth Code Report - ${code}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AWAKENING BY KSENIA</Text>
        <Text style={styles.subtitle}>הפירוש המלא לקוד העושר האישי שלך</Text>

        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{code}</Text>
          {userName && (
            <Text
              style={[styles.paragraph, { textAlign: 'center', marginTop: 12 }]}
            >
              עבור: {userName}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        <Text style={[styles.footer, { marginTop: 40 }]}>
          © 2025 Awakening by Ksenia{'\n'}
          לשימוש אישי בלבד{'\n'}
          אין להפיץ או למכור מחדש את התוכן ללא אישור מפורש
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>משמעות הספרות בקוד האישי</Text>
        <Text style={styles.paragraph}>{codeStructures.intro}</Text>

        <Text style={styles.sectionSubtitle}>{codeTypeLabel}</Text>
        <Text style={styles.paragraph}>{codeStructures[codeType]}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>{dailyApplication.title}</Text>
        {dailyApplication.content.split('\n\n').map((paragraph, idx) => (
          <Text key={idx} style={styles.paragraph}>
            {paragraph.trim()}
          </Text>
        ))}
      </Page>

      {uniqueDigits.map((digit) => {
        const interp = digitInterpretations[digit];
        if (!interp) return null;

        return (
          <React.Fragment key={digit}>
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

              <Text style={styles.sectionSubtitle}>
                נורות אדומות – סימנים לחוסר איזון
              </Text>
              <Text style={styles.paragraph}>{interp.redFlags}</Text>

              <Text style={styles.sectionSubtitle}>מוקדי צמיחה והתפתחות</Text>
              {interp.growth.map((item, idx) => (
                <Text key={idx} style={styles.bulletItem}>
                  • {item}
                </Text>
              ))}
            </Page>

            <Page size="A4" style={styles.page}>
              <Text style={styles.sectionTitle}>
                {interp.number}. {interp.title} (המשך)
              </Text>

              <Text style={styles.sectionSubtitle}>
                תחומים מתאימים לקריירה ולשליחות
              </Text>
              <Text style={styles.paragraph}>{interp.careers}</Text>

              <Text style={styles.sectionSubtitle}>דוגמה יומית לתרגול</Text>
              <Text style={styles.paragraph}>{interp.dailyPractice}</Text>

              <Text style={styles.sectionSubtitle}>שורה תחתונה</Text>
              <Text style={styles.paragraph}>{interp.bottomLine}</Text>
            </Page>
          </React.Fragment>
        );
      })}
    </Document>
  );
}

export function createWealthReportDocument(props: WealthReportProps) {
  return React.createElement(WealthReport, props);
}
