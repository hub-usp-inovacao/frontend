import { PDI, PDIGenerator } from "@/lib/classes/pdi";
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
    const { sheetsAPIKey } = env;
    const sheetID = "1TZWMGvvn6TUmwo8DdWvtkLcbDVqVuif9HKMRPVcb2eo";
    const sheetName = "PDI";

    ctx.commit("setLoadingStatus");

    try {
      let resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      let data = await resp.json();
      const objectsFromSheets = data.values
        .slice(1)
        .map((row) => PDIGenerator.runFromRow(row));

      const errors = findErrors(Object.assign([], objectsFromSheets));

      let centraisURL = "http://localhost:3001/centrais";
      if (process.env.USPMULTI)
        centraisURL = "https://uspmulti.prp.usp.br/api/public/centrais";

      resp = await fetch(centraisURL);
      data = await resp.json();

      const objectsFromAPI = data.map((d) => PDIGenerator.runForCentrais(d));

      const pdis = objectsFromSheets.concat(objectsFromAPI);

      ctx.commit("setErrors", errors);
      ctx.commit(
        "setPDIs",
        pdis.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
