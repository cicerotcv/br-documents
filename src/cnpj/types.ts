/** Shared options for CNPJ validator, masker, and generator. */
export type CnpjOptions = {
  /**
   * When `true`, operates in legacy numeric-only mode (digits `0-9` only).
   *
   * Default (`false`): alphanumeric mode — accepts `0-9` and `A-Z` in the
   * first 12 positions, plus legacy numeric CNPJs.
   */
  legacyOnly?: boolean;
};

/** Options for {@link generateCnpj}. */
export type GenerateCnpjOptions = CnpjOptions & {
  /** When `true`, returns the CNPJ with mask applied. */
  formatted?: boolean;
};
