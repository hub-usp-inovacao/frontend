import { formatURL, formatPhone, removeAccent } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const NDrgx = /(n\/d)/;
const spaceRgx = /( )/;

export class Company {
  static ID = 1;
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
    description,
    incubated,
    ecosystems,
    services,
    address
  ) {
    this.inspect = {};

    this.id = Company.ID++;
    this.name = name;
    this.inspect.name = removeAccent(`${this.name}`);

    this.year = year;
    this.emails = emails;
    this.description = description;
    this.inspect.descriptionLong = removeAccent(this.description.long || "");

    this.incubated = incubated;
    this.ecosystems = ecosystems;
    this.services = services;
    this.inspect.services = removeAccent(this.services || "");

    this.address = address;

    this._phones = [];
    this._url = "";
    this._companySize = "";
    this._technologies = [];
    this._logo = "";
    this._socialMedia = "";
    this._classification = { major: "", minor: "" };
    this.allowed = true;
    this.active = true;
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
    if (
      rawColumn != undefined &&
      rawColumn != "" &&
      rawColumn != "." &&
      rawColumn != "n/d"
    ) {
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
    if (!rawColumn) return;

    this._logo = `https://drive.google.com/uc?export=view&id=${rawColumn}`;
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

  get city() {
    return this.address.city || [];
  }

  setClassification(rawColumn, cnae) {
    if (rawColumn && rawColumn != "") {
      const match = rawColumn.trim().match(/^(\d{2}).*/);

      if (match && match[1] !== "00") {
        const twoDigits = match[1];

        this._classification = {
          major: cnae[twoDigits].major,
          minor: cnae[twoDigits].minor,
        };
      }
    }
  }

  get classification() {
    return this._classification;
  }

  setCompanySize(clt, pj, others) {
    let size = 0;
    let hasInfo = false;

    if (clt && clt != "N/D") {
      hasInfo = true;
      size += parseInt(clt);
    }

    if (pj && pj != "N/D") {
      hasInfo = true;
      size += parseInt(pj);
    }

    if (others && others != "N/D") {
      hasInfo = true;
      size += parseInt(others);
    }

    if (hasInfo) {
      if (this._classification.major === "Indústria de Transformação") {
        if (size < 20) this._companySize = "Microempresa";
        else if (size >= 20 && size < 100)
          this._companySize = "Pequena Empresa";
        else if (size >= 100 && size < 500) this._companySize = "Média Empresa";
        else if (size >= 500) this._companySize = "Grande Empresa";
      } else {
        if (size < 9) this._companySize = "Microempresa";
        else if (size >= 10 && size < 50) this._companySize = "Pequena Empresa";
        else if (size >= 50 && size < 100) this._companySize = "Média Empresa";
        else if (size >= 100) this._companySize = "Grande Empresa";
      }
    }
  }

  get companySize() {
    return this._companySize;
  }

  matchesFilter({ primary, secondary, terciary }) {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = primary == this._classification.major;
    }

    if (secondary.length > 0) {
      secondaryMatch = secondary == this._classification.minor;
    }

    const city = terciary[0];
    const incubator = terciary[1];
    const size = terciary[2];

    if (city) {
      terciaryMatch = this.city.includes(city);
    }

    if (incubator) {
      terciaryMatch = terciaryMatch && this.ecosystems.includes(incubator);
    }

    if (size) {
      terciaryMatch = terciaryMatch && this._companySize === size;
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}

export class CompanyGenerator {
  static run(row, cnae) {
    const base = new Company(
      columnValue(row, "AC"),
      columnValue(row, "AE"),
      columnValue(row, "AH").split(";"), //
      {
        long: columnValue(row, "BC") == "." ? "" : columnValue(row, "BC"),
      },
      ". Nenhum Nenhuma Não".split(" ").includes(columnValue(row, "AR")),
      columnValue(row, "AR").split(";"),
      columnValue(row, "BD") == "." ? "" : columnValue(row, "BD"),
      {
        venue: columnValue(row, "AJ"),
        neightborhood: columnValue(row, "AK"),
        city: columnValue(row, "AL").split(";"),
        state: columnValue(row, "AM"),
        cep: columnValue(row, "AN"),
      }
    );

    base.phones = columnValue(row, "AG");

    const companyUrl = columnValue(row, "AI");

    if (!companyUrl.match(NDrgx) && !companyUrl.match(spaceRgx))
      base.url = companyUrl;

    base.technologies = columnValue(row, "AP");
    base.logo = columnValue(row, "BE");
    base.socialMedia = columnValue(row, "BF");

    base.setClassification(columnValue(row, "BY"), cnae);
    base.setCompanySize(
      columnValue(row, "AZ"),
      columnValue(row, "BA"),
      columnValue(row, "BB")
    );

    return base;
  }
}
