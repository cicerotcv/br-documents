# Contributing

English | [Português (Brasil)](CONTRIBUTING.pt-BR.md)

Thank you for contributing to `br-documents`.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev          # tsup in watch mode
pnpm test:watch   # vitest in watch mode
```

## PR checklist

1. `pnpm typecheck` — no TypeScript errors
2. `pnpm format:check` — Prettier formatting
3. `pnpm test` — all tests passing
4. `pnpm build` — clean build
5. `pnpm lint:package` — publint + attw with no issues

Or run everything at once: `pnpm verify`

## Adding a new document type

1. Create `src/{doc}/validator.ts`, `masker.ts`, `generator.ts`, and `index.ts`
2. Add `_internal/` if there is document-specific logic (e.g. check digits)
3. Register entries in [`tsup.config.ts`](./tsup.config.ts)
4. Add subpaths to `exports` in [`package.json`](./package.json)
5. Write tests in `test/{doc}/`
6. Update README (en + pt-BR) and CHANGELOG

### API convention

- Exported functions: **lower camelCase** (`validateCpf`)
- Grouped objects: **UpperCamelCase** (`CpfValidator`)
- Object methods: camelCase (`validate`, `mask`, `generate`)

```typescript
export function validateCpf(value: string): boolean {
  /* ... */
}
export const CpfValidator = { validate: validateCpf } as const;
```

## Style

- Prettier for formatting (`pnpm format` / `pnpm format:check`)
- Zero runtime dependencies
- TypeScript strict
- Pure implementations (no I/O, no global state)
- Comments only for non-obvious business logic
