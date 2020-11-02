import { formatURL } from "../format";

let ID = 1;

const spaceRgx = /( )/;
const dotRgx = /.+\..+/; // match "bsa.legal" which is a valid url

const checkUrl = (url) => !url.match(spaceRgx) && url.match(dotRgx);

export class PDI {
  static keys = [
    "name",
    "description.short",
    "description.long",
    "knowledge",
    "keywords",
  ];

  constructor(name, category, campus, unity, description, kind, year) {
    this.id = ID++;
    this.name = name;
    this.category = category;
    this.campus = campus;
    this.unity = unity;
    this.description = description;
    this.kind = kind;
    this.year = year;

    this._keywords = [];
    this._knowledge = [];
    this._url = "";
    this._coordinator = "";
    this._email = "";
  }

  set keywords(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._keywords = rawColumn.split(",");
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
      this._knowledge = rawColumn.split(",");
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
    },
    undefined,
    undefined);

    if (checkUrl(row[6]))
      base.url = row[6];
    
    base._knowledge = row[12];
    base.keywords = row[14];
    base.coordinator = row[5];
    base.email = row[7];
    
    return base;
  }
}

export class NAPSGenerator {
  static run(row) {
    const base = new PDI(
      `${row[0]} - ${row[1]}`,
      "NAP",
      undefined,
      row[8],
      {
        short: "",
        long: "",
      },
      row[2],
      row[3]
    );

    if (checkUrl(row[7]))
      base.url = row[7];
    
    base.knowledge = [];
    base.keywords = [];
    base.coordinator = row[5];
    base.email = row[6];

    return base;
  }
}
