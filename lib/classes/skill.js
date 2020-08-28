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

  constructor() {
    this.id = Skill.ID++;
    this._name = "";
    this._email = "";
    this._phone = "";
    this._unity = "";
    this._campus = "";
    this._bond = "";
    this._categories = "";
    this._groupName = "";
    this._groupInitials = "";
    this._url = "";
    this._descriptions = {
      skills: [],
      services: [],
      equipments: [],
    };
    this._area = {
      major: "",
      minors: [],
    };
    this._keywords = [];
    this._lattes = "";
    this._picture = "";
  }

  set name(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._name = capitalizeName(rawColumn);
    }
  }

  get name() {
    return this._name;
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
      this._phone = formatPhone(rawColumn);
    }
  }

  get phone() {
    return this._phone;
  }

  set unity(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._unity = rawColumn;
    }
  }

  get unity() {
    return this._unity;
  }

  set campus(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._campus = rawColumn;
    }
  }

  get campus() {
    return this._campus;
  }

  set bond(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._bond = rawColumn;
    }
  }

  get bond() {
    return this._bond;
  }

  set categories(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._categories = rawColumn;
    }
  }

  get categories() {
    return this._categories;
  }

  set groupName(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._groupName = rawColumn;
    }
  }

  get groupName() {
    return this._groupName;
  }

  set groupInitials(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._groupInitials = rawColumn;
    }
  }

  get groupInitials() {
    return this._groupInitials;
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
}

export class SkillGenerator {
  static run(row) {
    const base = new Skill();

    base.name = columnValue(row, "B");
    base.email = columnValue(row, "C");
    base.phone = columnValue(row, "W");
    base.unity = columnValue(row, "E");
    base.campus = columnValue(row, "F");
    base.bond = columnValue(row, "G");
    base.categories = columnValue(row, "H");
    base.groupName = columnValue(row, "I");
    base.groupInitials = columnValue(row, "J");
    base.url = columnValue(row, "K");
    base.descriptionsSkills = columnValue(row, "L");
    base.descriptionsServices = columnValue(row, "M");
    base.descriptionsEquipments = columnValue(row, "N");
    base.areaMajor = columnValue(row, "O");
    base.areaMinors = columnValue(row, "P");
    base.keywords = columnValue(row, "Q");
    base.lattes = columnValue(row, "V");
    base.picture = columnValue(row, "X");

    return base;
  }
}
