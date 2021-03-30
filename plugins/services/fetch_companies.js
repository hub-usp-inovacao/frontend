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

function beginNewCompany(row) {
  const name = columnValue(row, "AC");
  const year = columnValue(row, "AE");
  const emails = columnValue(row, "AH").split(";");
  const rawDescription = columnValue(row, "BC");
  const description = { long: rawDescription == "." ? "" : rawDescription };
  const incubated = ". Nenhum Nenhuma Não"
    .split(" ")
    .includes(columnValue(row, "AR"));
  const ecosystems = columnValue(row, "AR").split(";");
  const rawServices = columnValue(row, "BD");
  const services = rawServices == "." ? "" : rawServices;
  const address = {
    venue: columnValue(row, "AJ"),
    neightborhood: columnValue(row, "AK"),
    city: columnValue(row, "AL").split(";"),
    state: columnValue(row, "AM"),
    cep: columnValue(row, "AN"),
  };

  return new Company(
    name,
    year,
    emails,
    description,
    incubated,
    ecosystems,
    services,
    address
  );
}

function addPhones(base, row) {
  base.phones = columnValue(row, "AG");
}

function addURL(base, row) {
  const rawURL = columnValue(row, "AI");

  if (!rawURL.match(NDrgx) && !rawURL.match(spaceRgx)) base.url = rawURL;
}

function addTechnologies(base, row) {
  base.technologies = columnValue(row, "AP");
}

function addLogo(base, row) {
  base.logo = columnValue(row, "BE");
}

function addSocialMedia(base, row) {
  base.socialMedia = columnValue(row, "BF");
}

function addClassification(base, row, cnae) {
  base.setClassification(columnValue(row, "BY"), cnae);
}

function addSize(base, row) {
  base.setCompanySize(columnValue(row, "BU"));
}

function companyGenerator(row, cnae) {
  const base = beginNewCompany(row);
  addPhones(base, row);
  addURL(base, row);
  addTechnologies(base, row);
  addLogo(base, row);
  addSocialMedia(base, row);
  addClassification(base, row, cnae);
  addSize(base, row);

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
      .filter((c) => c !== null && c.allowed && c.active)
      .sort((a, b) => a.name.localeCompare(b.name));

    const errors = findErrors(Object.assign([], companies));
    return { companies, errors };
  });
};
