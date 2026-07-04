import { randomDigits } from '../shared/random-digits';
import { maskCpf } from './masker';
import { buildCpfDigits } from './_internal/check-digit';

/** Options for {@link generateCpf}. */
export type GenerateCpfOptions = {
  /** When `true`, returns the CPF with mask applied. */
  formatted?: boolean;
};

/**
 * Generates a mathematically valid but fictitious CPF.
 *
 * For tests, seeds, and fixtures only — not for real documents.
 *
 * @param options - Generation options
 * @returns 11-digit CPF, or masked when `formatted: true`
 *
 * @example
 * ```ts
 * generateCpf();                      // '52998224725'
 * generateCpf({ formatted: true });   // '529.982.247-25'
 * ```
 */
export function generateCpf(options?: GenerateCpfOptions): string {
  const base = randomDigits(9);
  const digits = buildCpfDigits(base);

  if (options?.formatted) {
    return maskCpf(digits);
  }

  return digits;
}

/** Namespaced CPF generation API. */
export const CpfGenerator = { generate: generateCpf } as const;
