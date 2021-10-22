async function updateData(company) {
  const backendURL = process.env.BACKEND_URL;

  try {
    const url = backendURL + "/companies";
    const body = new FormData();

    body.append("company", company);

    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");

    const resp = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers,
      body,
    });

    return await resp.json();
  } catch (error) {
    console.log("error occuried while updating...");
    console.log(error);
    return undefined;
  }
}

export default (_, inject) => {
  inject("updateCompanyData", async (company) => {
    const response = await updateData(company);

    if (!response) {
      return {
        status: "failure",
        message: "Não foi possível atualizar os dados! Tente novamente.",
      };
    }

    return { status: "ok", message: response };
  });
};
