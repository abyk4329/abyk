import Link from "next/link";

import { StandardPageLayout } from "@/app/components/layout/StandardPageLayout";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import { Button } from "@/components/neu";

export default function NotFound() {
  return (
    <StandardPageLayout maxWidth="sm">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-[0.2em] text-[color:var(--neu-text-tertiary)]">
            404
          </p>
          <h1 className="text-3xl font-semibold text-[color:var(--neu-text-primary)]">
            הדף שחיפשת לא נמצא
          </h1>
          <p className="text-base text-[color:var(--neu-text-secondary)]">
            ייתכן שהקישור שגוי או שהעמוד הועבר. חוזרים למסע הנומרולוגי?
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={routes.calculator}>
            <Button variant="primary" className="w-full sm:w-auto">
              עברו למחשבון קוד העושר
            </Button>
          </Link>
          <Link href={routes.sales}>
            <Button variant="secondary" className="w-full sm:w-auto">
              גלו את המסלולים שלנו
            </Button>
          </Link>
        </div>
      </div>
    </StandardPageLayout>
  );
}
