# jsonptrget

<img src="docs/logo.svg" alt="jsonptrget mark" width="96" height="96">

**Read JSON from stdin and print the value at a pointer such as /a/b.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/jsonptrget?display_name=release)
[![npm](https://img.shields.io/npm/v/@magnexis/jsonptrget.svg)](https://www.npmjs.com/package/@magnexis/jsonptrget)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/jsonptrget/) · **Source:** [`theworker02/jsonptrget`](https://github.com/theworker02/jsonptrget) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/jsonptrget/releases/tag/v1.0.0) · **npm:** [`@magnexis/jsonptrget`](https://www.npmjs.com/package/@magnexis/jsonptrget)

## Why it exists

jq is powerful but heavy for one lookup. jsonptrget implements JSON Pointer (RFC 6901) for a single get.

## Who it is for

Script authors extracting one field from an API body or a lockfile without a full JSON query language.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm install -g @magnexis/jsonptrget
jsonptrget --help
```

Package page: https://www.npmjs.com/package/@magnexis/jsonptrget

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/jsonptrget.git
jsonptrget --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/jsonptrget.git
cd jsonptrget
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/jsonptrget --help
node src/cli.js --help
```

## Quick start

```bash
echo '{"a":{"b":3}}' | jsonptrget /a/b
```

Prints `3`.

## CLI reference

```text
jsonptrget 1.00 (1.0.0)

Usage:
  jsonptrget [options] <pointer...> [file|-]
  jsonptrget /name < pkg.json
  echo '{"a":{"b":1}}' | jsonptrget /a/b

Read JSON from a file or stdin and print the value at one or more
RFC 6901 JSON Pointers.

Pointers:
  /a/b       object walk
  /items/0   array index
  ~1         escaped slash
  ~0         escaped tilde
  (empty)    whole document — pass "" as the pointer

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --raw              Print string values without JSON quotes
  --pretty           Pretty-print JSON values
  --file <path>      JSON file (otherwise last positional path, or stdin)
  --set <json>       Set the first pointer to this JSON value and print the
                     whole document (writes stdout only; does not save)

When several pointers are given, each value is printed on its own line.
With more than one pointer, --json is implied as
  [{"pointer","value"}, ...]

Exit codes:
  0  every pointer resolved (or --set succeeded)
  1  missing pointer, invalid JSON, or unreadable file

Examples:
  jsonptrget /name package.json
  jsonptrget --pretty /scripts package.json
  jsonptrget --raw /greeting <<EOF
  {"greeting":"hi"}
  EOF
  jsonptrget --set '{"ok":true}' /flag data.json
```

Print the same text locally:

```bash
jsonptrget --help
jsonptrget -h
jsonptrget --version
jsonptrget -V
```

Expected version output:

```text
1.0.0
```

## Configuration

JSON Pointer (RFC 6901). Read a file or stdin. `--raw` prints strings without quotes.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Every pointer resolved, or --set succeeded. |
| `1` | Missing pointer, invalid JSON, or unreadable file. |

## Examples

### Success path

Read a pointer from a JSON file.

```bash
jsonptrget --raw /greeting data.json
```

```text
hi
```

### Failure path

A missing pointer exits 1.

```bash
jsonptrget /nope data.json
```

```text
missing nope
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/jsonptrget/](https://theworker02.github.io/jsonptrget/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
