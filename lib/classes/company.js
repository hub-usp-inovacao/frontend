export default class Company {
  static ID = 1;
  static incubators = [
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
  ];
  static keys = [
    "inspect.name",
    "inspect.descriptionLong",
    "inspect.services",
    "inspect.technologies",
  ];

  static matchesFilter(
    { primary, secondary, terciary },
    baseTabs,
    reverseCNAEmap
  ) {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = primary
        .reduce(
          (codes, p) =>
            codes.concat(baseTabs.find(({ name }) => name === p).CNAECodes),
          []
        )
        .includes(this.category.code);
    }

    if (secondary.length > 0) {
      secondaryMatch = secondary
        .reduce((codes, s) => codes.concat(reverseCNAEmap[s]), [])
        .includes(this.category.code);
    }

    const city = terciary[0];
    const incubator = terciary[1];

    if (city) {
      terciaryMatch = this.city.includes(city);
    }

    if (incubator) {
      terciaryMatch = terciaryMatch && this.ecosystems.includes(incubator);
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}
