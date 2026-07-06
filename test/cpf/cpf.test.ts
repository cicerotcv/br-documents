import { describe, expect, it } from 'vitest';
import { Cpf } from '../../src/cpf/cpf';

describe('Cpf', () => {
  it('validates CPF', () => {
    expect(Cpf.validate('529.982.247-25')).toBe(true);
    expect(Cpf.validate('111.111.111-11')).toBe(false);
  });

  it('masks CPF', () => {
    expect(Cpf.mask('52998224725')).toBe('529.982.247-25');
  });

  it('strips CPF', () => {
    expect(Cpf.strip('529.982.247-25')).toBe('52998224725');
  });

  it('generates valid CPF', () => {
    const cpf = Cpf.generate();
    expect(cpf).toMatch(/^\d{11}$/);
    expect(Cpf.validate(cpf)).toBe(true);
  });
});
