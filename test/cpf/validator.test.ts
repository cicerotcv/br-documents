import { describe, expect, it } from 'vitest';
import { validateCpf, CpfValidator } from '../../src/cpf/validator';

describe('validateCpf', () => {
  it('validates known valid CPF with mask', () => {
    expect(validateCpf('529.982.247-25')).toBe(true);
    expect(validateCpf('111.444.777-35')).toBe(true);
  });

  it('validates known valid CPF without mask', () => {
    expect(validateCpf('52998224725')).toBe(true);
    expect(validateCpf('11144477735')).toBe(true);
  });

  it('rejects invalid check digits', () => {
    expect(validateCpf('529.982.247-00')).toBe(false);
    expect(validateCpf('111.444.777-00')).toBe(false);
  });

  it('rejects repeated sequences', () => {
    expect(validateCpf('111.111.111-11')).toBe(false);
    expect(validateCpf('00000000000')).toBe(false);
  });

  it('rejects wrong length', () => {
    expect(validateCpf('1234567890')).toBe(false);
    expect(validateCpf('')).toBe(false);
  });

  it('exposes grouped API', () => {
    expect(CpfValidator.validate('529.982.247-25')).toBe(true);
  });
});
