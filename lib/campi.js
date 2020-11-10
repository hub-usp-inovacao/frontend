const campi = [
  {
    name: "Bauru",
    unities: [
      "Faculdade de Odontologia de Bauru - FOB",
      "Hospital de Reabilitação de Anomalias Craniofaciais (Centrinho)",
    ],
  },
  {
    name: "Largo São Francisco",
    unities: ["Faculdade de Direito"],
  },
  {
    name: "Lorena",
    unities: ["Escola de Engenharia de Lorena (EEL)"],
  },
  {
    name: "Outras Unidades",
    unities: ["Centro de Biologia Marinha - CeBiMar"],
  },
  {
    name: "Piracicaba",
    unities: [
      "Centro de Energia Nuclear na Agricultura - CENA",
      'Escola Superior de Agricultura "Luiz de Queiroz" - ESALQ',
    ],
  },
  {
    name: "Pirassununga",
    unities: ["Faculdade de Zootecnia e Engenharia de Alimentos - FZEA"],
  },
  {
    name: "Quadrilátero da Saúde",
    unities: [
      "Faculdade de Saúde Pública - FSP",
      "Faculdade de Medicina - FM",
      "Escola de Enfermagem - EE",
      "Instituto de Medicina Tropical - IMT",
    ],
  },
  {
    name: "Ribeirão Preto",
    unities: [
      "Faculdade de Filosofia, Ciências e Letras de Ribeirão Preto - FFCLRP",
      "Faculdade de Economia, Administração e Contabilidade de Ribeirão Preto - FEARP",
      "Faculdade de Medicina de Ribeirão Preto - FMRP",
      "Escola de Enfermagem de Ribeirão Preto - EERP",
      "Faculdade de Ciências Farmacêuticas de Ribeirão Preto - FCFRP",
      "Faculdade de Odontologia de Ribeirão Preto - FORP",
      "Faculdade de Direito de Ribeirão Preto - FDRP",
      "Escola de Educação Física e Esporte de Ribeirão Preto - EEFERP",
    ],
  },
  {
    name: "Santos",
    unities: ["Departamento de Engenharia de Minas e Petróleo - PMI"],
  },
  {
    name: "São Carlos",
    unities: [
      "Escola de Engenharia de São Carlos - EESC",
      "Instituto de Ciências Matemáticas e de Computação - ICMC",
      "Instituto de Física de São Carlos - IFSC",
      "Instituto de Química de São Carlos - IQSC",
      "Instituto de Arquitetura e Urbanismo de São Carlos - IAU",
    ],
  },
  {
    name: "São Paulo",
    unities: [
      "Faculdade de Ciências Farmacêuticas - FCF",
      "Instituto de Química - IQ",
      "Instituto de Ciências Biomédicas - ICB",
      "Instituto de Matemática e Estatística - IME",
      "Faculdade de Educação - FE",
      "Faculdade de Medicina Veterinária e Zootecnia - FMVZ",
      "Faculdade de Odontologia - FO",
      "Escola Politécnica - EP",
      "Faculdade de Filosofia, Letras e Ciências Humanas - FFLCH",
      "Instituto de Astronomia, Geofísica e Ciências Atmosféricas - IAG",
      "Escola de Educação Física e Esporte - EEFE",
      "Instituto de Biociências - IB",
      "Faculdade de Arquitetura e Urbanismo - FAU",
      "Faculdade de Economia, Administração e Contabilidade - FEA",
      "Escola de Comunicações e Artes - ECA",
      "Instituto de Estudos Avançados - IEA",
      "Instituto de Estudos Brasileiros - IEB",
      "Instituto de Energia e Ambiente - IEE",
      "Escola de Artes, Ciências e Humanidades - EACH",
      "Instituto de Física - IF",
      "Instituto de Geociências - IGc",
      "Instituto de Psicologia - IP",
      "Instituto de Relações Internacionais - IRI",
      "Instituto Oceanográfico - IO",
      "Museu de Arqueologia e Etnografia",
      "Museu de Arte Contemporânea",
      "Museu Paulista",
      "Museu de Zoologia"
    ],
  },
];

export default campi
  .map(c => {
    return { name: c.name, unities: c.unities.sort() }
  })
  .sort((a, b) => a.name == b.name ? 0 : a.name < b.name ? -1 : 1);
