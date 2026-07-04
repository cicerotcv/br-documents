/**
 * Normalizes a CNPJ string for alphanumeric processing.
 *
 * Removes mask punctuation (`.`, `-`, `/`) and uppercases letters.
 *
 * @param value - Raw CNPJ input
 * @returns Normalized 14-character body without punctuation
 *
 * @example
 * ```ts
 * normalizeCnpj('12.abc.345/01de-35'); // '12ABC34501DE35'
 * ```
 */
export function normalizeCnpj(value: string): string {
  return value.replace(/[.\-/]/g, '').toUpperCase();
}
