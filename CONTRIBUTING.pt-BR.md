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

## Release

Releases são automatizados via GitHub Actions. Não faça bump manual do `package.json`.

1. Documente mudanças em `## [Unreleased]` no [`CHANGELOG.md`](./CHANGELOG.md)
2. Faça merge das alterações na `main`
3. Acesse **Actions → Bump and Release → Run workflow**
4. Escolha `patch`, `minor` ou `major`

O workflow irá:

- Rodar `pnpm verify` na `main`
- Fazer bump da versão e atualizar o CHANGELOG
- Commitar `chore(release): vX.Y.Z` (a CI ignora esse commit)
- Enviar a tag e criar a GitHub Release
- Rodar um segundo job no mesmo workflow que verifica e publica no npm via [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC — sem token de longa duração)

O publish roda como job no mesmo workflow (não via trigger `release`) porque o GitHub suprime eventos criados pelo `GITHUB_TOKEN` — uma release criada pelo Actions não dispara outro workflow.

### Configuração única

#### npmjs.com

1. **Primeiro publish** (se o pacote ainda não existir no npm): publique uma vez manualmente (`npm login` + `pnpm publish`) ou use temporariamente o secret `NPM_TOKEN` até configurar o Trusted Publishing
2. **Trusted Publisher** — `Packages → br-documents → Settings → Trusted publishing → GitHub Actions`:

   | Campo                | Valor                  |
   | -------------------- | ---------------------- |
   | Organization or user | `cicerotcv`            |
   | Repository           | `br-documents`         |
   | Workflow filename    | `bump-and-release.yml` |
   | Environment name     | _(deixe vazio)_        |
   | Allowed actions      | `npm publish`          |

3. Confirme que `repository.url` no `package.json` aponta exatamente para o repo no GitHub
4. **Após o primeiro publish com OIDC bem-sucedido** (opcional, recomendado):
   - `Settings → Publishing access → "Require two-factor authentication and disallow tokens"`
   - Revogue tokens de automação antigos em **Access Tokens**

#### GitHub

- O repositório deve ser **público** (provenance automática exige repo público)
- Permita que `github-actions[bot]` faça push na `main` se houver branch protection
- **Após o primeiro publish com OIDC bem-sucedido**: remova o secret `NPM_TOKEN` em `Settings → Secrets → Actions` (não é mais necessário)

## Estilo

- Prettier para formatação (`pnpm format` / `pnpm format:check`)
- Zero dependências de runtime
- TypeScript strict
- Implementações puras (sem I/O, sem estado global)
- Comentários apenas para lógica não óbvia
