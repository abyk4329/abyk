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
      <div className="neu-raised-min rounded-lg card-mobile-padding text-center space-y-4">
        <p className="BodyText">טוען את הפירוש המלא...</p>
      </div>
    );
  }

  if (!code || !/^\d{4}$/.test(code)) {
    return (
      <div className="neu-raised-min rounded-lg card-mobile-padding text-center space-y-4">
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
      <div className="neu-raised-min rounded-lg card-mobile-padding max-w-2xl mx-auto">
        <div className="text-center">
          {/* Code Display - Each digit in separate card */}
          <div className="flex justify-center gap-3 mb-6">
            {code.split('').map((digit, index) => (
              <div
                key={index}
                className="neu-raised-min rounded-lg w-16 h-20 flex items-center justify-center"
              >
                <span className="text-5xl font-extralight text-support leading-none">
                  {digit}
                </span>
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
      <div className="neu-raised-min rounded-lg p-2 space-y-2">
        {/* שורה ראשונה: כפתורי מספרים */}
        <div className="flex gap-2">
          {uniqueDigits.map((digit) => (
            <button
              key={digit}
              onClick={() => setActiveTab(digit)}
              className={`flex-1 p-4 rounded-md font-semibold transition-all ${
                activeTab === digit
                  ? 'bg-support text-bg shadow-md'
                  : 'hover:shadow-neu-inset'
              }`}
            >
              {digit}
            </button>
          ))}
        </div>

        {/* שורה שנייה: כפתור יישום יומי */}
        <button
          onClick={() => setActiveTab('daily')}
          className={`w-full p-4 rounded-md font-semibold transition-all ${
            activeTab === 'daily'
              ? 'bg-support text-bg shadow-md'
              : 'hover:shadow-neu-inset'
          }`}
        >
          יישום יומי
        </button>
      </div>

      {/* Tab Content */}
      <div className="neu-raised-min rounded-lg card-mobile-padding">
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
                <>
                  <div className="pb-6">
                    <h2 className="Title">{interpretation.title}</h2>
                    <p className="BodyText">{interpretation.essence}</p>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">{hebrewFieldLabels.gifts}</h3>
                    <ul className="divide-y divide-support/30">
                      {interpretation.gifts.map((gift, i) => (
                        <li key={i} className="BodyText py-3">
                          {renderTextWithBoldPrefix(gift)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">{hebrewFieldLabels.blocks}</h3>
                    <ul className="divide-y divide-support/30">
                      {interpretation.blocks.map((block, i) => (
                        <li key={i} className="BodyText py-3">
                          {renderTextWithBoldPrefix(block)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">{hebrewFieldLabels.redFlags}</h3>
                    <p className="BodyText">
                      {renderTextWithColoredPipes(interpretation.redFlags)}
                    </p>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">{hebrewFieldLabels.growth}</h3>
                    <ul className="divide-y divide-support/30">
                      {interpretation.growth.map((step, i) => (
                        <li key={i} className="BodyText py-3">
                          {renderTextWithBoldPrefix(step)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">{hebrewFieldLabels.careers}</h3>
                    <p className="BodyText">
                      {renderTextWithColoredPipes(interpretation.careers)}
                    </p>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">
                      {hebrewFieldLabels.dailyPractice}
                    </h3>
                    <p className="BodyText">{interpretation.dailyPractice}</p>
                  </div>

                  <div className="border-t border-support py-6">
                    <h3 className="Subtitle">{hebrewFieldLabels.bottomLine}</h3>
                    <p className="BodyText">{interpretation.bottomLine}</p>
                  </div>
                </>
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
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={handleDownloadPDF}
          className="neu-raised-min rounded-lg card-mobile-padding text-center hover:shadow-neu-inset transition-shadow"
        >
          <svg
            className="w-8 h-8 mx-auto mb-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <h3 className="font-semibold">הורדת PDF</h3>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="neu-raised-min rounded-lg card-mobile-padding text-center hover:shadow-neu-inset transition-shadow"
        >
          <svg
            className="w-8 h-8 mx-auto mb-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          <h3 className="font-semibold">ייעוץ אישי</h3>
        </a>

        <a
          href="/tools/wealth-code/calculator"
          className="neu-raised-min rounded-lg card-mobile-padding text-center hover:shadow-neu-inset transition-shadow"
        >
          <svg
            className="w-8 h-8 mx-auto mb-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
            />
          </svg>
          <h3 className="font-semibold">חישוב קוד נוסף</h3>
        </a>
      </div>
    </div>
  );
}
