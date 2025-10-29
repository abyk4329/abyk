import type { ReactNode } from 'react';

interface NeuAlertProps {
  children: ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

export default function NeuAlert({
  children,
  type = 'info',
  onClose,
}: NeuAlertProps) {
  const typeStyles = {
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    error: 'border-red-200 bg-red-50 text-red-800',
  };

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div
      className={`neu-raised-min rounded-lg p-4 border ${typeStyles[type]}`}
      dir="rtl"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{icons[type]}</span>
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
            aria-label="סגור"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
