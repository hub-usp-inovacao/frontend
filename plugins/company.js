const companyConsts = {
  incubators: [
    "Direto para o Mercado",
    "CIETEC – Centro de Inovação, Empreendedorismo e Tecnologia",
    "ESALQTec – Incubadora de Empresas Agrozootécnicas de Piracicaba",
    "HABITs – Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
    "INOVA-HC",
    "InovaLab@POLI",
    "ParqTec – Fundação Parque Tecnológico de São Carlos",
    "Parque Tecnológico Univap",
    "Pqtec – Parque Tecnológico São José dos Campos",
    "Supera – Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
  ],
  sizes: ["Microempresa", "Pequena Empresa", "Média Empresa", "Grande Empresa"],
};

export default (_, inject) => {
  inject("Company", companyConsts);
};
