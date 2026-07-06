import { digitsOnly } from '../shared/digits-only';

/**
 * Removes CPF mask punctuation and whitespace.
 *
 * @param value - CPF string with or without mask
 * @returns Unmasked CPF containing digits only
 *
 * @example
 * ```ts
 * stripCpf('529.982.247-25'); // '52998224725'
 * stripCpf('529 982 247 25'); // '52998224725'
 * ```
 */
export function stripCpf(value: string): string {
  return digitsOnly(value.replace(/\s/g, ''));
}

/** Namespaced CPF strip API. */
export const CpfStripper = { strip: stripCpf } as const;
