const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { getPointer } = require("../src/index.js");

describe("jsonptrget", () => {
  it("walks objects and arrays, including escaped tokens", () => {
    const doc = { a: { b: [1, { "x/y": 9 }] } };
    assert.equal(getPointer(doc, "/a/b/1/x~1y"), 9);
    assert.deepEqual(getPointer(doc, ""), doc);
    assert.throws(() => getPointer(doc, "a/b"));
    assert.throws(() => getPointer(doc, "/missing"));
  });
});
