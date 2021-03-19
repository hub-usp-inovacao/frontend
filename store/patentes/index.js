import Patent from "@/lib/classes/patent";

export const state = () => ({
  isLoading: false,
  patents: [],
  errors: undefined,
  keys: Patent.keys,
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  patents: (s) => s.patents,
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

    const { patents, errors } = await this.$fetchPatents(env);
    ctx.commit("setErrors", errors);
    ctx.commit(
      "setPatents",
      patents.sort((a, b) => (a.name > b.name ? 1 : -1))
    );

    ctx.commit("unsetLoadingStatus");
  },
};
