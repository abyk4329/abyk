import {
  ResultSection,
  PageWrapper,
} from "@/app/components/sections";
import {
  NumerologyCalculation,
  calculateWealthCode,
  formatCodeLabel,
  getInterpretation,
} from "@/lib/utils";

interface ResultPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getParamValue(value?: string | string[]): string | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function buildFallbackCalculation(code: number): NumerologyCalculation {
  return {
    code,
    codeLabel: formatCodeLabel(code),
    nameValue: 0,
    birthValue: 0,
    reducedName: 0,
    reducedBirth: 0,
    total: code,
    breakdown: ["הקוד הוזן ישירות מהקישור. להזנת פרטים מלאים, חזרי למחשבון."],
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const resolvedParams = (await searchParams) ?? {};

  const codeParam = getParamValue(resolvedParams.code);
  const fullName = getParamValue(resolvedParams.fullName);
  const email = getParamValue(resolvedParams.email);
  const notes = getParamValue(resolvedParams.notes);
  const birthDate = getParamValue(resolvedParams.birthDate);

  const code = codeParam ? Number(codeParam) : NaN;
  const hasValidCode = !Number.isNaN(code) && code > 0;

  let calculation: NumerologyCalculation | null = null;

  if (hasValidCode) {
    if (fullName && birthDate) {
      const computed = calculateWealthCode({ fullName, birthDate });
      calculation = { ...computed, code };
    } else {
      calculation = buildFallbackCalculation(code);
    }
  }

  const interpretation = hasValidCode ? getInterpretation(code) : undefined;

  if (!calculation) {
    return (
      <PageWrapper
        title="תוצאות החישוב"
        subtitle="AWAKENING CODE"
        description="לא זוהה קוד בתצוגה. נא לחזור למחשבון, להזין פרטים ולהפיק את הקוד מחדש."
        maxWidth="md"
      >
        <div className="rounded-3xl border border-border bg-white/80 p-8 text-right text-brown-dark/80">
          <p>
            ייתכן שהקישור אינו מלא. ודאי שהקוד קיים בפרמטר <code>code</code> בכתובת.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <ResultSection
      calculation={calculation}
      interpretation={interpretation}
      fullName={fullName}
      email={email}
      notes={notes}
      generatedAt={new Date()}
    />
  );
}
