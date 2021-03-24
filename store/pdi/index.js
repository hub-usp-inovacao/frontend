import { PDI, PDIGenerator } from "@/lib/classes/pdi";

export const state = () => ({
  pdis: [],
  isLoading: false,
  errors: undefined,
  keys: PDI.keys,
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  pdis: (state) => state.pdis,
  isEmpty: (state) => state.pdis.length === 0,
  searchKeys: (state) => state.keys,
  errors: (s) => s.errors,
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
