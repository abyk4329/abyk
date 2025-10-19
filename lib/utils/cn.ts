/**
 * Lightweight className concatenation helper. Avoids pulling in external deps like clsx.
 */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
