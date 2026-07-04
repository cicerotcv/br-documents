# Contribuindo

[English](CONTRIBUTING.md) | Português (Brasil)

Obrigado por contribuir com o `br-documents`.

## Setup

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev          # tsup em watch mode
pnpm test:watch   # vitest em watch mode
```

## Checklist antes do PR

1. `pnpm typecheck` — sem erros de TypeScript
2. `pnpm format:check` — formatação Prettier
3. `pnpm test` — todos os testes passando
4. `pnpm build` — build limpo
5. `pnpm lint:package` — publint + attw sem problemas

Ou rode tudo de uma vez: `pnpm verify`

## Adicionando um novo documento

1. Crie `src/{doc}/validator.ts`, `masker.ts`, `generator.ts` e `index.ts`
2. Adicione `_internal/` se houver lógica específica (ex.: dígito verificador)
3. Registre entries em [`tsup.config.ts`](./tsup.config.ts)
4. Adicione subpaths em `exports` do [`package.json`](./package.json)
5. Escreva testes em `test/{doc}/`
6. Atualize README (en + pt-BR) e CHANGELOG

### Convenção de API

- Funções exportadas: **lower camelCase** (`validateCpf`)
- Objetos agrupados: **UpperCamelCase** (`CpfValidator`)
- Métodos dos objetos: camelCase (`validate`, `mask`, `generate`)

```typescript
export function validateCpf(value: string): boolean {
  /* ... */
}
export const CpfValidator = { validate: validateCpf } as const;
```

## Estilo

- Prettier para formatação (`pnpm format` / `pnpm format:check`)
- Zero dependências de runtime
- TypeScript strict
- Implementações puras (sem I/O, sem estado global)
- Comentários apenas para lógica não óbvia
