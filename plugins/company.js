const companyConsts = {
  sizes: [
    "Microempresa",
    "Pequena Empresa",
    "Média Empresa",
    "Grande Empresa",
    "Não Informado",
  ],
};

export default (_, inject) => {
  inject("Company", companyConsts);
};
