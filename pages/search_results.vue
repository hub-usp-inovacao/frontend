<template>
  <div>
    <div class="light-orange-bg white--text">
      <Panel title="Resultados de Busca" searchBarColor="white" @input="innerSearch = $event" />
    </div>
    <SearchFiltersAndResult :searchedTerm="search" :items="results" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "debounce";
import { genFuzzyOptions } from "@/lib";

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
  }),
  computed: {
    ...mapGetters({
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
      return this.innerSearch || this.$route.params.search;
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
        }))
        .concat(
          base_pdis.map((p) => ({
            name: p.name,
            description: p.description.long,
            category: "P&D&I",
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
          }))
        )
        .concat(
          base_iniciatives.map((i) => ({
            name: i.name,
            description: i.description.long,
            category: "Iniciativas",
          }))
        )
        .concat(
          base_companies.map((c) => ({
            name: c.name,
            description: c.description.long,
            category: "Empresas",
          }))
        )
        .concat(
          base_patents.map((p) => ({
            name: p.name,
            description: p.summary,
            category: "Patentes",
          }))
        );
    },
  },
  watch: {
    innerSearch: debounce(async function () {
      console.log("roda a busca");
      await this.fuzzyGlobalSearch();
    }, 500),
  },
  methods: {
    fuzzyGlobalSearch() {
      const contexts = [
        { key: "disciplines", searchKeys: this.disciplinesSearchKeys },
        { key: "iniciatives", searchKeys: this.iniciativesSearchKeys },
        { key: "pdis", searchKeys: this.pdisSearchKeys },
        { key: "skills", searchKeys: this.skillsSearchKeys },
        { key: "companies", searchKeys: this.companiesSearchKeys },
        { key: "patents", searchKeys: this.patentsSearchKeys },
      ];

      if (!this.search.trim()) {
        context.forEach(({ key }) => (this[`searched_${key}`] = undefined));
        return;
      }

      contexts.forEach((ctx) => {
        this.$search(
          this.search.trim(),
          this[ctx.key],
          genFuzzyOptions(ctx.searchKeys)
        ).then((results) => {
          this[`searched_${ctx.key}`] =
            results.length > 0 ? results : undefined;
        });
      });
    },
  },
  beforeMount() {
    if (!this.$route.params.search || this.$route.params.search.length == 0) {
      this.$router.replace("/");
    }

    this.fuzzyGlobalSearch();
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