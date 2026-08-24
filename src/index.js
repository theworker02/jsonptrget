function unescapeToken(token) {
  return token.replaceAll("~1", "/").replaceAll("~0", "~");
}

function getPointer(doc, pointer) {
  if (pointer == null || pointer === "") return doc;
  if (!String(pointer).startsWith("/")) {
    throw new Error("pointer must start with /");
  }
  const tokens = String(pointer).slice(1).split("/").map(unescapeToken);
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

module.exports = { unescapeToken, getPointer };
