import { findErrors } from "@core/company/usecases/errors.js";
import CompanyBuilder from "@core/company/usecases/builder.js";
import fetchData from "@core/shared/fetch.js";

export default (_, inject) => {
  inject("fetchCompanies", async (payload) => {
    const { sheetsAPIKey } = payload;

    const values = await fetchData(
      sheetsAPIKey,
      "14uwSMZee-CoIJyIpcEf4t17z6eYN-ElYgw_O7dtU5Ok",
      "EMPRESAS"
    );
    if (values == undefined) return { companies: [], errors: [] };
    const builder = new CompanyBuilder();
    const companies = values
      .slice(1)
      .map((row, i) => {
        let company;
        try {
          company = builder.build(row);
        } catch (e) {
          console.log(`[Company Exception] failed for row ${i + 2}`);
          company = null;
        }

        return company;
      })
      .filter((c) => c !== null);

    const errors = findErrors(Object.assign([], companies));
    return { companies, errors };
  });
};
