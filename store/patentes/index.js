import { PatentGenerator } from "@/lib/classes/patent";
import { findErrors } from "@/lib/errors/patentes";

export const state = () => ({
  isLoading: false,
  patents: [],
  errors: undefined,
  keys: [
    "name",
    "summary",
    "owners",
    "inventors",
    "ipcs",
    "classification.primary.subarea",
    "classification.secondary.subarea",
  ],
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
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "PATENTES";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      const objects = values.slice(1).map((row) => PatentGenerator.run(row));

      const errors = findErrors(Object.assign([], objects));

      ctx.commit("setErrors", errors);
      ctx.commit("setPatents", objects);
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
