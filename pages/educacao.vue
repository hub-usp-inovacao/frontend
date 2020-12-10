<template>
  <div>
    <div class="background">
      <Panel
        v-model="search.term"
        title="Educação"
        description="A USP oferece a seus estudantes diversas disciplinas em nível de graduação e pós-graduação que se relacionam aos temas de Empreendedorismo e Inovação. Ao fazer uma busca, você encontrará as unidades, as condições de oferecimento e códigos e links para acesso às ementas nos sistemas institucionais, o Júpiter e o Janus."
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :groups="groups"
      :colors="{ base: '#db8337', active: '#ab5307' }"
      @select="filters = $event"
    />

    <DisplayData
      :items="displayItems"
      group-name="Disciplinas"
      :selected="globalSearchSelected"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <v-container>
          <p class="body-2">{{ item.campus }}</p>
          <p class="body-2">{{ item.unity }}</p>
        </v-container>
      </template>
      <template #content="{ item }">
        <p>{{ item.description.long }}</p>
      </template>
      <template #actions="{ item }">
        <v-btn
          class="white--text"
          color="#db8337"
          :href="item.url"
          target="_blank"
          >Saiba Mais</v-btn
        >
      </template>
    </DisplayData>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib/search";
import { removeAccent } from "@/lib/format";
import allCampi from "@/lib/campi";

import Background from "@/components/first_level/Background.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import DisplayData from "@/components/first_level/DisplayData.vue";

export default {
  components: {
    Panel,
    Background,
    MultipleFilters,
    DisplayData,
  },
  data: () => ({
    search: {
      term: "",
      disciplines: undefined,
    },

    levels: ["Graduação", "Pós-Graduação"],
    tabs: [
      {
        name: "Inovação",
        description: "Cursos e disciplinas relacionados à área de Inovação.",
        id: "innovation-filter",
      },
      {
        name: "Empreendedorismo",
        description:
          "Cursos e disciplinas relacionados à área de Empreendedorismo.",
        id: "enterpreneuship-filter",
      },
      {
        name: "Propriedade Intelectual",
        description:
          "Cursos e disciplinas relacionados à área de Propriedade Intelectual.",
        id: "intelectual-property-filter",
      },
      {
        name: "Negócios",
        description: "Cursos e disciplinas relacionados à área de Negócios.",
        id: "business-filter",
      },
    ],
    filters: undefined,
    filtered: undefined,
  }),
  computed: {
    ...mapGetters({
      dataStatus: "educacao/dataStatus",
      storeDisciplines: "educacao/disciplines",
      searchKeys: "educacao/searchKeys",
    }),
    disciplines: function () {
      return this.dataStatus == "ok" ? this.storeDisciplines : [];
    },
    groups() {
      return [
        {
          label: "Campus",
          items: allCampi.map((c) => c.name),
        },
        {
          label: "Nível",
          items: [
            "Quero aprender!",
            "Tenho uma ideia, e agora?",
            "Preciso testar minha ideia!",
            "Tópicos avançados em Empreendedorismo",
          ],
        },
        { label: "Natureza", items: ["Graduação", "Pós-Graduação"] },
      ];
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.disciplines;
    },
    displayItems() {
      return this.search.disciplines !== undefined
        ? this.search.disciplines
        : this.baseItems;
    },
    searchTerm() {
      return this.search.term;
    },
    globalSearchSelected() {
      if (this.$route.params.id)
        return this.displayItems.find(
          (item) => item.id === this.$route.params.id
        );
      return undefined;
    },
  },
  watch: {
    searchTerm() {
      this.pipeline();
    },
    filters() {
      this.pipeline();
    },
  },
  beforeMount() {
    const payload = { sheetsAPIKey: process.env.sheetsAPIKey };

    if (this.dataStatus == "ok" && this.disciplines.length == 0)
      this.$store.dispatch("educacao/fetchSpreadsheets", payload);
  },
  methods: {
    ...mapActions({
      setStrictResults: "global/setStrictResults",
      setFlexibleResults: "global/setFlexibleResults",
    }),
    async fuzzySearch() {
      this.setStrictResults();

      if (!this.search.term.trim()) {
        this.search.disciplines = undefined;
        return;
      }

      const term = removeAccent(this.search.term.trim());

      let results = await this.$search(
        term,
        this.baseItems,
        genFuzzyOptions(this.searchKeys, 0.0)
      );

      if (results.length === 0) {
        this.setFlexibleResults();
        results = await this.$search(
          term,
          this.baseItems,
          genFuzzyOptions(this.searchKeys)
        );
      }

      this.search.disciplines = results;
    },
    filterData(context) {
      this.filtered = this.disciplines.filter((discipline) =>
        discipline.matchesFilter(context)
      );
    },
    async pipeline() {
      this.$ga.event({
        eventCategory: 'Educação',
        eventAction: 'Search',
        eventLabel: this.search.term,
      });
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
  },
};
</script>

<style scoped>
.left-border {
  border-radius: 5px 0 0 5px;
}
.right-border {
  border-radius: 0 5px 5px 0;
}
</style>
