import { describe, expect, it } from 'vitest';
import { strip, isValid, BrDocument } from '../src/br-document';

describe('strip', () => {
  it('strips CPF', () => {
    expect(strip('529.982.247-25')).toBe('52998224725');
    expect(strip('529 982 247 25')).toBe('52998224725');
  });

  it('strips legacy CNPJ', () => {
    expect(strip('04.252.011/0001-10')).toBe('04252011000110');
  });

  it('strips alphanumeric CNPJ', () => {
    expect(strip('12.abc.345/01de-35')).toBe('12ABC34501DE35');
  });
});

describe('isValid', () => {
  it('accepts valid CPF', () => {
    expect(isValid('529.982.247-25')).toBe(true);
  });

  it('accepts valid legacy CNPJ', () => {
    expect(isValid('04.252.011/0001-10')).toBe(true);
  });

  it('accepts valid alphanumeric CNPJ', () => {
    expect(isValid('12.ABC.345/01DE-35')).toBe(true);
  });

  it('rejects invalid check digits', () => {
    expect(isValid('529.982.247-00')).toBe(false);
    expect(isValid('12.ABC.345/01DE-36')).toBe(false);
  });

  it('rejects repeated sequences', () => {
    expect(isValid('111.111.111-11')).toBe(false);
    expect(isValid('00.000.000/0000-00')).toBe(false);
  });

  it('rejects wrong length', () => {
    expect(isValid('1234567890')).toBe(false);
    expect(isValid('')).toBe(false);
  });
});

describe('BrDocument', () => {
  it('exposes grouped API', () => {
    expect(BrDocument.strip('529.982.247-25')).toBe('52998224725');
    expect(BrDocument.isValid('529.982.247-25')).toBe(true);
    expect(BrDocument.isValid('111.111.111-11')).toBe(false);
  });
});
