import { PDIGenerator, NAPSGenerator } from "@/lib/classes/pdi";
import { findErrors } from "@/lib/errors/pdi";

async function fetch_data(sheetID, sheetsAPIKey, id) {
  const meta = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}?key=${sheetsAPIKey}`
  );

  const { sheets } = await meta.json();
  const sheetName = sheets[id].properties.title; //sheetName = "PDI"||"NAPS"

  const resp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
  );

  const d = await resp.json();
  const objects = d.values
    .slice(1)
    .map((row) =>
      sheetName === "PDI" ? PDIGenerator.run(row) : NAPSGenerator.run(row)
    );

  return objects;
}

export const state = () => ({
  pdis: [],
  isLoading: false,
  errors: undefined,
  keys: [
    "name",
    "description.short",
    "description.long",
    "knowledge",
    "keywords",
  ],
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
    ctx.commit("setLoadingStatus");

    try {
      const data = [];

      //PDI
      let objects = await fetch_data(sheetID, sheetsAPIKey, 0);
      data.push(...objects);
      const errors = findErrors(Object.assign([], objects));
      ctx.commit("setErrors", errors);

      //NAPS
      objects = await fetch_data(sheetID, sheetsAPIKey, 5);
      data.push(...objects);

      ctx.commit("setPDIs", data);
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
