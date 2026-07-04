import { describe, expect, it } from 'vitest';
import { maskCnpj, CnpjMasker } from '../../src/cnpj/masker';

const LEGACY_PARTIAL = [
  { input: '0', expected: '0' },
  { input: '04', expected: '04' },
  { input: '042', expected: '04.2' },
  { input: '0425', expected: '04.25' },
  { input: '04252', expected: '04.252' },
  { input: '042520', expected: '04.252.0' },
  { input: '0425201', expected: '04.252.01' },
  { input: '04252011', expected: '04.252.011' },
  { input: '042520110', expected: '04.252.011/0' },
  { input: '0425201100', expected: '04.252.011/00' },
  { input: '04252011000', expected: '04.252.011/000' },
  { input: '042520110001', expected: '04.252.011/0001' },
  { input: '0425201100011', expected: '04.252.011/0001-1' },
] as const;

const ALPHANUMERIC_PARTIAL = [
  { input: '1', expected: '1' },
  { input: '12', expected: '12' },
  { input: '12A', expected: '12.A' },
  { input: '12AB', expected: '12.AB' },
  { input: '12ABC', expected: '12.ABC' },
  { input: '12ABC3', expected: '12.ABC.3' },
  { input: '12ABC34', expected: '12.ABC.34' },
  { input: '12ABC345', expected: '12.ABC.345' },
  { input: '12ABC3450', expected: '12.ABC.345/0' },
  { input: '12ABC34501', expected: '12.ABC.345/01' },
  { input: '12ABC34501D', expected: '12.ABC.345/01D' },
  { input: '12ABC34501DE', expected: '12.ABC.345/01DE' },
  { input: '12ABC34501DE3', expected: '12.ABC.345/01DE-3' },
] as const;

describe('maskCnpj', () => {
  it('formats 14 legacy digits', () => {
    expect(maskCnpj('04252011000110')).toBe('04.252.011/0001-10');
  });

  it('formats alphanumeric CNPJ', () => {
    expect(maskCnpj('12ABC34501DE35')).toBe('12.ABC.345/01DE-35');
  });

  it('is idempotent when already masked', () => {
    expect(maskCnpj('04.252.011/0001-10')).toBe('04.252.011/0001-10');
    expect(maskCnpj('12.ABC.345/01DE-35')).toBe('12.ABC.345/01DE-35');
  });

  it.each(LEGACY_PARTIAL)(
    'applies progressive legacy mask for partial input ($input)',
    ({ input, expected }) => {
      expect(maskCnpj(input, { legacyOnly: true })).toBe(expected);
    },
  );

  it.each(ALPHANUMERIC_PARTIAL)(
    'applies progressive alphanumeric mask for partial input ($input)',
    ({ input, expected }) => {
      expect(maskCnpj(input)).toBe(expected);
    },
  );

  it('applies progressive alphanumeric mask from masked partial input', () => {
    expect(maskCnpj('12.AB')).toBe('12.AB');
    expect(maskCnpj('12.ABC.34')).toBe('12.ABC.34');
    expect(maskCnpj('12.ABC.345/01')).toBe('12.ABC.345/01');
  });

  it('exposes grouped API', () => {
    expect(CnpjMasker.mask('04252011000110')).toBe('04.252.011/0001-10');
    expect(CnpjMasker.mask('12ABC34501DE35')).toBe('12.ABC.345/01DE-35');
  });
});
