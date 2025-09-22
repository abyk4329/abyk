import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react';
import { SimplePDFGenerator } from './SimplePDFGenerator';

interface PDFPreviewDemoProps {
  onBack: () => void;
}

// Demo digit meanings (simplified)
const digitMeanings = {
  1: {
    title: "המנהיג/ה",
    essence: "אנרגיה של התחלה, יוזמה והובלה. זוהי נקודת הפתיחה, הצעד הראשון, היכולת לעמוד לבד גם כשאין שביל מסומן.",
    gifts: ["מנהיגות טבעית", "אומץ לפרוץ קדימה", "יכולת קבלת החלטות"],
    challenges: ["פחד מאחריות", "שליטת יתר", "הישארות באזור הנוחות"],
    imbalanceSigns: ["פרויקטים שלא יוצאים לדרך", "ביקורת יתר על מנהיגים"],
    growthAreas: ["לצאת מאזור הנוחות", "לקבל החלטות בזמן", "לשחרר שליטה"],
    careerPaths: ["ניהול בכיר ומנכ״לות", "יזמות עסקית", "הובלת פרויקטים"],
    dailyPractice: "היום, בחר משימה אחת והעבר אותה לאדם אחר.",
    bottomLine: "הספרה 1 באה להזכיר לך שאתה כאן כדי להוביל, לא להמתין."
  },
  2: {
    title: "הדובר/ת",
    essence: "ספרה 2 היא אנרגיה של תקשורת, יחסים והרמוניה.",
    gifts: ["כישרון קולי יוצא דופן", "יכולת רגשית עמוקה", "גישור והרמוניה"],
    challenges: ["קול כלוא", "ריצוי יתר", "פחד במה"],
    imbalanceSigns: ["כאבי גרון חוזרים", "התפרצויות אחרי שתיקה"],
    growthAreas: ["להעדיף יושר פנימי", "לבנות את שריר אמירת האמת"],
    careerPaths: ["הוראה והכשרה", "הנחיית קבוצות", "דיפלומטיה"],
    dailyPractice: "כתוב מסר אישי קצר ושתף אותו עם מישהו.",
    bottomLine: "הספרה 2 מזכירה לך שהקול שלך הוא המתנה שלך."
  },
  3: {
    title: "היוצר/ת",
    essence: "ספרה 3 מייצגת יצירתיות, שמחת חיים וביטוי אישי.",
    gifts: ["כריזמה טבעית", "יצירתיות גבוהה", "ביטוי אישי"],
    challenges: ["חיים בקיצוניות", "פחד מקשר מחייב", "תלות רגשית"],
    imbalanceSigns: ["פרויקטים יצירתיים שלא נסגרים", "תחושת ריקנות"],
    growthAreas: ["איזון בין בית לעבודה", "יצירה בלי אישור חיצוני"],
    careerPaths: ["אמנות ומשחק", "עיצוב", "בלוגינג ותוכן"],
    dailyPractice: "הקדש חצי שעה ליצירה חופשית.",
    bottomLine: "הספרה 3 מזכירה לך שאתה כאן כדי ליצור ולשמח."
  },
  4: {
    title: "הבונה/ת",
    essence: "ספרה 4 היא אנרגיה של יסוד, משמעת, התמדה ומבנה.",
    gifts: ["משמעת ועקביות", "חוסן פיזי ונפשי", "כוח עבודה"],
    challenges: ["כאוס וחוסר סדר", "חיפוש קיצורי דרך", "דחיינות"],
    imbalanceSigns: ["שינה לא סדירה", "גלילה אינסופית", "בלגן מתמשך"],
    growthAreas: ["לאמץ ספורט יומיומי", "לקבוע סדר יום יציב"],
    careerPaths: ["בנייה ונדל״ן", "הנדסה", "ספורט"],
    dailyPractice: "בחר משימה פיזית מוחשית אחת.",
    bottomLine: "ספרה 4 מזכירה לך שהצלחה נבנית מלבנים קטנות של סדר."
  },
  5: {
    title: "החופשי/ה",
    essence: "ספרה 5 מייצגת חופש, הרפתקאות וחשיבה מחוץ לקופסה.",
    gifts: ["רב גוניות וגמישות", "כריזמה ומagneticות", "חשיבה יצירתית"],
    challenges: ["חוסר מיקוד", "בריחה מאחריות", "חוסר סבלנות"],
    imbalanceSigns: ["חוסר מיקוד כרוני", "חוסר יציבות", "בריחה מהתחייבויות"],
    growthAreas: ["למצוא איזון בין חופש למסגרת", "להתחייב למה שחשוב"],
    careerPaths: ["יזמות ועסקים", "תקשורת ומדיה", "נסיעות ותיירות"],
    dailyPractice: "בחר דבר אחד להתמקד בו היום.",
    bottomLine: "הספרה 5 מזכירה לך שחופש אמיתי בא עם אחריות."
  },
  6: {
    title: "המטפל/ת",
    essence: "ספרה 6 מייצגת אהבה, דאגה למשפחה ויצירת הרמוניה.",
    gifts: ["אמפתיה טבעית", "יכולת ריפוי", "יצירת אווירה חמה"],
    challenges: ["זניחה עצמית", "מסירות יתר", "קושי לומר לא"],
    imbalanceSigns: ["תחושת עומס רגשי", "זניחת הצרכים האישיים"],
    growthAreas: ["לדאוג לעצמך קודם", "לקבוע גבולות בריאים"],
    careerPaths: ["טיפול ובריאות", "חינוך", "עבודה חברתית"],
    dailyPractice: "עשה משהו נחמד לעצמך היום.",
    bottomLine: "הספרה 6 מזכירה לך שאתה לא יכול לתת ממקום ריק."
  },
  7: {
    title: "החוקר/ת",
    essence: "ספרה 7 מייצגת חוכמה, רוחניות וחיפוש אחר אמת עמוקה.",
    gifts: ["אינטואיציה חזקה", "יכולת ניתוח עמוק", "חכמה רוחנית"],
    challenges: ["בדידות ובידוד", "ביקורתיות יתר", "פרפקציוניזם"],
    imbalanceSigns: ["נטיה לבידוד", "ניתוח יתר של הכל"],
    growthAreas: ["לשתף את החוכמה שלך", "לקבל עזרה מאחרים"],
    careerPaths: ["מחקר ופיתוח", "רוחניות וטיפול", "טכנולוגיה"],
    dailyPractice: "שתף תובנה אחת עם מישהו אחר.",
    bottomLine: "הספרה 7 מזכירה לך שחוכמה נועדה להיות משותפת."
  },
  8: {
    title: "המגשים/ה",
    essence: "ספרה 8 מייצגת הצלחה חומרית, עוצמה וכוח ביצוע.",
    gifts: ["כישרון עסקי טבעי", "יכולת הנהגה", "חזון ארוך טווח"],
    challenges: ["אובססיה לכסף", "זניחת הצד הרגשי", "שליטנות"],
    imbalanceSigns: ["עבודה מופרזת", "התעלמות מהמשפחה"],
    growthAreas: ["לאזן בין עסקים לחיים", "להשקיע ביחסים"],
    careerPaths: ["ניהול ועסקים", "נדל״ן", "פיננסים"],
    dailyPractice: "הקדש זמן איכות למישהו שאוהב אותך.",
    bottomLine: "הספרה 8 מזכירה לך שהצלחה אמיתית כוללת גם אהבה."
  },
  9: {
    title: "המשפיע/ה",
    essence: "ספרה 9 מייצגת שליחות, השפעה רחבה ותרומה לעולם.",
    gifts: ["ראייה רחבה", "יכולת השפעה", "רגישות חברתית"],
    challenges: ["תסכול מהעולם", "ציניות", "רגשנות יתר"],
    imbalanceSigns: ["כעס על עוולות בעולם", "תחושת חוסר אונים"],
    growthAreas: ["להתמקד בהשפעה החיובית שלך", "לפעול בקטן"],
    careerPaths: ["השפעה חברתית", "כתיבה וביטוי", "אמנות"],
    dailyPractice: "עשה מעשה טוב קטן שמשפיע על אחרים.",
    bottomLine: "הספרה 9 מזכירה לך שאתה כאן כדי להשאיר חותם חיובי."
  }
};

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

  const generateHTMLPreview = async () => {
    try {
      const codeStructure = generateCodeStructure(wealthCode);
      const uniqueDigits = [...new Set(codeStructure.digits)];
      
      // Prepare digit data for HTML
      const digitData = uniqueDigits.map(digit => {
        const meaning = digitMeanings[digit as keyof typeof digitMeanings];
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
        return meaning;
      });
      
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
    
    const digitData = uniqueDigits.map(digit => {
      const meaning = digitMeanings[digit as keyof typeof digitMeanings];
      return meaning || {
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
    });
    
    await SimplePDFGenerator.downloadHTML(wealthCode, codeStructure, digitData);
  };

  const handlePrintToPDF = async () => {
    const codeStructure = generateCodeStructure(wealthCode);
    const uniqueDigits = [...new Set(codeStructure.digits)];
    
    const digitData = uniqueDigits.map(digit => {
      const meaning = digitMeanings[digit as keyof typeof digitMeanings];
      return meaning || {
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
    });
    
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