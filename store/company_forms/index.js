export const state = () => ({
  partners: [],
  name: "",
  corporateName: "",
  year: "",
  cnpj: "",
  cnae: "",
  phones: [],
  emails: [],
  address: {
    venue: "",
    neighborhood: "",
    city: [],
    state: "",
    cep: "",
  },
  description: {
    long: "",
  },
  technologies: [],
  services: [],
  ods: [],
  socialMedias: [],
  url: "",
  logo: undefined,
  numberOfCTLEmployees: "",
  numberOfPJColaborators: "",
  numberOfInterns: "",
  incubated: "",
  incubators: [],
  receivedInvestments: false,
  investments: [],
  investmentsValues: {
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
  emails: (s) => s.emails,
  address: (s) => s.address,
  venue: (s) => s.address.venue,
  neighborhood: (s) => s.address.neighborhood,
  city: (s) => s.address.city,
  state: (s) => s.address.state,
  cep: (s) => s.address.cep,
  descriptionLong: (s) => s.description.long,
  technologies: (s) => s.technologies,
  services: (s) => s.services,
  ods: (s) => s.ods,
  socialMedias: (s) => s.socialMedias,
  url: (s) => s.url,
  logo: (s) => s.logo,
  numberOfCTLEmployees: (s) => s.numberOfCTLEmployees,
  numberOfPJColaborators: (s) => s.numberOfPJColaborators,
  numberOfInterns: (s) => s.numberOfInterns,
  incubated: (s) => s.incubated,
  incubators: (s) => s.incubators,
  receivedInvestments: (s) => s.receivedInvestments,
  investments: (s) => s.investments,
  investmentsValues: (s) => s.investmentsValues,
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
  setEmails: ({ commit }, value) =>
    commit("setFormField", { key: "emails", value }),
  setAddress: ({ commit }, value) =>
    commit("setFormField", { key: "address", value }),
  setVenue: ({ commit, getters }, value) =>
    commit("setFormField", {
      key: "address",
      value: { ...getters.address, venue: value },
    }),
  setNeighborhood: ({ commit, getters }, value) =>
    commit("setFormField", {
      key: "address",
      value: { ...getters.address, neighborhood: value },
    }),
  setCity: ({ commit, getters }, value) =>
    commit("setFormField", {
      key: "address",
      value: { ...getters.address, city: value },
    }),
  setState: ({ commit, getters }, value) =>
    commit("setFormField", {
      key: "address",
      value: { ...getters.address, state: value },
    }),
  setCep: ({ commit, getters }, value) =>
    commit("setFormField", {
      key: "address",
      value: { ...getters.address, cep: value },
    }),
  setDescription: ({ commit }, value) =>
    commit("setFormField", { key: "description", value }),
  setDescriptionLong: ({ commit }, value) =>
    commit("setFormField", { key: "description", value: { long: value } }),
  setTechnologies: ({ commit }, value) =>
    commit("setFormField", { key: "technologies", value }),
  setServices: ({ commit }, value) =>
    commit("setFormField", { key: "services", value }),
  setOds: ({ commit }, value) => commit("setFormField", { key: "ods", value }),
  setSocialMedias: ({ commit }, value) =>
    commit("setFormField", { key: "socialMedias", value }),
  setUrl: ({ commit }, value) => commit("setFormField", { key: "url", value }),
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
  setInvestmentsValues: ({ commit }, value) =>
    commit("setFormField", { key: "investmentsValues", value }),

  getCompanyData: async function ({ commit }, cnpj) {
    const { status, message } = await this.$getCompanyData(cnpj);

    if (status !== "ok") {
      commit("setErrors", [message]);
    } else {
      commit("setErrors", []);
      commit("setFormField", { key: "name", value: message.name });
      commit("setFormField", {
        key: "corporateName",
        value: message.corporateName,
      });
      commit("setFormField", { key: "year", value: message.year });
      commit("setFormField", { key: "cnpj", value: message.cnpj });
      commit("setFormField", { key: "cnae", value: message.cnae });
      commit("setFormField", { key: "phones", value: message.phones });
      commit("setFormField", { key: "email", value: message.email });
      commit("setFormField", { key: "address", value: message.address });
      commit("setFormField", {
        key: "neighborhood",
        value: message.neighborhood,
      });
      commit("setFormField", { key: "city", value: message.city });
      commit("setFormField", { key: "state", value: message.state });
      commit("setFormField", { key: "cep", value: message.cep });
      commit("setFormField", {
        key: "description",
        value: message.description,
      });
      commit("setFormField", {
        key: "technologies",
        value: message.technologies,
      });
      commit("setFormField", {
        key: "productsAndServices",
        value: message.productsAndServices,
      });

      commit("setFormField", {
        key: "socialMedias",
        value: message.socialMedias,
      });

      commit("setFormField", { key: "site", value: message.site });

      commit("setFormField", { key: "logo", value: message.logo });

      commit("setFormField", { key: "incubated", value: message.incubated });
      commit("setFormField", { key: "incubators", value: message.incubators });
    }
  },

  updateCompanyForm: async function ({ commit, getters }) {
    if (!getters.cnpj || !getters.name) {
      commit("setErrors", [
        "É necessário informar o nome e o CNPJ da empresa para atualizar os dados",
      ]);
      return;
    }

    const company = prepareCompanyObject(getters);
    const { status, message } = await this.$updateCompanyData(
      company,
      getters.logo
    );

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
    company_values: [],
  };

  if (obj.corporateName)
    company.company_values.push({
      "Razão social da empresa": obj.corporateName,
    });

  if (obj.year) company.company_values.push({ "Ano de fundação": obj.year });

  if (obj.cnae) company.company_values.push({ CNAE: obj.cnae });

  if (obj.emails.length > 0)
    company.company_values.push({ Emails: obj.emails });

  if (obj.address) company.company_values.push({ Endereço: obj.address });

  if (obj.neighborhood)
    company.company_values.push({ Bairro: obj.neighborhood });

  if (obj.city.length > 0)
    company.company_values.push({ "Cidade sede": obj.city });

  if (obj.state) company.company_values.push({ Estado: obj.state });

  if (obj.cep) company.company_values.push({ CEP: obj.cep });

  if (obj.description)
    company.company_values.push({ "Breve descrição": obj.description });

  if (obj.url) company.company_values.push({ Site: obj.url });

  if (obj.technologies.length > 0)
    company.company_values.push({
      Tecnologias: obj.technologies.join("; "),
    });

  if (obj.services.length > 0)
    company.company_values.push({
      "Produtos e serviços": obj.services.join("; "),
    });

  if (obj.ods.length > 0)
    company.company_values.push({
      "Objetivos de Desenvolvimento Sustentável": obj.ods.join("; "),
    });

  if (obj.socialMedias.length > 0)
    company.company_values.push({
      "Redes sociais": obj.socialMedias.join("; "),
    });

  if (obj.numberOfCTLEmployees)
    company.company_values.push({
      "Número de funcionários contratados como CLT": obj.numberOfCTLEmployees,
    });

  if (obj.numberOfPJColaborators)
    company.company_values.push({
      "Número de colaboradores contratados como Pessoa Jurídica (PJ)":
        obj.numberOfPJColaborators,
    });

  if (obj.numberOfInterns)
    company.company_values.push({
      "Número de estagiários/bolsistas contratados": obj.numberOfInterns,
    });

  if (obj.incubated)
    company.company_values.push({
      "A empresa está ou esteve em alguma incubadora ou Parque tecnológico":
        obj.incubated,
    });

  if (obj.receivedInvestments)
    company.company_values.push({
      "A empresa recebeu investimento?": "Sim",
    });

  if (obj.investments.length > 0)
    company.company_values.push({
      Investimentos: obj.investments.join("; "),
    });

  if (obj.investmentsValues.own)
    company.company_values.push({
      "Valor do investimento próprio (R$)": obj.investmentsValues.own,
    });

  if (obj.investmentsValues.angel)
    company.company_values.push({
      "Valor do investimento-anjo (R$)": obj.investmentsValues.angel,
    });

  if (obj.investmentsValues.ventureCapital)
    company.company_values.push({
      "Valor do Venture Capital (R$)": obj.investmentsValues.ventureCapital,
    });

  if (obj.investmentsValues.privateEquity)
    company.company_values.push({
      "Valor do Private Equity (R$)": obj.investmentsValues.privateEquity,
    });

  if (obj.investmentsValues.pipeFapesp)
    company.company_values.push({
      "Valor do PIPE-FAPESP (R$)": obj.investmentsValues.pipeFapesp,
    });

  if (obj.investmentsValues.other)
    company.company_values.push({
      "Valor de outros investimentos (R$)": obj.investmentsValues.other,
    });

  return { company };
};
