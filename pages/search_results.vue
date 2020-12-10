<template>
  <div>
    <div class="light-orange-bg white--text">
      <Panel
        title="Resultados de Busca"
        search-bar-color="white"
        @search="changeSearchTerm"
      />
    </div>
    <v-container v-if="loading">
      <v-row style="height: 20vh" align="center" justify="center">
        <v-col align="center">
          <v-progress-circular
            :size="100"
            :width="8"
            color="secondary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <SearchFiltersAndResult v-else :searched-term="search" :items="results" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { genFuzzyOptions } from "@/lib/search";
import { removeAccent } from "@/lib/format";

import Panel from "@/components/first_level/Panel.vue";
import SearchFiltersAndResult from "@/components/first_level/SearchFiltersAndResult.vue";

export default {
  components: {
    Panel,
    SearchFiltersAndResult,
  },
  data: () => ({
    title: "Respostas",
    description:
      "Nessa seção, você encontra resultados de uma busca global dentro de todas as divisões do Portal Solus",
    categories: [
      { id: 1, title: "Competências", key: "skills" },
      { id: 2, title: "Educação", key: "disciplines" },
      { id: 3, title: "Iniciativas", key: "iniciatives" },
      { id: 4, title: "P&D&I", key: "pdis" },
      { id: 5, title: "Empresas", key: "companies" },
      { id: 6, title: "Patentes", key: "patents" },
    ],
    selectedCategory: "skills",
    selectedResult: undefined,

    searched_disciplines: undefined,
    searched_pdis: undefined,
    searched_skills: undefined,
    searched_iniciatives: undefined,
    searched_companies: undefined,
    searched_patents: undefined,

    innerSearch: "",
    loading: false,
  }),
  computed: {
    ...mapGetters({
      eduStatus: "educacao/dataStatus",
      pdiStatus: "pdi/dataStatus",
      skillsStatus: "competencia/dataStatus",
      iniciativesStatus: "iniciativas/dataStatus",
      patentsStatus: "patentes/dataStatus",
      companiesStatus: "empresas/dataStatus",

      disciplines: "educacao/disciplines",
      pdis: "pdi/pdis",
      skills: "competencia/skills",
      iniciatives: "iniciativas/iniciatives",
      companies: "empresas/companies",
      patents: "patentes/patents",

      skillsSearchKeys: "competencia/searchKeys",
      disciplinesSearchKeys: "educacao/searchKeys",
      companiesSearchKeys: "empresas/searchKeys",
      iniciativesSearchKeys: "iniciativas/searchKeys",
      pdisSearchKeys: "pdi/searchKeys",
      patentsSearchKeys: "patentes/searchKeys",
    }),
    search() {
      return this.innerSearch;
    },
    results() {
      const [
        base_disciplines,
        base_pdis,
        base_iniciatives,
        base_skills,
        base_companies,
        base_patents,
      ] = [
        this.searched_disciplines !== undefined
          ? this.searched_disciplines
          : [],
        this.searched_pdis !== undefined ? this.searched_pdis : [],
        this.searched_iniciatives !== undefined
          ? this.searched_iniciatives
          : [],
        this.searched_skills !== undefined ? this.searched_skills : [],
        this.searched_companies !== undefined ? this.searched_companies : [],
        this.searched_patents !== undefined ? this.searched_patents : [],
      ];

      return base_disciplines
        .map((d) => ({
          name: d.name,
          description: d.description.long,
          category: "Educação",
          id: d.id,
        }))
        .concat(
          base_pdis.map((p) => ({
            name: p.name,
            description: p.description.long,
            category: "P&D&I",
            id: p.id,
          }))
        )
        .concat(
          base_skills.map((s) => ({
            name: s.name,
            description:
              s.descriptions.skills +
              s.descriptions.services +
              s.descriptions.equipments,
            category: "Competências",
            id: s.id,
          }))
        )
        .concat(
          base_iniciatives.map((i) => ({
            name: i.name,
            description: i.description.long,
            category: "Iniciativas",
            id: i.id,
          }))
        )
        .concat(
          base_companies.map((c) => ({
            name: c.name,
            description: c.description.long,
            category: "Empresas",
            id: c.id,
          }))
        )
        .concat(
          base_patents.map((p) => ({
            name: p.name,
            description: p.summary,
            category: "Patentes",
            id: p.id,
          }))
        );
    },
  },
  watch: {
    innerSearch() {
      setTimeout(this.dispatchSearch);
    },
  },
  beforeMount() {
    if (this.$route.params.search) {
      this.changeSearchTerm(this.$route.params.search);
    } else {
      const env = {
        sheetsAPIKey: process.env.sheetsAPIKey,
        sheetID: process.env.sheetID,
      };

      if (this.eduStatus == "ok" && this.disciplines.length == 0) {
        this.fetchDisciplines(env);
      }

      if (this.pdiStatus == "ok" && this.pdis.length == 0) {
        this.fetchPDIs(env);
      }

      if (this.skillsStatus == "ok" && this.skills.length == 0) {
        this.fetchSkills(env);
      }

      if (this.iniciativesStatus == "ok" && this.iniciatives.length == 0) {
        this.fetchIniciatives(env);
      }

      if (this.patentsStatus == "ok" && this.patents.length == 0) {
        this.fetchPatents(env);
      }

      if (this.companiesStatus == "ok" && this.companies.length == 0) {
        this.fetchCompanies(env);
      }
    }
  },
  methods: {
    ...mapActions({
      fetchDisciplines: "educacao/fetchSpreadsheets",
      fetchPDIs: "pdi/fetchSpreadsheets",
      fetchSkills: "competencia/fetchSpreadsheets",
      fetchIniciatives: "iniciativas/fetchSpreadsheets",
      fetchPatents: "patentes/fetchSpreadsheets",
      fetchCompanies: "empresas/fetchSpreadsheets",
      setStrictResults: "global/setStrictResults",
      setFlexibleResults: "global/setFlexibleResults",
    }),
    async fuzzyGlobalSearch() {
      const contexts = [
        { key: "disciplines", searchKeys: this.disciplinesSearchKeys },
        { key: "iniciatives", searchKeys: this.iniciativesSearchKeys },
        { key: "pdis", searchKeys: this.pdisSearchKeys },
        { key: "skills", searchKeys: this.skillsSearchKeys },
        { key: "companies", searchKeys: this.companiesSearchKeys },
        { key: "patents", searchKeys: this.patentsSearchKeys },
      ];

      if (!this.search.trim()) {
        contexts.forEach(({ key }) => (this[`searched_${key}`] = undefined));
        return;
      }

      const term = removeAccent(this.search.trim());

      let empty = true;
      this.setStrictResults();
      await contexts.forEach((ctx) => {
        this.$search(
          term,
          this[ctx.key],
          genFuzzyOptions(ctx.searchKeys, 0.0)
        ).then((results) => {
          if (results.length > 0) {
            empty = false;
          }
          this[`searched_${ctx.key}`] =
            results.length > 0 ? results : undefined;
        });
      });

      if (empty) {
        this.setFlexibleResults();
        contexts.forEach((ctx) => {
          this.$search(
            term,
            this[ctx.key],
            genFuzzyOptions(ctx.searchKeys)
          ).then((results) => {
            this[`searched_${ctx.key}`] =
              results.length > 0 ? results : undefined;
          });
        });
      }
    },
    dispatchSearch: async function () {
      this.$ga.event({
        eventCategory: 'GlobalSearch',
        eventAction: 'Search',
        eventLabel: this.innerSearch,
      });
      await this.fuzzyGlobalSearch();
      this.loading = false;
    },
    changeSearchTerm(searchTerm) {
      if (searchTerm !== this.innerSearch) {
        this.loading = true;
      }
      this.innerSearch = searchTerm;
    },
  },
};
</script>

<style scoped>
.bg-orange {
  background-color: rgba(255, 177, 99, 0.9);
}

.light-orange-bg {
  background-color: #ffb74a;
}
</style>
