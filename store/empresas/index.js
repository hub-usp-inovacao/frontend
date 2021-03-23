import Company from "@/lib/classes/company";

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
  incubators: (s) => {
    return s.companies
      .reduce((incubators, company) => {
        const newIncubators = company.ecosystems.filter(
          (incub) => !incubators.includes(incub)
        );

        return incubators.concat(newIncubators);
      }, [])
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  },
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
  fetchSpreadsheets: async function (ctx, payload) {
    ctx.commit("setLoadingStatus");

    const { companies, errors } = await this.$fetchCompanies(payload);
    ctx.commit("setErrors", errors);

    ctx.commit(
      "setCompanies",
      companies.sort((a, b) => a.name.localeCompare(b.name))
    );

    ctx.commit("unsetLoadingStatus");
  },
};
