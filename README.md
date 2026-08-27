# jsonptrget

<img src="docs/logo.svg" alt="jsonptrget mark" width="96" height="96">

**Read and update RFC 6901 JSON Pointer values with a tiny CLI and a typed ESM API.**

[![JSR](https://jsr.io/badges/@theworker02/jsonptrget)](https://jsr.io/@theworker02/jsonptrget)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)

**JSR:** [`@theworker02/jsonptrget`](https://jsr.io/@theworker02/jsonptrget) · **Docs:** [GitHub Pages](https://theworker02.github.io/jsonptrget/) · **Source:** [`theworker02/jsonptrget`](https://github.com/theworker02/jsonptrget)

## Package API

The JSR package exposes a documented ESM API for RFC 6901 operations:

- `getPointer()` — resolve a pointer against an object or array
- `setPointer()` — update a value at a pointer
- `hasPointer()` — test pointer existence without throwing
- `tokensOf()` — parse a pointer into decoded tokens
- `escapeToken()` / `unescapeToken()` — encode and decode pointer path segments
- `parseJsonValue()` — parse CLI-style JSON input with string fallback
- `formatValue()` — format values for raw or pretty output
- `PACKAGE` — package metadata for tooling

```ts
import { getPointer, hasPointer, setPointer } from "jsr:@theworker02/jsonptrget";

const doc = { app: { name: "Nex" } };
console.log(getPointer(doc, "/app/name"));
console.log(hasPointer(doc, "/app/version"));
setPointer(doc, "/app/version", 2);
```

## CLI

Requires Node.js 18 or newer when using the repository CLI.

```bash
git clone https://github.com/theworker02/jsonptrget.git
cd jsonptrget
node src/cli.js --help
```

Quick example:

```bash
echo '{"a":{"b":3}}' | node src/cli.js /a/b
```

Pointers follow RFC 6901:

```text
/a/b       object traversal
/items/0   array index
~1         escaped slash
~0         escaped tilde
```

## Development

```bash
npm test
```

The public package is published to JSR through GitHub Actions trusted publishing and OIDC. No long-lived JSR publishing secret is stored in the repository.

## GitHub Pages

The product site is served from `/docs` on the `main` branch:

https://theworker02.github.io/jsonptrget/

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against `main`.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
