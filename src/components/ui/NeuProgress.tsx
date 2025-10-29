interface NeuProgressProps {
  value: number; // 0-100
  label?: string;
}

export default function NeuProgress({ value, label }: NeuProgressProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full" dir="rtl">
      {label && <div className="text-sm text-text/70 mb-2">{label}</div>}
      <div className="w-full h-3 rounded-full neu-inset-min overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-support transition-all duration-500 rounded-full"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <div className="text-xs text-text/70 mt-1 text-left" dir="ltr">
        {clampedValue}%
      </div>
    </div>
  );
}
