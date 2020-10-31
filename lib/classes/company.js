import { formatURL, formatPhone, removeAccent } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

export class Company {
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

  constructor(
    name,
    year,
    emails,
    category,
    description,
    incubated,
    ecosystems,
    services,
    address
  ) {
    this.inspect = {};

    this.id = Company.ID++;
    this.name = name;
    this.inspect.name = removeAccent(this.name);

    this.year = year;
    this.emails = emails;
    this.category = category;
    this.description = description;
    this.inspect.descriptionLong = removeAccent(this.description.long);

    this.incubated = incubated;
    this.ecosystems = ecosystems;
    this.services = services;
    this.inspect.services = removeAccent(this.services);

    this.address = address;

    this._phones = [];
    this._url = "";
    this._technologies = [];
    this._logo = "";
    this._socialMedia = "";
    this._allowed = false;
    this._active = false;
  }

  set phones(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._phones = rawColumn.split(/[;/]/).map((phone) => formatPhone(phone));
    }
  }

  get phones() {
    return this._phones;
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set technologies(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._technologies = "-.!?".split("").includes(rawColumn)
        ? []
        : rawColumn.split(";");

      this.inspect.technologies = this._technologies.map(removeAccent);
    }
  }

  get technologies() {
    return this._technologies;
  }

  set logo(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._logo = rawColumn;
    }
  }

  get logo() {
    return this._logo;
  }

  set socialMedia(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._socialMedia = rawColumn;
    }
  }

  get socialMedia() {
    return this._socialMedia;
  }

  set allowed(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._allowed = rawColumn != "Não";
    }
  }

  get allowed() {
    return this._allowed;
  }

  set active(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._active = [
        "ATIVA",
        "ATIVA - EMPRESA DOMICILIADA NO EXTERIOR",
      ].includes(rawColumn);
    }
  }

  get active() {
    return this._active;
  }

  get city() {
    return this.address.city || [];
  }

  matchesFilter({ primary, secondary, terciary }, baseTabs, reverseCNAEmap) {
    let primaryMatch, secondaryMatch, terciaryMatch;

    if (primary.length == 0) {
      primaryMatch = true;
    } else {
      primaryMatch = primary
        .reduce(
          (codes, p) =>
            codes.concat(baseTabs.find(({ name }) => name === p).CNAECodes),
          []
        )
        .includes(this.category.code);
    }

    if (secondary.length == 0) {
      secondaryMatch = true;
    } else {
      secondaryMatch = secondary
        .reduce((codes, s) => codes.concat(reverseCNAEmap[s]), [])
        .includes(this.category.code);
    }

    const city = terciary[0];
    const incubator = terciary[1];

    terciaryMatch = true;

    if (city) {
      terciaryMatch = this.city.includes(city);
    }

    if (incubator) {
      terciaryMatch = terciaryMatch && this.ecosystems.includes(incubator);
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}

export class CompanyGenerator {
  static run(row) {
    const base = new Company(
      columnValue(row, "AC"),
      columnValue(row, "AE"),
      columnValue(row, "AH").split(";"), //
      {
        code: columnValue(row, "AK").substr(0, 2),
        name: columnValue(row, "AK").split(" ").slice(1).join(" "),
      },
      {
        long: columnValue(row, "AR") == "." ? "" : columnValue(row, "AR"),
      },
      ". Nenhum Nenhuma".split(" ").includes(columnValue(row, "BL")),
      columnValue(row, "BL").split(";"),
      columnValue(row, "AS") == "." ? "" : columnValue(row, "AS"),
      {
        venue: columnValue(row, "BG"),
        neightborhood: columnValue(row, "BH"),
        city: columnValue(row, "BI").split(";"),
        state: columnValue(row, "BJ"),
        cep: columnValue(row, "BK"),
      }
    );

    base.phones = columnValue(row, "AG");
    base.url = columnValue(row, "AI"); // AJ
    base.technologies = columnValue(row, "AM");
    base.logo = columnValue(row, "AT");
    base.socialMedia = columnValue(row, "AU");
    base.allowed = columnValue(row, "BM");
    base.active = columnValue(row, "BR");

    return base;
  }
}
