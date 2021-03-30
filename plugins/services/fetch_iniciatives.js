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

function beginNewIniciative(row) {
  const name = columnValue(row, "B");
  const category = columnValue(row, "A");
  const description = {
    short: columnValue(row, "C"),
    long: columnValue(row, "H"),
  };
  const unity = columnValue(row, "E");
  const email = columnValue(row, "I");
  const startDate = columnValue(row, "K");

  return new Iniciative(name, category, description, unity, email, startDate);
}

function addLocal(base, row) {
  base.local = columnValue(row, "D");
}

function addKeywords(base, row) {
  base.keywords = columnValue(row, "F");
}

function addSocialMedia(base, row) {
  base.socialMedia = columnValue(row, "J");
}

function addServices(base, row) {
  base.services = columnValue(row, "N");
}

function addContact(base, row) {
  base.contactPerson = columnValue(row, "L");
  base.contactInfo = columnValue(row, "M");
}

function addURL(base, row) {
  const iniciativeUrl = columnValue(row, "G");

  if (checkUrl(iniciativeUrl)) base.url = iniciativeUrl;
}

function iniciatveGenerator(row) {
  const base = beginNewIniciative(row);

  addLocal(base, row);
  addKeywords(base, row);
  addSocialMedia(base, row);
  addServices(base, row);
  addContact(base, row);
  addURL(base, row);

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
      .filter((i) => i !== null)
      .sort((a, b) => a.name.localeCompare(b.name));

    const errors = findErrors(Object.assign([], iniciatives));
    return { iniciatives, errors };
  });
};
