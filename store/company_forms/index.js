export const state = () => ({
  partners: [],
  name: "",
  corporateName: "",
  year: "",
  cnpj: "",
  cnae: "",
  phones: [],
  email: "",
  address: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
  description: "",
  technologies: [],
  productsAndServices: [],
  socialMedias: [],
  site: "",
  logo: undefined,
  numberOfCTLEmployees: "",
  numberOfPJColaborators: "",
  numberOfInterns: "",
  incubated: "",
  incubators: [],
  receivedInvestments: false,
  investments: [],
  investmentValues: {
    own: "",
    angel: "",
    ventureCapital: "",
    privateEquity: "",
    pipeFapesp: "",
    other: "",
  },
});

export const getters = {
  partners: (s) => s.partners,
  name: (s) => s.name,
  corporateName: (s) => s.corporateName,
  year: (s) => s.year,
  cnpj: (s) => s.cnpj,
  cnae: (s) => s.cnae,
  phones: (s) => s.phones,
  email: (s) => s.email,
  address: (s) => s.address,
  neighborhood: (s) => s.neighborhood,
  city: (s) => s.city,
  state: (s) => s.state,
  cep: (s) => s.cep,
  description: (s) => s.description,
  technologies: (s) => s.technologies,
  productsAndServices: (s) => s.productsAndServices,
  socialMedias: (s) => s.socialMedias,
  site: (s) => s.site,
  logo: (s) => s.logo,
  numberOfCTLEmployees: (s) => s.numberOfCTLEmployees,
  numberOfPJColaborators: (s) => s.numberOfPJColaborators,
  numberOfInterns: (s) => s.numberOfInterns,
  incubated: (s) => s.incubated,
  incubators: (s) => s.incubators,
  receivedInvestments: (s) => s.receivedInvestments,
  investments: (s) => s.investments,
  investmentValues: (s) => s.investmentValues,
};

export const mutations = {
  setFormField: (s, { key, value }) => (s[key] = value),
};

export const actions = {
  setPartners: ({ commit }, value) =>
    commit("setFormField", { key: "partners", value }),
  setName: ({ commit }, value) =>
    commit("setFormField", { key: "name", value }),
  setCorporateName: ({ commit }, value) =>
    commit("setFormField", { key: "corporateName", value }),
  setYear: ({ commit }, value) =>
    commit("setFormField", { key: "year", value }),
  setCnpj: ({ commit }, value) =>
    commit("setFormField", { key: "cnpj", value }),
  setCnae: ({ commit }, value) =>
    commit("setFormField", { key: "cnae", value }),
  setPhones: ({ commit }, value) =>
    commit("setFormField", { key: "phones", value }),
  setEmail: ({ commit }, value) =>
    commit("setFormField", { key: "email", value }),
  setAddress: ({ commit }, value) =>
    commit("setFormField", { key: "address", value }),
  setNeighborhood: ({ commit }, value) =>
    commit("setFormField", { key: "neighborhood", value }),
  setCity: ({ commit }, value) =>
    commit("setFormField", { key: "city", value }),
  setState: ({ commit }, value) =>
    commit("setFormField", { key: "state", value }),
  setCep: ({ commit }, value) => commit("setFormField", { key: "cep", value }),
  setDescription: ({ commit }, value) =>
    commit("setFormField", { key: "description", value }),
  setTechnologies: ({ commit }, value) =>
    commit("setFormField", { key: "technologies", value }),
  setProductsAndServices: ({ commit }, value) =>
    commit("setFormField", { key: "productsAndServices", value }),
  setSocialMedias: ({ commit }, value) =>
    commit("setFormField", { key: "socialMedias", value }),
  setSite: ({ commit }, value) =>
    commit("setFormField", { key: "site", value }),
  setLogo: ({ commit }, value) =>
    commit("setFormField", { key: "logo", value }),
  setNumberOfCTLEmployees: ({ commit }, value) =>
    commit("setFormField", { key: "numberOfCTLEmployees", value }),
  setNumberOfPJColaborators: ({ commit }, value) =>
    commit("setFormField", { key: "numberOfPJColaborators", value }),
  setNumberOfInterns: ({ commit }, value) =>
    commit("setFormField", { key: "numberOfInterns", value }),
  setIncubated: ({ commit }, value) =>
    commit("setFormField", { key: "incubated", value }),
  setIncubators: ({ commit }, value) =>
    commit("setFormField", { key: "incubators", value }),
  setReceivedInvestments: ({ commit }, value) =>
    commit("setFormField", { key: "receivedInvestments", value }),
  setInvestments: ({ commit }, value) =>
    commit("setFormField", { key: "investments", value }),
  setInvestmentValues: ({ commit }, value) =>
    commit("setFormField", { key: "investmentValues", value }),
};
