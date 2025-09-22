import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowLeft, Mail, Eye, Code, Download } from 'lucide-react';
import { generateEmailHTML, generateEmailSubject, generateEmailText } from './EmailTemplate';

interface EmailPreviewProps {
  onBack: () => void;
  wealthCode?: number;
  codeStructure?: any;
  fullData?: any;
}

export function EmailPreview({ onBack, wealthCode: initialWealthCode, codeStructure, fullData }: EmailPreviewProps) {
  const [wealthCode, setWealthCode] = useState(initialWealthCode || 1234);
  const [customerName, setCustomerName] = useState('דוגמה לקוח');
  const [viewMode, setViewMode] = useState<'html' | 'text' | 'data'>('html');

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
    };
  };

  const emailData = {
    wealthCode,
    customerName,
    viewUrl: `${window.location.origin}?page=thank-you&code=${wealthCode}`,
    downloadUrl: `${window.location.origin}/api/download-pdf?code=${wealthCode}`,
    codeStructure: codeStructure || generateCodeStructure(wealthCode)
  };

  const emailHTML = generateEmailHTML(emailData);
  const emailText = generateEmailText(emailData);
  const emailSubject = generateEmailSubject(wealthCode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50" lang="he">
      <div className="max-w-6xl mx-auto px-4 py-6">
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
            <h1 className="text-2xl font-medium text-[#473B31] font-['Assistant']">
              תצוגה מקדימה של המייל ללקוח
            </h1>
            <p className="text-[#87674F] font-light font-['Assistant']">
              בדוק איך המייל שהלקוח מקבל נראה
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#87674F]/20">
              <h2 className="text-lg font-medium text-[#473B31] mb-4 font-['Assistant']">
                הגדרות בדיקה
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#473B31] mb-2 font-['Assistant']">
                    קוד עושר
                  </label>
                  <Input
                    type="number"
                    value={wealthCode}
                    onChange={(e) => setWealthCode(parseInt(e.target.value) || 1234)}
                    min={1111}
                    max={9999}
                    className="text-center font-['Assistant']"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#473B31] mb-2 font-['Assistant']">
                    שם הלקוח
                  </label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="שם הלקוח"
                    className="font-['Assistant']"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#473B31] mb-2 font-['Assistant']">
                    מצב תצוגה
                  </label>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={viewMode === 'html' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('html')}
                      className="w-full justify-start font-['Assistant']"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      תצוגת HTML
                    </Button>
                    <Button
                      variant={viewMode === 'text' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('text')}
                      className="w-full justify-start font-['Assistant']"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      תצוגת טקסט
                    </Button>
                    <Button
                      variant={viewMode === 'data' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('data')}
                      className="w-full justify-start font-['Assistant']"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      מבנה הנתונים
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#87674F]/10 rounded-lg">
                <h3 className="font-medium text-[#473B31] mb-2 font-['Assistant']">
                  כותרת המייל:
                </h3>
                <p className="text-sm text-[#87674F] font-['Assistant']">
                  {emailSubject}
                </p>
              </div>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-[#87674F]/20">
              <div className="p-4 border-b border-[#87674F]/20">
                <h2 className="text-lg font-medium text-[#473B31] font-['Assistant']">
                  תצוגה מקדימה
                </h2>
              </div>

              <div className="p-6">
                {viewMode === 'html' && (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <iframe
                      srcDoc={emailHTML}
                      className="w-full h-[800px] border-none"
                      title="Email Preview"
                    />
                  </div>
                )}

                {viewMode === 'text' && (
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-[800px] overflow-y-auto">
                    {emailText}
                  </div>
                )}

                {viewMode === 'data' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-[#473B31] mb-2 font-['Assistant']">
                        נתוני האימייל
                      </h3>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(emailData, null, 2)}
                      </pre>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-[#473B31] mb-2 font-['Assistant']">
                        לינקים במייל
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>צפייה באתר:</strong>
                          <br />
                          <a 
                            href={emailData.viewUrl} 
                            className="text-blue-600 hover:underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {emailData.viewUrl}
                          </a>
                        </div>
                        <div>
                          <strong>הורדת PDF:</strong>
                          <br />
                          <span className="text-gray-600 break-all">
                            {emailData.downloadUrl}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={() => {
              const blob = new Blob([emailHTML], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `email-preview-${wealthCode}.html`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-[#87674F] hover:bg-[#95705D] text-white font-['Assistant']"
          >
            <Download className="w-4 h-4 mr-2" />
            הורד HTML
          </Button>
        </div>
      </div>
    </div>
  );
}
