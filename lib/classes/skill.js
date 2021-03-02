import {
  capitalizeName,
  formatURL,
  formatPhone,
  removeAccent,
} from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const descRgxSplitter = /;/;
const spaceRgx = /( )/;
const dotRgx = /^.+\..+$/; // match "bsa.legal" which is a valid url

const checkUrl = (url) => !url.match(spaceRgx) && url.match(dotRgx);

export class Skill {
  static ID = 1;
  static keys = [
    "inspect.name",
    "inpect.labsOrGroupsNames",
    "inpect.labsOrGroupsInitials",
    "inspect.descriptionsSkills",
    "inspect.descriptionsServices",
    "inspect.descriptionsEquipments",
    "inspect.keywords",
  ];

  constructor(name, email, unities, campus) {
    this.inspect = {};

    this.id = Skill.ID++;
    this.name = name;
    this.inspect.name = removeAccent(this.name);

    this.email = email;
    this.unities = unities
      .split(descRgxSplitter)
      .map((unity) => unity.trim())
      .filter((unity) => unity.length > 0);
    this.campus = campus;

    this._labsOrGroups = [];
    this.inspect.labsOrGroupsNames = [];
    this.inspect.labsOrGroupsInitials = [];

    this._descriptions = {
      skills: [],
      services: [],
      equipments: [],
    };
    this._area = {
      major: [],
      minors: [],
    };
    this._phone = "";
    this._url = "";
    this._keywords = [];
    this._lattes = "";
    this._picture = "";
    this._limitDate = undefined;
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
    if (rawColumn != undefined && rawColumn != "" && rawColumn != "N/D") {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set descriptionsSkills(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._descriptions.skills = rawColumn.split(descRgxSplitter);

      this.inspect.descriptionsSkills = this._descriptions.skills.map(
        removeAccent
      );
    }
  }

  set descriptionsServices(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._descriptions.services = rawColumn.split(descRgxSplitter);

      this.inspect.descriptionsServices = this._descriptions.services.map(
        removeAccent
      );
    }
  }

  set descriptionsEquipments(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._descriptions.equipments = rawColumn.split(descRgxSplitter);

      this.inspect.descriptionsEquipments = this._descriptions.equipments.map(
        removeAccent
      );
    }
  }

  get descriptions() {
    return Object.assign({}, this._descriptions);
  }

  set areaMajor(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._area.major = rawColumn
        .split(/,|;/)
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
    }
  }

  set areaMinors(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._area.minors = rawColumn
        .split(/,|;/)
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
    }
  }

  get area() {
    return Object.assign({}, this._area);
  }

  set keywords(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._keywords = rawColumn.split(";");

      this.inspect.keywords = this._keywords.map(removeAccent);
    }
  }

  get keywords() {
    return this._keywords;
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

  set limitDate(rawColumn) {
    if (rawColumn && rawColumn != "N/D") {
      const rgx = /^(\d{1,2}\/)?(\d{2})\/(\d{4})/;

      const [_, day, month, year] = rawColumn.match(rgx);
      this._limitDate = new Date(year, month - 1, day || 1);
    }
  }

  get limitDate() {
    return this._limitDate;
  }

  pushLabOrGroup(name, initials, bond, category, site) {
    if (name && name != "" && name != "N/D") {
      const labOrGroup = {
        name,
        label: this.labelGroup(name, initials, bond),
        site: site && site !== "N/D" ? site : undefined,
      };

      this._labsOrGroups.push(labOrGroup);
      this.inspect.labsOrGroupsNames.push(name);
      this.inspect.labsOrGroupsInitials.push(initials);
    }
  }

  labelGroup(name, initials, bond) {
    let label = name;

    if (initials && initials != "N/D") label = `${label} (${initials})`;

    if (bond && bond != "N/D") label = `${label} - ${bond}`;

    return label;
  }

  get labsOrGroups() {
    return this._labsOrGroups;
  }

  matchesFilter({ primary, secondary, terciary }) {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = this.area.major.some((major) => primary.includes(major));
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
      terciaryMatch = terciaryMatch && this.unities.includes(unity);
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}

export class SkillGenerator {
  static run(row) {
    const base = new Skill(
      capitalizeName(columnValue(row, "C")),
      columnValue(row, "D"),
      columnValue(row, "F"),
      columnValue(row, "G")
    );

    base.phone = columnValue(row, "AE");
    base.descriptionsSkills = columnValue(row, "W");
    base.descriptionsServices = columnValue(row, "X");
    base.descriptionsEquipments = columnValue(row, "Y");
    base.areaMajor = columnValue(row, "Z");
    base.areaMinors = columnValue(row, "AA");
    base.keywords = columnValue(row, "AB");
    base.lattes = columnValue(row, "AC");
    base.limitDate = columnValue(row, "AJ");

    base.pushLabOrGroup(
      columnValue(row, "J"),
      columnValue(row, "K"),
      columnValue(row, "H"),
      columnValue(row, "I"),
      columnValue(row, "L")
    );
    base.pushLabOrGroup(
      columnValue(row, "O"),
      columnValue(row, "P"),
      columnValue(row, "M"),
      columnValue(row, "N"),
      columnValue(row, "Q")
    );
    base.pushLabOrGroup(
      columnValue(row, "T"),
      columnValue(row, "U"),
      columnValue(row, "R"),
      columnValue(row, "S"),
      columnValue(row, "V")
    );

    const skillUrl = columnValue(row, "L");

    if (checkUrl(skillUrl)) base.url = skillUrl;

    const picID = columnValue(row, "AD");

    if (picID != undefined && picID != "N/D")
      base.picture = `https://drive.google.com/uc?export=view&id=${picID}`;

    return base;
  }
}
