#!/usr/bin/env node
const fs = require("node:fs");
const { getPointer, setPointer, parseJsonValue, formatValue } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--raw") flags.raw = true;
    else if (arg === "--pretty") flags.pretty = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--file") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --file requires a path");
      flags.file = next;
      i += 1;
    } else if (arg.startsWith("--file=")) flags.file = arg.slice("--file=".length);
    else if (arg === "--set") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --set requires a JSON value");
      flags.set = next;
      i += 1;
    } else if (arg.startsWith("--set=")) flags.set = arg.slice("--set=".length);
    else if (arg.startsWith("-") && arg !== "-") throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

async function main() {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    return;
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    return;
  }

  const rest = [...positional];
  let file = flags.file;
  if (!file && rest.length) {
    const last = rest[rest.length - 1];
    if (last === "-" || (last && !last.startsWith("/") && fs.existsSync(last))) {
      file = rest.pop();
    }
  }
  const pointers = rest;
  if (!pointers.length) fail("usage: jsonptrget [options] <pointer...> [file|-]");

  const text = file && file !== "-" ? fs.readFileSync(file, "utf8") : await readStdin();
  let doc;
  try {
    doc = JSON.parse(text);
  } catch {
    fail("input is not valid JSON");
  }

  if (flags.set != null) {
    if (pointers.length !== 1) fail("--set requires exactly one pointer");
    doc = setPointer(doc, pointers[0], parseJsonValue(flags.set));
    process.stdout.write(`${formatValue(doc, { pretty: Boolean(flags.pretty) })}\n`);
    return;
  }

  const values = pointers.map((pointer) => ({ pointer, value: getPointer(doc, pointer) }));
  if (flags.json || values.length > 1) {
    const payload = values.length === 1 ? values[0].value : values;
    process.stdout.write(`${formatValue(payload, { pretty: flags.pretty })}\n`);
    return;
  }
  process.stdout.write(`${formatValue(values[0].value, { raw: flags.raw, pretty: flags.pretty })}\n`);
}

main().catch((err) => fail(err.message));
