/** A JSON-compatible value or arbitrary JavaScript object graph. */
export type JsonDocument = unknown;

/** Options controlling JSON value formatting. */
export interface FormatOptions {
  /** Print strings without surrounding JSON quotes. */
  raw?: boolean;
  /** Pretty-print JSON with indentation. */
  pretty?: boolean;
}

/** Metadata describing the published JSR package. */
export interface PackageMetadata {
  /** Fully scoped JSR package name. */
  name: "@theworker02/jsonptrget";
  /** Published semantic version. */
  version: "1.1.0";
  /** Pointer standard implemented by the package. */
  standard: "RFC 6901";
}

/** Decode one RFC 6901 token. */
export function unescapeToken(token: string): string;
/** Encode one path token for use in an RFC 6901 pointer. */
export function escapeToken(token: string): string;
/** Split an RFC 6901 pointer into decoded path tokens. */
export function tokensOf(pointer: string | null | undefined): string[];
/** Resolve a JSON Pointer against an object or array. */
export function getPointer(doc: JsonDocument, pointer: string): unknown;
/** Set a value at an RFC 6901 pointer and return the original document. */
export function setPointer<T>(doc: T, pointer: string, value: unknown): T;
/** Parse a CLI-style JSON value, falling back to the original string. */
export function parseJsonValue(raw: string): unknown;
/** Format a value for CLI or programmatic display. */
export function formatValue(value: unknown, options?: FormatOptions): string | undefined;
/** Test whether a pointer exists without throwing. */
export function hasPointer(doc: JsonDocument, pointer: string): boolean;
/** Package metadata exposed for tooling and generated documentation. */
export const PACKAGE: Readonly<PackageMetadata>;
