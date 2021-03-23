const companyConsts = {
  sizes: ["Microempresa", "Pequena Empresa", "Média Empresa", "Grande Empresa"],
};

export default (_, inject) => {
  inject("Company", companyConsts);
};
