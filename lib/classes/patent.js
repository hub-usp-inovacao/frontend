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

  constructor(sumary) {
    this.id = Patent.ID++;
    this.sumary = sumary;

    this._name = "";
    this._url = "";
    this._classification = {
      primary: {
        cip: "",
        subarea: "",
      },
      secondary: {
        cip: "",
        subarea: "",
      },
    };
    this._ipcs = [];
    this._owners = [];
    this._inventors = [];
    this._countriesWithProtection = [];
    this._status = "";
  }

  set name(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._name = rawColumn.split(" | ")[0];
    }
  }

  get name() {
    return this._name;
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = rawColumn;
    }
  }

  get url() {
    return this._url;
  }

  set classificationPrimaryCip(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._classification.primary.cip = rawColumn.trim();
    }
  }

  set classificationPrimarySubarea(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._classification.primary.subarea = rawColumn.trim();
    }
  }

  set classificationSecondaryCip(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._classification.secondary.cip = rawColumn.trim();
    }
  }

  set classificationSecondarySubarea(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._classification.secondary.subarea = rawColumn.trim();
    }
  }

  get classification() {
    return Object.assign({}, this._classification);
  }

  set ipcs(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._ipcs = rawColumn.split(" | ");
    }
  }

  get ipcs() {
    return this._ipcs;
  }

  set owners(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._owners = rawColumn.split(" | ");
    }
  }

  get owners() {
    return this._owners;
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

  set status(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._status = rawColumn;
    }
  }

  get status() {
    return this._status;
  }
}

export class PatentGenerator {
  static run(row) {
    const base = new Patent(row[11]);

    base.name = row[5];
    base.url = columnValue(row, "X");
    base.classificationPrimaryCip = row[0];
    base.classificationPrimarySubarea = row[1];
    base.classificationSecondaryCip = row[2];
    base.classificationSecondarySubarea = row[3];
    base.ipcs = row[7];
    base.owners = row[9];
    base.inventors = row[10];
    base.countriesWithProtection = row[18];
    base.status = columnValue(row, "U");

    return base;
  }
}
