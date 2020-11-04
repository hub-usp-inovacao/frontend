import { PDI, PDIGenerator, NAPSGenerator } from "@/lib/classes/pdi";
import { findErrors } from "@/lib/errors/pdi";

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
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetsName = ["PDI_update", "NAPS"];

    ctx.commit("setLoadingStatus");

    try {
      const data = [];

      for (const sheetName of sheetsName) {
        const resp = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
        );

        const d = await resp.json();
        const objects = d.values
          .slice(1)
          .map((row) =>
            sheetName === "PDI_update" ? PDIGenerator.run(row) : NAPSGenerator.run(row)
          );

        data.push(...objects);
        if (sheetName === "PDI_update") {
          const errors = findErrors(Object.assign([], objects));
          ctx.commit("setErrors", errors);
        }
      }

      ctx.commit("setPDIs", data);
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
