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
  ods: [],
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
  errors: [],
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
  ods: (s) => s.ods,
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
  errors: (s) => s.errors,
};

export const mutations = {
  setFormField: (s, { key, value }) => (s[key] = value),
  setErrors: (s, errors) => (s.errors = errors),
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
  setOds: ({ commit }, value) => commit("setFormField", { key: "ods", value }),
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

  updateCompanyForm: async function ({ commit, getters }) {
    if (!getters.cnpj || !getters.name) {
      commit("setErrors", [
        "É necessário informar o nome e o CNPJ da empresa para atualizar os dados",
      ]);
      return;
    }

    const company = prepareCompanyObject(getters);
    const { status, message } = await this.$updateCompanyData(company);

    if (status !== "ok") {
      commit("setErrors", [message]);
    } else {
      commit("setErrors", []);
    }
  },
};

const prepareCompanyObject = (obj) => {
  const company = {
    cnpj: obj.cnpj,
    name: obj.name,
    partners_values: obj.partners,
    new_values: [],
  };

  if (obj.corporateName)
    company.new_values.push({
      "Razão social da empresa": obj.corporateName,
    });

  if (obj.year) company.new_values.push({ "Ano de fundação": obj.year });

  if (obj.cnae) company.new_values.push({ CNAE: obj.cnae });

  if (obj.email) company.new_values.push({ Email: obj.email });

  if (obj.address) company.new_values.push({ Endereço: obj.address });

  if (obj.neighborhood) company.new_values.push({ Bairro: obj.neighborhood });

  if (obj.city) company.new_values.push({ "Cidade sede": obj.city });

  if (obj.state) company.new_values.push({ Estado: obj.state });

  if (obj.cep) company.new_values.push({ CEP: obj.cep });

  if (obj.description)
    company.new_values.push({ "Breve descrição": obj.description });

  if (obj.site) company.new_values.push({ Site: obj.site });

  if (obj.logo) company.new_values.push({ "Logo da empresa": obj.logo });

  if (obj.technologies.length > 0)
    company.new_values.push({ Tecnologias: obj.technologies.join("; ") });

  if (obj.productsAndServices.length > 0)
    company.new_values.push({
      "Produtos e serviços": obj.productsAndServices.join("; "),
    });

  if (obj.ods.length > 0)
    company.new_values.push({
      "Objetivos de Desenvolvimento Sustentável": obj.ods.join("; "),
    });

  if (obj.socialMedias.length > 0)
    company.new_values.push({
      "Redes sociais": obj.socialMedias.join("; "),
    });

  if (obj.numberOfCTLEmployees)
    company.new_values.push({
      "Número de funcionários contratados como CLT": obj.numberOfCTLEmployees,
    });

  if (obj.numberOfPJColaborators)
    company.new_values.push({
      "Número de colaboradores contratados como Pessoa Jurídica (PJ)":
        obj.numberOfPJColaborators,
    });

  if (obj.numberOfInterns)
    company.new_values.push({
      "Número de estagiários/bolsistas contratados": obj.numberOfInterns,
    });

  if (obj.incubated)
    company.new_values.push({
      "A empresa está ou esteve em alguma incubadora ou Parque tecnológico":
        obj.incubated,
    });

  if (obj.receivedInvestments)
    company.new_values.push({
      "A empresa recebeu investimento?": "Sim",
    });

  if (obj.investments.length > 0)
    company.new_values.push({
      Investimentos: obj.investments.join("; "),
    });

  if (obj.investmentValues.own)
    company.new_values.push({
      "Valor do investimento próprio (R$)": obj.investmentValues.own,
    });

  if (obj.investmentValues.angel)
    company.new_values.push({
      "Valor do investimento-anjo (R$)": obj.investmentValues.angel,
    });

  if (obj.investmentValues.ventureCapital)
    company.new_values.push({
      "Valor do Venture Capital (R$)": obj.investmentValues.ventureCapital,
    });

  if (obj.investmentValues.privateEquity)
    company.new_values.push({
      "Valor do Private Equity (R$)": obj.investmentValues.privateEquity,
    });

  if (obj.investmentValues.pipeFapesp)
    company.new_values.push({
      "Valor do PIPE-FAPESP (R$)": obj.investmentValues.pipeFapesp,
    });

  if (obj.investmentValues.other)
    company.new_values.push({
      "Valor de outros investimentos (R$)": obj.investmentValues.other,
    });

  return company;
};
