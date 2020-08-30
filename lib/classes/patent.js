import { fixPersonName } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

export class Patent {
  static ID = 1;
  static keys = [
    "name",
    "summary",
    "owners",
    "inventors",
    "ipcs",
    "classification.primary.subarea",
    "classification.secondary.subarea",
  ];

  constructor(name, sumary, classification, ipcs, owners, status) {
    this.id = Patent.ID++;
    this.name = name;
    this.sumary = sumary;
    this.classification = classification;
    this.ipcs = ipcs;
    this.owners = owners;
    this.status = status;

    this._url = "";
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

  matchesFilter({ primary, secondary, terciary }, primaryAreaNameToCode) {
    const primaryCodes = primary.map(primaryAreaNameToCode);

    if (primaryCodes.length == 0) {
      return true;
    }

    const primaryMatch =
      primaryCodes.includes(this.classification.primary.cip.substr(0, 1)) ||
      primaryCodes.includes(this.classification.secondary.cip.substr(0, 1));

    if (!primaryMatch) {
      return false;
    }

    if (secondary.length == 0 && terciary.length == 0) {
      return true;
    }

    if (secondary.length != 0) {
      const secMatch =
        secondary.includes(this.classification.primary.subarea) ||
        secondary.includes(this.classification.secondary.subarea);

      if (!secMatch) {
        return false;
      }
    }

    if (terciary.length != 0) {
      const terMatch = terciary.includes(this.status);

      if (!terMatch) {
        return false;
      }
    }

    return true;
  }
}

export class PatentGenerator {
  static run(row) {
    const base = new Patent(
      row[5].split(" | ")[0],
      row[11],
      {
        primary: {
          cip: row[0].trim(),
          subarea: row[1].trim(),
        },
        secondary: {
          cip: row[2].trim(),
          subarea: row[3].trim(),
        },
      },
      row[7].split(" | "),
      row[9].split(" | "),
      columnValue(row, "U")
    );

    base.url = columnValue(row, "X");
    base.inventors = row[10];
    base.countriesWithProtection = row[18];

    return base;
  }
}
