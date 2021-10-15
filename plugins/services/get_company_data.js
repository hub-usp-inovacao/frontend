async function getData(cnpj) {
  const backendURL = process.env.BACKEND_URL;

  try {
    const url = `${backendURL}/companies/${cnpj}`;

    const resp = await fetch(url);

    return await resp.json();
  } catch (error) {
    console.log("error occuried while updating...");
    console.log(error);
    return undefined;
  }
}

export default (_, inject) => {
  inject("getCompanyData", async (cnpj) => {
    const response = await getData(cnpj);

    if (!response) {
      return {
        status: "failure",
        message:
          "Não foi encontrada nenhuma empresa com este CNPJ. Tente novamente.",
      };
    }

    return { status: "ok", message: response };
  });
};
