import { describe, expect, it } from 'vitest';
import { maskCpf, CpfMasker } from '../../src/cpf/masker';

const PARTIAL = [
  { input: '5', expected: '5' },
  { input: '52', expected: '52' },
  { input: '529', expected: '529' },
  { input: '5299', expected: '529.9' },
  { input: '52998', expected: '529.98' },
  { input: '529982', expected: '529.982' },
  { input: '5299822', expected: '529.982.2' },
  { input: '52998224', expected: '529.982.24' },
  { input: '529982247', expected: '529.982.247' },
  { input: '5299822472', expected: '529.982.247-2' },
  { input: '52998224725', expected: '529.982.247-25' },
] as const;

describe('maskCpf', () => {
  it('formats 11 digits', () => {
    expect(maskCpf('52998224725')).toBe('529.982.247-25');
  });

  it('is idempotent when already masked', () => {
    expect(maskCpf('529.982.247-25')).toBe('529.982.247-25');
  });

  it.each(PARTIAL)(
    'applies progressive mask for partial input ($input)',
    ({ input, expected }) => {
      expect(maskCpf(input)).toBe(expected);
    },
  );

  it('applies progressive mask from masked partial input', () => {
    expect(maskCpf('529.98')).toBe('529.98');
    expect(maskCpf('529.982.24')).toBe('529.982.24');
  });

  it('exposes grouped API', () => {
    expect(CpfMasker.mask('52998224725')).toBe('529.982.247-25');
  });
});
