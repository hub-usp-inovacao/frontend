import { formatURL } from "../../lib";

const rowToObj = (row) => ({
  name: row[1],
  year: row[2],
  phone: row[3],
  email: row[4],
  url: formatURL(row[5]),
  category: {
    code: row[6].substr(0, 2),
    name: row[6]
      .split(" ")
      .slice(1)
      .join(" "),
  },
  technologies: row[7],
  ecosystem: row[8],
  description: {
    long: row[9],
  },
  services: row[10],
  logo: row[11],
  socialMedia: row[12],
  allowed: row[13] == "Sim",
  address: {
    venue: row[14],
    neightborhood: row[15],
    city: row[16].includes(";") ? row[16].split(";") : [].concat(row[16]),
    state: row[17],
    cep: row[18],
  },
  active: row[19] == "ATIVA",
});

export const state = () => ({
  companies: [],
  isLoading: false,
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  companies: (s) => s.companies,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setCompanies: (s, newCompanies) => (s.companies = newCompanies),
};

export const actions = {
  fetchSpreadsheets: async (ctx, env) => {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "EMPRESAS";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      ctx.commit(
        "setCompanies",
        values
          .slice(1)
          .map(rowToObj)
          .filter((c) => c.allowed && c.active)
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
