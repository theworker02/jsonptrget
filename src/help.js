const HELP = "jsonptrget 1.00 (1.0.0)\n\nUsage:\n  jsonptrget <pointer> < data.json\n  jsonptrget --help\n  jsonptrget --version\n\nJSON Pointer (RFC 6901):\n  /a/b       object walk\n  /items/0   array index\n  ~1         escaped slash\n  ~0         escaped tilde\n  (empty)    whole document\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nExamples:\n  jsonptrget /name < pkg.json\n  echo '{\"a\":{\"b\":1}}' | jsonptrget /a/b\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
