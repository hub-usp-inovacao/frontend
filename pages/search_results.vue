<template>
  <div>
    <p>{{ searched_disciplines }}</p>
    <p>{{ searched_iniciatives }}</p>
    <p>{{ searched_pdis }}</p>
    <p>{{ searched_skills }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
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
    search() {
      return this.$route.params.search;
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