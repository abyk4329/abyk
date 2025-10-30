import { useEffect, useState } from 'react';
import { codeStructures } from '../content/wealth-code/codeStructures';
import { identifyCodeType } from '../scripts/calculator';
import './ResultCard.css';

interface ResultCardProps {
  code: string;
}

export default function ResultCard({ code }: ResultCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // שמור את הקוד ב-sessionStorage למקרה שצריך אותו בעמודים אחרים
    if (code) {
      sessionStorage.setItem('abyk:last-code', code);
    }
  }, [code]);

  const codeType = identifyCodeType(code);

  const typeNames = {
    master: 'קוד מאסטר',
    repeating: 'קוד עם ספרות חוזרות',
    diverse: 'קוד מגוון',
  };

  const typeDescriptions = {
    master: codeStructures.master,
    repeating: codeStructures.repeating,
    diverse: codeStructures.diverse,
  };

  if (!mounted) {
    return (
      <div className="card-surface result-card max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface/50 rounded"></div>
          <div className="h-32 bg-surface/50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface result-card max-w-2xl mx-auto">
      <div className="result-header">
        <h2 className="CardTitle">קוד העושר שלך</h2>

        {/* Code Display - Each digit in separate card */}
        <div className="code-digit-list">
          {code.split('').map((digit, index) => (
            <div key={index} className="code-digit-card">
              <span>{digit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="result-description">
        <h3 className="SectionTitle">{typeNames[codeType]}</h3>
        <p className="BodyText">{typeDescriptions[codeType]}</p>
      </div>

      <div className="result-actions">
        <a
          href={`/tools/wealth-code/sales?code=${code}`}
          className="btn btn-primary justify-center ButtonPrimaryText"
        >
          קבלו את הפירוש המלא
        </a>
        <a
          href="/tools/wealth-code/calculator"
          className="btn btn-secondary justify-center ButtonSecondaryText"
        >
          חשבו קוד נוסף
        </a>
      </div>
    </div>
  );
}
