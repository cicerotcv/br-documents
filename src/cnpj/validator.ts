import { digitsOnly } from '../shared/digits-only';
import { isRepeatedSequence } from '../shared/is-repeated-sequence';
import { normalizeCnpj } from '../shared/normalize-cnpj';
import { buildCnpjBody } from './_internal/check-digit';
import type { CnpjOptions } from './types';

function validateLegacyCnpj(value: string): boolean {
  const digits = digitsOnly(value);

  if (digits.length !== 14) {
    return false;
  }

  if (isRepeatedSequence(digits)) {
    return false;
  }

  const base = digits.slice(0, 12);
  const expected = buildCnpjBody(base);

  return digits === expected;
}

function validateAlphanumericCnpj(value: string): boolean {
  const body = normalizeCnpj(value);

  if (!/^[0-9A-Z]{12}\d{2}$/.test(body)) {
    return false;
  }

  if (isRepeatedSequence(body)) {
    return false;
  }

  const chars = body.split('');
  const expected = buildCnpjBody(body.slice(0, 12));

  return body === expected;
}

/**
 * Validates a Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica).
 *
 * By default uses alphanumeric mode (letters `A-Z` and digits in the first 12
 * positions). Legacy numeric CNPJs remain valid. Set `legacyOnly: true` to
 * reject values containing letters.
 *
 * @param value - CNPJ string with or without mask
 * @param options - Validation options
 * @returns `true` when the CNPJ is valid
 *
 * @example
 * ```ts
 * validateCnpj('12.ABC.345/01DE-35');                        // true
 * validateCnpj('11.222.333/0001-81');                        // true
 * validateCnpj('12.ABC.345/01DE-35', { legacyOnly: true }); // false
 * ```
 */
export function validateCnpj(value: string, options?: CnpjOptions): boolean {
  if (options?.legacyOnly) {
    return validateLegacyCnpj(value);
  }

  return validateAlphanumericCnpj(value);
}

/** Namespaced CNPJ validation API. */
export const CnpjValidator = { validate: validateCnpj } as const;

export type { CnpjOptions } from './types';
