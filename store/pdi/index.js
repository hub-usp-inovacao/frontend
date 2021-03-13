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

    let objectsFromSheets = [];
    let objectsFromAPI = [];

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const data = await resp.json();
      objectsFromSheets = data.values
        .slice(1)
        .map((row) => PDIGenerator.runFromRow(row));

      const errors = findErrors(Object.assign([], objectsFromSheets));

      ctx.commit("setErrors", errors);
    } catch (error) {
      console.log("error occuried while fetching spreadsheets...");
      console.log(error);
    }

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

    const pdis = objectsFromSheets.concat(objectsFromAPI);
    ctx.commit(
      "setPDIs",
      pdis.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    );

    ctx.commit("unsetLoadingStatus");
  },
};
