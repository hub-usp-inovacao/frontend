import { capitalizeName, formatURL } from "../../lib";

const rowToObj = (row) => ({
  name: row[1],
  category: row[14],
  description: {
    short: row[2],
    long: row[7],
  },
  local: row[3],
  unity: row[4],
  keywords: row[5] != undefined && row[5] != "" ? row[5].split(",") : [],
  url: row[6] != undefined && row[6] != "" ? formatURL(row[6]) : "",
  email: row[8],
  socialMedia: row[9],
  startDate: row[10],
  contact: {
    person: row[11],
    info: row[12],
  },
  services: row[13],
});

export const state = () => ({
  iniciatives: [],
  isLoading: false,
});

export const getters = {
  iniciatives: (s) => s.iniciatives,
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
};

export const mutations = {
  setLoadingState: (s) => (s.isLoading = true),
  unsetLoadingState: (s) => (s.isLoading = false),
  setIniciatives: (s, newIniciatives) => (s.iniciatives = newIniciatives),
};

export const actions = {
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "INICIATIVAS";

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      ctx.commit("setIniciatives", values.slice(1).map(rowToObj));
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }
  },
};
