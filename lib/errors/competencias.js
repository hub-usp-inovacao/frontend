export const findErrors = function (objects) {
  const knownNames = {};
  const errors = [];

  objects.forEach((obj, index) => {
    const lineErrors = [];

    if (knownNames[obj.name]) {
      lineErrors.push("Nome duplicado");
    } else {
      knownNames[obj.name] = obj;
    }

    if (!obj.lattes) {
      lineErrors.push("Lattes faltando");
    }

    if (lineErrors.length > 0) {
      errors.push({
        id: obj.name,
        line: index + 2,
        errors: lineErrors,
      });
    }
  });

  return errors;
};
