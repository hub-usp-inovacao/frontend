import { formatURL, formatPhone, removeAccent } from "@/lib/format";
import { columnValue } from "@/lib/sheets";

const NDrgx = /(n\/d)/;
const spaceRgx = /( )/;

export class Company {
  static ID = 1;
  static incubators = [
    "Direto para o Mercado",
    "CIETEC – Centro de Inovação, Empreendedorismo e Tecnologia",
    "ESALQTec – Incubadora de Empresas Agrozootécnicas de Piracicaba",
    "HABITs – Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
    "INOVA-HC",
    "InovaLab@POLI",
    "ParqTec – Fundação Parque Tecnológico de São Carlos",
    "Parque Tecnológico Univap",
    "Pqtec – Parque Tecnológico São José dos Campos",
    "Supera – Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
  ];
  static sizes = [
    "Microempresa",
    "Pequena Empresa",
    "Média Empresa",
    "Grande Empresa",
  ];
  static keys = [
    "inspect.name",
    "inspect.descriptionLong",
    "inspect.services",
    "inspect.technologies",
  ];
  static cnae = {
    "01": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
    },
    "02": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
    },
    "03": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
    },
    "04": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
    },
    "05": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Indústrias Extrativas",
    },
    "06": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Extração de Petróleo e Gás Natural",
    },
    "07": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Indústrias Extrativas",
    },
    "08": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Indústrias Extrativas",
    },
    "09": {
      major: "Agricultura, Pecuária, Pesca e Extrativismo",
      minor: "Indústrias Extrativas",
    },
    10: {
      major: "Indústria de Transformação",
      minor: "Alimentos",
    },
    11: {
      major: "Indústria de Transformação",
      minor: "Bebidas",
    },
    12: {
      major: "Indústria de Transformação",
      minor: "Produtos do Fumo",
    },
    13: {
      major: "Indústria de Transformação",
      minor: "Produtos Têxteis",
    },
    14: {
      major: "Indústria de Transformação",
      minor: "Vestuário e Acessórios",
    },
    15: {
      major: "Indústria de Transformação",
      minor: "Artefatos de Couro, Artigos para Viagem e Calçados",
    },
    16: {
      major: "Indústria de Transformação",
      minor: "Produtos de Madeira",
    },
    17: {
      major: "Indústria de Transformação",
      minor: "Celulose e Papel",
    },
    18: {
      major: "Indústria de Transformação",
      minor: "Impressão e Reprodução de Gravações",
    },
    19: {
      major: "Indústria de Transformação",
      minor: "Coque, Derivados de Petróleo e de Biocombustíveis",
    },
    20: {
      major: "Indústria de Transformação",
      minor: "Produtos Químicos",
    },
    21: {
      major: "Indústria de Transformação",
      minor: "Produtos Farmaquímicos e Farmacêuticos",
    },
    22: {
      major: "Indústria de Transformação",
      minor: "Produtos de Borracha e de Material Plástico",
    },
    23: {
      major: "Indústria de Transformação",
      minor: "Produtos de Minerais Não-Metálicos",
    },
    24: {
      major: "Indústria de Transformação",
      minor: "Metalurgia",
    },
    25: {
      major: "Indústria de Transformação",
      minor: "Produtos de Metal, exceto Máquinas e Equipamentos",
    },
    26: {
      major: "Indústria de Transformação",
      minor: "Equipamentos de Informática, Produtos Eletrônicos e Ópticos",
    },
    27: {
      major: "Indústria de Transformação",
      minor: "Máquinas, Aparelhos e Materiais Elétricos",
    },
    28: {
      major: "Indústria de Transformação",
      minor: "Máquinas e Equipamentos",
    },
    29: {
      major: "Indústria de Transformação",
      minor: "Automóveis, Reboques e Carrocerias",
    },
    30: {
      major: "Indústria de Transformação",
      minor: "Equipamentos de Transporte, exceto Veículos Automotores",
    },
    31: {
      major: "Indústria de Transformação",
      minor: "Móveis",
    },
    32: {
      major: "Indústria de Transformação",
      minor: "Produtos Diversos",
    },
    33: {
      major: "Indústria de Transformação",
      minor: "Manutenção, Reparação e Instalação de Máquinas e Equipamentos",
    },
    35: {
      major: "Infraestrutura e Construção",
      minor: "Eletricidade e Gás",
    },
    36: {
      major: "Infraestrutura e Construção",
      minor: "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
    },
    37: {
      major: "Infraestrutura e Construção",
      minor: "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
    },
    38: {
      major: "Infraestrutura e Construção",
      minor: "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
    },
    39: {
      major: "Infraestrutura e Construção",
      minor: "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
    },
    40: {
      major: "Infraestrutura e Construção",
      minor: "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
    },
    41: {
      major: "Infraestrutura e Construção",
      minor: "Construção",
    },
    42: {
      major: "Infraestrutura e Construção",
      minor: "Construção",
    },
    43: {
      major: "Infraestrutura e Construção",
      minor: "Construção",
    },
    45: {
      major: "Comércio e Serviços",
      minor: "Comércio e Reparação de Veículos Automotores e Motocicletas",
    },
    46: {
      major: "Comércio e Serviços",
      minor: "Comércio por Atacado, exceto Veículos Automotores e Motocicletas",
    },
    47: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    48: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    49: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    50: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    51: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    52: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    53: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    54: {
      major: "Comércio e Serviços",
      minor: "Comércio Varejista",
    },
    55: {
      major: "Comércio e Serviços",
      minor: "Alojamento e Alimentação",
    },
    56: {
      major: "Comércio e Serviços",
      minor: "Alojamento e Alimentação",
    },
    57: {
      major: "Comércio e Serviços",
      minor: "Alojamento e Alimentação",
    },
    58: {
      major: "Comércio e Serviços",
      minor: "Informação e Comunicação",
    },
    59: {
      major: "Comércio e Serviços",
      minor: "Informação e Comunicação",
    },
    60: {
      major: "Comércio e Serviços",
      minor: "Informação e Comunicação",
    },
    61: {
      major: "Comércio e Serviços",
      minor: "Informação e Comunicação",
    },
    62: {
      major: "Comércio e Serviços",
      minor: "Informação e Comunicação",
    },
    63: {
      major: "Comércio e Serviços",
      minor: "Informação e Comunicação",
    },
    64: {
      major: "Comércio e Serviços",
      minor: "Atividades Financeiras, de Seguros e Serviços Relacionados",
    },
    65: {
      major: "Comércio e Serviços",
      minor: "Atividades Financeiras, de Seguros e Serviços Relacionados",
    },
    66: {
      major: "Comércio e Serviços",
      minor: "Atividades Financeiras, de Seguros e Serviços Relacionados",
    },
    67: {
      major: "Comércio e Serviços",
      minor: "Atividades Financeiras, de Seguros e Serviços Relacionados",
    },
    68: {
      major: "Comércio e Serviços",
      minor: "Atividades Imobiliárias",
    },
    94: {
      major: "Comércio e Serviços",
      minor: "Outras Atividades de Serviços",
    },
    95: {
      major: "Comércio e Serviços",
      minor: "Outras Atividades de Serviços",
    },
    96: {
      major: "Comércio e Serviços",
      minor: "Outras Atividades de Serviços",
    },
    97: {
      major: "Comércio e Serviços",
      minor: "Serviços Domésticos",
    },
    69: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    70: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    71: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    72: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    73: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    74: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    75: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    76: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Profissionais, Científicas e Técnicas",
    },
    77: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    78: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    79: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    80: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    81: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    82: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    83: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Atividades Administrativas e Serviços Complementares",
    },
    84: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor: "Administração Pública, Defesa e Seguridade Social",
    },
    99: {
      major: "Atividades Profissionais, Científicas e Técnicas",
      minor:
        "Organismos Internacionais e outras Instituições Extraterritoriais",
    },
    85: {
      major: "Educação, Artes e Esportes",
      minor: "Educação",
    },
    90: {
      major: "Educação, Artes e Esportes",
      minor: "Artes, Cultura, Esporte e Recreação",
    },
    91: {
      major: "Educação, Artes e Esportes",
      minor: "Artes, Cultura, Esporte e Recreação",
    },
    92: {
      major: "Educação, Artes e Esportes",
      minor: "Artes, Cultura, Esporte e Recreação",
    },
    93: {
      major: "Educação, Artes e Esportes",
      minor: "Artes, Cultura, Esporte e Recreação",
    },
    86: {
      major: "Saúde e Serviços Sociais",
      minor: "Saúde Humana e Serviços Sociais",
    },
    87: {
      major: "Saúde e Serviços Sociais",
      minor: "Saúde Humana e Serviços Sociais",
    },
    88: {
      major: "Saúde e Serviços Sociais",
      minor: "Saúde Humana e Serviços Sociais",
    },
  };

  constructor(
    name,
    year,
    emails,
    description,
    incubated,
    ecosystems,
    services,
    address
  ) {
    this.inspect = {};

    this.id = Company.ID++;
    this.name = name;
    this.inspect.name = removeAccent(`${this.name}`);

    this.year = year;
    this.emails = emails;
    this.description = description;
    this.inspect.descriptionLong = removeAccent(this.description.long || "");

    this.incubated = incubated;
    this.ecosystems = ecosystems;
    this.services = services;
    this.inspect.services = removeAccent(this.services || "");

    this.address = address;

    this._phones = [];
    this._url = "";
    this._companySize = "";
    this._technologies = [];
    this._logo = "";
    this._socialMedia = "";
    this._classification = { major: "", minor: "" };
    this.allowed = true;
    this.active = true;
  }

  set phones(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._phones = rawColumn.split(/[;/]/).map((phone) => formatPhone(phone));
    }
  }

  get phones() {
    return this._phones;
  }

  set url(rawColumn) {
    if (
      rawColumn != undefined &&
      rawColumn != "" &&
      rawColumn != "." &&
      rawColumn != "n/d"
    ) {
      this._url = formatURL(rawColumn);
    }
  }

  get url() {
    return this._url;
  }

  set technologies(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._technologies = "-.!?".split("").includes(rawColumn)
        ? []
        : rawColumn.split(";");

      this.inspect.technologies = this._technologies.map(removeAccent);
    }
  }

  get technologies() {
    return this._technologies;
  }

  set logo(rawColumn) {
    if (!rawColumn) return;

    this._logo = `https://drive.google.com/uc?export=view&id=${rawColumn}`;
  }

  get logo() {
    return this._logo;
  }

  set socialMedia(rawColumn) {
    if (rawColumn != undefined && rawColumn != "") {
      this._socialMedia = rawColumn;
    }
  }

  get socialMedia() {
    return this._socialMedia;
  }

  get city() {
    return this.address.city || [];
  }

  set classification(rawColumn) {
    if (rawColumn && rawColumn != "") {
      const match = rawColumn.trim().match(/^(\d{2}).*/);

      if (match && match[1] !== "00") {
        const twoDigits = match[1];

        this._classification = {
          major: Company.cnae[twoDigits].major,
          minor: Company.cnae[twoDigits].minor,
        };
      }
    }
  }

  get classification() {
    return this._classification;
  }

  setCompanySize(clt, pj, others) {
    let size = 0;
    if (clt && clt != "N/D") size += parseInt(clt);

    if (pj && pj != "N/D") size += parseInt(pj);

    if (others && others != "N/D") size += parseInt(others);

    if (this._classification.major === "Indústria de Transformação") {
      if (size < 20) this._companySize = "Microempresa";
      else if (size >= 20 && size < 100) this._companySize = "Pequena Empresa";
      else if (size >= 100 && size < 500) this._companySize = "Média Empresa";
      else if (size >= 500) this._companySize = "Grande Empresa";
    } else {
      if (size < 9) this._companySize = "Microempresa";
      else if (size >= 10 && size < 50) this._companySize = "Pequena Empresa";
      else if (size >= 50 && size < 100) this._companySize = "Média Empresa";
      else if (size >= 100) this._companySize = "Grande Empresa";
    }
  }

  get companySize() {
    return this._companySize;
  }

  matchesFilter({ primary, secondary, terciary }) {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;

    if (primary.length > 0) {
      primaryMatch = primary == this._classification.major;
    }

    if (secondary.length > 0) {
      secondaryMatch = secondary == this._classification.minor;
    }

    const city = terciary[0];
    const incubator = terciary[1];

    if (city) {
      terciaryMatch = this.city.includes(city);
    }

    if (incubator) {
      terciaryMatch = terciaryMatch && this.ecosystems.includes(incubator);
    }

    return primaryMatch && secondaryMatch && terciaryMatch;
  }
}

export class CompanyGenerator {
  static run(row) {
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

    base.classification = columnValue(row, "BY");
    base.setCompanySize(
      columnValue(row, "AZ"),
      columnValue(row, "BA"),
      columnValue(row, "BB")
    );

    return base;
  }
}
