# BR Documents

![CI](https://github.com/cicerotcv/br-documents/actions/workflows/ci.yml/badge.svg?branch=main)
![node](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-5.8-3178C6?logo=typescript&logoColor=white)
![tsup](https://img.shields.io/badge/tsup-8-FFEA00?logo=esbuild&logoColor=black)
![prettier](https://img.shields.io/badge/prettier-3-F7B93E?logo=prettier&logoColor=white)
[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&logoColor=white&color=f7931a&style=flat&label=Donate)](https://buymeabitcoffee.vercel.app/btc/BC1QZJGNLPGG046YEMULZXLUVCQND26P52K968N2AS?identifier=BR+Documents&lightning=modularactress47%40walletofsatoshi.com)

[English](README.md) | Português (Brasil)

Validadores, geradores e máscaras para documentos brasileiros. **Zero dependências de runtime.**

Suporta CPF e CNPJ na v0.1.

## Requisitos

- Node.js >= 20

## Instalação

```bash
pnpm add br-documents
# ou
npm install br-documents
```

## Imports

Cada subpath é um entry point independente — importe apenas o que precisa para maximizar tree-shaking.

| Subpath                       | Descrição                                 |
| ----------------------------- | ----------------------------------------- |
| `br-documents`                | Re-export de CPF e CNPJ                   |
| `br-documents/cpf`            | Barrel CPF (validator, masker, generator) |
| `br-documents/cpf/validator`  | Apenas validação de CPF                   |
| `br-documents/cpf/masker`     | Apenas máscara de CPF                     |
| `br-documents/cpf/generator`  | Apenas geração de CPF                     |
| `br-documents/cnpj`           | Barrel CNPJ                               |
| `br-documents/cnpj/validator` | Apenas validação de CNPJ                  |
| `br-documents/cnpj/masker`    | Apenas máscara de CNPJ                    |
| `br-documents/cnpj/generator` | Apenas geração de CNPJ                    |

## API

Dois estilos de consumo, mesma implementação:

### Função direta (bundle mínimo)

```typescript
import { validateCpf } from 'br-documents/cpf/validator';
import { maskCnpj } from 'br-documents/cnpj/masker';

validateCpf('529.982.247-25'); // true
maskCnpj('04252011000110'); // '04.252.011/0001-10'
```

### Objeto agrupado (API namespaced)

```typescript
import { CpfValidator, CpfMasker } from 'br-documents/cpf';

CpfValidator.validate('529.982.247-25'); // true
CpfMasker.mask('52998224725'); // '529.982.247-25'
```

### Namespace unificado (recomendado)

Cada tipo de documento expõe um único objeto com todas as utilidades. Helpers cross-document ficam na raiz do pacote.

```typescript
import { Cpf, Cnpj, BrDocument } from 'br-documents';

Cpf.validate('529.982.247-25'); // true
Cpf.mask('52998224725'); // '529.982.247-25'
Cpf.strip('529.982.247-25'); // '52998224725'

Cnpj.validate('12.ABC.345/01DE-35'); // true
Cnpj.strip('12.abc.345/01de-35'); // '12ABC34501DE35'

BrDocument.isValid('529.982.247-25'); // true — CPF ou CNPJ
BrDocument.strip('04.252.011/0001-10'); // '04252011000110'
```

Objetos agrupados legados (`CpfValidator`, `CpfMasker`, etc.) continuam disponíveis.

## Referência

### CPF

| Export               | Tipo                                  | Descrição                              |
| -------------------- | ------------------------------------- | -------------------------------------- |
| `validateCpf`        | `(value: string) => boolean`          | Valida CPF com ou sem máscara          |
| `CpfValidator`       | `{ validate }`                        | Namespace de validação                 |
| `maskCpf`            | `(value: string) => string`           | Aplica máscara `XXX.XXX.XXX-XX`        |
| `CpfMasker`          | `{ mask }`                            | Namespace de máscara                   |
| `generateCpf`        | `(options?) => string`                | Gera CPF válido (para testes/fixtures) |
| `CpfGenerator`       | `{ generate }`                        | Namespace de geração                   |
| `GenerateCpfOptions` | `{ formatted?: boolean }`             | Opções de geração                      |
| `stripCpf`           | `(value: string) => string`           | Remove pontuação e espaços da máscara  |
| `CpfStripper`        | `{ strip }`                           | Namespace de strip                     |
| `Cpf`                | `{ validate, mask, generate, strip }` | Namespace unificado de CPF             |

### CNPJ

A partir de julho de 2026, novos CNPJs podem ser **alfanuméricos** (`0-9`, `A-Z` nas 12 primeiras posições). CNPJs numéricos legados continuam válidos — os dois formatos convivem.

Por padrão, validator, masker e generator operam no **modo alfanumérico**. Use `legacyOnly: true` para restringir a números.

```typescript
import { validateCnpj, generateCnpj, maskCnpj } from 'br-documents/cnpj';

// Padrão: aceita alfanumérico e numérico legado
validateCnpj('12.ABC.345/01DE-35'); // true
validateCnpj('11.222.333/0001-81'); // true

// Apenas numérico legado
validateCnpj('12.ABC.345/01DE-35', { legacyOnly: true }); // false
validateCnpj('11.222.333/0001-81', { legacyOnly: true }); // true

generateCnpj({ legacyOnly: true }); // só dígitos
generateCnpj({ formatted: true }); // alfanumérico formatado
maskCnpj('12ABC34501DE35'); // '12.ABC.345/01DE-35'
```

| Export                | Tipo                                    | Descrição                               |
| --------------------- | --------------------------------------- | --------------------------------------- |
| `validateCnpj`        | `(value, options?) => boolean`          | Valida CNPJ com ou sem máscara          |
| `CnpjValidator`       | `{ validate }`                          | Namespace de validação                  |
| `maskCnpj`            | `(value, options?) => string`           | Aplica máscara `XX.XXX.XXX/XXXX-XX`     |
| `CnpjMasker`          | `{ mask }`                              | Namespace de máscara                    |
| `generateCnpj`        | `(options?) => string`                  | Gera CNPJ válido (para testes/fixtures) |
| `CnpjGenerator`       | `{ generate }`                          | Namespace de geração                    |
| `CnpjOptions`         | `{ legacyOnly?: boolean }`              | Opções compartilhadas                   |
| `GenerateCnpjOptions` | `CnpjOptions & { formatted?: boolean }` | Opções de geração                       |
| `stripCnpj`           | `(value, options?) => string`           | Remove pontuação e espaços da máscara   |
| `CnpjStripper`        | `{ strip }`                             | Namespace de strip                      |
| `Cnpj`                | `{ validate, mask, generate, strip }`   | Namespace unificado de CNPJ             |

### Cross-document

| Export       | Tipo                         | Descrição                              |
| ------------ | ---------------------------- | -------------------------------------- |
| `strip`      | `(value: string) => string`  | Remove máscara de CPF ou CNPJ          |
| `isValid`    | `(value: string) => boolean` | Retorna `true` para CPF ou CNPJ válido |
| `BrDocument` | `{ strip, isValid }`         | Namespace cross-document               |

## Tree-shaking

O pacote declara `"sideEffects": false`. Importar `br-documents/cpf/validator` não inclui código de CNPJ no bundle.

## Aviso sobre generators

`generateCpf` e `generateCnpj` produzem números **matematicamente válidos**, mas **fictícios**. Use apenas em testes, seeds e fixtures — nunca como documento real.

## Desenvolvimento

```bash
pnpm install
pnpm dev          # build em watch
pnpm test:watch   # testes em watch
pnpm format       # formata com Prettier
pnpm format:check # verifica formatação
pnpm build
pnpm typecheck
pnpm lint:package
```

Veja [CONTRIBUTING.pt-BR.md](./CONTRIBUTING.pt-BR.md).

## Licença

[MIT](./LICENSE)
