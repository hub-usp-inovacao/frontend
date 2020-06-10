import { formatURL } from "../../lib";

const rowToObj = (row) => ({
  name: row[5].split(" | ")[0],
  url: row[4], // formatURL(row[4]),
  classification: {
    primary: {
      cip: row[0],
      subareas: row[1],
    },
    secondary: {
      cip: row[2],
      subareas: row[3],
    },
  },
  ipcs: row[7].split(" | "),
  owners: row[9].split(" | "),
  inventors: row[10].split(" | ").map((name) => {
    const [last, first] = name.split(", ");
    return `${first} ${last}`;
  }),
  sumary: row[11],
  countriesWithProtection: row[18] !== undefined ? row[18].split(";") : [],
  status: row[20],
});

export const state = () => ({
  isLoading: false,
  patents: [],
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  patents: (s) => s.patents,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setPatents: (s, newPatents) => (s.patents = newPatents),
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

      ctx.commit("setPatents", values.slice(2).map(rowToObj));
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};