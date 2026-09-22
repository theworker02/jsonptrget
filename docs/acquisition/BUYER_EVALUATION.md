# Buyer evaluation â€” jsonptrget

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
```ts
import { getPointer, hasPointer, setPointer } from "jsr:@theworker02/jsonptrget";

const doc = { app: { name: "Nex" } };
console.log(getPointer(doc, "/app/name"));
console.log(hasPointer(doc, "/app/version"));
setPointer(doc, "/app/version", 2);
```
```bash
git clone https://github.com/theworker02/jsonptrget.git
cd jsonptrget
node src/cli.js --help
```
```bash
echo '{"a":{"b":3}}' | node src/cli.js /a/b
```
```text
/a/b       object traversal
/items/0   array index
~1         escaped slash
~0         escaped tilde
```
```bash
npm test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
