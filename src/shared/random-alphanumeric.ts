const CNPJ_ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARSET_LENGTH = CNPJ_ALPHANUMERIC_CHARSET.length;
const REJECTION_THRESHOLD = Math.floor(256 / CHARSET_LENGTH) * CHARSET_LENGTH;

function randomAlphanumericChar(): string {
  const bytes = new Uint8Array(1);

  while (true) {
    crypto.getRandomValues(bytes);
    const value = bytes[0];
    if (value < REJECTION_THRESHOLD) {
      return CNPJ_ALPHANUMERIC_CHARSET[value % CHARSET_LENGTH]!;
    }
  }
}

export function randomAlphanumeric(length: number): string {
  let result = '';
  for (let index = 0; index < length; index += 1) {
    result += randomAlphanumericChar();
  }
  return result;
}
