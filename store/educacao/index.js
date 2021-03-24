import Discipline from "@/lib/classes/discipline";

export const state = () => ({
  disciplines: [],
  isLoading: false,
  errors: undefined,
  keys: Discipline.keys,
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  disciplines: (state) => state.disciplines,
  campi: (state) => {
    return Array.from(
      state.disciplines.reduce(
        (campiSet, di) => campiSet.add(di.campus),
        new Set()
      )
    ).sort((a, b) => a.localeCompare(b));
  },
  searchKeys: (s) => s.keys,
  errors: (s) => s.errors,
};

export const mutations = {
  setLoadingStatus(state) {
    state.isLoading = true;
  },
  unsetLoadingStatus(state) {
    state.isLoading = false;
  },
  setDisciplines(state, disciplines) {
    state.disciplines = disciplines;
  },
  setErrors(s, errors) {
    s.errors = errors;
  },
};

export const actions = {
  fetchSpreadsheets: async function (ctx, env) {
    ctx.commit("setLoadingStatus");

    const { disciplines, errors } = await this.$fetchDisciplines(env);
    ctx.commit("setErrors", errors);
    ctx.commit(
      "setDisciplines",
      disciplines.sort((a, b) => {
        const firstName = a.name.slice(a.name.indexOf("-") + 2);
        const secondName = b.name.slice(b.name.indexOf("-") + 2);
        return firstName.localeCompare(secondName);
      })
    );

    ctx.commit("unsetLoadingStatus");
  },
};
