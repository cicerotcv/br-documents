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
  stripCpf,
  CpfStripper,
  Cpf,
  type GenerateCpfOptions,
} from './cpf';

export {
  validateCnpj,
  CnpjValidator,
  maskCnpj,
  CnpjMasker,
  generateCnpj,
  CnpjGenerator,
  stripCnpj,
  CnpjStripper,
  Cnpj,
  type CnpjOptions,
  type GenerateCnpjOptions,
} from './cnpj';

export { strip, isValid, BrDocument } from './br-document';
