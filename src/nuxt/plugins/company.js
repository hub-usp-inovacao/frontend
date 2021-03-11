import Company from "@core/company/model/company";

export default (_, inject) => {
  inject("Company", Company);
};
