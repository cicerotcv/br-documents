const FIRST_CHECK_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;
const SECOND_CHECK_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;

function cnpjCharValue(char: string): number {
  return char.charCodeAt(0) - 48;
}

function calcCnpjCheckDigit(
  chars: readonly string[],
  weights: readonly number[],
): number {
  const sum = chars.reduce(
    (total, char, index) => total + cnpjCharValue(char) * weights[index]!,
    0,
  );
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function calcCnpjCheckDigits(baseTwelve: string): string {
  const baseChars = baseTwelve.split('');
  const first = calcCnpjCheckDigit(baseChars, FIRST_CHECK_WEIGHTS);
  const withFirst = [...baseChars, String(first)];
  const second = calcCnpjCheckDigit(withFirst, SECOND_CHECK_WEIGHTS);
  return `${first}${second}`;
}

export function buildCnpjBody(baseTwelve: string): string {
  return `${baseTwelve}${calcCnpjCheckDigits(baseTwelve)}`;
}
