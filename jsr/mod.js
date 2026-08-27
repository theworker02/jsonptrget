/**
 * RFC 6901 JSON Pointer utilities for reading and updating JavaScript values.
 *
 * @module
 * @ts-self-types="./mod.d.ts"
 */

/** Split an RFC 6901 pointer into decoded path tokens. */
export function tokensOf(pointer) {
  if (pointer == null || pointer === "") return [];
  if (!String(pointer).startsWith("/")) throw new Error("pointer must start with /");
  return String(pointer).slice(1).split("/").map(unescapeToken);
}

/** Decode one RFC 6901 token. */
export function unescapeToken(token) {
  return String(token).replaceAll("~1", "/").replaceAll("~0", "~");
}

/** Encode one path token for use in an RFC 6901 pointer. */
export function escapeToken(token) {
  return String(token).replaceAll("~", "~0").replaceAll("/", "~1");
}

/** Resolve a JSON Pointer against an object or array. */
export function getPointer(doc, pointer) {
  const tokens = tokensOf(pointer);
  let current = doc;
  for (const token of tokens) {
    if (current == null || typeof current !== "object") throw new Error(`cannot walk into ${token}`);
    if (Array.isArray(current)) {
      const index = Number(token);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) throw new Error(`missing ${token}`);
      current = current[index];
    } else if (!Object.prototype.hasOwnProperty.call(current, token)) {
      throw new Error(`missing ${token}`);
    } else {
      current = current[token];
    }
  }
  return current;
}

/** Set a value at an RFC 6901 pointer and return the original document. */
export function setPointer(doc, pointer, value) {
  const tokens = tokensOf(pointer);
  if (!tokens.length) throw new Error("cannot replace the root document with --set");
  let current = doc;
  for (let i = 0; i < tokens.length - 1; i += 1) {
    const token = tokens[i];
    if (current == null || typeof current !== "object") throw new Error(`cannot walk into ${token}`);
    if (Array.isArray(current)) {
      const index = Number(token);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) throw new Error(`missing ${token}`);
      current = current[index];
    } else {
      if (!Object.prototype.hasOwnProperty.call(current, token) || current[token] == null || typeof current[token] !== "object") current[token] = {};
      current = current[token];
    }
  }
  const last = tokens[tokens.length - 1];
  if (Array.isArray(current)) {
    const index = Number(last);
    if (!Number.isInteger(index) || index < 0 || index > current.length) throw new Error(`missing ${last}`);
    current[index] = value;
  } else {
    current[last] = value;
  }
  return doc;
}

/** Parse a CLI-style JSON value, falling back to the original string. */
export function parseJsonValue(raw) {
  try { return JSON.parse(raw); } catch { return raw; }
}

/** Format a value for CLI or programmatic display. */
export function formatValue(value, { raw = false, pretty = false } = {}) {
  if (raw && typeof value === "string") return value;
  return pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
}

/** Test whether a pointer exists without throwing. */
export function hasPointer(doc, pointer) {
  try { getPointer(doc, pointer); return true; } catch { return false; }
}

/** Package metadata exposed for tooling and generated documentation. */
export const PACKAGE = Object.freeze({
  name: "@theworker02/jsonptrget",
  version: "1.1.0",
  standard: "RFC 6901"
});
