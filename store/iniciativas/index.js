import { formatURL, formatPhone } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const rowToObj = (row) => ({
  name: row[1],
  category: columnValue(row, "A"),
  description: {
    short: row[2],
    long: row[7],
  },
  local: row[3],
  unity: row[4],
  keywords:
    columnValue(row, "F") != undefined && columnValue(row, "F") != ""
      ? columnValue(row, "F").split(/[;,]/)
      : [],
  url: row[6] != undefined && row[6] != "" ? formatURL(row[6]) : "",
  email: row[8],
  socialMedia: row[9],
  startDate: row[10],
  contact: {
    person: row[11],
    info: columnValue(row, "M")
      .split(";")
      .map((phone) => formatPhone(phone)),
  },
  services: row[13],
});

export const state = () => ({
  iniciatives: [],
  isLoading: false,
  keys: [
    "name",
    "description.short",
    "description.long",
    "keywords",
    "services",
  ],
});

export const getters = {
  iniciatives: (s) => s.iniciatives,
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  searchKeys: (s) => s.keys,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setIniciatives: (s, newIniciatives) => (s.iniciatives = newIniciatives),
};

export const actions = {
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "INICIATIVAS";

    ctx.commit("setLoadingStatus");

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

    ctx.commit("unsetLoadingStatus");
  },
};
