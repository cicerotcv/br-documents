import { describe, expect, it } from 'vitest';
import { normalizeCnpj } from '../../src/shared/normalize-cnpj';

describe('normalizeCnpj', () => {
  it('removes punctuation and uppercases letters', () => {
    expect(normalizeCnpj('12.abc.345/01de-35')).toBe('12ABC34501DE35');
  });
});
