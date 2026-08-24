#!/usr/bin/env node
const { getPointer } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const pointer = args.find((a) => !a.startsWith("-"));
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
