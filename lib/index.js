export const formatURL = (raw) =>
  raw.substr(0, 4) == "http" ? raw : `http://${raw}`;

const tokenSeparator = " ";
export const capitalizeName = (raw) =>
  raw
    .toLocaleLowerCase()
    .split(tokenSeparator)
    .map((s) => s[0].toLocaleUpperCase() + s.slice(1))
    .join(tokenSeparator);