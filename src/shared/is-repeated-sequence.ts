export function isRepeatedSequence(digits: string): boolean {
  return /^(\d)\1+$/.test(digits);
}
