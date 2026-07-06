import { generateCpf } from './generator';
import { maskCpf } from './masker';
import { stripCpf } from './strip';
import { validateCpf } from './validator';

/** Unified CPF utility namespace. */
export const Cpf = {
  validate: validateCpf,
  mask: maskCpf,
  generate: generateCpf,
  strip: stripCpf,
} as const;
