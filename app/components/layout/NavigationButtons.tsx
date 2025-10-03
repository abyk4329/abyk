"use client";

import { useRouter } from "next/navigation";

interface NavigationButtonsProps {
  backHref?: string;
  nextHref?: string;
  backLabel?: string;
  nextLabel?: string;
  onBack?: () => void;
  onNext?: () => void;
  disabled?: boolean;
}

export function NavigationButtons({
  backHref,
  nextHref,
  backLabel = "חזור",
  nextLabel = "המשך",
  onBack,
  onNext,
  disabled = false,
}: NavigationButtonsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextHref) {
      router.push(nextHref);
    }
  };

  return (
    <div className="flex justify-between gap-4 w-full max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="neuro-button-secondary rounded-2xl px-8 py-3 font-semibold active-press flex-1 md:flex-none"
      >
        ← {backLabel}
      </button>

      {/* Next Button */}
      {(nextHref || onNext) && (
        <button
          onClick={handleNext}
          disabled={disabled}
          className="neuro-button rounded-2xl px-8 py-3 font-semibold active-press flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextLabel} →
        </button>
      )}
    </div>
  );
}
