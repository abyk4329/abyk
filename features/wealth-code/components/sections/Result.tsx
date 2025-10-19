"use client";

import { useEffect } from "react";

import { PageShell } from "@/app/components/layout";
import { Stack } from "@/app/components/shared";
import { Button, Card } from "@/components/neu";
import { CodeInset } from "../shared/CodeInset";
import styles from "./Result.module.css";

interface ResultProps {
  code: string;
  onContinue: () => void;
}

export function Result({ code, onContinue }: ResultProps) {
  // Central scroll lock now handled by AppShell.
  useEffect(() => {
    window?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // זיהוי סוג הקוד
  const getCodeType = (code: string) => {
    const digits = code.split("");
    const uniqueDigits = new Set(digits);

    // קוד מאסטר - כל הספרות זהות
    if (uniqueDigits.size === 1) {
      return {
        type: "קוד מאסטר",
        description: "כל הספרות זהות - אנרגיה מרוכזת ועוצמתית במיוחד",
      };
    }

    // בדיקת ספרות חוזרות
    const digitCount: { [key: string]: number } = {};
    digits.forEach((digit) => {
      digitCount[digit] = (digitCount[digit] || 0) + 1;
    });

    const hasRepeating = Object.values(digitCount).some((count) => count > 1);

    if (hasRepeating) {
      return {
        type: "קוד עם ספרות חוזרות",
        description: "אנרגיות מועצמות של ספרות מסוימות",
      };
    }

    // קוד מגוון - כל הספרות שונות
    return {
      type: "קוד מגוון",
      description: "כל הספרות שונות - איזון ומגוון אנרגטי",
    };
  };

  const codeInfo = getCodeType(code);

  return (
    <PageShell
      heading="קוד העושר"
      accent="שלך"
      subtitle={codeInfo.type}
      maxWidth="md"
      contentSpacing="tight"
    >
      <Card padding="md" className={styles.card}>
        <Stack tight className={styles.stack}>
          <div className={styles.codeWrap}>
            <CodeInset code={code} />
          </div>

          <p className={styles.description}>{codeInfo.description}</p>

          <Button type="button" onClick={onContinue} className={styles.cta}>
            גלו את המשמעות המלאה
          </Button>
        </Stack>
      </Card>
    </PageShell>
  );
}
