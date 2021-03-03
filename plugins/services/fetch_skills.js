import { capitalizeName } from "@/lib/format";
import { columnValue } from "@/lib/sheets";
import Skill from "@/lib/classes/skill.js";
import { findErrors } from "@/lib/errors/competencias";

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

function SkillGenerator(row) {
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
          skill = SkillGenerator(row);
        } catch (e) {
          console.log(`[Skill Exception] failed for row ${i + 2}`);
          skill = null;
        }

        return skill;
      })
      .filter((skill) => !skill.limitDate || skill.limitDate > new Date());

    const errors = findErrors(Object.assign([], skills), areas);
    return { skills, errors };
  });
};
