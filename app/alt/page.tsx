import type { Metadata } from 'next';
import AltPageClient from './AltPageClient';

export const metadata: Metadata = {
  title: 'Alt Environment',
  robots: 'noindex, nofollow',
  referrer: 'no-referrer',
};

export default function AltPage() {
  return (
    <div className="container mx-auto p-6 text-center" dir="rtl">
      <AltPageClient />
      <h1 className="text-2xl font-bold">סביבת Alt</h1>
      <p className="mt-4">עמוד בדיקות מבודד לצורך אימות תמה ו-NoIndex.</p>
    </div>
  );
}
