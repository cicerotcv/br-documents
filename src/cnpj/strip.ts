import { digitsOnly } from '../shared/digits-only';
import { normalizeCnpj } from '../shared/normalize-cnpj';
import type { CnpjOptions } from './types';

/**
 * Removes CNPJ mask punctuation and whitespace.
 *
 * By default uppercases letters for alphanumeric CNPJs. Set `legacyOnly: true`
 * to keep digits only.
 *
 * @param value - CNPJ string with or without mask
 * @param options - Strip options
 * @returns Unmasked CNPJ body without punctuation
 *
 * @example
 * ```ts
 * stripCnpj('12.abc.345/01de-35'); // '12ABC34501DE35'
 * stripCnpj('04.252.011/0001-10'); // '04252011000110'
 * ```
 */
export function stripCnpj(value: string, options?: CnpjOptions): string {
  const cleaned = value.replace(/\s/g, '');
  return options?.legacyOnly ? digitsOnly(cleaned) : normalizeCnpj(cleaned);
}

/** Namespaced CNPJ strip API. */
export const CnpjStripper = { strip: stripCnpj } as const;
