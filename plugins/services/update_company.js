async function updateData(data, logo) {
  const backendURL = process.env.BACKEND_URL;

  try {
    const url = backendURL + "/companies";
    console.log(logo);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const resp = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (logo) {
      const body = new FormData();
      body.append("company_image", logo);

      await fetch(url, {
        method: "PATCH",
        body,
      });
    }

    return resp;
  } catch (error) {
    console.log("error occuried while updating...");
    console.log(error);
    return undefined;
  }
}

export default (_, inject) => {
  inject("updateCompanyData", async (data, logo) => {
    const response = await updateData(data, logo);

    if (!response || response.status < 200 || response.status >= 300) {
      return {
        status: "failure",
        message: "Não foi possível atualizar os dados! Tente novamente.",
      };
    }

    const body = await response.json();
    return { status: "ok", message: body };
  });
};
