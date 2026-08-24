# Contributing to jsonptrget

Thank you for helping keep this tool small, correct, and documented.

## Ground rules

- Default branch is **`main`**. Never target `master`.
- No runtime dependencies. Tests use `node --test` only.
- Match the existing CLI contract: `--help`, `--version`, and the documented exit codes.
- Keep README examples in sync with `docs/index.html` and `docs/usage.html`.

## Local setup

```bash
git clone https://github.com/theworker02/jsonptrget.git
cd jsonptrget
git checkout main
node --test
node src/cli.js --help
```

## Pull requests

1. Branch from `main` with a focused change.
2. Add or update tests for both the success path and at least one error path.
3. Run `npm test`.
4. Open a PR into `theworker02/jsonptrget` `main`.
5. Use a conventional commit subject: `feat|fix|docs|chore|refactor|test|ci: summary`.

## Docs site

If you change CLI flags, update **all three**:

- `README.md`
- `docs/index.html`
- `docs/usage.html`
- `src/help.js`
