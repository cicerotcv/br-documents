function randomDigit(): number {
  const bytes = new Uint8Array(1);

  while (true) {
    crypto.getRandomValues(bytes);
    const value = bytes[0];
    if (value < 250) {
      return value % 10;
    }
  }
}

export function randomDigits(length: number): string {
  let result = '';
  for (let index = 0; index < length; index += 1) {
    result += randomDigit().toString();
  }
  return result;
}
