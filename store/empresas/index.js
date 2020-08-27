import { formatURL, formatPhone } from "@/lib/format";
import { columnValue } from "@/lib/sheets";
import { findErrors } from "../../lib/errors/empresas";

const rowToObj = (row) => ({
  name: columnValue(row, "AC"),
  year: columnValue(row, "AE"),
  phones: columnValue(row, "AH")
    .split(/[;\/]/)
    .map((phone) => formatPhone(phone)),
  emails: columnValue(row, "AI").split(";"),
  url: formatURL(columnValue(row, "AJ")),
  category: {
    code: columnValue(row, "AK").substr(0, 2),
    name: columnValue(row, "AK").split(" ").slice(1).join(" "),
  },
  technologies: "-.!?".split("").includes(columnValue(row, "AM"))
    ? []
    : columnValue(row, "AM").split(";"),
  incubated: ". Nenhum Nenhuma".split(" ").includes(columnValue(row, "BL")),
  ecosystems: columnValue(row, "BL").split(";"),
  description: {
    long: columnValue(row, "AR") == "." ? "" : columnValue(row, "AR"),
  },
  services: columnValue(row, "AS") == "." ? "" : columnValue(row, "AS"),
  logo: columnValue(row, "AT"),
  socialMedia: columnValue(row, "AU"),
  allowed: columnValue(row, "BM") != "Não",
  address: {
    venue: columnValue(row, "BG"),
    neightborhood: columnValue(row, "BH"),
    city: columnValue(row, "BI").split(";"),
    state: columnValue(row, "BJ"),
    cep: columnValue(row, "BK"),
  },
  active: ["ATIVA", "ATIVA - EMPRESA DOMICILIADA NO EXTERIOR"].includes(
    columnValue(row, "BR")
  ),
});

export const state = () => ({
  companies: [],
  isLoading: false,
  errors: undefined,
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
    )
      .concat(["INOVA-HC"])
      .sort((a, b) => {
        if (a == "Não" || b == "Não") {
          return a == "Não" ? -1 : 1;
        }

        if (a == b) {
          return 0;
        }

        return a < b ? -1 : 1;
      }),
  errors: (s) => s.errors,
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setCompanies: (s, newCompanies) => (s.companies = newCompanies),
  setErrors: (s, errors) => {
    s.errors = errors;
    console.log(s.errors);
  },
};

export const actions = {
  fetchSpreadsheets: async (ctx, env) => {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "EMPRESAS_UPDATE";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();

      const objects = values.slice(1).map(rowToObj);

      const errors = findErrors(Object.assign([], objects));

      ctx.commit("setErrors", errors);

      ctx.commit(
        "setCompanies",
        objects
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
