import Skill from "@/lib/classes/skill";
import { findErrors } from "@/lib/errors/competencias";
import { columnValue } from "@/lib/sheets";
import { capitalizeName } from "@/lib/format";

async function fetchData(sheetsAPIKey) {
  const sheetID = "1KCEtrqBQ5qs51_EpBOtX-QYYDIxmesr_GZYIXf7AWmE";
  const sheetName = "COMPETENCIAS";

  try {
    const resp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
    );

    const { values } = await resp.json();
    return values;
  } catch (error) {
    console.log("error occuried while fetching...");
    console.log(error);
    return undefined;
  }
}

const spaceRgx = /( )/;
const dotRgx = /^.+\..+$/; // match "bsa.legal" which is a valid url

const checkUrl = (url) => !url.match(spaceRgx) && url.match(dotRgx);

function beginNewSkill(row, $campi) {
  const name = capitalizeName(columnValue(row, "C"));
  const email = columnValue(row, "D");
  const unities = columnValue(row, "F");
  let campus = columnValue(row, "G");

  if (campus == undefined || campus == "") {
    campus = $campi.find((c) => c.unities.find((u) => u == unities))?.name;
  }

  return new Skill(name, email, unities, campus);
}

function addPhone(base, row) {
  base.phone = columnValue(row, "AF");
}

function addDescription(base, row) {
  base.descriptionsSkills = columnValue(row, "X");
  base.descriptionsServices = columnValue(row, "Y");
  base.descriptionsEquipments = columnValue(row, "Z");
}

function addArea(base, row, $knowledgeAreas) {
  const minor = columnValue(row, "AB");
  let major = columnValue(row, "AA");
  base.areaMinors = minor;

  if (major == undefined || major == "") {
    major = $knowledgeAreas.find((c) => c.subareas.find((u) => u == minor))
      ?.name;
    base.areaMajor = major;
  } else {
    base.areaMajor = columnValue(row, "Z");
  }
}

function addKeywords(base, row) {
  base.keywords = columnValue(row, "AC");
}

function addLattes(base, row) {
  base.lattes = columnValue(row, "AD");
}

function addLimitDate(base, row) {
  base.limitDate = columnValue(row, "AJ");
}

function addLabOrGroup(base, row) {
  base.pushLabOrGroup(
    columnValue(row, "K"),
    columnValue(row, "L"),
    columnValue(row, "I"),
    columnValue(row, "J"),
    columnValue(row, "M")
  );
  base.pushLabOrGroup(
    columnValue(row, "P"),
    columnValue(row, "Q"),
    columnValue(row, "N"),
    columnValue(row, "O"),
    columnValue(row, "R")
  );
  base.pushLabOrGroup(
    columnValue(row, "U"),
    columnValue(row, "V"),
    columnValue(row, "S"),
    columnValue(row, "T"),
    columnValue(row, "W")
  );
}

function addBond(base, row) {
  base.bond = columnValue(row, "B");
}

function addURL(base, row) {
  const skillUrl = columnValue(row, "L");

  if (checkUrl(skillUrl)) base.url = skillUrl;
}

function addPicture(base, row) {
  const picID = columnValue(row, "AE");

  if (picID != undefined && picID != "N/D")
    base.picture = `https://drive.google.com/uc?export=view&id=${picID}`;
}

function skillGenerator(row, $campi, $knowledgeAreas) {
  const base = beginNewSkill(row, $campi, $knowledgeAreas);

  addPhone(base, row);
  addDescription(base, row);
  addArea(base, row, $knowledgeAreas);
  addKeywords(base, row);
  addLattes(base, row);
  addLimitDate(base, row);
  addLabOrGroup(base, row);
  addURL(base, row);
  addPicture(base, row);
  addBond(base, row);

  return base;
}

export default ({ $campi, $knowledgeAreas }, inject) => {
  inject("fetchSkills", async (payload) => {
    const { sheetsAPIKey, areas } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { skills: [], errors: [] };

    const skills = values
      .slice(1)
      .map((row, i) => {
        let skill;
        try {
          skill = skillGenerator(row, $campi, $knowledgeAreas);
        } catch (e) {
          console.log(`[Skill Exception] failed for row ${i + 2}`);
          skill = null;
        }

        return skill;
      })
      .filter((s) => s !== null && (!s.limitDate || s.limitDate > new Date()))
      .sort((a, b) =>
        a.name == b.name ? 0 : a.inspect.name < b.inspect.name ? -1 : 1
      );

    const errors = findErrors(Object.assign([], skills), areas);
    return { skills, errors };
  });
};
