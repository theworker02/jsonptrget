const fs = require("node:fs");

function unescapeToken(token) {
  return token.replaceAll("~1", "/").replaceAll("~0", "~");
}

function escapeToken(token) {
  return String(token).replaceAll("~", "~0").replaceAll("/", "~1");
}

function tokensOf(pointer) {
  if (pointer == null || pointer === "") return [];
  if (!String(pointer).startsWith("/")) {
    throw new Error("pointer must start with /");
  }
  return String(pointer).slice(1).split("/").map(unescapeToken);
}

function getPointer(doc, pointer) {
  const tokens = tokensOf(pointer);
  let current = doc;
  for (const token of tokens) {
    if (current == null || typeof current !== "object") {
      throw new Error(`cannot walk into ${token}`);
    }
    if (Array.isArray(current)) {
      const index = Number(token);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) {
        throw new Error(`missing ${token}`);
      }
      current = current[index];
    } else if (!Object.prototype.hasOwnProperty.call(current, token)) {
      throw new Error(`missing ${token}`);
    } else {
      current = current[token];
    }
  }
  return current;
}

function setPointer(doc, pointer, value) {
  const tokens = tokensOf(pointer);
  if (!tokens.length) throw new Error("cannot replace the root document with --set");
  let current = doc;
  for (let i = 0; i < tokens.length - 1; i += 1) {
    const token = tokens[i];
    if (current == null || typeof current !== "object") {
      throw new Error(`cannot walk into ${token}`);
    }
    if (Array.isArray(current)) {
      const index = Number(token);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) {
        throw new Error(`missing ${token}`);
      }
      current = current[index];
    } else {
      if (!Object.prototype.hasOwnProperty.call(current, token) || current[token] == null || typeof current[token] !== "object") {
        current[token] = {};
      }
      current = current[token];
    }
  }
  const last = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    const index = Number(last);
    if (!Number.isInteger(index) || index < 0 || index > current.length) {
      throw new Error(`missing ${last}`);
    }
    current[index] = value;
  } else {
    current[last] = value;
  }
  return doc;
}

function parseJsonValue(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function formatValue(value, { raw = false, pretty = false } = {}) {
  if (raw && typeof value === "string") return value;
  return pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
}

function readInput(file) {
  if (file && file !== "-") {
    if (!fs.existsSync(file)) throw new Error(`file not found: ${file}`);
    return fs.readFileSync(file, "utf8");
  }
  return null;
}

module.exports = {
  unescapeToken,
  escapeToken,
  getPointer,
  setPointer,
  parseJsonValue,
  formatValue,
  readInput,
};
