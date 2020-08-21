<template>
  <div>
    <div class="background">
      <Panel
        v-model="search.term"
        title="Iniciativas"
        description="A USP mantém diversas iniciativas e programas para facilitar e estimular a inovação e o empreendedorismo, fazendo a ponte entre o ambiente acadêmico, as organizações e a sociedade. Clique nos links para conhecer os tipos de inicativas e acessar as formas de contatar cada uma delas."
        url="https://www.google.com"
        forms-call="Confira os Editais"
        second-url="https://www.google.com"
        second-call="confira os Programas"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ base: '#222c63', active: '#525c93' }"
      @select="filters = $event"
    />

    <DisplayData
      :items="display_entries"
      group-name="Iniciativas"
      :selected="globalSearchSelected"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <p class="body-2">{{ item.unity }}</p>
        <p class="body-2 mb-4">{{ item.local }}</p>
        <p v-for="phone in item.contact.info" :key="phone" class="body-2 mb-4">
          {{ phone }}
        </p>
      </template>
      <template #content="{ item }">{{ item.description.long }}</template>
      <template #actions="{ item }">
        <v-btn
          :href="item.url"
          target="_blank"
          color="#222c63"
          class="white--text"
          >Saiba Mais</v-btn
        >
      </template>
    </DisplayData>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib/search";

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
    tabs: [
      {
        name: "Agente Institucional",
      },
      {
        name: "Empresa Jr.",
      },
      {
        name: "Entidade Associada",
      },
      {
        name: "Entidade Estudantil",
      },
      {
        name: "Espaço/Coworking",
      },
      {
        name: "Grupos e Iniciativas Estudantis",
      },
      {
        name: "Ideação",
      },
      {
        name: "Incubadora e Parque Tecnológico",
      },
    ],

    search: {
      term: "",
      iniciatives: undefined,
    },

    filters: undefined,
    filtered: undefined,
  }),
  computed: {
    ...mapGetters({
      iniciatives: "iniciativas/iniciatives",
      dataStatus: "iniciativas/dataStatus",
      searchKeys: "iniciativas/searchKeys",
    }),
    searchTerm() {
      return this.search.term;
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.iniciatives;
    },
    display_entries() {
      return this.search.iniciatives !== undefined
        ? this.search.iniciatives
        : this.baseItems;
    },
    globalSearchSelected() {
      if (this.$route.params.id)
        return this.display_entries.find(
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
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID,
    };

    if (this.dataStatus == "ok" && this.iniciatives.length == 0) {
      this.fetchSpreadsheets(env);
    }
  },
  methods: {
    ...mapActions({
      fetchSpreadsheets: "iniciativas/fetchSpreadsheets",
    }),
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.iniciatives = undefined;
        return;
      }

      this.search.iniciatives = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.searchKeys)
      );
    },
    filterData(context) {
      this.filtered = this.iniciatives.filter((iniciative) =>
        iniciative.matchesFilter(context)
      );
    },
    async pipeline() {
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
  },
};
</script>
