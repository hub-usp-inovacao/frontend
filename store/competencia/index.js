import { Skill, SkillGenerator } from "@/lib/classes/skill";
import { findErrors } from "@/lib/errors/competencias";

export const state = () => ({
  isLoading: false,
  skills: [],
  errors: undefined,
  keys: Skill.keys,
});

export const getters = {
  dataStatus: (s) => (s.isLoading ? "loading" : "ok"),
  isEmpty: (s) => s.skills.length == 0,
  skills: (s) => s.skills,
  searchKeys: (s) => s.keys,
  errors: (s) => s.errors,
  campi: (s) =>
    s.skills
      .map((s) => s.campus)
      .filter(
        (campus, index, campi) =>
          index === campi.findIndex((other) => other === campus)
      ),
  unities: (s) =>
    s.skills
      .map((s) => s.unity)
      .concat([
        "CeBiMar - Centro de Biologia Marinha",
        "CENA - Centro de Energia Nuclear na Agricultura",
        "IEA - Instituto de Estudos Avançados",
        "IEB - Instituto de Estudos Brasileiros",
        "IEE - Instituto de Energia e Ambiente",
        "IMT - Instituto de Medicina Tropical",
      ])
      .filter(
        (unity, index, unities) =>
          index === unities.findIndex((other) => other == unity)
      ),
};

export const mutations = {
  setLoadingStatus: (s) => (s.isLoading = true),
  unsetLoadingStatus: (s) => (s.isLoading = false),
  setSkills: (s, newSkills) => (s.skills = newSkills),
  setErrors: (s, errors) => (s.errors = errors),
};

export const actions = {
  fetchSpreadsheets: async (ctx, env) => {
    const { sheetsAPIKey, sheetID } = env;
    const sheetName = "COMPETENCIAS";

    ctx.commit("setLoadingStatus");

    try {
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
      );

      const { values } = await resp.json();
      const objects = values.slice(1).map((row) => SkillGenerator.run(row));
      const errors = findErrors(Object.assign([], objects));

      ctx.commit("setErrors", errors);

      ctx.commit(
        "setSkills",
        objects.sort((a, b) =>
          a.name == b.name ? 0 : a.name < b.name ? -1 : 1
        )
      );
    } catch (error) {
      console.log("error occuried while fetching...");
      console.log(error);
    }

    ctx.commit("unsetLoadingStatus");
  },
};
