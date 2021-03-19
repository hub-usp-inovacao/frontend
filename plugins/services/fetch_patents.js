import { findErrors } from "@/lib/errors/patentes";

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

export default (_, inject) => {
  inject("fetchPatents", async (payload) => {
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
