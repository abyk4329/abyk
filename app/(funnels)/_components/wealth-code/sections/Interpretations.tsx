'use client';

import { Calculator, Download, MessageCircle, Share2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { PageShell } from '@/app/components/layout';
import { Stack } from '@/app/components/shared';
import { Button, Card } from '@/components/neu';
import { SOCIAL } from '@/lib/constants';
import { codeStructures } from '@/lib/domain/wealth-code/data/codeStructures';
import { dailyApplication } from '@/lib/domain/wealth-code/data/dailyApplication';
import { digitInterpretations } from '@/lib/domain/wealth-code/data/digitInterpretations';
import { publicEnv } from '@/lib/env';
import { cn } from '@/lib/utils';

import { CodeInset } from '../shared/CodeInset';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import styles from './Interpretations.module.css';

interface InterpretationsProps {
  code: string;
  onCalculateAnother: () => void;
}

const SHARE_TITLE = 'Awakening by Ksenia';
const SHARE_TEXT =
  'גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית';

const CODE_TYPE_HEADING: Record<'master' | 'repeating' | 'diverse', string> = {
  master: 'קוד מאסטר – כל הספרות זהות',
  repeating: 'קוד עם ספרות חוזרות – אנרגיות מועצמות',
  diverse: 'קוד מגוון – כל הספרות שונות',
};

export function Interpretations({
  code,
  onCalculateAnother,
}: InterpretationsProps) {
  const [activeTab, setActiveTab] = useState('0');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    window?.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
  }, [code]);

  const shareUrl = publicEnv.appUrl;

  const uniqueDigits = useMemo(() => {
    return Array.from(new Set(code.split('')))
      .map((digit) => Number.parseInt(digit, 10))
      .filter((digit) => Number.isFinite(digit))
      .sort((a, b) => a - b);
  }, [code]);

  useEffect(() => {
    setActiveTab(uniqueDigits.length > 0 ? '0' : 'daily');
  }, [code, uniqueDigits.length]);

  const codeType = useMemo(() => {
    const uniqueCount = new Set(code.split('')).size;

    if (uniqueCount === 1) {
      return 'master' as const;
    }

    if (uniqueCount === 4) {
      return 'diverse' as const;
    }

    return 'repeating' as const;
  }, [code]);

  const structureText = codeStructures[codeType];

  const handleDownload = useCallback(async () => {
    setIsGeneratingPDF(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          userName: '',
          userEmail: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const data = await response.json();
      if (!data.ok || !data.pdfBase64) {
        throw new Error(data.error || 'Failed to generate PDF');
      }

      const byteCharacters = atob(data.pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let index = 0; index < byteCharacters.length; index += 1) {
        byteNumbers[index] = byteCharacters.charCodeAt(index);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wealth-code-${code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('נוצרה בעיה ביצירת הקובץ. נסו שוב בעוד רגע.');
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [code]);

  const handleShare = useCallback(async () => {
    const fallbackShare = () => {
      const message = encodeURIComponent(`${SHARE_TEXT}\n${shareUrl}`);
      if (typeof window !== 'undefined') {
        window.open(
          `https://wa.me/?text=${message}`,
          '_blank',
          'noopener,noreferrer'
        );
      }
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Share failed', error);
      }
    }

    fallbackShare();
  }, [shareUrl]);

  const handleConsultation = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.open(SOCIAL.whatsapp.getUrl(), '_blank', 'noopener,noreferrer');
  }, []);

  const handleCalculateAnother = useCallback(() => {
    onCalculateAnother();
  }, [onCalculateAnother]);

  return (
    <PageShell
      heading="הפירוש"
      accent="המלא"
      subtitle="המסע עם קוד העושר האישי שלך"
      maxWidth="xl"
      contentSpacing="tight"
    >
      <Stack className={styles.interpretationsStack}>
        <Card className={styles.interpretationsPanel}>
          <Stack tight className={styles.interpretationsPanelStack}>
            <h2 className={styles.interpretationsPanelTitle}>קוד העושר שלך</h2>
            <p className={styles.interpretationsPanelText}>
              {codeStructures.intro}
            </p>
            <div className={styles.codeInset}>
              <CodeInset code={code} />
            </div>
          </Stack>
        </Card>

        <Card className={styles.interpretationsPanel}>
          <Stack tight className={styles.interpretationsPanelStack}>
            <h2 className={styles.interpretationsPanelTitle}>
              {CODE_TYPE_HEADING[codeType]}
            </h2>
            <p className={styles.interpretationsPanelText}>{structureText}</p>
          </Stack>
        </Card>

        <Tabs
          dir="rtl"
          value={activeTab}
          onValueChange={setActiveTab}
          className={styles.tabs}
        >
          <Card className={cn(styles.interpretationsPanel, styles.tabsHeader)}>
            <TabsList className={styles.tabsList}>
              {uniqueDigits.map((digit, index) => (
                <TabsTrigger
                  key={digit}
                  value={index.toString()}
                  className={styles.tabTrigger}
                >
                  {digit}
                </TabsTrigger>
              ))}
              <TabsTrigger value="daily" className={styles.tabTrigger}>
                יישום יומי
              </TabsTrigger>
            </TabsList>
          </Card>

          {uniqueDigits.map((digit, index) => {
            const interpretation = digitInterpretations[digit];
            if (!interpretation) {
              return null;
            }

            return (
              <TabsContent
                key={digit}
                value={index.toString()}
                className={styles.tabPanel}
              >
                <Card
                  className={cn(styles.interpretationsPanel, styles.digitPanel)}
                >
                  <Stack
                    tight
                    className={cn(
                      styles.interpretationsPanelStack,
                      styles.interpretationsPanelStackStart
                    )}
                  >
                    <div className={styles.digitBadge}>{digit}</div>
                    <h3 className={styles.digitTitle}>
                      {interpretation.title}
                    </h3>
                    <div className={styles.sectionGrid}>
                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>מהות הספרה</h4>
                        <p className={styles.sectionText}>
                          {interpretation.essence}
                        </p>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>מתנות מרכזיות</h4>
                        <ul className={styles.sectionList}>
                          {interpretation.gifts.map((gift, giftIndex) => {
                            const [label, ...rest] = gift.split(' – ');
                            return (
                              <li
                                key={giftIndex}
                                className={styles.sectionListItem}
                              >
                                {rest.length > 0 ? (
                                  <>
                                    <span className={styles.sectionListLabel}>
                                      {label}
                                    </span>
                                    {' – '}
                                    {rest.join(' – ')}
                                  </>
                                ) : (
                                  gift
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>
                          חסימות ואתגרים עיקריים
                        </h4>
                        <ul className={styles.sectionList}>
                          {interpretation.blocks.map((block, blockIndex) => {
                            const [label, ...rest] = block.split(' – ');
                            return (
                              <li
                                key={blockIndex}
                                className={styles.sectionListItem}
                              >
                                {rest.length > 0 ? (
                                  <>
                                    <span className={styles.sectionListLabel}>
                                      {label}
                                    </span>
                                    {' – '}
                                    {rest.join(' – ')}
                                  </>
                                ) : (
                                  block
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>
                          נורות אדומות – סימנים לחוסר איזון
                        </h4>
                        <p className={styles.sectionText}>
                          {interpretation.redFlags}
                        </p>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>
                          מוקדי צמיחה והתפתחות
                        </h4>
                        <ul className={styles.sectionList}>
                          {interpretation.growth.map((growth, growthIndex) => {
                            const [label, ...rest] = growth.split(' – ');
                            return (
                              <li
                                key={growthIndex}
                                className={styles.sectionListItem}
                              >
                                {rest.length > 0 ? (
                                  <>
                                    <span className={styles.sectionListLabel}>
                                      {label}
                                    </span>
                                    {' – '}
                                    {rest.join(' – ')}
                                  </>
                                ) : (
                                  growth
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>
                          תחומים מתאימים לקריירה ולשליחות
                        </h4>
                        <p className={styles.sectionText}>
                          {interpretation.careers}
                        </p>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>
                          דוגמה יומית לתרגול
                        </h4>
                        <p className={styles.sectionText}>
                          {interpretation.dailyPractice}
                        </p>
                      </div>

                      <div className={styles.sectionCard}>
                        <h4 className={styles.sectionTitle}>בשורה התחתונה</h4>
                        <p className={styles.sectionText}>
                          {interpretation.bottomLine}
                        </p>
                      </div>
                    </div>
                  </Stack>
                </Card>
              </TabsContent>
            );
          })}

          <TabsContent value="daily" className={styles.tabPanel}>
            <Card
              className={cn(styles.interpretationsPanel, styles.digitPanel)}
            >
              <Stack
                tight
                className={cn(
                  styles.interpretationsPanelStack,
                  styles.interpretationsPanelStackStart
                )}
              >
                <h3 className={styles.digitTitle}>{dailyApplication.title}</h3>
                <div className={styles.sectionCard}>
                  <p className={cn(styles.sectionText, styles.sectionTextPre)}>
                    {dailyApplication.content}
                  </p>
                </div>
              </Stack>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className={cn(styles.interpretationsPanel, styles.actionsPanel)}>
          <Stack
            tight
            className={cn(
              styles.interpretationsPanelStack,
              styles.interpretationsPanelStackStart
            )}
          >
            <h2 className={styles.interpretationsPanelTitle}>המשך המסע</h2>
            <div className={styles.actionGrid}>
              <Button
                onClick={handleDownload}
                className={styles.actionButton}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    <span>יוצר PDF...</span>
                  </>
                ) : (
                  <>
                    <Download
                      className={styles.actionIcon}
                      aria-hidden="true"
                    />
                    <span>להורדה כ-PDF</span>
                  </>
                )}
              </Button>

              <Button onClick={handleShare} className={styles.actionButton}>
                <Share2 className={styles.actionIcon} aria-hidden="true" />
                <span>שתפו עם חברים</span>
              </Button>

              <Button
                variant="ghost"
                onClick={handleConsultation}
                className={styles.actionButton}
              >
                <MessageCircle
                  className={styles.actionIcon}
                  aria-hidden="true"
                />
                <span>לתיאום יעוץ אישי</span>
              </Button>

              <Button
                variant="ghost"
                onClick={handleCalculateAnother}
                className={styles.actionButton}
              >
                <Calculator className={styles.actionIcon} aria-hidden="true" />
                <span>לחישוב קוד נוסף</span>
              </Button>
            </div>
          </Stack>
        </Card>
      </Stack>
    </PageShell>
  );
}
