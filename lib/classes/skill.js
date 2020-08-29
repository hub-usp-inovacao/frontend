import { capitalizeName, formatURL, formatPhone } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const descRgxSplitter = /;/;

export class Skill {
  static ID = 1;
  static keys = [
    "name",
    "bond",
    "groupName",
    "groupInitials",
    "descriptions.skills",
    "descriptions.services",
    "descriptions.equipments",
    "keywords",
  ];

  constructor(
    name,
    email,
    unity,
    campus,
    bond,
    categories,
    groupName,
    groupInitials
  ) {
    this.id = Skill.ID++;
    this.name = name;
    this.email = email;
    this.unity = unity;
    this.campus = campus;
    this.bond = bond;
    this.categories = categories;
    this.groupName = groupName;
    this.groupInitials = groupInitials;

    this._descriptions = {
      skills: [],
      services: [],
      equipments: [],
    };
    this._area = {
      major: "",
      minors: [],
    };
    this._phone = "";
    this._url = "";
    this._keywords = [];
    this._lattes = "";
    this._picture = "";
  }

  set phone(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._phone = formatPhone(rawColumn);
    }
  }

  get phone() {
    return this._phone;
  }

  set url(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set descriptionsSkills(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._descriptions.skills = rawColumn.split(descRgxSplitter);
    }
  }

  set descriptionsServices(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._descriptions.services = rawColumn.split(descRgxSplitter);
    }
  }

  set descriptionsEquipments(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._descriptions.equipments = rawColumn.split(descRgxSplitter);
    }
  }

  get descriptions() {
    return Object.assign({}, this._descriptions);
  }

  set areaMajor(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._area.major = rawColumn;
    }
  }

  set areaMinors(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._area.minors = rawColumn.split(/,;/);
    }
  }

  get area() {
    return Object.assign({}, this._area);
  }

  set keywords(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._keywords = rawColumn.split(";");
    }
  }

  set lattes(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._lattes = rawColumn;
    }
  }

  get lattes() {
    return this._lattes;
  }

  set picture(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._picture = rawColumn;
    }
  }

  get picture() {
    return this._picture;
  }

  matchesFilter({ primary, secondary, terciary }) {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = primary.includes(this.area.major);
    }

    if (secondary.length > 0) {
      secondaryMatch = this.area.minors.some((minor) =>
        secondary.includes(minor)
      );
    }

    const [campus, unity] = terciary;

    if (campus) {
      terciaryMatch = this.campus === campus;
    }

    if (unity) {
      terciaryMatch = terciaryMatch && this.unity === unity;
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}

export class SkillGenerator {
  static run(row) {
    const base = new Skill(
      capitalizeName(columnValue(row, "B")),
      columnValue(row, "C"),
      columnValue(row, "E"),
      columnValue(row, "F"),
      columnValue(row, "G"),
      columnValue(row, "H"),
      columnValue(row, "I"),
      columnValue(row, "J")
    );

    base.phone = columnValue(row, "W");
    base.url = columnValue(row, "K");
    base.descriptionsSkills = columnValue(row, "L");
    base.descriptionsServices = columnValue(row, "M");
    base.descriptionsEquipments = columnValue(row, "N");
    base.areaMajor = columnValue(row, "O");
    base.areaMinors = columnValue(row, "P");
    base.keywords = columnValue(row, "Q");
    base.picture = columnValue(row, "X");
    base.lattes = columnValue(row, "V");

    return base;
  }
}
