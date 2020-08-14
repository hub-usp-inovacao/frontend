const duplicateName = (obj) => `[Nome duplicado] ${obj.name}`;

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

    if (lineErrors.length > 0) {
      errors.push({
        line: index + 2,
        errors: lineErrors,
      });
    }
  });

  console.log(errors);
};
