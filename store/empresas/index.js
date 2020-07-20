import { formatURL, columnValue } from "../../lib";

const rowToObj = (row) => ({
  name: columnValue(row, "AC"),
  year: columnValue(row, "AE"),
  phone: columnValue(row, "AH"),
  email: columnValue(row, "AI"),
  url: formatURL(columnValue(row, "AJ")),
  category: {
    code: columnValue(row, "AL").substr(0, 2),
    name: columnValue(row, "AL")
      .split(" ")
      .slice(1)
      .join(" "),
  },
  technologies: columnValue(row, "AM"),
  ecosystem: columnValue(row, "AN"),
  description: {
    long: columnValue(row, "AR"),
  },
  services: columnValue(row, "AS"),
  logo: columnValue(row, "AT"),
  socialMedia: columnValue(row, "AU"),
  allowed: columnValue(row, "AV") == "Sim",
  address: {
    venue: columnValue(row, "BF"),
    neightborhood: columnValue(row, "BG"),
    city: columnValue(row, "BH"),
    state: columnValue(row, "BI"),
    cep: columnValue(row, "BJ"),
  },
  active: columnValue(row, "BK") == "ATIVA",
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
