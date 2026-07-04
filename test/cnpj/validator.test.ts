import { describe, expect, it } from 'vitest';
import { validateCnpj, CnpjValidator } from '../../src/cnpj/validator';

describe('validateCnpj', () => {
  it('validates known valid legacy CNPJ with mask', () => {
    expect(validateCnpj('04.252.011/0001-10')).toBe(true);
    expect(validateCnpj('11.222.333/0001-81')).toBe(true);
  });

  it('validates known valid legacy CNPJ without mask', () => {
    expect(validateCnpj('04252011000110')).toBe(true);
    expect(validateCnpj('11222333000181')).toBe(true);
  });

  it('accepts the official alphanumeric example', () => {
    expect(validateCnpj('12.ABC.345/01DE-35')).toBe(true);
  });

  it('rejects invalid check digits on the official alphanumeric example', () => {
    expect(validateCnpj('12.ABC.345/01DE-36')).toBe(false);
  });

  it('accepts legacy numeric CNPJ in legacy mode', () => {
    expect(validateCnpj('11.222.333/0001-81', { legacyOnly: true })).toBe(true);
  });

  it('rejects letters in legacy mode', () => {
    expect(validateCnpj('12.ABC.345/01DE-35', { legacyOnly: true })).toBe(
      false,
    );
  });

  it('rejects invalid check digits', () => {
    expect(validateCnpj('04.252.011/0001-00')).toBe(false);
  });

  it('rejects repeated sequences', () => {
    expect(validateCnpj('11.111.111/1111-11')).toBe(false);
    expect(validateCnpj('00000000000000')).toBe(false);
    expect(validateCnpj('AA.AAA.AAA/AAAA-AA')).toBe(false);
  });

  it('rejects wrong length', () => {
    expect(validateCnpj('1234567890123')).toBe(false);
    expect(validateCnpj('')).toBe(false);
  });

  it('exposes grouped API', () => {
    expect(CnpjValidator.validate('04.252.011/0001-10')).toBe(true);
    expect(CnpjValidator.validate('12.ABC.345/01DE-35')).toBe(true);
  });
});
