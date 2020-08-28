import { formatURL, formatPhone } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

export class Company {
  static ID = 1;
  static keys = [
    "name",
    "technologies",
    "ecosystem",
    "description.long",
    "services",
    "address.state",
    "address.neightborhood",
  ];

  constructor() {
    this._name = "";
    this._year = "";
    this._phones = [];
    this._emails = [];
    this._url = "";
    this._category = {
      code: "",
      name: "",
    };
    this._technologies = [];
    this._incubated = false;
    this._ecosystems = [];
    this._description = {
      long: "",
    };
    this._services = "";
    this._logo = "";
    this._socialMedia = "";
    this._allowed = false;
    this._address = {
      venue: "",
      neightborhood: "",
      city: [],
      state: "",
      cep: "",
    };
    this._active = false;
  }

  set name(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._name = rawColumn;
    }
  }

  get name() {
    return this._name;
  }

  set year(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._year = rawColumn;
    }
  }

  get year() {
    return this._year;
  }

  set phones(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._phones = rawColumn
        .split(/[;\/]/)
        .map((phone) => formatPhone(phone));
    }
  }

  get phones() {
    return this._phones;
  }

  set emails(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._emails = rawColumn.split(";");
    }
  }

  get emails() {
    return this._emails;
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set categoryCode(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._category.code = rawColumn.substr(0, 2);
    }
  }

  set categoryName(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._category.name = rawColumn.split(" ").slice(1).join(" ");
    }
  }

  get category() {
    return Object.assign({}, this._category);
  }

  set technologies(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._technologies = "-.!?".split("").includes(rawColumn)
        ? []
        : rawColumn.split(";");
    }
  }

  get technologies() {
    return this._technologies;
  }

  set incubated(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._incubated = ". Nenhum Nenhuma".split(" ").includes(rawColumn);
    }
  }

  get incubated() {
    return this._incubated;
  }

  set ecosystems(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._ecosystems = rawColumn.split(";");
    }
  }

  get ecosystems() {
    return this._ecosystems;
  }

  set descriptionLong(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._description.long = rawColumn == "." ? "" : rawColumn;
    }
  }

  get description() {
    return Object.assign({}, this._description);
  }

  set services(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._services = rawColumn == "." ? "" : rawColumn;
    }
  }

  get services() {
    return this._services;
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

  set addressVenue(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._address.venue = rawColumn;
    }
  }

  set addressNeightborhood(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._address.neightborhood = rawColumn;
    }
  }

  set addressCity(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._address.city = rawColumn.split(";");
    }
  }

  set addressState(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._address.state = rawColumn;
    }
  }

  set addressCep(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._address.cep = rawColumn;
    }
  }

  get address() {
    return Object.assign({}, this._address);
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
}

export class CompanyGenerator {
  static run(row) {
    const base = new Company();

    base.name = columnValue(row, "AC");
    base.year = columnValue(row, "AE");
    base.phones = columnValue(row, "AH");
    base.emails = columnValue(row, "AI");
    base.url = columnValue(row, "AJ");
    base.categoryCode = columnValue(row, "AK");
    base.categoryName = columnValue(row, "AK");
    base.technologies = columnValue(row, "AM");
    base.incubated = columnValue(row, "BL");
    base.ecosystems = columnValue(row, "BL");
    base.descriptionLong = columnValue(row, "AR");
    base.services = columnValue(row, "AS");
    base.logo = columnValue(row, "AT");
    base.socialMedia = columnValue(row, "AU");
    base.allowed = columnValue(row, "BM");
    base.addressVenue = columnValue(row, "BG");
    base.addressNeightborhood = columnValue(row, "BH");
    base.addressCity = columnValue(row, "BI");
    base.addressState = columnValue(row, "BJ");
    base.addressCep = columnValue(row, "BK");
    base.active = columnValue(row, "BR");

    return base;
  }
}
