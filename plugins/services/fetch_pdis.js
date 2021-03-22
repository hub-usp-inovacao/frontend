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

function beginNewPDI(row) {
  const name = columnValue(row, "B");
  const category = columnValue(row, "A");
  const campus = columnValue(row, "D");
  const unity = columnValue(row, "E");
  const description = {
    short: columnValue(row, "K"),
    long: columnValue(row, "L"),
  };

  return new PDI(name, category, campus, unity, description);
}

function addURL(base, row) {
  if (checkUrl(row[6])) base.url = columnValue(row, "G");
}

function addKeywords(base, row) {
  base.keywords = columnValue(row, "O");
}

function addCoordinator(base, row) {
  base.coordinator = columnValue(row, "F");
}

function addEmail(base, row) {
  base.email = columnValue(row, "H");
}

function addPhone(base, row) {
  base.phone = columnValue(row, "I");
}

function pdiGenerator(row) {
  const base = beginNewPDI(row);

  addURL(base, row);
  addKeywords(base, row);
  addCoordinator(base, row);
  addEmail(base, row);
  addPhone(base, row);

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
