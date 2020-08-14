function phoneMatch(phones) {
  const phoneRgx = /^(\(\d{2}\) )?\d{4,5}-\d{4}$/;
  return phones.every((phone) => phone.match(phoneRgx));
}

const duplicateName = (obj) => `[Nome duplicado] ${obj.name}`;

const wrongFormatPhone = (obj) => `[Fone malformatado] ${obj.name}`;

const noDescription = (obj) => `[Sem descrição] ${obj.name}`;

const noServices = (obj) => `[Sem serviços] ${obj.name}`;

const noTechnologies = (obj) => `[Sem tecnologias] ${obj.name}`;

const noURL = (obj) => `[Sem site] ${obj.name}`;

export const findErrors = async function (objects) {
  const knownNames = {};
  const errors = [];

  objects.forEach((obj, index) => {
    const lineErrors = [];

    if (knownNames[obj.name]) {
      lineErrors.push(duplicateName(obj));
    } else {
      knownNames[obj.name] = obj;
    }

    if (!phoneMatch(obj.phones)) {
      lineErrors.push(wrongFormatPhone(obj));
    }

    if (obj.description.long.length == 0) {
      lineErrors.push(noDescription(obj));
    }

    if (obj.services.length == 0) {
      lineErrors.push(noServices(obj));
    }

    if (obj.technologies.length == 0) {
      lineErrors.push(noTechnologies(obj));
    }

    if (obj.url === "http://") {
      lineErrors.push(noURL(obj));
    }

    if (lineErrors.length > 0) {
      errors.push({
        line: index + 2,
        errors: lineErrors,
      });
    }
  });

  console.log(errors);
};
