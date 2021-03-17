import { PDI, PDIGenerator } from "@/lib/classes/pdi";
import { findErrors } from "@/lib/errors/pdi";

export const state = () => ({
  pdis: [],
  isLoading: false,
  errors: undefined,
  keys: PDI.keys,
  queryParam: undefined,
  routeParam: undefined,
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  pdis: (state) => state.pdis,
  searchKeys: (state) => state.keys,
  errors: (s) => s.errors,
  queryParam: (s) => s.queryParam,
  routeParam: (s) => s.pdis.find((c) => c.id == s.routeParam),
};

export const mutations = {
  setLoadingStatus(state) {
    state.isLoading = true;
  },
  unsetLoadingStatus(state) {
    state.isLoading = false;
  },
  setPDIs(state, pdis) {
    state.pdis = pdis;
  },
  setErrors(s, errors) {
    s.errors = errors;
  },
  setQueryParam: (s, query) => (s.queryParam = query),
  setRouteParam: (s, id) => (s.routeParam = id),
};

export const actions = {
  fetchSpreadsheets: async function (ctx, env) {
    ctx.commit("setLoadingStatus");

    let objectsFromAPI = [];

    const { pdis, errors } = await this.$fetchPDIs(env);
    ctx.commit("setErrors", errors);

    try {
      let centraisURL = "http://localhost:3001/centrais";
      if (process.env.USPMULTI)
        centraisURL = "https://uspmulti.prp.usp.br/api/public/centrais";

      const resp = await fetch(centraisURL);
      const data = await resp.json();

      objectsFromAPI = data.map((d) => PDIGenerator.runForCentrais(d));
    } catch (error) {
      console.log("error occuried while fetching from USP Multi...");
      console.log(error);
    }

    const fullData = pdis.concat(objectsFromAPI);
    ctx.commit(
      "setPDIs",
      fullData.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    );

    ctx.commit("unsetLoadingStatus");
  },
};
