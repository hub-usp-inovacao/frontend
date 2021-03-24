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

function disciplineGenerator(row) {
  const base = new Discipline(
    columnValue(row, "B"),
    columnValue(row, "C"),
    columnValue(row, "D"),
    {
      short: columnValue(row, "G"),
      long: columnValue(row, "H"),
    },
    columnValue(row, "I"),
    columnValue(row, "A"),
    columnValue(row, "F")
  );

  base.url = columnValue(row, "E");
  base.categoryBusiness = columnValue(row, "K");
  base.categoryEntrepreneurship = columnValue(row, "L");
  base.categoryInnovation = columnValue(row, "M");
  base.categoryIntellectualProperty = columnValue(row, "N");

  return base;
}

export default (_, inject) => {
  inject("fetchDisciplines", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { disciplines: [], errors: [] };

    const disciplines = values
      .slice(1)
      .map((row, i) => {
        let discipline;
        try {
          discipline = disciplineGenerator(row);
        } catch (e) {
          console.log(`[Discipline Exception] failed for row ${i + 2}`);
          discipline = null;
        }

        return discipline;
      })
      .filter((d) => d !== null);

    const errors = findErrors(Object.assign([], disciplines));
    return { disciplines, errors };
  });
};
