import PDI from "@/lib/classes/pdi.js";
import { findErrors } from "@/lib/errors/pdi.js";

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

function PDIGenerator(row) {
  const base = new PDI(row[1], row[0], row[3], row[4], {
    short: row[10],
    long: row[11],
  });

  if (checkUrl(row[6])) base.url = row[6];

  base._knowledge = row[12];
  base.keywords = row[14];
  base.coordinator = row[5];
  base.email = row[7];
  base.phone = row[8];

  return base;
}

export default (_, inject) => {
  inject("fetchPdis", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { pdis: [], errors: [] };

    const pdis = values.slice(1).map((row) => PDIGenerator(row));

    const errors = findErrors(Object.assign([], pdis));
    return { pdis, errors };
  });
};
