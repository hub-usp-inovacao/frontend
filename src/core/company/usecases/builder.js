import Company from "../model/company";
import matchesFilter from "./filter";
import { formatURL, formatPhone, removeAccent } from "@core/shared/format";
import { columnValue } from "@core/shared/sheets";

class CompanyBuilder {
  build(row) {
    if (!this.check(columnValue(row, "BM"), columnValue(row, "BR")))
      return null;

    this.company = {};
    this.company.id = Company.ID++;
    this.company.inspect = {};

    this.setBasicInfo(
      columnValue(row, "AC"),
      columnValue(row, "BC"),
      columnValue(row, "AI")
    );

    this.setContactInfo(
      columnValue(row, "AG"),
      columnValue(row, "AH"),
      columnValue(row, "BF")
    );

    this.setAddress(
      columnValue(row, "AJ"),
      columnValue(row, "AK"),
      columnValue(row, "AL"),
      columnValue(row, "AM"),
      columnValue(row, "AN")
    );

    this.setIncubator(columnValue(row, "AR"));

    this.setClassification(columnValue(row, "BY"), Company.cnae);
    this.setCompanySize(columnValue(row, "BU"));

    this.setTechnologiesAndServices(
      columnValue(row, "AP"),
      columnValue(row, "BD")
    );

    this.setOtherInfos(columnValue(row, "AE"), columnValue(row, "BE"));

    this.company.matchesFilter = matchesFilter;
    return this.company;
  }

  setBasicInfo(name, description, url) {
    this.company.name = name;
    this.company.inspect.name = removeAccent(name);

    this.company.description = {
      long: description == "." ? "" : description,
    };
    this.company.inspect.descriptionLong = removeAccent(
      this.company.description.long || ""
    );

    if (url && url != "" && url != " " && url != "." && url != "N/D")
      this.company.url = formatURL(url);
    else this.company.url = "";
  }

  setContactInfo(phones, emails, socialMedia) {
    if (phones && phones != "") {
      this.company.phones = phones
        .split(/[;/]/)
        .map((phone) => formatPhone(phone));
    } else this.company.phones = [];

    this.company.emails = emails.split(";");

    if (socialMedia && socialMedia != "") {
      this.company.socialMedia = socialMedia;
    } else this.company.socialMedia = "";
  }

  setAddress(venue, neightborhood, city, state, cep) {
    this.company.address = {
      venue,
      neightborhood,
      city: city.split(";"),
      state,
      cep,
    };

    this.company.city = this.company.address.city || [];
  }

  setIncubator(ecosystems) {
    this.company.incubated = Company.incubators.slice(1).includes(ecosystems);

    this.company.ecosystems = this.company.incubated
      ? ecosystems.split(";")
      : "Direto para o Mercado";
  }

  setClassification(classification, cnae) {
    this.company.classification = { major: "", minor: "" };

    if (classification && classification != "") {
      const match = classification.trim().match(/^(\d{2}).*/);

      if (match && match[1] !== "00") {
        const twoDigits = match[1];

        this.company.classification = {
          major: cnae[twoDigits].major,
          minor: cnae[twoDigits].minor,
        };
      }
    }
  }

  setCompanySize(employees) {
    const size = parseInt(employees);
    if (employees && size != 0) {
      if (this.company.classification.major === "Indústria de Transformação") {
        if (size < 20) this.company.companySize = "Microempresa";
        else if (size >= 20 && size < 100)
          this.company.companySize = "Pequena Empresa";
        else if (size >= 100 && size < 500)
          this.company.companySize = "Média Empresa";
        else if (size >= 500) this.company.companySize = "Grande Empresa";
      } else {
        if (size < 9) this.company.companySize = "Microempresa";
        else if (size >= 10 && size < 50)
          this.company.companySize = "Pequena Empresa";
        else if (size >= 50 && size < 100)
          this.company.companySize = "Média Empresa";
        else if (size >= 100) this.company.companySize = "Grande Empresa";
      }
    } else this.company.companySize = "";
  }

  setTechnologiesAndServices(technologies, services) {
    if (
      technologies &&
      technologies != "" &&
      technologies != "-" &&
      technologies != "." &&
      technologies != "!" &&
      technologies != "?"
    )
      this.company.technologies = technologies.split(";");
    else this.company.technologies = [];

    this.company.inspect.technologies = this.company.technologies.map(
      removeAccent
    );

    this.company.services = services == "." ? "" : services;
    this.company.inspect.services = removeAccent(this.company.services || "");
  }

  setOtherInfos(year, logo) {
    this.company.year = year;

    this.company.logo = logo
      ? `https://drive.google.com/uc?export=view&id=${logo}`
      : "";
  }

  check(allowed, active) {
    let isValid = true;

    if (allowed && allowed != "") {
      isValid = allowed == "Sim";
    }

    if (isValid && active && active != "") {
      isValid = ["ATIVA", "ATIVA - EMPRESA DOMICILIADA NO EXTERIOR"].includes(
        active
      );
    }

    return isValid;
  }
}

export default CompanyBuilder;
