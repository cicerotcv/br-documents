import { describe, expect, it } from 'vitest';
import { digitsOnly } from '../../src/shared/digits-only';
import { normalizeCnpj } from '../../src/shared/normalize-cnpj';
import { generateCnpj, CnpjGenerator } from '../../src/cnpj/generator';
import { validateCnpj } from '../../src/cnpj/validator';
import { maskCnpj } from '../../src/cnpj/masker';

describe('generateCnpj', () => {
  it('generates valid unformatted legacy CNPJ', () => {
    const cnpj = generateCnpj({ legacyOnly: true });
    expect(cnpj).toHaveLength(14);
    expect(validateCnpj(cnpj, { legacyOnly: true })).toBe(true);
  });

  it('generates only digits in legacy mode', () => {
    for (let index = 0; index < 20; index += 1) {
      const cnpj = generateCnpj({ legacyOnly: true });
      expect(digitsOnly(cnpj)).toMatch(/^\d{14}$/);
      expect(validateCnpj(cnpj, { legacyOnly: true })).toBe(true);
    }
  });

  it('generates valid formatted legacy CNPJ', () => {
    const cnpj = generateCnpj({ legacyOnly: true, formatted: true });
    expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    expect(validateCnpj(cnpj, { legacyOnly: true })).toBe(true);
  });

  it('generates valid unformatted alphanumeric CNPJ', () => {
    const cnpj = generateCnpj();
    expect(cnpj).toHaveLength(14);
    expect(validateCnpj(cnpj)).toBe(true);
  });

  it('can generate alphanumeric CNPJs with letters', () => {
    let hasLetter = false;

    for (let index = 0; index < 100; index += 1) {
      const cnpj = generateCnpj();
      expect(validateCnpj(cnpj)).toBe(true);
      if (/[A-Z]/.test(normalizeCnpj(cnpj))) {
        hasLetter = true;
        break;
      }
    }

    expect(hasLetter).toBe(true);
  });

  it('generates valid formatted alphanumeric CNPJ', () => {
    const cnpj = generateCnpj({ formatted: true });
    expect(cnpj).toMatch(
      /^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/[0-9A-Z]{4}-\d{2}$/,
    );
    expect(validateCnpj(cnpj)).toBe(true);
  });

  it('round-trips through mask and validate', () => {
    const cnpj = generateCnpj();
    expect(validateCnpj(maskCnpj(cnpj))).toBe(true);
  });

  it('exposes grouped API', () => {
    const cnpj = CnpjGenerator.generate();
    expect(validateCnpj(cnpj)).toBe(true);
  });
});
