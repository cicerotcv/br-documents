import { randomAlphanumeric } from '../shared/random-alphanumeric';
import { randomDigits } from '../shared/random-digits';
import { buildCnpjBody } from './_internal/check-digit';
import { maskCnpj } from './masker';
import type { GenerateCnpjOptions } from './types';

/**
 * Generates a mathematically valid but fictitious CNPJ.
 *
 * By default generates an alphanumeric base (`0-9`, `A-Z`). Set
 * `legacyOnly: true` for numeric-only output. For tests, seeds, and fixtures
 * only — not for real documents.
 *
 * @param options - Generation options
 * @returns 14-character CNPJ body, or masked when `formatted: true`
 *
 * @example
 * ```ts
 * generateCnpj();                              // '12ABC34501DE35'
 * generateCnpj({ formatted: true });           // '12.ABC.345/01DE-35'
 * generateCnpj({ legacyOnly: true });          // '04252011000110'
 * ```
 */
export function generateCnpj(options?: GenerateCnpjOptions): string {
  const legacyOnly = options?.legacyOnly ?? false;
  const base = legacyOnly ? randomDigits(12) : randomAlphanumeric(12);
  const body = buildCnpjBody(base);

  if (options?.formatted) {
    return maskCnpj(body, { legacyOnly });
  }

  return body;
}

/** Namespaced CNPJ generation API. */
export const CnpjGenerator = { generate: generateCnpj } as const;

export type { GenerateCnpjOptions } from './types';
