export const findErrors = function (objects, areas) {
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

    const validMajors = obj.area.major.reduce((acc, curr) => {
      return acc && areas.map(({ name }) => name).includes(curr);
    }, true);

    if (!validMajors) {
      lineErrors.push(`Grande Área inválida: ${obj.area.major}`);
    }

    const validMinors = obj.area.minors.reduce((acc, curr) => {
      return (
        acc &&
        areas
          .reduce((acc, area) => {
            return acc.concat(area.subareas);
          }, [])
          .includes(curr)
      );
    });

    if (!validMinors) {
      lineErrors.push(`Área Específica inválida: ${obj.area.minor}`);
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
