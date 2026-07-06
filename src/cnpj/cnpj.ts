import { generateCnpj } from './generator';
import { maskCnpj } from './masker';
import { stripCnpj } from './strip';
import { validateCnpj } from './validator';

/** Unified CNPJ utility namespace. */
export const Cnpj = {
  validate: validateCnpj,
  mask: maskCnpj,
  generate: generateCnpj,
  strip: stripCnpj,
} as const;
