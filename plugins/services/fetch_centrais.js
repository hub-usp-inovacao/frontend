import { PDI } from "@/lib/classes/pdi";
import { formatURL } from "@/lib/format";

function runForCentrais(args) {
  const { nome, sigla, endereco, unidade, sobre, observacoes } = args;

  const name = `${sigla} - ${nome}`;

  let campus = endereco?.cidade;
  if (campus === "São Paulo") {
    campus = endereco.bairro === "Butantã" ? "Butantã" : "USP Leste";
  }

  const long = `${sobre}${observacoes}`.replace(/^\n+/, "").replace(/\n/, " ");

  const description = {
    short: "",
    long,
  };

  const base = new PDI(
    name,
    "Centrais Multiusuário",
    campus,
    unidade.nome,
    description
  );

  base.phone = args.telefone1;
  base.email = args.email;
  if (args.site) base.url = formatURL(args.site);

  return base;
}

export async function fetchCentrals(payload) {
  const { USPMULTI } = payload;
  let objectsFromAPI = [];

  try {
    let centraisURL = "http://localhost:3001/centrais";
    if (USPMULTI)
      centraisURL = "https://uspmulti.prp.usp.br/api/public/centrais";

    const resp = await fetch(centraisURL);
    const data = await resp.json();

    objectsFromAPI = data.map((d) => runForCentrais(d));
  } catch (error) {
    console.log("error occuried while fetching from USP Multi...");
    console.log(error);
  }

  return objectsFromAPI;
}
