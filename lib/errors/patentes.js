export const findErrors = function (objects) {
  const errors = [];

  objects.forEach((obj, index) => {
    const lineErrors = [];

    const primary = obj.classification.primary;

    if (!primary.cip || !primary.subarea) {
      lineErrors.push("Classificação primária incompleta");
    }

    const urlMatch = obj.url.match(/^https?:\/\//);

    if (!urlMatch) {
      lineErrors.push("Link não é um endereço URL válido");
    }

    const countryMismatch = obj.countriesWithProtection.every((country) =>
      country.match(/^\w{2,3}$/)
    );

    if (countryMismatch) {
      lineErrors.push("País indicado como sigla");
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
