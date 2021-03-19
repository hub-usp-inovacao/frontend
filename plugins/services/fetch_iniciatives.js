import Iniciative from "@/lib/classes/iniciative";
import { findErrors } from "@/lib/errors/iniciativas";
import { columnValue } from "@/lib/sheets";

async function fetchData(sheetsAPIKey) {
  const sheetID = "1MGRBDs-Bb2PGdyUkTN92dM5kqQuw5dtOpFHwAV1FQpA";
  const sheetName = "INICIATIVAS";

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

function iniciatveGenerator(row) {
  const base = new Iniciative(
    columnValue(row, "B"),
    columnValue(row, "A"),
    {
      short: columnValue(row, "C"),
      long: columnValue(row, "H"),
    },
    columnValue(row, "E"),
    columnValue(row, "I"),
    columnValue(row, "K")
  );

  base.local = columnValue(row, "D");
  base.keywords = columnValue(row, "F");
  base.socialMedia = columnValue(row, "J");
  base.services = columnValue(row, "N");
  base.contactPerson = columnValue(row, "L");
  base.contactInfo = columnValue(row, "M");

  const iniciativeUrl = columnValue(row, "G");

  if (checkUrl(iniciativeUrl)) base.url = iniciativeUrl;

  return base;
}

export default (_, inject) => {
  inject("fetchIniciatives", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { iniciatives: [], errors: [] };

    const iniciatives = values
      .slice(1)
      .map((row, i) => {
        let iniciative;
        try {
          iniciative = iniciatveGenerator(row);
        } catch (e) {
          console.log(`[Iniciative Exception] failed for row ${i + 2}`);
          iniciative = null;
        }

        return iniciative;
      })
      .filter((i) => i !== null);

    const errors = findErrors(Object.assign([], iniciatives));
    return { iniciatives, errors };
  });
};
