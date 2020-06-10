<template>
  <div>
    <div class="light-orange-bg white--text">
      <Panel title="Resultados de Busca" searchBarColor="white" />
    </div>
    <SearchFiltersAndResult :items="results" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Panel from "../components/Panel.vue";
import SearchFiltersAndResult from "../components/SearchFiltersAndResult.vue";

export default {
  components: {
    Panel,
    SearchFiltersAndResult
  },
  data: () => ({
    title: "Respostas",
    description:
      "Nessa seção, você encontra resultados de uma busca global dentro de todas as divisões do Portal Solus",
    categories: [
      { id: 1, title: "Competências", key: "skills" },
      { id: 2, title: "Educação", key: "disciplines" },
      { id: 3, title: "Iniciativas", key: "iniciatives" },
      { id: 4, title: "P&D&I", key: "pdis" }
    ],
    selectedCategory: "skills",
    selectedResult: undefined,

    searched_disciplines: undefined,
    searched_pdis: undefined,
    searched_skills: undefined,
    searched_iniciatives: undefined
  }),
  computed: {
    ...mapGetters({
      disciplines: "educacao/disciplines",
      pdis: "pdi/pdis",
      skills: "competencia/skills",
      iniciatives: "iniciativas/iniciatives"
    }),
    selectedCategoryResults() {
      return this[`searched_${this.selectedCategory}`];
    },
    search() {
      return this.$route.params.search;
    },
    results() {
      return this.disciplines
        .map(d => ({
          name: d.name,
          description: d.description.long,
          category: "Educação"
        }))
        .concat(
          this.pdis.map(p => ({
            name: p.name,
            description: p.description.long,
            category: "P&D&I"
          }))
        )
        .concat(
          this.skills.map(s => ({
            name: s.name,
            description:
              s.descriptions.skills +
              s.descriptions.services +
              s.descriptions.equipments,
            category: "Competências"
          }))
        )
        .concat(
          this.iniciatives.map(i => ({
            name: i.name,
            description: i.description.long,
            category: "Iniciativas"
          }))
        );
    }
  },
  methods: {
    fuzzyGlobalSearch() {
      const contexts = [
        { key: "disciplines", searchKeys: ["name"] },
        { key: "iniciatives", searchKeys: ["name"] },
        { key: "pdis", searchKeys: ["name"] },
        { key: "skills", searchKeys: ["name"] }
      ];

      if (!this.search.trim()) {
        context.forEach(({ key }) => (this[`searched_${key}`] = undefined));
        return;
      }

      const baseOptions = {
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2
      };

      contexts.forEach(ctx => {
        const opts = {
          ...baseOptions,
          keys: ctx.searchKeys
        };
        this.$search(this.search.trim(), this[ctx.key], opts).then(results => {
          this[`searched_${ctx.key}`] =
            results.length > 0 ? results : undefined;
        });
      });
    }
  },
  beforeMount() {
    if (!this.$route.params.search || this.$route.params.search.length == 0) {
      this.$router.replace("/");
    }

    this.fuzzyGlobalSearch();
  }
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