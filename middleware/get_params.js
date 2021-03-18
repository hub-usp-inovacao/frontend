function getParams(route, store, entity) {
  console.log("Ó os parametros: ", route.query);
  if (route.params.id) {
    store.commit(`${entity}/setRouteParam`, route.params.id);
  } else if (route.query && Object.keys(route.query).length > 0) {
    store.commit(`${entity}/setQueryParam`, route.query);
  }
}

export default function ({ route, store }) {
  const page = route.name;

  switch (page) {
    case "iniciativas":
      getParams(route, store, "iniciativas");
      break;
    case "inovacao":
      getParams(route, store, "pdi");
      break;
    case "competencias":
      getParams(route, store, "competencia");
      break;
    case "educacao":
      getParams(route, store, "educacao");
      break;
    case "empresas":
      getParams(route, store, "empresas");
      break;
    case "patentes":
      getParams(route, store, "patentes");
      break;
    default:
      break;
  }
}
