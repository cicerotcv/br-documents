import { digitsOnly } from '../shared/digits-only';

const CPF_MASK = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;

function formatCpf(digits: string): string {
  return digits.replace(CPF_MASK, '$1.$2.$3-$4');
}

function progressiveMask(digits: string): string {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

/**
 * Applies the CPF mask (`XXX.XXX.XXX-XX`).
 *
 * Idempotent when the value is already fully masked. Applies a progressive
 * mask for partial input (1–10 digits).
 *
 * @param value - CPF string, masked or unmasked
 * @returns Formatted or progressively masked string
 *
 * @example
 * ```ts
 * maskCpf('52998224725');     // '529.982.247-25'
 * maskCpf('529.982.247-25'); // '529.982.247-25'
 * maskCpf('529982');         // '529.982'
 * ```
 */
export function maskCpf(value: string): string {
  const digits = digitsOnly(value);

  if (digits.length === 11) {
    return formatCpf(digits);
  }

  if (digits.length === 0) {
    return value.trim() === '' ? '' : digitsOnly(value);
  }

  return progressiveMask(digits);
}

/** Namespaced CPF masking API. */
export const CpfMasker = { mask: maskCpf } as const;
