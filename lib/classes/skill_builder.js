import { Skill } from "@/lib/classes/skill";
import {
  capitalizeName,
  formatURL,
  formatPhone,
  removeAccent,
} from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const descRgxSplitter = /;/;

class SkillBuilder {
  build(row) {
    this.skill = {};
    this.skill.descriptions = {};
    this.skill.area = {};
    this.skill.labsOrGroups = [];

    this.skill.inspect = {};
    this.skill.inspect.labsOrGroupsNames = [];
    this.skill.inspect.labsOrGroupsInitials = [];

    this.skill.id = Skill.ID++;

    this.skill.keys = Skill.keys;

    this.setBasicInfo(
      capitalizeName(columnValue(row, "C")),
      columnValue(row, "L")
    );

    this.setDescriptions(
      columnValue(row, "W"),
      columnValue(row, "X"),
      columnValue(row, "Y")
    );

    this.setWorkLocationInfo(columnValue(row, "G"), columnValue(row, "F"));

    this.setContactInfo(
      columnValue(row, "D"),
      columnValue(row, "AE"),
      columnValue(row, "AC")
    );

    this.pushLabOrGroup(
      columnValue(row, "J"),
      columnValue(row, "K"),
      columnValue(row, "H"),
      columnValue(row, "I"),
      columnValue(row, "L")
    );
    this.pushLabOrGroup(
      columnValue(row, "O"),
      columnValue(row, "P"),
      columnValue(row, "M"),
      columnValue(row, "N"),
      columnValue(row, "Q")
    );
    this.pushLabOrGroup(
      columnValue(row, "T"),
      columnValue(row, "U"),
      columnValue(row, "R"),
      columnValue(row, "S"),
      columnValue(row, "V")
    );

    this.setLimitData(columnValue(row, "AJ"));

    this.setArea(columnValue(row, "Z"), columnValue(row, "AA"));

    this.setAdditionalInfo(columnValue(row, "AD"), columnValue(row, "AB"));

    return this.skill;
  }

  setBasicInfo(name, url) {
    this.skill.name = name;
    this.skill.inspect.name = removeAccent(this.skill.name);

    if (url != undefined && url != "" && url != "N/D") {
      this.skill.url = formatURL(url);
    }
  }

  setDescriptions(skills, services, equipments) {
    if (skills != undefined && skills != "") {
      this.skill.descriptions.skills = skills.split(descRgxSplitter);

      this.skill.inspect.descriptionsSkills = this.skill.descriptions.skills.map(
        removeAccent
      );
    }

    if (services != undefined && services != "") {
      this.skill.descriptions.services = services.split(descRgxSplitter);

      this.skill.inspect.descriptionsServices = this.skill.descriptions.services.map(
        removeAccent
      );
    }

    if (equipments != undefined && equipments != "") {
      this.skill.descriptions.equipments = equipments.split(descRgxSplitter);

      this.skill.inspect.descriptionsEquipments = this.skill.descriptions.equipments.map(
        removeAccent
      );
    }
  }

  setContactInfo(email, phone, lattes) {
    this.skill.email = email;

    if (phone != undefined && phone != "") {
      this.skill.phone = formatPhone(phone);
    }

    if (lattes != undefined && lattes != "") {
      this.skill.lattes = lattes;
    }
  }

  setWorkLocationInfo(campus, unities) {
    this.skill.campus = campus;

    this.skill.unities = unities
      .split(descRgxSplitter)
      .map((unity) => unity.trim())
      .filter((unity) => unity.length > 0);
  }

  pushLabOrGroup(name, initials, bond, category, site) {
    if (name && name != "" && name != "N/D") {
      const labOrGroup = {
        name,
        label: this.labelGroup(name, initials, bond),
        site: site && site !== "N/D" ? formatURL(site) : undefined,
      };

      this.skill.labsOrGroups.push(labOrGroup);
      this.skill.inspect.labsOrGroupsNames.push(name);
      this.skill.inspect.labsOrGroupsInitials.push(initials);
    }
  }

  labelGroup(name, initials, bond) {
    let label = name;

    if (initials && initials != "N/D") label = `${label} (${initials})`;

    if (bond && bond != "N/D") label = `${label} - ${bond}`;

    return label;
  }

  setLimitData(limitData) {
    if (limitData && limitData != "N/D") {
      const rgx = /^(\d{1,2}\/)?(\d{2})\/(\d{4})/;

      // eslint-disable-next-line no-unused-vars
      const [_, day, month, year] = limitData.match(rgx);
      this.skill.limitDate = new Date(year, month - 1, day || 1);
    }
  }

  setArea(major, minors) {
    if (major != undefined && major != "") {
      this.skill.area.major = major
        .split(/;/)
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
    }

    if (minors != undefined && minors != "") {
      this.skill.area.minors = minors
        .split(/;/)
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
    }
  }

  setAdditionalInfo(picture, keywords) {
    if (picture != undefined && picture != "N/D")
      this.skill.picture = `https://drive.google.com/uc?export=view&id=${picture}`;

    if (keywords != undefined && keywords != "") {
      this.skill.keywords = keywords.split(";");

      this.skill.inspect.keywords = this.skill.keywords.map(removeAccent);
    }
  }
}

export default SkillBuilder;
