const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const cli = path.join(__dirname, "..", "src", "cli.js");

function run(args) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });
}

describe("cli help and version", () => {
  it("prints detailed usage on --help", () => {
    const result = run(["--help"]);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /Usage/i);
    assert.match(result.stdout, /--help/);
  });

  it("prints 1.0.0 on --version", () => {
    const result = run(["--version"]);
    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), "1.0.0");
  });
});
