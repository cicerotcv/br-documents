import { describe, expect, it } from 'vitest';
import { Cnpj } from '../../src/cnpj/cnpj';

describe('Cnpj', () => {
  it('validates legacy CNPJ', () => {
    expect(Cnpj.validate('04.252.011/0001-10')).toBe(true);
  });

  it('validates alphanumeric CNPJ', () => {
    expect(Cnpj.validate('12.ABC.345/01DE-35')).toBe(true);
  });

  it('masks legacy CNPJ', () => {
    expect(Cnpj.mask('04252011000110')).toBe('04.252.011/0001-10');
  });

  it('strips CNPJ', () => {
    expect(Cnpj.strip('12.abc.345/01de-35')).toBe('12ABC34501DE35');
  });

  it('generates valid CNPJ', () => {
    const cnpj = Cnpj.generate();
    expect(cnpj).toMatch(/^[0-9A-Z]{12}\d{2}$/);
    expect(Cnpj.validate(cnpj)).toBe(true);
  });
});
