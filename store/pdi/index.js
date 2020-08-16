import { formatURL } from "@/lib/format";
import { findErrors } from "@/lib/errors/pdi";

const rowToObj = (row) => ({
  category: row[0],
  name: row[1],
  campus: row[3],
  unity: row[4],
  url: formatURL(row[6]),
  description: {
    short: row[10],
    long: row[11],
  },
  knowledge:
    row[12] != undefined && row[12].length > 0 ? row[12].split(",") : [],
  keywords: row[14] != undefined && row[14] != "" ? row[14].split(",") : [],
});

const napsToObj = (row) => ({
  category: "NAP",
  name: `${row[0]} - ${row[1]}`,
  campus: undefined,
  unity: row[8],
  url: formatURL(row[7]),
  description: {
    short: "",
    long: "",
  },
  knowledge: [],
  keywords: [],
  kind: row[2],
  coordinator: row[5],
  year: row[3],
  email: row[6],
});

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
    const sheetsName = ["PDI", "NAPS"];

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
          .map(sheetName === "PDI" ? rowToObj : napsToObj);

        data.push(...objects);

        if (sheetName === "PDI") {
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
