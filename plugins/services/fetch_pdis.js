import { PDI } from "@/lib/classes/pdi";
import { findErrors } from "@/lib/errors/pdi";
import { columnValue } from "@/lib/sheets";

async function fetchData(sheetsAPIKey) {
  const sheetID = "1TZWMGvvn6TUmwo8DdWvtkLcbDVqVuif9HKMRPVcb2eo";
  const sheetName = "PDI";

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
const dotRgx = /.+\..+/; // match "bsa.legal" which is a valid url

const checkUrl = (url) => !url.match(spaceRgx) && url.match(dotRgx);

function pdiGenerator(row) {
  const base = new PDI(
    columnValue(row, "B"),
    columnValue(row, "A"),
    columnValue(row, "D"),
    columnValue(row, "E"),
    {
      short: columnValue(row, "K"),
      long: columnValue(row, "L"),
    }
  );

  if (checkUrl(row[6])) base.url = columnValue(row, "G");

  base._knowledge = columnValue(row, "M");
  base.keywords = columnValue(row, "O");
  base.coordinator = columnValue(row, "F");
  base.email = columnValue(row, "H");
  base.phone = columnValue(row, "I");

  return base;
}

export default (_, inject) => {
  inject("fetchPDIs", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { pdis: [], errors: [] };

    const pdis = values
      .slice(1)
      .map((row, i) => {
        let pdi;
        try {
          pdi = pdiGenerator(row);
        } catch (e) {
          console.log(`[PDI Exception] failed for row ${i + 2}`);
          pdi = null;
        }

        return pdi;
      })
      .filter((p) => p !== null);

    const errors = findErrors(Object.assign([], pdis));
    return { pdis, errors };
  });
};
