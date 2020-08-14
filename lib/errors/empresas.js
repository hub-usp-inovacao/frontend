function phoneMatch(phones) {
  const phoneRgx = /^(\(\d{2}\) )?\d{4,5}-\d{4}$/;
  return phones.every((phone) => phone.match(phoneRgx));
}

export const findErrors = function (objects) {
  const knownNames = {};
  const errors = [];

  objects.forEach((obj, index) => {
    const lineErrors = [];

    if (knownNames[obj.name]) {
      lineErrors.push("nome duplicado");
    } else {
      knownNames[obj.name] = obj;
    }

    if (!phoneMatch(obj.phones)) {
      lineErrors.push("telefone mal formatado");
    }

    if (obj.description.long.length == 0) {
      lineErrors.push("sem descrição");
    }

    if (obj.services.length == 0) {
      lineErrors.push("sem serviços");
    }

    if (obj.technologies.length == 0) {
      lineErrors.push("sem tecnologias");
    }

    if (obj.url === "http://") {
      lineErrors.push("sem site");
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
