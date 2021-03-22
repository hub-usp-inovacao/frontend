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

function beginNewSkill(row) {
  const name = capitalizeName(columnValue(row, "C"));
  const email = columnValue(row, "D");
  const unities = columnValue(row, "F");
  const campus = columnValue(row, "G");

  return new Skill(name, email, unities, campus);
}

function addPhone(base, row) {
  base.phone = columnValue(row, "AE");
}

function addDescription(base, row) {
  base.descriptionsSkills = columnValue(row, "W");
  base.descriptionsServices = columnValue(row, "X");
  base.descriptionsEquipments = columnValue(row, "Y");
}

function addArea(base, row) {
  base.areaMajor = columnValue(row, "Z");
  base.areaMinors = columnValue(row, "AA");
}

function addKeywords(base, row) {
  base.keywords = columnValue(row, "AB");
}

function addLattes(base, row) {
  base.lattes = columnValue(row, "AC");
}

function addLimitDate(base, row) {
  base.limitDate = columnValue(row, "AJ");
}

function addLabOrGroup(base, row) {
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
}

function addURL(base, row) {
  const skillUrl = columnValue(row, "L");

  if (checkUrl(skillUrl)) base.url = skillUrl;
}

function addPicture(base, row) {
  const picID = columnValue(row, "AD");

  if (picID != undefined && picID != "N/D")
    base.picture = `https://drive.google.com/uc?export=view&id=${picID}`;
}

function skillGenerator(row) {
  const base = beginNewSkill(row);

  addPhone(base, row);
  addDescription(base, row);
  addArea(base, row);
  addKeywords(base, row);
  addLattes(base, row);
  addLimitDate(base, row);
  addLabOrGroup(base, row);
  addURL(base, row);
  addPicture(base, row);

  return base;
}

export default (_, inject) => {
  inject("fetchSkills", async (payload) => {
    const { sheetsAPIKey, areas } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { skills: [], errors: [] };

    const skills = values
      .slice(1)
      .map((row, i) => {
        let skill;
        try {
          skill = skillGenerator(row);
        } catch (e) {
          console.log(`[Skill Exception] failed for row ${i + 2}`);
          skill = null;
        }

        return skill;
      })
      .filter((s) => s !== null && (!s.limitDate || s.limitDate > new Date()));

    const errors = findErrors(Object.assign([], skills), areas);
    return { skills, errors };
  });
};
