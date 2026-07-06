import { describe, expect, it } from 'vitest';
import { stripCpf, CpfStripper } from '../../src/cpf/strip';

describe('stripCpf', () => {
  it('removes mask punctuation', () => {
    expect(stripCpf('529.982.247-25')).toBe('52998224725');
  });

  it('leaves unmasked input unchanged', () => {
    expect(stripCpf('52998224725')).toBe('52998224725');
  });

  it('removes whitespace', () => {
    expect(stripCpf('529 982 247 25')).toBe('52998224725');
    expect(stripCpf(' 529.982.247-25 ')).toBe('52998224725');
  });

  it('preserves partial input', () => {
    expect(stripCpf('529.982')).toBe('529982');
  });

  it('exposes grouped API', () => {
    expect(CpfStripper.strip('529.982.247-25')).toBe('52998224725');
  });
});
