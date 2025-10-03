import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Assistant",
  fonts: [
    { src: "https://fonts.gstatic.com/s/assistant/v18/2sDcZG9zMwzPI7jGKhZneemH.woff2" },
    { src: "https://fonts.gstatic.com/s/assistant/v18/2sDcZG9zMwzPI7jGKhZneemH.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 32, backgroundColor: "#FDFCFB", color: "#473B31", fontFamily: "Assistant", direction: "rtl" },
  header: { fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#5e4934" },
  subheader: { fontSize: 14, color: "#87674F", marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, backgroundColor: "#FFFFFF", borderColor: "rgba(71,59,49,0.1)", borderWidth: 1 },
  row: { flexDirection: "row", gap: 12 },
  col: { flexGrow: 1 },
  text: { fontSize: 12, lineHeight: 1.2 },
  caption: { fontSize: 10, color: "#9f8572", marginTop: 6 },
  footer: { position: "absolute", bottom: 24, left: 32, right: 32, textAlign: "center", fontSize: 10, color: "#9f8572" },
});

export type WealthReportProps = { fullName?: string; email?: string; wealthCode?: string; notes?: string; };

export function WealthReport({ fullName, email, wealthCode, notes }: WealthReportProps) {
  return (
    <Document title="Wealth Report">
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>דוח אישי</Text>
        <Text style={styles.subheader}>תובנות ומסקנות</Text>

        <View style={[styles.card, { marginBottom: 12 }]}>
          <Text style={styles.text}>שם: {fullName || "—"}</Text>
          <Text style={styles.text}>אימייל: {email || "—"}</Text>
          <Text style={styles.text}>קוד שפע: {wealthCode || "—"}</Text>
          {notes ? <Text style={styles.caption}>הערות: {notes}</Text> : null}
        </View>

        <View style={styles.row}>
          <View style={[styles.card, styles.col]}>
            <Text style={styles.text}>• אבחנה 1</Text>
            <Text style={styles.text}>• אבחנה 2</Text>
            <Text style={styles.text}>• אבחנה 3</Text>
            <Text style={styles.caption}>מומלץ לעבור על הצעדים בדף התוצאות.</Text>
          </View>
          <View style={[styles.card, styles.col]}>
            <Text style={styles.text}>צעדי פעולה:</Text>
            <Text style={styles.text}>1) ...</Text>
            <Text style={styles.text}>2) ...</Text>
            <Text style={styles.text}>3) ...</Text>
          </View>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} – נוצר אוטומטית מהמערכת</Text>
      </Page>
    </Document>
  );
}
