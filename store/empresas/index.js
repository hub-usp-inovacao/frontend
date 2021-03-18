import Company from "@/lib/classes/company";

export const state = () => ({
  companies: [],
  isLoading: false,
  errors: undefined,
  keys: Company.keys,
  queryParam: undefined,
  routeParam: undefined,
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  companies: (s) => s.companies,
  isEmpty: (s) => s.companies.length === 0,
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
  queryParam: (s) => s.queryParam,
  routeParam: (s) => s.companies.find((c) => c.id == s.routeParam),
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

    return Object.keys(citiesSet).sort((a, b) => a.localeCompare(b));
  },
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setCompanies: (s, newCompanies) => (s.companies = newCompanies),
  setErrors: (s, errors) => (s.errors = errors),
  setQueryParam: (s, query) => (s.queryParam = query),
  setRouteParam: (s, id) => (s.routeParam = id),
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
