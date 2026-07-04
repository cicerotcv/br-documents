import { digitsOnly } from '../shared/digits-only';
import { isRepeatedSequence } from '../shared/is-repeated-sequence';
import { buildCpfDigits } from './_internal/check-digit';

/**
 * Validates a Brazilian CPF (Cadastro de Pessoas Físicas).
 *
 * Accepts masked (`XXX.XXX.XXX-XX`) or unmasked input. Rejects invalid check
 * digits and repeated sequences (e.g. `111.111.111-11`).
 *
 * @param value - CPF string with or without mask
 * @returns `true` when the CPF is valid
 *
 * @example
 * ```ts
 * validateCpf('529.982.247-25'); // true
 * validateCpf('111.111.111-11'); // false
 * ```
 */
export function validateCpf(value: string): boolean {
  const digits = digitsOnly(value);

  if (digits.length !== 11) {
    return false;
  }

  if (isRepeatedSequence(digits)) {
    return false;
  }

  const base = digits.slice(0, 9);
  const expected = buildCpfDigits(base);

  return digits === expected;
}

/** Namespaced CPF validation API. */
export const CpfValidator = { validate: validateCpf } as const;
