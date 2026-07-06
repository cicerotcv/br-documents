import { validateCnpj } from './cnpj/validator';
import { validateCpf } from './cpf/validator';
import { digitsOnly } from './shared/digits-only';
import { normalizeCnpj } from './shared/normalize-cnpj';

/**
 * Removes mask punctuation and whitespace from a CPF or CNPJ string.
 *
 * Detects alphanumeric CNPJ by the presence of letters; otherwise returns
 * digits only.
 *
 * @param value - CPF or CNPJ string with or without mask
 * @returns Unmasked document body
 *
 * @example
 * ```ts
 * strip('529.982.247-25');        // '52998224725'
 * strip('12.abc.345/01de-35');    // '12ABC34501DE35'
 * ```
 */
export function strip(value: string): string {
  const cleaned = value.replace(/\s/g, '');
  return /[A-Za-z]/.test(cleaned)
    ? normalizeCnpj(cleaned)
    : digitsOnly(cleaned);
}

/**
 * Returns `true` when the value is a valid CPF or CNPJ.
 *
 * Accepts masked or unmasked input. CNPJ validation uses alphanumeric mode
 * by default (legacy numeric CNPJs remain valid).
 *
 * @param value - CPF or CNPJ string
 * @returns `true` when the document is valid
 *
 * @example
 * ```ts
 * isValid('529.982.247-25');      // true
 * isValid('04.252.011/0001-10');  // true
 * isValid('12.ABC.345/01DE-35');  // true
 * isValid('111.111.111-11');      // false
 * ```
 */
export function isValid(value: string): boolean {
  return validateCpf(value) || validateCnpj(value);
}

/** Cross-document utility namespace. */
export const BrDocument = { strip, isValid } as const;
