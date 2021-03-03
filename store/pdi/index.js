import PDI from "@/lib/classes/pdi";

export const state = () => ({
  pdis: [],
  isLoading: false,
  errors: undefined,
  keys: PDI.keys,
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  pdis: (state) => state.pdis,
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

    const { pdis, errors } = await this.$fetchPdis(env);
    ctx.commit("setErrors", errors);
    ctx.commit(
      "setPDIs",
      pdis.filter((pdi) => pdi !== null)
    );

    ctx.commit("unsetLoadingStatus");
  },
};
