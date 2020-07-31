import { formatURL, formatPhone } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const rowToObj = (row) => ({
  name: columnValue(row, "AC"),
  year: columnValue(row, "AE"),
  phones: columnValue(row, "AH")
    .split(";")
    .map((phone) => formatPhone(phone)),
  emails: columnValue(row, "AI").split(";"),
  url: formatURL(columnValue(row, "AJ")),
  category: {
    code: columnValue(row, "AL").substr(0, 2),
    name: columnValue(row, "AL")
      .split(" ")
      .slice(1)
      .join(" "),
  },
  technologies: columnValue(row, "AM"),
  incubated: columnValue(row, "AN") != "Não" && columnValue(row, "AN") != ".",
  ecosystems: columnValue(row, "AN").split(";"),
  description: {
    long: columnValue(row, "AR"),
  },
  services: columnValue(row, "AS"),
  logo: columnValue(row, "AT"),
  socialMedia: columnValue(row, "AU"),
  allowed: columnValue(row, "AV") != "Não",
  address: {
    venue: columnValue(row, "BF"),
    neightborhood: columnValue(row, "BG"),
    city: columnValue(row, "BH").split(";"),
    state: columnValue(row, "BI"),
    cep: columnValue(row, "BJ"),
  },
  active: ["ATIVA", "ATIVA - EMPRESA DOMICILIADA NO EXTERIOR"].includes(
    columnValue(row, "BK")
  ),
});

export const state = () => ({
  companies: [],
  isLoading: false,
  keys: [
    "name",
    "technologies",
    "ecosystem",
    "description.long",
    "services",
    "address.state",
    "address.neightborhood",
  ],
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  companies: (s) => s.companies,
  searchKeys: (s) => s.keys,
  incubators: (s) =>
    Array.from(
      s.companies.reduce((set, comp) => {
        comp.ecosystems.forEach((eco) => set.add(eco.trim()));

        return set;
      }, new Set())
    ).sort((a, b) => {
      if (a == "Não" || b == "Não") {
        return a == "Não" ? -1 : 1;
      }

      if (a == b) {
        return 0;
      }

      return a < b ? -1 : 1;
    }),
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
