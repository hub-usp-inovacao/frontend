const formatURL = (raw) =>
  raw.substr(0, 4) === "http" ? raw : `http://${raw}`;

const rowToObj = (row) => ({
  name: row[0],
  description: {
    short: row[4],
    long: row[5],
  },
  campus: row[1],
  unity: row[2],
  category: {
    business: row[8].length > 0,
    entrepreneurship: row[9].length > 0,
    innovation: row[10].length > 0,
    intellectualProperty: row[11].length > 0,
  },
  url: formatURL(row[3]),
  area: "dado perdido",
  startDate: row[6],
  level: row[12],
});

export const state = () => ({
  disciplines: [],
  isLoading: false,
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  disciplines: (state) => state.disciplines,
};

export const mutations = {
  setLoadingStatus(state) {
    state.isLoading = true;
  },
  unsetLoadingStatus(state) {
    state.isLoading = false;
  },
  setDisciplines(state, disciplines) {
    state.disciplines = disciplines;
  },
};

export const actions = {
  fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "DISCIPLINAS";

    ctx.commit("setLoadingStatus");

    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        ctx.commit("setDisciplines", data.values.slice(1).map(rowToObj));
        ctx.commit("unsetLoadingStatus");
      })
      .catch((error) => {
        ctx.commit("unsetLoadingStatus");
        console.log("error occuried while fetching...");
        console.log(error);
      });
  },
};
