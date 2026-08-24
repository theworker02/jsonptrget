const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { getPointer, setPointer } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

describe("jsonptrget", () => {
  it("walks objects and arrays, including escaped tokens", () => {
    const doc = { a: { b: [1, { "x/y": 9 }] } };
    assert.equal(getPointer(doc, "/a/b/1/x~1y"), 9);
    assert.deepEqual(getPointer(doc, ""), doc);
    assert.throws(() => getPointer(doc, "a/b"));
    assert.throws(() => getPointer(doc, "/missing"));
  });

  it("sets a pointer and CLI supports --raw plus multiple pointers", () => {
    const doc = { a: 1 };
    setPointer(doc, "/b", 2);
    assert.equal(doc.b, 2);
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "jsonptr-")), "d.json");
    fs.writeFileSync(file, JSON.stringify({ greeting: "hi", n: 3 }));
    const raw = spawnSync(process.execPath, [cli, "--raw", "/greeting", file], { encoding: "utf8" });
    assert.equal(raw.status, 0);
    assert.equal(raw.stdout.trim(), "hi");
    const many = spawnSync(process.execPath, [cli, "/greeting", "/n", file], { encoding: "utf8" });
    assert.equal(many.status, 0);
    const rows = JSON.parse(many.stdout);
    assert.equal(rows[0].value, "hi");
    assert.equal(rows[1].value, 3);
    const missing = spawnSync(process.execPath, [cli, "/nope", file], { encoding: "utf8" });
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /missing/);
  });
});
