import { formatURL, formatPhone, removeAccent } from "@/lib/format";

function hasND(rawColumn) {
  const ns = "Nn".split("");
  const ds = "Dd".split("");

  return ns.some((n) => ds.some((d) => rawColumn == `${n}/${d}`));
}

export default class Company {
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
    this._companySize = [];
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
      !hasND(rawColumn.trim())
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
    if (!rawColumn || rawColumn == "N/D") return;

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

  setCompanySize(employees, unicornio) {
    const size = parseInt(employees);
    if (employees && size != 0) {
      if (this._classification.major === "Indústria de Transformação") {
        if (size < 20) this._companySize.push("Microempresa");
        else if (size >= 20 && size < 100)
          this._companySize.push("Pequena Empresa");
        else if (size >= 100 && size < 500)
          this._companySize.push("Média Empresa");
        else if (size >= 500) this._companySize.push("Grande Empresa");
      } else {
        if (size < 9) this._companySize.push("Microempresa");
        else if (size >= 10 && size < 50)
          this._companySize.push("Pequena Empresa");
        else if (size >= 50 && size < 100)
          this._companySize.push("Média Empresa");
        else if (size >= 100) this._companySize.push("Grande Empresa");
      }
    } else this._companySize.push("Não Informado");

    if (unicornio && unicornio == "Unicórnio")
      this._companySize.push("Unicórnio");
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
      terciaryMatch = terciaryMatch && this._companySize.includes(size);
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}
