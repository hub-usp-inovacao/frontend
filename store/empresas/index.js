import { CompanyGenerator } from "@/lib/classes/company";
import { findErrors } from "../../lib/errors/empresas";

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

      const objects = values.slice(1).map((row) => CompanyGenerator.run(row));

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
