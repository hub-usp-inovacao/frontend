import { PatentGenerator } from "@/lib/classes/patent";

export const state = () => ({
  isLoading: false,
  patents: [],
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
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setPatents: (s, newPatents) => (s.patents = newPatents),
};

export const actions = {
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "PATENTES_NO_PUBLIC";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      ctx.commit(
        "setPatents",
        values.slice(1).map((row) => PatentGenerator.run(row))
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
