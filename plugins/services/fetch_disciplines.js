import Discipline from "@/lib/classes/discipline.js";
import { findErrors } from "@/lib/errors/disciplinas.js";

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

function DisciplineGenerator(row) {
  const base = new Discipline(
    row[1],
    row[2],
    row[3],
    {
      short: row[6],
      long: row[7],
    },
    row[8],
    row[0],
    row[5]
  );

  base.url = row[4];
  base.categoryBusiness = row[10];
  base.categoryEntrepreneurship = row[11];
  base.categoryInnovation = row[12];
  base.categoryIntellectualProperty = row[13];

  return base;
}

export default (_, inject) => {
  inject("fetchDisciplines", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { disciplines: [], errors: [] };

    const disciplines = values.slice(1).map((row, i) => {
      let discipline;
      try {
        discipline = DisciplineGenerator(row);
      } catch (e) {
        console.log(`[Discipline Exception] failed for row ${i + 2}`);
        discipline = null;
      }

      return discipline;
    });

    const errors = findErrors(Object.assign([], disciplines));
    return { disciplines, errors };
  });
};
