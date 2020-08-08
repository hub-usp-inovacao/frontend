import { columnValue } from "../sheets";
import { formatURL, formatPhone } from "../format";

export class Iniciative {
  static ID = 1;
  static keys = [
    "name",
    "description.long",
    "description.short",
    "keywords",
    "services",
  ];

  constructor(name, category, description, local, unity, email, startDate) {
    this.id = Iniciative.ID++;
    this.name = name;
    this.category = category;
    this.description = description;
    this.local = local;
    this.unity = unity;
    this.email = email;
    this.startDate = startDate;

    this._keywords = [];
    this._url = "";
    this._socialMedia = "";
    this._contact = {
      person: "",
      info: "",
    };
    this._services = "";
  }

  set keywords(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._keywords = rawColumn.split(/[;,]/);
    }
  }

  get keywords() {
    return this._keywords;
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set socialMedia(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._socialMedia = rawColumn;
    }
  }

  get socialMedia() {
    return this._socialMedia;
  }

  set contactPerson(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._contact.person = rawColumn;
    }
  }

  set contactInfo(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._contact.info = rawColumn
        .split(";")
        .map((phone) => formatPhone(phone));
    }
  }

  get contact() {
    return Object.assign({}, this._contact);
  }

  set services(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._services = rawColumn;
    }
  }

  fitsFilters([primary]) {
    return this.category == primary;
  }
}

export class IniciativeGenerator {
  static run(row) {
    const base = new Iniciative(
      row[1],
      row[0],
      {
        short: row[2],
        long: row[7],
      },
      row[3],
      row[4],
      row[8],
      row[10]
    );

    base.keywords = columnValue(row, "F");
    base.socialMedia = row[9];
    base.services = row[13];
    base.contactPerson = row[11];
    base.contactInfo = columnValue(row, "M");

    return base;
  }
}
