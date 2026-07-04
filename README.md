# BR Documents

![CI](https://github.com/cicerotcv/br-documents/actions/workflows/ci.yml/badge.svg?branch=main)
![node](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-5.8-3178C6?logo=typescript&logoColor=white)
![tsup](https://img.shields.io/badge/tsup-8-FFEA00?logo=esbuild&logoColor=black)
![prettier](https://img.shields.io/badge/prettier-3-F7B93E?logo=prettier&logoColor=white)
[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&logoColor=white&color=f7931a&style=flat&label=Donate)](https://buymeabitcoffee.vercel.app/btc/BC1QZJGNLPGG046YEMULZXLUVCQND26P52K968N2AS?identifier=BR+Documents&lightning=modularactress47%40walletofsatoshi.com)

English | [Português (Brasil)](README.pt-BR.md)

Validators, generators, and masks for Brazilian documents. **Zero runtime dependencies.**

Supports CPF and CNPJ in v0.1.

## Requirements

- Node.js >= 20

## Installation

```bash
pnpm add br-documents
# or
npm install br-documents
```

## Imports

Each subpath is an independent entry point — import only what you need to maximize tree-shaking.

| Subpath                       | Description                               |
| ----------------------------- | ----------------------------------------- |
| `br-documents`                | Re-export of CPF and CNPJ                 |
| `br-documents/cpf`            | CPF barrel (validator, masker, generator) |
| `br-documents/cpf/validator`  | CPF validation only                       |
| `br-documents/cpf/masker`     | CPF masking only                          |
| `br-documents/cpf/generator`  | CPF generation only                       |
| `br-documents/cnpj`           | CNPJ barrel                               |
| `br-documents/cnpj/validator` | CNPJ validation only                      |
| `br-documents/cnpj/masker`    | CNPJ masking only                         |
| `br-documents/cnpj/generator` | CNPJ generation only                      |

## API

Two consumption styles, same implementation:

### Direct function (minimal bundle)

```typescript
import { validateCpf } from 'br-documents/cpf/validator';
import { maskCnpj } from 'br-documents/cnpj/masker';

validateCpf('529.982.247-25'); // true
maskCnpj('04252011000110'); // '04.252.011/0001-10'
```

### Grouped object (namespaced API)

```typescript
import { CpfValidator, CpfMasker } from 'br-documents/cpf';

CpfValidator.validate('529.982.247-25'); // true
CpfMasker.mask('52998224725'); // '529.982.247-25'
```

## Reference

### CPF

| Export               | Type                         | Description                              |
| -------------------- | ---------------------------- | ---------------------------------------- |
| `validateCpf`        | `(value: string) => boolean` | Validates CPF with or without mask       |
| `CpfValidator`       | `{ validate }`               | Validation namespace                     |
| `maskCpf`            | `(value: string) => string`  | Applies mask `XXX.XXX.XXX-XX`            |
| `CpfMasker`          | `{ mask }`                   | Masking namespace                        |
| `generateCpf`        | `(options?) => string`       | Generates valid CPF (for tests/fixtures) |
| `CpfGenerator`       | `{ generate }`               | Generation namespace                     |
| `GenerateCpfOptions` | `{ formatted?: boolean }`    | Generation options                       |

### CNPJ

Starting July 2026, new CNPJs may be **alphanumeric** (`0-9`, `A-Z` in the first 12 positions). Legacy numeric CNPJs remain valid — both formats coexist.

By default, validator, masker, and generator operate in **alphanumeric mode**. Use `legacyOnly: true` to restrict to numbers only.

```typescript
import { validateCnpj, generateCnpj, maskCnpj } from 'br-documents/cnpj';

// Default: accepts alphanumeric and legacy numeric
validateCnpj('12.ABC.345/01DE-35'); // true
validateCnpj('11.222.333/0001-81'); // true

// Legacy numeric only
validateCnpj('12.ABC.345/01DE-35', { legacyOnly: true }); // false
validateCnpj('11.222.333/0001-81', { legacyOnly: true }); // true

generateCnpj({ legacyOnly: true }); // digits only
generateCnpj({ formatted: true }); // formatted alphanumeric
maskCnpj('12ABC34501DE35'); // '12.ABC.345/01DE-35'
```

| Export                | Type                                    | Description                               |
| --------------------- | --------------------------------------- | ----------------------------------------- |
| `validateCnpj`        | `(value, options?) => boolean`          | Validates CNPJ with or without mask       |
| `CnpjValidator`       | `{ validate }`                          | Validation namespace                      |
| `maskCnpj`            | `(value, options?) => string`           | Applies mask `XX.XXX.XXX/XXXX-XX`         |
| `CnpjMasker`          | `{ mask }`                              | Masking namespace                         |
| `generateCnpj`        | `(options?) => string`                  | Generates valid CNPJ (for tests/fixtures) |
| `CnpjGenerator`       | `{ generate }`                          | Generation namespace                      |
| `CnpjOptions`         | `{ legacyOnly?: boolean }`              | Shared options                            |
| `GenerateCnpjOptions` | `CnpjOptions & { formatted?: boolean }` | Generation options                        |

## Tree-shaking

The package declares `"sideEffects": false`. Importing `br-documents/cpf/validator` does not include CNPJ code in the bundle.

## Generator warning

`generateCpf` and `generateCnpj` produce **mathematically valid** but **fictitious** numbers. Use only in tests, seeds, and fixtures — never as real documents.

## Development

```bash
pnpm install
pnpm dev          # build in watch mode
pnpm test:watch   # tests in watch mode
pnpm format       # format with Prettier
pnpm format:check # check formatting
pnpm build
pnpm typecheck
pnpm lint:package
```

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
