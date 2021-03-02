import { formatURL, removeAccent } from "../format";

export default class Discipline {
  static ID = 1;
  static keys = [
    "inspect.name",
    "inspect.descriptionLong",
    "inspect.descriptionShort",
  ];

  constructor(name, campus, unity, description, startData, nature, level) {
    this.inspect = {};

    this.id = Discipline.ID++;
    this.name = name;
    this.inspect.name = removeAccent(this.name);

    this.campus = campus;
    this.unity = unity;
    this.description = description;
    this.inspect.descriptionLong = removeAccent(this.description.long || "");
    this.inspect.descriptionShort = removeAccent(this.description.short || "");

    this.startData = startData;
    this.nature = nature;
    this.level = level;

    this._url = "";
    this._category = {
      business: false,
      entrepreneurship: false,
      innovation: false,
      intellectualProperty: false,
    };
    this.keywords = [];
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set categoryBusiness(rawColumn) {
    if (rawColumn != undefined) {
      this._category.business = rawColumn.length > 0;
      if (rawColumn.length > 0) this.keywords.push("Negócios");
    }
  }

  set categoryEntrepreneurship(rawColumn) {
    if (rawColumn != undefined) {
      this._category.entrepreneurship = rawColumn.length > 0;
      if (rawColumn.length > 0) this.keywords.push("Empreendedorismo");
    }
  }

  set categoryInnovation(rawColumn) {
    if (rawColumn != undefined) {
      this._category.innovation = rawColumn.length > 0;
      if (rawColumn.length > 0) this.keywords.push("Inovação");
    }
  }

  set categoryIntellectualProperty(rawColumn) {
    if (rawColumn != undefined) {
      this._category.intellectualProperty = rawColumn.length > 0;
      if (rawColumn.length > 0) this.keywords.push("Propriedade Intelectual");
    }
  }

  get category() {
    return Object.assign({}, this._category);
  }

  matchesFilter({ primary, terciary }) {
    const categories = this.keywords;
    let primaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = categories.some((cat) => primary.includes(cat));
    }

    const [campus, level, nature] = terciary;

    if (campus != undefined) {
      terciaryMatch = this.campus === campus;
    }

    if (level != undefined) {
      terciaryMatch = terciaryMatch && this.level === level;
    }

    if (nature != undefined) {
      terciaryMatch =
        terciaryMatch && this.nature.toLowerCase() === nature.toLowerCase();
    }

    return primaryMatch && terciaryMatch;
  }
}
