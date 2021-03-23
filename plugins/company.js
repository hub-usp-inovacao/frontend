const noIncub = "Direto para o Mercado";

const sortWithNoIncubFirst = (a, b) => {
  if (a === noIncub) return -1;
  if (b === noIncub) return 1;
  return a.localeCompare(b);
};

const companyConsts = {
  incubators: [
    noIncub,
    "CIETEC - Centro de Inovação, Empreendedorismo e Tecnologia",
    "ESALQTec - Incubadora de Empresas Agrozootécnicas de Piracicaba",
    "HABITs - Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
    "Inova HC – Núcleo de Inovação do Hospital das Clínicas",
    "InovaLab@POLI",
    "ParqTec - Fundação Parque Tecnológico de São Carlos",
    "Parque Tecnológico Univap",
    "Pqtec - Parque Tecnológico São José dos Campos",
    "Supera - Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
  ].sort(sortWithNoIncubFirst),
  sizes: ["Microempresa", "Pequena Empresa", "Média Empresa", "Grande Empresa"],
};

export default (_, inject) => {
  inject("Company", companyConsts);
};
