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

function beginNewPatent(row) {
  const name = columnValue(row, "F");
  const summary = columnValue(row, "K");
  const classification = {
    primary: {
      cip: columnValue(row, "A").trim(),
      subarea: columnValue(row, "B").trim(),
    },
    secondary: {
      cip: columnValue(row, "C").trim(),
      subarea: columnValue(row, "D").trim(),
    },
  };
  const ipcs = columnValue(row, "G").split(" | ");
  const owners = columnValue(row, "I").split(" | ");
  const status = columnValue(row, "M");

  return new Patent(name, summary, classification, ipcs, owners, status);
}

function addURL(base, row) {
  base.url = columnValue(row, "O");
}

function addInventors(base, row) {
  base.inventors = columnValue(row, "J");
}

function addCountries(base, row) {
  base.countriesWithProtection = columnValue(row, "L");
}

function addPhoto(base, row) {
  base.photo = columnValue(row, "P");
}

function PatentGenerator(row) {
  const base = beginNewPatent(row);

  addURL(base, row);
  addInventors(base, row);
  addCountries(base, row);
  addPhoto(base, row);

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
      .filter((p) => p !== null)
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    const errors = findErrors(Object.assign([], patents));
    return { patents, errors };
  });
};
