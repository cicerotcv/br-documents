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

## Releasing

Releases are automated via GitHub Actions. Do not bump `package.json` manually.

1. Document changes under `## [Unreleased]` in [`CHANGELOG.md`](./CHANGELOG.md)
2. Merge your changes to `main`
3. Go to **Actions → Bump and Release → Run workflow**
4. Choose `patch`, `minor`, or `major`

The workflow will:

- Run `pnpm verify` on `main`
- Bump the version and update the CHANGELOG
- Commit `chore(release): vX.Y.Z` (CI skips this commit)
- Push the tag and create a GitHub Release
- Run a second job in the same workflow that verifies and publishes to npm via [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC — no long-lived token)

Publish runs as a job in the same workflow (not a separate `release` trigger) because GitHub suppresses events created by `GITHUB_TOKEN` — a release pushed by Actions does not start another workflow.

### One-time setup

#### npmjs.com

1. **First publish** (if the package does not exist on npm yet): publish once manually (`npm login` + `pnpm publish`) or temporarily use an `NPM_TOKEN` secret until Trusted Publishing is configured
2. **Trusted Publisher** — `Packages → br-documents → Settings → Trusted publishing → GitHub Actions`:

   | Field                | Value                  |
   | -------------------- | ---------------------- |
   | Organization or user | `cicerotcv`            |
   | Repository           | `br-documents`         |
   | Workflow filename    | `bump-and-release.yml` |
   | Environment name     | _(leave empty)_        |
   | Allowed actions      | `npm publish`          |

3. Confirm `repository.url` in `package.json` matches your GitHub repo exactly
4. **After the first successful OIDC publish** (optional, recommended):
   - `Settings → Publishing access → "Require two-factor authentication and disallow tokens"`
   - Revoke old automation tokens under **Access Tokens**

#### GitHub

- Repository must be **public** (automatic provenance requires a public repo)
- Allow `github-actions[bot]` to push to `main` if branch protection is enabled
- **After the first successful OIDC publish**: remove the `NPM_TOKEN` secret from `Settings → Secrets → Actions` (no longer needed)

## Style

- Prettier for formatting (`pnpm format` / `pnpm format:check`)
- Zero runtime dependencies
- TypeScript strict
- Pure implementations (no I/O, no global state)
- Comments only for non-obvious business logic
