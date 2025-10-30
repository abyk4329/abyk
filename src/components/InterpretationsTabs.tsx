import { useEffect, useState } from 'react';
import { codeStructures } from '../content/wealth-code/codeStructures';
import { dailyApplication } from '../content/wealth-code/dailyApplication';
import {
  digitInterpretations,
  hebrewFieldLabels,
} from '../content/wealth-code/digitInterpretations';
import { identifyCodeType } from '../scripts/calculator';

interface InterpretationsTabsProps {
  code?: string;
}

export default function InterpretationsTabs({
  code: initialCode,
}: InterpretationsTabsProps) {
  const [code, setCode] = useState(initialCode ?? '');
  const [isResolved, setIsResolved] = useState(!!initialCode);
  const [activeTab, setActiveTab] = useState<
    number | 'structure' | 'daily' | null
  >(null);

  // פונקציה להדגשת טקסט לפני מקף
  const renderTextWithBoldPrefix = (text: string) => {
    const dashIndex = text.indexOf(' – ');
    if (dashIndex === -1) return text;

    const prefix = text.substring(0, dashIndex);
    const rest = text.substring(dashIndex);

    return (
      <>
        <strong className="font-bold">{prefix}</strong>
        {rest}
      </>
    );
  };

  // פונקציה לצביעת קווי הפרדה | בטקסט
  const renderTextWithColoredPipes = (text: string) => {
    if (!text.includes('|')) return text;

    const parts = text.split('|');
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="text-pipe-separator">|</span>
            )}
          </span>
        ))}
      </>
    );
  };

  useEffect(() => {
    let resolvedCode = '';

    if (initialCode && /^\d{4}$/.test(initialCode)) {
      resolvedCode = initialCode;
    } else if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlCode = searchParams.get('code');

      if (urlCode && /^\d{4}$/.test(urlCode)) {
        resolvedCode = urlCode;
      } else {
        const stored = sessionStorage.getItem('abyk:last-code');
        if (stored && /^\d{4}$/.test(stored)) {
          resolvedCode = stored;
          if (!urlCode) {
            searchParams.set('code', stored);
            const updatedUrl = `${
              window.location.pathname
            }?${searchParams.toString()}`;
            window.history.replaceState({}, '', updatedUrl);
          }
        }
      }
    }

    if (resolvedCode) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('abyk:last-code', resolvedCode);
      }
      setCode(resolvedCode);

      // גם מגדירים את activeTab כאן
      const digits = resolvedCode.split('').map(Number);
      const uniqueDigits = Array.from(new Set(digits)).sort((a, b) => a - b);
      if (uniqueDigits.length > 0) {
        console.log('Setting activeTab to:', uniqueDigits[0]);
        setActiveTab(uniqueDigits[0]);
      }
    }

    setIsResolved(true);
  }, [initialCode]);

  if (!isResolved) {
    return (
      <div className="card-surface text-center space-y-4">
        <p className="BodyText">טוען את הפירוש המלא...</p>
      </div>
    );
  }

  if (!code || !/^\d{4}$/.test(code)) {
    return (
      <div className="card-surface text-center space-y-4">
        <h2 className="CardTitle">לא נמצא קוד תקין</h2>
        <p className="BodyText">חזרו לחשב את קוד העושר שלכם</p>
        <a
          href="/tools/wealth-code/calculator"
          className="btn btn-cta justify-center ButtonPrimaryText"
        >
          חזרה למחשבון
        </a>
      </div>
    );
  }

  const digits = code.split('').map(Number);
  const codeType = identifyCodeType(code);

  // ספרות ייחודיות ממוינות בסדר עולה
  const uniqueDigits = Array.from(new Set(digits)).sort((a, b) => a - b);

  const typeNames = {
    master: 'קוד מאסטר',
    repeating: 'קוד עם ספרות חוזרות',
    diverse: 'קוד מגוון',
  };

  const handleDownloadPDF = async () => {
    try {
      console.log('=== Client: Starting PDF download ===');
      console.log('Code:', code);
      const url = `/api/generate-pdf?code=${code}`;
      console.log('Fetching:', url);

      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const blob = await response.blob();
        console.log('Blob size:', blob.size);
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `wealth-code-${code}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
        console.log('PDF downloaded successfully');
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        alert(`שגיאה: ${errorText}`);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('שגיאה בהורדת הקובץ. אנא נסה שוב מאוחר יותר.');
    }
  };

  const whatsappUrl = `https://wa.me/972524616121?text=${encodeURIComponent(
    'שלום, אשמח לייעוץ אישי לגבי קוד העושר שלי'
  )}`;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header with Code - styled like ResultCard */}
      <div className="card-surface max-w-2xl mx-auto">
        <div className="text-center">
          {/* Code Display - Each digit in separate card */}
          <div className="code-digit-list mb-6">
            {code.split('').map((digit, index) => (
              <div key={index} className="code-digit-card">
                <span>{digit}</span>
              </div>
            ))}
          </div>

          <div>
            <h1 className="Title">{typeNames[codeType]}</h1>
            <p className="BodyText">
              {codeType === 'master' && codeStructures.master}
              {codeType === 'repeating' && codeStructures.repeating}
              {codeType === 'diverse' && codeStructures.diverse}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="card-surface interpretations-tabs">
        {/* שורה ראשונה: כפתורי מספרים */}
        <div className="interpretations-tab-row">
          {uniqueDigits.map((digit) => (
            <button
              key={digit}
              onClick={() => setActiveTab(digit)}
              type="button"
              className={`interpretations-tab-button ${
                activeTab === digit ? 'interpretations-tab-button--active' : ''
              }`}
            >
              {digit}
            </button>
          ))}
        </div>

        {/* שורה שנייה: כפתור יישום יומי */}
        <button
          onClick={() => setActiveTab('daily')}
          type="button"
          className={`interpretations-tab-button interpretations-tab-button--full ${
            activeTab === 'daily' ? 'interpretations-tab-button--active' : ''
          }`}
        >
          יישום יומי
        </button>
      </div>

      {/* Tab Content */}
      <div className="card-surface interpretations-content">
        {activeTab === null && (
          <div className="text-center py-8">
            <p className="BodyText">טוען...</p>
          </div>
        )}

        {typeof activeTab === 'number' && (
          <div>
            {(() => {
              const interpretation = digitInterpretations[activeTab];

              if (!interpretation) {
                return (
                  <div className="text-center py-8">
                    <p className="BodyText">לא נמצא פירוש לספרה {activeTab}</p>
                  </div>
                );
              }

              return (
                <div className="space-y-6">
                  <div>
                    <h2 className="Title">{interpretation.title}</h2>
                    <p className="BodyText">{interpretation.essence}</p>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">{hebrewFieldLabels.gifts}</h3>
                    <ul className="interpretations-list">
                      {interpretation.gifts.map((gift, i) => (
                        <li
                          key={i}
                          className="BodyText interpretations-list-item"
                        >
                          {renderTextWithBoldPrefix(gift)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">{hebrewFieldLabels.blocks}</h3>
                    <ul className="interpretations-list">
                      {interpretation.blocks.map((block, i) => (
                        <li
                          key={i}
                          className="BodyText interpretations-list-item"
                        >
                          {renderTextWithBoldPrefix(block)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">{hebrewFieldLabels.redFlags}</h3>
                    <p className="BodyText">
                      {renderTextWithColoredPipes(interpretation.redFlags)}
                    </p>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">{hebrewFieldLabels.growth}</h3>
                    <ul className="interpretations-list">
                      {interpretation.growth.map((step, i) => (
                        <li
                          key={i}
                          className="BodyText interpretations-list-item"
                        >
                          {renderTextWithBoldPrefix(step)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">{hebrewFieldLabels.careers}</h3>
                    <p className="BodyText">
                      {renderTextWithColoredPipes(interpretation.careers)}
                    </p>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">
                      {hebrewFieldLabels.dailyPractice}
                    </h3>
                    <p className="BodyText">{interpretation.dailyPractice}</p>
                  </div>

                  <div className="interpretations-section">
                    <h3 className="Subtitle">{hebrewFieldLabels.bottomLine}</h3>
                    <p className="BodyText">{interpretation.bottomLine}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab === 'daily' && (
          <div className="space-y-6">
            <h2 className="Title">{dailyApplication.title}</h2>
            <p className="BodyText whitespace-pre-line">
              {dailyApplication.content}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="interpretations-actions">
        <button
          onClick={handleDownloadPDF}
          className="btn btn-cta ButtonPrimaryText"
          type="button"
        >
          הורדת PDF
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          ייעוץ אישי
        </a>

        <a href="/tools/wealth-code/calculator" className="btn btn-secondary">
          חישוב קוד נוסף
        </a>
      </div>
    </div>
  );
}
