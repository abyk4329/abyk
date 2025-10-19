"use client";

import { useEffect, useState } from "react";

import { PageShell } from "@/app/components/layout";
import { Stack } from "@/app/components/shared";
import { Button } from "@/components/neu";
import { Card } from "@/components/neu";
import styles from "./Calculator.module.css";
import { BirthdatePicker } from "./BirthdatePicker";

interface CalculatorProps {
  onCalculate: (code: string) => void;
  onGoHome?: () => void;
}

export function Calculator({ onCalculate, onGoHome }: CalculatorProps) {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  useEffect(() => {
    window?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const reduceToSingleDigit = (num: number): number => {
    let value = num;
    while (value > 9) {
      value = value
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return value;
  };

  const calculateWealthCode = () => {
    if (!birthDate) {
      alert("אנא בחרו תאריך לידה מלא");
      return;
    }

    const dayNum = birthDate.getDate();
    const monthNum = birthDate.getMonth() + 1;
    const yearNum = birthDate.getFullYear();

    const dayDigit = reduceToSingleDigit(dayNum);
    const monthDigit = reduceToSingleDigit(monthNum);
    const yearDigit = reduceToSingleDigit(yearNum);
    const code = `${dayDigit}${monthDigit}${yearDigit}${reduceToSingleDigit(
      dayDigit + monthDigit + yearDigit
    )}`;

    onCalculate(code);
  };

  const handleReset = () => {
    setBirthDate(null);
  };

  return (
    <PageShell maxWidth="md" contentSpacing="tight">
      <Card className={styles.card} padding="lg">
        <Stack tight className={styles.cardStack}>
          <header className={styles.cardHeader}>
            <div className={styles.headingText}>
              <h1 className={styles.cardTitle}>מחשבון קוד העושר</h1>
            </div>

            {onGoHome ? (
              <Button
                variant="secondary"
                onClick={onGoHome}
                className={styles.homeButton}
              >
                עמוד הבית
              </Button>
            ) : null}
          </header>

          <BirthdatePicker value={birthDate} onChange={setBirthDate} />

          <div className={styles.actions}>
            <Button
              type="button"
              variant="primary"
              onClick={calculateWealthCode}
              disabled={!birthDate}
            >
              חשב את הקוד
            </Button>

            <Button type="button" variant="secondary" onClick={handleReset}>
              איפוס שדות
            </Button>
          </div>
        </Stack>
      </Card>
    </PageShell>
  );
}
