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
      { id: 4, title: "P&D&I", key: "pdis" },
      { id: 5, title: "Empresas", key: "companies" }
    ],
    selectedCategory: "skills",
    selectedResult: undefined,

    searched_disciplines: undefined,
    searched_pdis: undefined,
    searched_skills: undefined,
    searched_iniciatives: undefined,
    searched_companies: undefined,

    innerSearch: ""
  }),
  computed: {
    ...mapGetters({
      disciplines: "educacao/disciplines",
      pdis: "pdi/pdis",
      skills: "competencia/skills",
      iniciatives: "iniciativas/iniciatives",
      companies: "empresas/companies"
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
        base_companies
      ] = [
        this.searched_disciplines !== undefined
          ? this.searched_disciplines
          : [],
        this.searched_pdis !== undefined ? this.searched_pdis : [],
        this.searched_iniciatives !== undefined
          ? this.searched_iniciatives
          : [],
        this.searched_skills !== undefined ? this.searched_skills : [],
        this.searched_companies !== undefined ? this.searched_companies : []
      ];

      return base_disciplines
        .map(d => ({
          name: d.name,
          description: d.description.long,
          category: "Educação"
        }))
        .concat(
          base_pdis.map(p => ({
            name: p.name,
            description: p.description.long,
            category: "P&D&I"
          }))
        )
        .concat(
          base_skills.map(s => ({
            name: s.name,
            description:
              s.descriptions.skills +
              s.descriptions.services +
              s.descriptions.equipments,
            category: "Competências"
          }))
        )
        .concat(
          base_iniciatives.map(i => ({
            name: i.name,
            description: i.description.long,
            category: "Iniciativas"
          }))
        )
        .concat(
          base_companies.map(c => ({
            name: c.name,
            description: c.description.long,
            category: "Empresas"
          }))
        );
    }
  },
  watch: {
    innerSearch: debounce(async function() {
      console.log("roda a busca");
      await this.fuzzyGlobalSearch();
    }, 500)
  },
  methods: {
    fuzzyGlobalSearch() {
      console.log("rodando a busca");
      const contexts = [
        { key: "disciplines", searchKeys: ["name"] },
        { key: "iniciatives", searchKeys: ["name"] },
        { key: "pdis", searchKeys: ["name"] },
        { key: "skills", searchKeys: ["name"] },
        { key: "companies", searchKeys: ["name"] }
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