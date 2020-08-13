export const findErrors = async function (objects) {
  const knownNames = {};
  const errors = [];

  objects.forEach((obj, index) => {
    if (knownNames[obj.name]) {
      errors.push("[Nome duplicado] " + obj.name + " na linha " + (index + 2));
    } else {
      knownNames[obj.name] = obj;
    }

    if (!obj.lattes) {
      errors.push("[Lattes faltando] para linha " + (index + 2));
    }
  });

  console.log(errors);
};
