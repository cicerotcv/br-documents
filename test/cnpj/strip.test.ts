import { describe, expect, it } from 'vitest';
import { stripCnpj, CnpjStripper } from '../../src/cnpj/strip';

describe('stripCnpj', () => {
  it('removes mask punctuation from legacy CNPJ', () => {
    expect(stripCnpj('04.252.011/0001-10')).toBe('04252011000110');
  });

  it('removes mask punctuation and uppercases alphanumeric CNPJ', () => {
    expect(stripCnpj('12.abc.345/01de-35')).toBe('12ABC34501DE35');
  });

  it('removes whitespace', () => {
    expect(stripCnpj('04 252 011 0001 10')).toBe('04252011000110');
    expect(stripCnpj(' 12.ABC.345/01DE-35 ')).toBe('12ABC34501DE35');
  });

  it('uses digits only in legacy mode', () => {
    expect(stripCnpj('04.252.011/0001-10', { legacyOnly: true })).toBe(
      '04252011000110',
    );
    expect(stripCnpj('12.ABC.345/01DE-35', { legacyOnly: true })).toBe(
      '123450135',
    );
  });

  it('exposes grouped API', () => {
    expect(CnpjStripper.strip('04.252.011/0001-10')).toBe('04252011000110');
  });
});
