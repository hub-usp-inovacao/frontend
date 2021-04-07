import { PDI } from "@/lib/classes/pdi";
import { formatURL } from "@/lib/format";

function runForCentrais(args) {
  const { nome, sigla, endereco, unidade, sobre, observacoes, id } = args;

  const name = `${sigla} - ${nome}`;

  let campus = endereco?.cidade;
  if (campus === "São Paulo") {
    campus = endereco.bairro === "Butantã" ? "Butantã" : "USP Leste";
  }

  const long =
    sobre || observacoes
      ? `${sobre}${observacoes}`.replace(/^\n+/, "").replace(/\n/, " ")
      : "";

  const description = {
    short: "",
    long,
  };

  const base = new PDI(
    name,
    "Centrais Multiusuário",
    campus,
    unidade.nome,
    description,
    id
  );

  base.phone = args.telefone1;
  base.email = args.email;
  if (args.site) base.url = formatURL(args.site);

  return base;
}

function addServiceToCentral(service, centrals) {
  const central = centrals.find((c) => c.central_id === service.central_id);

  central.addService(service.nome);
}

export async function fetchCentrals(isDev) {
  let objectsFromAPI = [];

  try {
    const baseURL = isDev
      ? "http://localhost:3001"
      : "https://uspmulti.prp.usp.br/api/public";

    const centraisURL = baseURL + "/centrais";
    const servicosURL = baseURL + "/servicos";

    let resp = await fetch(centraisURL);
    const centraisData = await resp.json();

    resp = await fetch(servicosURL);
    const servicosData = await resp.json();

    objectsFromAPI = centraisData.map((d) => runForCentrais(d));

    servicosData.forEach((svc) => addServiceToCentral(svc, objectsFromAPI));
  } catch (error) {
    console.log("error occuried while fetching from USP Multi...");
    console.log(error);
  }

  return objectsFromAPI;
}
