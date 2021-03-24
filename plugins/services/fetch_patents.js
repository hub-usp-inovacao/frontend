import Patent from "@/lib/classes/patent";
import { findErrors } from "@/lib/errors/patentes";
import { columnValue } from "@/lib/sheets";

async function fetchData(sheetsAPIKey) {
  const sheetID = "1UgqwWqaL_9l8NwaE9anTwLdkzmK0NI65SdStQ1wACho";
  const sheetName = "PATENTES";

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

function PatentGenerator(row) {
  const base = new Patent(
    columnValue(row, "F"),
    columnValue(row, "K"),
    {
      primary: {
        cip: columnValue(row, "A").trim(),
        subarea: columnValue(row, "B").trim(),
      },
      secondary: {
        cip: columnValue(row, "C").trim(),
        subarea: columnValue(row, "D").trim(),
      },
    },
    columnValue(row, "G").split(" | "),
    columnValue(row, "I").split(" | "),
    columnValue(row, "M")
  );

  base.url = columnValue(row, "O");
  base.inventors = columnValue(row, "J");
  base.countriesWithProtection = columnValue(row, "L");
  base.photo = columnValue(row, "P");
  return base;
}

export default (_, inject) => {
  inject("fetchPatents", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { patents: [], errors: [] };

    const patents = values
      .slice(1)
      .map((row, i) => {
        let patent;
        try {
          patent = PatentGenerator(row);
        } catch (e) {
          console.log(`[Patent Exception] failed for row ${i + 2}`);
          patent = null;
        }

        return patent;
      })
      .filter((p) => p !== null);

    const errors = findErrors(Object.assign([], patents));
    return { patents, errors };
  });
};
