import { Iniciative, IniciativeGenerator } from "@/lib/classes/iniciative";
import { findErrors } from "@/lib/errors/iniciativas";

export const state = () => ({
  iniciatives: [],
  isLoading: false,
  errors: undefined,
  keys: Iniciative.keys,
});

export const getters = {
  iniciatives: (s) => s.iniciatives,
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  searchKeys: (s) => s.keys,
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
};

export const actions = {
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey } = env;
    const sheetID = "1MGRBDs-Bb2PGdyUkTN92dM5kqQuw5dtOpFHwAV1FQpA";
    const sheetName = "INICIATIVAS";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();
      const objects = values
        .slice(1)
        .map((row) => IniciativeGenerator.run(row));

      const errors = findErrors(Object.assign([], objects));

      ctx.commit("setErrors", errors);
      ctx.commit(
        "setIniciatives",
        objects.sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
