import { formatURL } from "../../lib";

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
  keywords: row[14],
});

export const state = () => ({
  pdis: [],
  isLoading: false,
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  pdis: (state) => state.pdis,
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
};

export const actions = {
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "PDI";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const data = await resp.json();

      ctx.commit("setPDIs", data.values.slice(1).map(rowToObj));
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
