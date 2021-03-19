import { formatURL, formatPhone, removeAccent } from "../format";

export default class Iniciative {
  static ID = 1;
  static keys = [
    "inspect.name",
    "inspect.descriptionLong",
    "inspect.descriptionShort",
    "inspect.keywords",
    "inspect.services",
  ];

  constructor(name, category, description, unity, email, startDate) {
    this.inspect = {};

    this.id = Iniciative.ID++;
    this.name = name;
    this.inspect.name = removeAccent(this.name);

    this.category = category;
    this.description = description;
    this.inspect.descriptionLong = removeAccent(this.description.long);
    this.inspect.descriptionShort = removeAccent(this.description.short);

    this.unity = unity;
    this.email = email;
    this.startDate = startDate;

    this._local = [];
    this._keywords = [];
    this._url = "";
    this._socialMedia = "";
    this._contact = {
      person: "",
      info: [],
    };
    this._services = "";
  }

  set local(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._local = rawColumn.split(",").map((l) => l.trim());
    }
  }

  get local() {
    return this._local;
  }

  set keywords(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._keywords = rawColumn
        .split(/[;,]/)
        .filter((key) => key.trim().length > 0);

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

      this.inspect.services = removeAccent(this._services);
    }
  }

  matchesFilter({ primary, terciary }) {
    let primaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0)
      primaryMatch = primary.some(
        (p) => p.toLowerCase() === this.category.toLowerCase()
      );

    const [campus] = terciary;

    if (campus) terciaryMatch = this.local.includes(campus);

    return primaryMatch && terciaryMatch;
  }
}
