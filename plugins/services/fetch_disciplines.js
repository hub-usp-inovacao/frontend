import Discipline from "@/lib/classes/discipline";
import { findErrors } from "@/lib/errors/disciplinas";
import { columnValue } from "@/lib/sheets";

async function fetchData(sheetsAPIKey) {
  const sheetID = "1AsmtnS5kY1mhXhNJH5QsCyg_WDnkGtARYB4nMdhyFLs";
  const sheetName = "DISCIPLINAS";

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

function beginNewDiscipline(row,$campi) {
  const name = columnValue(row, "B");
  let campus = columnValue(row, "C");
  const unity = columnValue(row, "D");
  const description = {
    short: columnValue(row, "G"),
    long: columnValue(row, "H"),
  };
  const startData = columnValue(row, "I");
  const nature = columnValue(row, "A");
  const level = columnValue(row, "F");

  if (campus == undefined || campus == "") {
    campus = $campi.find((c) => c.unities.find((u) => u == unity)).name;
  }

  return new Discipline(
    name,
    campus,
    unity,
    description,
    startData,
    nature,
    level
  );
}

function addURL(base, row) {
  base.url = columnValue(row, "E");
}

function addCategory(base, row) {
  base.categoryBusiness = columnValue(row, "K");
  base.categoryEntrepreneurship = columnValue(row, "L");
  base.categoryInnovation = columnValue(row, "M");
  base.categoryIntellectualProperty = columnValue(row, "N");
}

function disciplineGenerator(row, $campi) {
  const base = beginNewDiscipline(row, $campi);
  addURL(base, row);
  addCategory(base, row);

  return base;
}

export default ({$campi}, inject) => {
  inject("fetchDisciplines", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { disciplines: [], errors: [] };

    const disciplines = values
      .slice(1)
      .map((row, i) => {
        let discipline;
        try {
          discipline = disciplineGenerator(row, $campi);
        } catch (e) {
          console.log(`[Discipline Exception] failed for row ${i + 2}`);
          discipline = null;
        }

        return discipline;
      })
      .filter((d) => d !== null)
      .sort((a, b) => {
        const firstName = a.name.slice(a.name.indexOf("-") + 2);
        const secondName = b.name.slice(b.name.indexOf("-") + 2);
        return firstName.localeCompare(secondName);
      });

    const errors = findErrors(Object.assign([], disciplines));
    return { disciplines, errors };
  });
};
