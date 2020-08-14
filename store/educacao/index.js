import { formatURL } from "@/lib/format";
import { findErrors } from "@/lib/errors/disciplinas";

const rowToObj = (row, id) => ({
  id,
  name: row[0],
  campus: row[1],
  unity: row[2],
  url: formatURL(row[3]),
  description: {
    short: row[4],
    long: row[5],
  },
  startDate: row[6],
  category: {
    business: row[8].length > 0,
    entrepreneurship: row[9].length > 0,
    innovation: row[10].length > 0,
    intellectualProperty: row[11].length > 0,
  },
  level: row[12],
});

export const state = () => ({
  disciplines: [],
  isLoading: false,
  errors: undefined,
  keys: ["name", "description.short", "description.long"],
});

export const getters = {
  dataStatus: (state) => (state.isLoading ? "loading" : "ok"),
  disciplines: (state) => state.disciplines,
  campi: (state) => {
    return Array.from(
      state.disciplines.reduce(
        (campiSet, di) => campiSet.add(di.campus),
        new Set()
      )
    ).sort((a, b) => a.localeCompare(b));
  },
  searchKeys: (s) => s.keys,
  errors: (s) => s.errors
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
  setErrors(s, errors) {
    s.errors = errors;
  }
};

export const actions = {
  async fetchSpreadsheets(ctx, env) {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "DISCIPLINAS";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const data = await resp.json();
      const objects = data.values.slice(1).map(rowToObj);

      const errors = findErrors(Object.assign([], objects));

      ctx.commit("setErrors", errors);
      ctx.commit("setDisciplines", objects);
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
