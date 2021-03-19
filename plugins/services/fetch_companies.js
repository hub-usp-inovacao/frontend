import Company from "@/lib/classes/company";
import { findErrors } from "@/lib/errors/empresas";
import { columnValue } from "@/lib/sheets";

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

const NDrgx = /(n\/d)/;
const spaceRgx = /( )/;

function companyGenerator(row, cnae) {
  const base = new Company(
    columnValue(row, "AC"),
    columnValue(row, "AE"),
    columnValue(row, "AH").split(";"), //
    {
      long: columnValue(row, "BC") == "." ? "" : columnValue(row, "BC"),
    },
    ". Nenhum Nenhuma Não".split(" ").includes(columnValue(row, "AR")),
    columnValue(row, "AR").split(";"),
    columnValue(row, "BD") == "." ? "" : columnValue(row, "BD"),
    {
      venue: columnValue(row, "AJ"),
      neightborhood: columnValue(row, "AK"),
      city: columnValue(row, "AL").split(";"),
      state: columnValue(row, "AM"),
      cep: columnValue(row, "AN"),
    }
  );

  base.phones = columnValue(row, "AG");

  const companyUrl = columnValue(row, "AI");

  if (!companyUrl.match(NDrgx) && !companyUrl.match(spaceRgx))
    base.url = companyUrl;

  base.technologies = columnValue(row, "AP");
  base.logo = columnValue(row, "BE");
  base.socialMedia = columnValue(row, "BF");

  base.setClassification(columnValue(row, "BY"), cnae);
  base.setCompanySize(columnValue(row, "BU"));

  return base;
}

export default (_, inject) => {
  inject("fetchCompanies", async (payload) => {
    const { sheetsAPIKey, cnae } = payload;

    const values = await fetchData(sheetsAPIKey);
    if (values == undefined) return { companies: [], errors: [] };

    const companies = values
      .slice(1)
      .map((row, i) => {
        let company;
        try {
          company = companyGenerator(row, cnae);
        } catch (e) {
          console.log(`[Company Exception] failed for row ${i + 2}`);
          company = null;
        }

        return company;
      })
      .filter((c) => c !== null && c.allowed && c.active);

    const errors = findErrors(Object.assign([], companies));
    return { companies, errors };
  });
};
