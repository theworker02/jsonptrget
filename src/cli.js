#!/usr/bin/env node
const { getPointer } = require("./index.js");

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const pointer = process.argv[2];
if (pointer == null) {
  process.stderr.write("usage: jsonptrget /pointer < data.json\n");
  process.exit(1);
}

readStdin().then((text) => {
  const value = getPointer(JSON.parse(text), pointer);
  process.stdout.write(`${typeof value === "string" ? value : JSON.stringify(value)}\n`);
}).catch((err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});
