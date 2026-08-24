const HELP = `jsonptrget 1.00 (1.0.0)

Usage:
  jsonptrget [options] <pointer...> [file|-]
  jsonptrget /name < pkg.json
  echo '{"a":{"b":1}}' | jsonptrget /a/b

Read JSON from a file or stdin and print the value at one or more
RFC 6901 JSON Pointers.

Pointers:
  /a/b       object walk
  /items/0   array index
  ~1         escaped slash
  ~0         escaped tilde
  (empty)    whole document — pass "" as the pointer

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --raw              Print string values without JSON quotes
  --pretty           Pretty-print JSON values
  --file <path>      JSON file (otherwise last positional path, or stdin)
  --set <json>       Set the first pointer to this JSON value and print the
                     whole document (writes stdout only; does not save)

When several pointers are given, each value is printed on its own line.
With more than one pointer, --json is implied as
  [{"pointer","value"}, ...]

Exit codes:
  0  every pointer resolved (or --set succeeded)
  1  missing pointer, invalid JSON, or unreadable file

Examples:
  jsonptrget /name package.json
  jsonptrget --pretty /scripts package.json
  jsonptrget --raw /greeting <<EOF
  {"greeting":"hi"}
  EOF
  jsonptrget --set '{"ok":true}' /flag data.json
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
