const FIRST_CHECK_WEIGHTS = [10, 9, 8, 7, 6, 5, 4, 3, 2] as const;
const SECOND_CHECK_WEIGHTS = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2] as const;

function calcCheckDigit(base: string, weights: readonly number[]): number {
  const sum = weights.reduce(
    (total, weight, index) => total + Number(base[index]) * weight,
    0,
  );
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function calcCpfCheckDigits(baseNine: string): string {
  const first = calcCheckDigit(baseNine, FIRST_CHECK_WEIGHTS);
  const withFirst = `${baseNine}${first}`;
  const second = calcCheckDigit(withFirst, SECOND_CHECK_WEIGHTS);
  return `${first}${second}`;
}

export function buildCpfDigits(baseNine: string): string {
  return `${baseNine}${calcCpfCheckDigits(baseNine)}`;
}
