import { fixPersonName, removeAccent } from "@/lib/format";

export default class Patent {
  static ID = 1;
  static keys = [
    "inspect.name",
    "inspect.summary",
    "inspect.owners",
    "inspect.inventors",
    "inspect.ipcs",
  ];

  constructor(name, summary, classification, ipcs, owners, status) {
    this.inspect = {};

    this.id = Patent.ID++;
    this.name = name;
    this.inspect.name = removeAccent(this.name);

    this.summary = summary;
    this.inspect.summary = removeAccent(this.summary);

    this.classification = classification;
    this.ipcs = ipcs;
    this.inspect.ipcs = this.ipcs.map(removeAccent);

    this.owners = owners;
    this.inspect.owners = this.owners.map(removeAccent);

    this.status = status;

    this._url = "";
    this._photo = "";
    this._inventors = [];
    this._countriesWithProtection = [];
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = rawColumn;
    }
  }

  get url() {
    return this._url;
  }

  set inventors(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._inventors = rawColumn.split(" | ").map(fixPersonName);

      this.inspect.inventors = this._inventors.map(removeAccent);
    }
  }

  get inventors() {
    return this._inventors;
  }

  set countriesWithProtection(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._countriesWithProtection = rawColumn.split(";");
    }
  }

  get countriesWithProtection() {
    return this._countriesWithProtection;
  }

  set photo(rawColumn) {
    if (rawColumn !== undefined && rawColumn != " " && rawColumn != "N/D") {
      this._photo = `https://drive.google.com/uc?export=view&id=${rawColumn}`;
    }
  }

  get photo() {
    return this._photo;
  }

  matchesFilter({ primary, secondary, terciary }) {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;

    if (primary.length != 0) {
      primaryMatch =
        primary.includes(this.classification.primary.cip.substr(0, 1)) ||
        primary.includes(this.classification.secondary.cip.substr(0, 1));
    }

    if (primaryMatch && secondary.length != 0) {
      secondaryMatch =
        secondary.includes(this.classification.primary.subarea) ||
        secondary.includes(this.classification.secondary.subarea);
    }
    const status = terciary[0];
    if (primaryMatch && secondaryMatch && status)
      terciaryMatch = status === this.status;

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}