import { Company, CompanyGenerator } from "@/lib/classes/company";
import { findErrors } from "../../lib/errors/empresas";

export const state = () => ({
  companies: [],
  isLoading: false,
  errors: undefined,
  keys: Company.keys,
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  companies: (s) => s.companies,
  searchKeys: (s) => s.keys,
  errors: (s) => s.errors,
  cities: (s) => {
    const cities = s.companies.reduce((all, company) => {
      return all.concat(
        company.city.filter((city) => {
          return city != "N/D" && city != "n/d";
        })
      );
    }, []);

    const citiesSet = cities
      .map((city) => city.trim())
      .filter((city) => city.length > 0)
      .reduce((set, city) => {
        if (!set[city]) {
          set[city] = city;
        }

        return set;
      }, {});

    return Object.keys(citiesSet).sort();
  },
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setCompanies: (s, newCompanies) => (s.companies = newCompanies),
  setErrors: (s, errors) => (s.errors = errors),
};

export const actions = {
  fetchSpreadsheets: async (ctx, env) => {
    const { sheetsAPIKey } = env;
    const sheetID = "14uwSMZee-CoIJyIpcEf4t17z6eYN-ElYgw_O7dtU5Ok";
    const sheetName = "EMPRESAS";
    const cnae = env.cnae;

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const data = await resp.json();

      const objects = data.values.slice(1).map((row, i) => {
        let company;
        try {
          company = CompanyGenerator.run(row, cnae);
        } catch (e) {
          console.log(`[Company Exception] failed for row ${i + 2}`);
          company = null;
        }

        return company;
      });

      const errors = findErrors(Object.assign([], objects));

      ctx.commit("setErrors", errors);

      ctx.commit(
        "setCompanies",
        objects
          .filter((c) => c !== null && c.allowed && c.active)
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
