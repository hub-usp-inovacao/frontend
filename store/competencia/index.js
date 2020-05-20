import { capitalizeName, formatURL } from "../../lib";

const rowToObj = (row) => ({
  name: capitalizeName(row[1]),
  email: row[2],
  phone: row[3],
  unity: row[4],
  campus: row[5],
  bond: row[6],
  categories: row[7] != undefined && row[7] != "" ? row[7].split(",") : [],
  groupName: row[8],
  groupInitials: row[9],
  url: formatURL(row[12]),
  descriptions: {
    skills: row[13],
    services: row[14],
    equipments: row[15],
  },
  area: {
    major: row[16],
    minors: row[17] != undefined && row[17] != "" ? row[17].split(/,;/) : [],
  },
  keywords: row[18].split(";"),
});

export const state = () => ({
  isLoading: false,
  skills: [],
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  skills: (s) => s.skills,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setSkills: (s, newSkills) => (s.skills = newSkills),
};

export const actions = {
  fetchSpreadsheets: async (ctx, env) => {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "COMPETENCIAS_Pending";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      ctx.commit("setSkills", values.slice(1).map(rowToObj));
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
