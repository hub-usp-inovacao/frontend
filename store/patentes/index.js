export const state = () => ({
  isLoading: false,
  patents: [],
  errors: undefined,
  keys: ["name", "sumary", "owners", "inventors", "ipcs"],
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  patents: (s) => s.patents,
  isEmpty: (s) => s.patents.length === 0,
  searchKeys: (s) => s.keys,
  errors: (s) => s.errors,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setPatents: (s, newPatents) => (s.patents = newPatents),
  setErrors: (s, newErrors) => (s.errors = newErrors),
};

export const actions = {
  fetchSpreadsheets: async function (ctx, env) {
    ctx.commit("setLoadingStatus");

    const {patents, errors} = await this.$fetchPatents(env);
    ctx.commit("setErrors", errors);
    ctx.commit("setPatents", patents);

    ctx.commit("unsetLoadingStatus");
  },
};
