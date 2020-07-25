import { capitalizeName, formatURL, columnValue, formatPhone } from "../../lib";

const descRgxSplitter = /;/;

const rowToObj = (row) => ({
  name: capitalizeName(columnValue(row, "B")),
  email: columnValue(row, "C"),
  phone: formatPhone(columnValue(row, "W")),
  unity: columnValue(row, "E"),
  campus: columnValue(row, "F"),
  bond: columnValue(row, "G"),
  categories: columnValue(row, "H"),
  groupName: columnValue(row, "I"),
  groupInitials: columnValue(row, "J"),
  url: formatURL(columnValue(row, "K")),
  descriptions: {
    skills:
      columnValue(row, "L") != undefined && columnValue(row, "L") != ""
        ? columnValue(row, "L").split(descRgxSplitter)
        : [],
    services:
      columnValue(row, "M") != undefined && columnValue(row, "M") != ""
        ? columnValue(row, "M").split(descRgxSplitter)
        : [],
    equipments:
      columnValue(row, "N") != undefined && columnValue(row, "N") != ""
        ? columnValue(row, "N").split(descRgxSplitter)
        : [],
  },
  area: {
    major: columnValue(row, "O"),
    minors:
      columnValue(row, "P") != undefined && columnValue(row, "P") != ""
        ? columnValue(row, "P").split(/,;/)
        : [],
  },
  keywords:
    columnValue(row, "Q") != undefined && columnValue(row, "Q") != ""
      ? columnValue(row, "Q").split(";")
      : [],
  lattes: columnValue(row, "V"),
  picture: columnValue(row, "X"),
});

export const state = () => ({
  isLoading: false,
  skills: [],
  keys: [
    "name",
    "bond",
    "groupName",
    "groupInitials",
    "descriptions.skills",
    "descriptions.services",
    "descriptions.equipments",
    "keywords",
  ],
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  skills: (s) => s.skills,
  searchKeys: (s) => s.keys,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setSkills: (s, newSkills) => (s.skills = newSkills),
};

export const actions = {
  fetchSpreadsheets: async (ctx, env) => {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "COMPETENCIAS";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      ctx.commit(
        "setSkills",
        values
          .slice(1)
          .map(rowToObj)
          .sort((a, b) => (a.name == b.name ? 0 : a.name < b.name ? -1 : 1))
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
