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
  name.includes(",") ? name.split(",").reverse().join(" ") : name;

const eightDigits = (numbers) => {
  const prefix = numbers.substr(0, 4);
  const sufix = numbers.substr(4, 4);

  return `${prefix}-${sufix}`;
};

const nineDigits = (numbers) => {
  const prefix = numbers.substr(0, 5);
  const sufix = numbers.substr(5, 4);

  return `${prefix}-${sufix}`;
};

const dddEightDigits = (numbers) => {
  const ddd = numbers.substr(0, 2);
  const number = numbers.substr(2, 8);

  return `(${ddd}) ${eightDigits(number)}`;
};

const dddNineDigits = (numbers) => {
  const ddd = numbers.substr(0, 2);
  const number = numbers.substr(2, 9);

  return `(${ddd}) ${nineDigits(number)}`;
};

export const formatPhone = (raw) => {
  if (!raw) return "";

  const numbers = raw.replace(/\D/g, "");

  switch (numbers.length) {
    case 8:
      return eightDigits(numbers);
    case 9:
      return nineDigits(numbers);
    case 10:
      return dddEightDigits(numbers);
    case 11:
      return dddNineDigits(numbers);
    default:
      return numbers;
  }
};