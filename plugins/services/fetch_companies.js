import Company from "@/lib/classes/company";
import { findErrors } from "@/lib/errors/empresas";
import { columnValue } from "@/lib/sheets";

async function fetchData(sheetsAPIKey) {
  const sheetID = "14uwSMZee-CoIJyIpcEf4t17z6eYN-ElYgw_O7dtU5Ok";
  const sheetName = "EMPRESAS_NOVO";

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
  const name = columnValue(row, "C");
  const year = columnValue(row, "E");
  const emails = columnValue(row, "H").split(";");
  const rawDescription = columnValue(row, "N");
  const description = { long: rawDescription == "." ? "" : rawDescription }; //
  const incubated = ". Nenhum Nenhuma Não" //
    .split(" ")
    .includes(columnValue(row, "AR"));
  const ecosystems = columnValue(row, "T").split(";");
  const rawServices = columnValue(row, "O");
  const services = rawServices == "." ? "" : rawServices; //
  const address = {
    venue: columnValue(row, "I"),
    neightborhood: columnValue(row, "J"),
    city: columnValue(row, "K").split(";"),
    state: columnValue(row, "L"),
    cep: columnValue(row, "M"),
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
  base.phones = columnValue(row, "G");
}

function addURL(base, row) {
  const rawURL = columnValue(row, "R");

  if (!rawURL.match(NDrgx) && !rawURL.match(spaceRgx)) base.url = rawURL;
}

function addTechnologies(base, row) {
  base.technologies = columnValue(row, "P");
}

function addLogo(base, row) {
  base.logo = columnValue(row, "Q");
}

function addClassification(base, row, cnae) {
  base.setClassification(columnValue(row, "F"), cnae);
}

function addSize(base, row) {
  base.setCompanySize(columnValue(row, "V"), columnValue(row, "U"));
}

function companyGenerator(row, cnae) {
  const base = beginNewCompany(row);
  addPhones(base, row);
  addURL(base, row);
  addTechnologies(base, row);
  addLogo(base, row);
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
