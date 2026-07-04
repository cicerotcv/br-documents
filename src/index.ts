/**
 * Validators, generators, and masks for Brazilian documents (CPF, CNPJ).
 *
 * Prefer subpath imports for tree-shaking:
 * `br-documents/cpf/validator`, `br-documents/cnpj/masker`, etc.
 *
 * @packageDocumentation
 */

export {
  validateCpf,
  CpfValidator,
  maskCpf,
  CpfMasker,
  generateCpf,
  CpfGenerator,
  type GenerateCpfOptions,
} from './cpf';

export {
  validateCnpj,
  CnpjValidator,
  maskCnpj,
  CnpjMasker,
  generateCnpj,
  CnpjGenerator,
  type CnpjOptions,
  type GenerateCnpjOptions,
} from './cnpj';
