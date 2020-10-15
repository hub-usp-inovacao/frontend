import { columnValue } from "@/lib/sheets";

export const state = () => ({
  iniciativeSheetID: "",
  skillSheetID: "",
  companySheetID: "",
  patentSheetID: "",
});

export const getters = {
  iniciativeSheetID: (s) => s.iniciativeSheetID,
  skillSheetID: (s) => s.skillSheetID,
  companySheetID: (s) => s.companySheetID,
  patentSheetID: (s) => s.patentSheetID,
};

export const mutations = {
  setSheetID: (s, payload) => {
    console.log(payload);
    s[payload.sheet] = payload.sheetID;
  }
};

export const actions = {
  fetchSpreadsheetsID: async (ctx, env) => {
    const { sheetsAPIKey, metaSheetID } = env;

    const meta = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${metaSheetID}?key=${sheetsAPIKey}`
    );

    const { sheets } = await meta.json();
    const sheetName = sheets[0].properties.title;

    const resp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${metaSheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
    );

    const { values } = await resp.json();
    values.slice(1).forEach((row) => {
      const sheetName = columnValue(row, "A") + "SheetID";
      const rowURL = columnValue(row, "C") || "";
      const regex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-z0-9\-_]+)\/.+$/i;
      const match = rowURL.match(regex);
      if (match)
        ctx.commit("setSheetID", { sheet: sheetName, sheetID: match[1] });
    });
    console.log(values);
  }
}