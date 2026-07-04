import { describe, expect, it } from 'vitest';
import { generateCpf, CpfGenerator } from '../../src/cpf/generator';
import { validateCpf } from '../../src/cpf/validator';
import { maskCpf } from '../../src/cpf/masker';

describe('generateCpf', () => {
  it('generates valid unformatted CPF', () => {
    const cpf = generateCpf();
    expect(cpf).toHaveLength(11);
    expect(validateCpf(cpf)).toBe(true);
  });

  it('generates valid formatted CPF', () => {
    const cpf = generateCpf({ formatted: true });
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(validateCpf(cpf)).toBe(true);
  });

  it('round-trips through mask and validate', () => {
    const cpf = generateCpf();
    expect(validateCpf(maskCpf(cpf))).toBe(true);
  });

  it('exposes grouped API', () => {
    const cpf = CpfGenerator.generate();
    expect(validateCpf(cpf)).toBe(true);
  });
});
