import { formatURL, removeAccent } from "../format";

let ID = 1;

const spaceRgx = /( )/;
const dotRgx = /.+\..+/; // match "bsa.legal" which is a valid url

const checkUrl = (url) => !url.match(spaceRgx) && url.match(dotRgx);

export class PDI {
  static keys = [
    "inspect.name",
    "inspect.descriptionShort",
    "inspect.descriptionLong",
    "inspect.knowledge",
    "inspect.keywords",
  ];

  constructor(name, category, campus, unity, description) {
    this.inspect = {};

    this.id = ID++;
    this.name = name;
    this.inspect.name = removeAccent(this.name);

    this.category = category;
    this.campus = campus;
    this.unity = unity;
    this.description = description;
    this.inspect.descriptionShort = removeAccent(this.description.short || "");
    this.inspect.descriptionLong = removeAccent(this.description.long || "");

    this._keywords = [];
    this._knowledge = [];
    this._url = "";
    this._coordinator = "";
    this._email = "";
    this._phone = "";
  }

  set keywords(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._keywords = rawColumn.split(/[,;]/);

      this.inspect.keywords = this._keywords.map(removeAccent);
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

  set knowledge(rawColumn) {
    if (rawColumn != undefined && rawColumn.length > 0) {
      this._knowledge = rawColumn.split(/[,;]/);

      this.inspect.knowledge = this._knowledge.map(removeAccent);
    }
  }

  get knowledge() {
    return this._knowledge;
  }

  set coordinator(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._coordinator = rawColumn;
    }
  }

  get coordinator() {
    return this._coordinator;
  }

  set email(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._email = rawColumn;
    }
  }

  get email() {
    return this._email;
  }

  set phone(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._phone = rawColumn;
    }
  }

  get phone() {
    return this._phone;
  }

  matchesFilter({ primary, terciary }) {
    let primaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = primary.includes(this.category);
    }

    const [campus] = terciary;

    if (campus) {
      terciaryMatch = this.campus === campus;
    }
    
    return primaryMatch && terciaryMatch;
  }
}

export class PDIGenerator {
  static run(row) {
    const base = new PDI(row[1], row[0], row[3], row[4], {
      short: row[10],
      long: row[11],
    });

    if (checkUrl(row[6]))
      base.url = row[6];
    
    base._knowledge = row[12];
    base.keywords = row[14];
    base.coordinator = row[5];
    base.email = row[7];
    base.phone = row[8];
    
    return base;
  }
}