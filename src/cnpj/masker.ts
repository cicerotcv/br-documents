import { digitsOnly } from '../shared/digits-only';
import { normalizeCnpj } from '../shared/normalize-cnpj';
import type { CnpjOptions } from './types';

const CNPJ_MASK = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
const CNPJ_ALPHANUMERIC_MASK = /^(.{2})(.{3})(.{3})(.{4})(.{2})$/;

function formatLegacyCnpj(digits: string): string {
  return digits.replace(CNPJ_MASK, '$1.$2.$3/$4-$5');
}

function formatAlphanumericCnpj(body: string): string {
  return body.replace(CNPJ_ALPHANUMERIC_MASK, '$1.$2.$3/$4-$5');
}

function progressiveLegacyMask(digits: string): string {
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

function progressiveAlphanumericMask(body: string): string {
  if (body.length <= 2) return body;
  if (body.length <= 5) return `${body.slice(0, 2)}.${body.slice(2)}`;
  if (body.length <= 8) {
    return `${body.slice(0, 2)}.${body.slice(2, 5)}.${body.slice(5)}`;
  }
  if (body.length <= 12) {
    return `${body.slice(0, 2)}.${body.slice(2, 5)}.${body.slice(5, 8)}/${body.slice(8)}`;
  }
  return `${body.slice(0, 2)}.${body.slice(2, 5)}.${body.slice(5, 8)}/${body.slice(8, 12)}-${body.slice(12, 14)}`;
}

function maskLegacyCnpj(value: string): string {
  const digits = digitsOnly(value);

  if (digits.length === 14) {
    return formatLegacyCnpj(digits);
  }

  if (digits.length === 0) {
    return value.trim() === '' ? '' : digitsOnly(value);
  }

  return progressiveLegacyMask(digits);
}

function maskAlphanumericCnpj(value: string): string {
  const body = normalizeCnpj(value);

  if (body.length === 14) {
    return formatAlphanumericCnpj(body);
  }

  if (body.length === 0) {
    return value.trim() === '' ? '' : normalizeCnpj(value);
  }

  return progressiveAlphanumericMask(body);
}

/**
 * Applies the CNPJ mask (`XX.XXX.XXX/XXXX-XX`).
 *
 * Idempotent when the value is already fully masked. Applies a progressive
 * mask for partial input (1–13 characters).
 *
 * In default mode, accepts alphanumeric characters (`0-9`, `A-Z`). Set
 * `legacyOnly: true` for numeric-only masking.
 *
 * @param value - CNPJ string, masked or unmasked
 * @param options - Masking options
 * @returns Formatted or progressively masked string
 *
 * @example
 * ```ts
 * maskCnpj('04252011000110');   // '04.252.011/0001-10'
 * maskCnpj('12ABC34501DE35');    // '12.ABC.345/01DE-35'
 * maskCnpj('04252', { legacyOnly: true }); // '04.252'
 * ```
 */
export function maskCnpj(value: string, options?: CnpjOptions): string {
  if (options?.legacyOnly) {
    return maskLegacyCnpj(value);
  }

  return maskAlphanumericCnpj(value);
}

/** Namespaced CNPJ masking API. */
export const CnpjMasker = { mask: maskCnpj } as const;

export type { CnpjOptions } from './types';
