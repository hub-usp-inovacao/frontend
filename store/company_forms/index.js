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
  collaboratorsLastUpdatedAt: new Date(),
  investmentsLastUpdatedAt: new Date(),
  numberOfCTLEmployees: "",
  numberOfPJColaborators: "",
  numberOfInterns: "",
  incubated: "",
  ecosystems: [],
  receivedInvestments: false,
  investments: [],
  investmentsValues: {
    own: "R$ 0,00",
    angel: "R$ 0,00",
    ventureCapital: "R$ 0,00",
    privateEquity: "R$ 0,00",
    pipeFapesp: "R$ 0,00",
    other: "R$ 0,00",
  },
  financeValue: "R$ 0,00",
  wantsDna: false,
  dnaContactName: "",
  dnaContactEmail: "",
  truthfulInformations: false,
  permission: [],
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
  description: (s) => s.description,
  descriptionLong: (s) => s.description.long,
  technologies: (s) => s.technologies,
  services: (s) => s.services,
  ods: (s) => s.ods,
  socialMedias: (s) => s.socialMedias,
  url: (s) => s.url,
  logo: (s) => s.logo,
  collaboratorsLastUpdatedAt: (s) => s.collaboratorsLastUpdatedAt,
  investmentsLastUpdatedAt: (s) => s.investmentsLastUpdatedAt,
  numberOfCTLEmployees: (s) => s.numberOfCTLEmployees,
  numberOfPJColaborators: (s) => s.numberOfPJColaborators,
  numberOfInterns: (s) => s.numberOfInterns,
  incubated: (s) => s.incubated,
  ecosystems: (s) => s.ecosystems,
  receivedInvestments: (s) => s.receivedInvestments,
  investments: (s) => s.investments,
  investmentsValues: (s) => s.investmentsValues,
  financeValue: (s) => s.financeValue,
  wantsDna: (s) => s.wantsDna,
  dnaContactName: (s) => s.dnaContactName,
  dnaContactEmail: (s) => s.dnaContactEmail,
  truthfulInformations: (s) => s.truthfulInformations,
  permission: (s) => s.permission,
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
  setEcosystems: ({ commit }, value) =>
    commit("setFormField", { key: "ecosystems", value }),
  setReceivedInvestments: ({ commit }, value) =>
    commit("setFormField", { key: "receivedInvestments", value }),
  setInvestments: ({ commit }, value) =>
    commit("setFormField", { key: "investments", value }),
  setInvestmentsValues: ({ commit }, value) =>
    commit("setFormField", { key: "investmentsValues", value }),
  setFinanceValue: ({ commit }, value) =>
    commit("setFormField", { key: "financeValue", value }),
  setWantsDna: ({ commit }, value) =>
    commit("setFormField", { key: "wantsDna", value }),
  setDnaContactName: ({ commit }, value) =>
    commit("setFormField", { key: "dnaContactName", value }),
  setDnaContactEmail: ({ commit }, value) =>
    commit("setFormField", { key: "dnaContactEmail", value }),
  setTruthfulInformations: ({ commit }, value) =>
    commit("setFormField", { key: "truthfulInformations", value }),
  setPermission: ({ commit }, value) =>
    commit("setFormField", { key: "permission", value }),

  getCompanyData: async function ({ commit, getters }) {
    const cnpj = getters.cnpj;
    const { status, message } = await this.$getCompanyData(cnpj);

    if (status !== "ok") {
      commit("setErrors", [message]);
    } else {
      commit("setErrors", []);

      Object.keys(message).forEach((key) => {
        const k = snakeToCamelCase(key);

        // eslint-disable-next-line no-prototype-builtins
        if (getters.hasOwnProperty(k)) {
          commit("setFormField", { key: k, value: message[key] });
        }
      });

      commit("setFormField", {
        key: "collaboratorsLastUpdatedAt",
        value: new Date(message["collaborators_last_updated_at"]),
      });
      commit("setFormField", {
        key: "investmentsLastUpdatedAt",
        value: new Date(message["investments_last_updated_at"]),
      });
      commit("setFormField", { key: "logo", value: undefined });
    }
  },

  updateCompanyForm: async function ({ commit, getters }) {
    if (!getters.cnpj || !getters.name || getters.partners.length === 0) {
      commit("setErrors", [
        "É necessário informar o nome, CNPJ e pelo menos um sócio da empresa para atualizar os dados",
      ]);
      return false;
    }

    const company = prepareCompanyObject(getters);
    const { status, message } = await this.$updateCompanyData(
      company,
      getters.logo
    );

    if (status !== "ok") {
      commit("setErrors", [message]);
      return false;
    }

    commit("setErrors", []);
    return true;
  },
};

const snakeToCamelCase = (key) => {
  return key
    .split("_")
    .map((value, index) => {
      if (index > 0) {
        let first = value[0];
        first = first.toUpperCase();
        value = first + value.slice(1);
      }

      return value;
    })
    .join("");
};

const prepareCompanyObject = (obj) => ({
  company: {
    cnpj: obj.cnpj,
    name: obj.name,
    partners_values: obj.partners,
    company_values: {
      "Razão social da empresa": obj.corporateName,
      "Ano de fundação": obj.year,
      CNAE: obj.cnae,
      Emails: obj.emails,
      Endereço: obj.address,
      Bairro: obj.neighborhood,
      "Cidade sede": obj.city,
      Estado: obj.state,
      CEP: obj.cep,
      "Breve descrição": obj.description,
      Site: obj.url,
      Tecnologias: obj.technologies.join("; "),
      "Produtos e serviços": obj.services.join("; "),
      "Objetivos de Desenvolvimento Sustentável": obj.ods.join("; "),
      "Redes sociais": obj.socialMedias.join("; "),
      "Número de funcionários contratados como CLT": obj.numberOfCTLEmployees,
      "Número de colaboradores contratados como Pessoa Jurídica (PJ)":
        obj.numberOfPJColaborators,
      "Número de estagiários/bolsistas contratados": obj.numberOfInterns,
      "A empresa está ou esteve em alguma incubadora ou Parque tecnológico":
        obj.incubated,
      "A empresa recebeu investimento?": obj.receivedInvestments
        ? "Sim"
        : "Não",
      Investimentos: obj.investments.join("; "),
      "Valor do investimento próprio (R$)": obj.investmentsValues.own,
      "Valor do investimento-anjo (R$)": obj.investmentsValues.angel,
      "Valor do Venture Capital (R$)": obj.investmentsValues.ventureCapital,
      "Valor do Private Equity (R$)": obj.investmentsValues.privateEquity,
      "Valor do PIPE-FAPESP (R$)": obj.investmentsValues.pipeFapesp,
      "Valor de outros investimentos (R$)": obj.investmentsValues.other,
      Faturamento: obj.financeValue,
    },
    dna_values: {
      wants_dna: obj.wantsDna,
      name: obj.wantsDna ? obj.dnaContactName : "",
      email: obj.wantsDna ? obj.dnaContactEmail : "",
    },
    truthful_informations: obj.truthfulInformations,
    permission: obj.permission,
  },
});
