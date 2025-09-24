import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react';
import { SimplePDFGenerator } from './SimplePDFGenerator';
import { wealthCodeTexts } from "../data/wealthCodeTexts";

interface PDFPreviewDemoProps {
  onBack: () => void;
}

// Use centralized wealthCodeTexts for demo content

export function PDFPreviewDemo({ onBack }: PDFPreviewDemoProps) {
  const [wealthCode, setWealthCode] = useState(1234);
  const [isGenerating, setIsGenerating] = useState(false);
  const [htmlPreviewUrl, setHtmlPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Generate example code structure
  const generateCodeStructure = (code: number) => {
    const digits = code.toString().split("").map(Number);
    const digitCounts = digits.reduce(
      (acc, digit) => {
        acc[digit] = (acc[digit] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const repeatedDigits = Object.entries(digitCounts)
      .filter(([_, count]) => count > 1)
      .map(([digit, count]) => ({
        digit: parseInt(digit),
        count,
      }));

    const allSame = new Set(digits).size === 1;
    const allDifferent = new Set(digits).size === 4;
    const hasRepeats = repeatedDigits.length > 0;

    return {
      digits,
      digitCounts,
      repeatedDigits,
      allSame,
      allDifferent,
      hasRepeats,
      type: allSame
        ? "master" as const
        : allDifferent
          ? "diverse" as const
          : hasRepeats
            ? "focused" as const
            : "balanced" as const,
    };
  };

  const mapMeaning = (digit: number) => {
    const meaning = wealthCodeTexts[digit];
    if (!meaning) {
      return {
        title: `ספרה ${digit}`,
        essence: `פירוש לספרה ${digit}`,
        gifts: [`מתנה של ספרה ${digit}`],
        challenges: [`אתגר של ספרה ${digit}`],
        imbalanceSigns: [`סימן לחוסר איזון בספרה ${digit}`],
        growthAreas: [`תחום צמיחה לספרה ${digit}`],
        careerPaths: [`קריירה מתאימה לספרה ${digit}`],
        dailyPractice: `תרגול יומי לספרה ${digit}`,
        bottomLine: `לסיכום ספרה ${digit}`
      };
    }
    return {
      title: meaning.title,
      essence: meaning.essence,
      gifts: meaning.gifts,
      challenges: meaning.challenges,
      imbalanceSigns: meaning.imbalanceSigns,
      growthAreas: meaning.growthAreas,
      careerPaths: meaning.careerPaths,
      dailyPractice: meaning.dailyPractice,
      bottomLine: meaning.bottomLine,
    };
  };

  const generateHTMLPreview = async () => {
    try {
      const codeStructure = generateCodeStructure(wealthCode);
      const uniqueDigits = [...new Set(codeStructure.digits)];
      
      // Prepare digit data for HTML
      const digitData = uniqueDigits.map(digit => mapMeaning(digit));
      
      // Generate HTML
      const html = await SimplePDFGenerator.generateHTML(wealthCode, codeStructure, digitData);
      return html;
    } catch (error) {
      console.error('Error generating HTML:', error);
      return null;
    }
  };

  const handlePreview = async () => {
    setIsGenerating(true);
    try {
      const html = await generateHTMLPreview();
      if (html) {
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        setHtmlPreviewUrl(url);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadHTML = async () => {
    const codeStructure = generateCodeStructure(wealthCode);
    const uniqueDigits = [...new Set(codeStructure.digits)];
    const digitData = uniqueDigits.map(digit => mapMeaning(digit));
    await SimplePDFGenerator.downloadHTML(wealthCode, codeStructure, digitData);
  };

  const handlePrintToPDF = async () => {
    const codeStructure = generateCodeStructure(wealthCode);
    const uniqueDigits = [...new Set(codeStructure.digits)];
    const digitData = uniqueDigits.map(digit => mapMeaning(digit));
    await SimplePDFGenerator.printToPDF(wealthCode, codeStructure, digitData);
  };

  // HTML Preview Modal
  if (showPreview && htmlPreviewUrl) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" lang="he">
        <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-medium text-[#473B31] font-['Assistant']">
              תצוגה מקדימה - פירוש מלא בעברית
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={handlePrintToPDF}
                className="bg-[#87674F] hover:bg-[#95705D] text-white font-['Assistant']"
              >
                <Download className="w-4 h-4 mr-2" />
                הדפס ל-PDF
              </Button>
              <Button
                onClick={handleDownloadHTML}
                variant="outline"
                className="font-['Assistant'] border-[#87674F] text-[#87674F] hover:bg-[#87674F] hover:text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                הורד HTML
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPreview(false);
                  if (htmlPreviewUrl) {
                    URL.revokeObjectURL(htmlPreviewUrl);
                    setHtmlPreviewUrl(null);
                  }
                }}
                className="font-['Assistant']"
              >
                סגור
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4">
            <iframe
              src={htmlPreviewUrl}
              className="w-full h-full border border-gray-200 rounded"
              title="HTML Preview"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50" lang="he">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            className="flex items-center gap-2 text-[#473B31] hover:text-[#87674F]"
          >
            <ArrowLeft className="w-5 h-5" />
            חזור
          </Button>
          <div>
            <h1 className="text-3xl font-medium text-[#473B31] font-['Assistant']">
              תצוגה מקדימה של פירוש מלא
            </h1>
            <p className="text-[#87674F] font-light font-['Assistant']">
              כך נראה הפירוש המלא שלקוחות יכולים להוריד או להדפיס
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Controls */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#87674F]/20">
            <h2 className="text-lg font-medium text-[#473B31] mb-4 font-['Assistant']">
              הגדרות דוגמה
            </h2>
            
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-[#473B31] mb-2 font-['Assistant']">
                  קוד עושר לדוגמה
                </label>
                <input
                  type="number"
                  value={wealthCode}
                  onChange={(e) => setWealthCode(parseInt(e.target.value) || 1234)}
                  min={1111}
                  max={9999}
                  className="w-32 p-2 border border-gray-300 rounded text-center font-['Assistant']"
                />
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  onClick={handlePreview}
                  disabled={isGenerating}
                  className="bg-[#87674F] hover:bg-[#95705D] text-white font-['Assistant']"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {isGenerating ? 'מכין...' : 'תצוגה מקדימה'}
                </Button>

                <Button
                  onClick={handlePrintToPDF}
                  variant="outline"
                  className="font-['Assistant'] border-[#87674F] text-[#87674F] hover:bg-[#87674F] hover:text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  הדפס ל-PDF
                </Button>

                <Button
                  onClick={handleDownloadHTML}
                  variant="outline"
                  className="font-['Assistant'] border-[#87674F] text-[#87674F] hover:bg-[#87674F] hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  הורד HTML
                </Button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#87674F]/10 rounded-lg">
              <p className="text-sm text-[#87674F] font-['Assistant']">
                הפירוש כולל תוכן מלא בעברית לכל ספרה בקוד, עם הנחיות מעשיות ליישום יומיומי.
                הקובץ מעוצב בצבעי המותג ומותאם לקריאה נעימה בעברית מימין לשמאל.
              </p>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#87674F]/20">
            <h3 className="text-lg font-medium text-[#473B31] mb-3 font-['Assistant']">
              מה כולל הפירוש המלא:
            </h3>
            <ul className="space-y-2 text-[#87674F] font-['Assistant']">
              <li>• פירוש מפורט בעברית לכל ספרה בקוד העושר</li>
              <li>• מתנות ואתגרים עיקריים לכל ספרה</li>
              <li>• נורות אזהרה לזיהוי חוסר איזון</li>
              <li>• מוקדי צמיחה והתפתחות אישית</li>
              <li>• תחומי קריירה מתאימים לכל ספרה</li>
              <li>• הנחיות יומיומיות מעשיות</li>
              <li>• עיצוב מקצועי בצבעי המותג עם פונט Assistant</li>
              <li>• תמיכה מלאה בעברית וכיוון RTL</li>
              <li>• אפשרות הדפסה ל-PDF ישירות מהדפדפן</li>
            </ul>
          </Card>

          {/* Technical Info */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#87674F]/20">
            <h3 className="text-lg font-medium text-[#473B31] mb-3 font-['Assistant']">
              הנחיות טכניות:
            </h3>
            <ul className="space-y-2 text-[#87674F] font-['Assistant'] text-sm">
              <li>• <strong>הדפסה ל-PDF:</strong> פותח חלון הדפסה חדש - בחר "שמור כ-PDF" ביעד</li>
              <li>• <strong>הורדת HTML:</strong> מוריד קובץ HTML מעוצב שניתן לפתוח בכל דפדפן</li>
              <li>• <strong>תצוגה מקדימה:</strong> מציג את התוכן המלא לפני הדפסה או הורדה</li>
              <li>• הפירוש מותאם לכל גדלי מסכים ומותאם להדפסה</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}