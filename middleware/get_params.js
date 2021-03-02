function getParams(route, store, entity, key) {
  if (route.query[`${key}`]) {
    store.commit(`${entity}/setQueryParam`, route.query[`${key}`]);
  } else if (route.params.id) {
    store.commit(`${entity}/setRouteParam`, route.params.id);
  }
}

export default function ({ route, store }) {
  const page = route.name;

  switch (page) {
    case "iniciativas":
      getParams(route, store, "iniciativas", "nome");
      break;
    case "inovacao":
      getParams(route, store, "pdi", "pdi");
      break;
    case "competencias":
      getParams(route, store, "competencia", "professor");
      break;
    case "educacao":
      getParams(route, store, "educacao", "disciplina");
      break;
    case "empresas":
      getParams(route, store, "empresas", "nome");
      break;
    case "patentes":
      getParams(route, store, "patentes", "nome");
      break;
    default:
      break;
  }
}
