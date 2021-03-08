import { findErrors } from "@/lib/errors/empresas.js";

async function fetchData(sheetsAPIKey) {
  const sheetID = "14uwSMZee-CoIJyIpcEf4t17z6eYN-ElYgw_O7dtU5Ok";
  const sheetName = "EMPRESAS";

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

export default (app, inject) => {
  inject("fetchCompanies", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { companies: [], errors: [] };
    const builder = new app.$companyBuilder();
    const companies = values.slice(1).map((row, i) => {
      let company;
      try {
        company = builder.build(row);
      } catch (e) {
        console.log(`[Company Exception] failed for row ${i + 2}`);
        company = null;
      }

      return company;
    });
    console.log(companies);
    const errors = findErrors(Object.assign([], companies));
    return { companies, errors };
  });
};
