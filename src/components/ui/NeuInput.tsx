import type { InputHTMLAttributes } from 'react';

interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function NeuInput({ label, ...props }: NeuInputProps) {
  return (
    <div className="relative flex flex-col gap-2">
      <input
        {...props}
        className="w-full h-12 px-4 rounded-lg text-base bg-transparent text-text transition-all duration-300 neu-inset-min focus:shadow-neu-inset focus:outline-none peer"
      />
      <label
        className="absolute right-4 top-3 text-sm text-text/70 pointer-events-none transition-all duration-300 peer-focus:text-xs peer-focus:-translate-y-7 peer-focus:text-accent peer-valid:text-xs peer-valid:-translate-y-7"
        dir="rtl"
      >
        {label}
      </label>
    </div>
  );
}
