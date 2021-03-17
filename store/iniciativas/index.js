import Iniciative from "@/lib/classes/iniciative";

export const state = () => ({
  iniciatives: [],
  isLoading: false,
  errors: undefined,
  keys: Iniciative.keys,
  queryParam: undefined,
  routeParam: undefined,
});

export const getters = {
  iniciatives: (s) => s.iniciatives,
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  searchKeys: (s) => s.keys,
  queryParam: (s) => s.queryParam,
  routeParam: (s) => s.iniciatives.find((c) => c.id == s.routeParam),
  campi: (s) => {
    const campi = s.iniciatives
      .reduce(
        (campi, iniciative) =>
          campi.concat(
            iniciative.local.split(",").map((local) => local.trim())
          ),
        []
      )
      .filter((campi) => campi.trim().length > 0)
      .filter(
        (campus, index, campi) =>
          index === campi.findIndex((other) => other === campus)
      );

    return campi.sort();
  },
  errors: (s) => s.errors,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setIniciatives: (s, newIniciatives) => (s.iniciatives = newIniciatives),
  setErrors: (s, errors) => (s.errors = errors),
  setQueryParam: (s, query) => (s.queryParam = query),
  setRouteParam: (s, id) => (s.routeParam = id),
};

export const actions = {
  fetchSpreadsheets: async function (ctx, env) {
    ctx.commit("setLoadingStatus");

    const { iniciatives, errors } = await this.$fetchIniciatives(env);
    ctx.commit("setErrors", errors);
    ctx.commit(
      "setIniciatives",
      iniciatives.sort((a, b) => a.name.localeCompare(b.name))
    );

    ctx.commit("unsetLoadingStatus");
  },
};
