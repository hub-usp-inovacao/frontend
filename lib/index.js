export const columnValue = (row, colLetter) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const map = letters
    .concat(...letters.map((l) => `A${l}`))
    .concat(...letters.map((l) => `B${l}`));

  return row[map.findIndex((x) => x === colLetter)];
};

export const formatURL = (raw) =>
  raw.substr(0, 4) == "http" ? raw : `http://${raw}`;

const tokenSeparator = " ";
export const capitalizeName = (raw) =>
  raw
    .toLocaleLowerCase()
    .trim()
    .split(tokenSeparator)
    .map((s) => s[0].toLocaleUpperCase() + s.slice(1))
    .join(tokenSeparator);

export const fixPersonName = (name) =>
  name.includes(",")
    ? name
        .split(",")
        .reverse()
        .join(" ")
    : name;

export const genFuzzyOptions = (keys) => ({
  ignoreLocation: true,
  findAllMatches: true,
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold: 0.35,
  keys,
});
