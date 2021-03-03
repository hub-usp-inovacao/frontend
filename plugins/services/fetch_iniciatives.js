import Iniciative from "@/lib/classes/iniciative.js";
import { columnValue } from "@/lib/sheets";
import { findErrors } from "@/lib/errors/iniciativas.js";

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

function IniciativeGenerator(row) {
  const base = new Iniciative(
    row[1],
    row[0],
    {
      short: row[2],
      long: row[7],
    },
    row[4],
    row[8],
    row[10]
  );

  base.local = row[3];
  base.keywords = columnValue(row, "F");
  base.socialMedia = row[9];
  base.services = row[13];
  base.contactPerson = row[11];
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

    const iniciatives = values.slice(1).map((row, i) => {
      let iniciative;

      try {
        iniciative = IniciativeGenerator(row);
      } catch (e) {
        console.log(`[Iniciatives Exception] failed at ${i + 2}`);
        iniciative = null;
      }

      return iniciative;
    });

    const errors = findErrors(Object.assign([], iniciatives));
    return { iniciatives, errors };
  });
};
