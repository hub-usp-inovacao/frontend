<template>
  <div>
    <div class="background">
      <Panel
        v-model="search.term"
        title="Patentes"
        description="Pesquisadores e unidades da USP desenvolvem patentes e propriedade industrial que estão disponíveis para que empresas e organizações possam licenciar para aplicação e uso. Usando palavras-chave na caixa de busca você terá acesso a breves descrições destas patentes e formas de contato para obter maior detalhamento e informações sobre cada uma delas."
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :groups="groups"
      :colors="{ base: '#5B2C7D', active: '#9247C9' }"
      @select="filters = $event"
    />

    <DisplayData
      :reverse="true"
      :items="displayItems"
      group-name="Patentes"
      :selected="globalSearchSelected"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <p>
          <span>Classificação:</span>
          {{ item.classification.primary.cip }}
        </p>

        <p>{{ item.classification.primary.subareas }}</p>

        <HorizontalList
          title="Países com Proteção"
          :items="item.countriesWithProtection"
        />

        <HorizontalList
          v-if="item.ipcs.length > 0 && item.ipcs[0] != ''"
          title="IPCs"
          :items="item.ipcs"
        />

        <BulletList title="Titulares" :items="item.owners" />
        <BulletList title="Inventores" :items="item.inventors" />
      </template>
      <template #detailsImg="{ item }">
        <v-img v-if="item.photo" eager :src="item.photo"></v-img>
      </template>
      <template #content="{ item }">
        <p>{{ item.sumary }}</p>
      </template>
      <template #actions="{ item }">
        <v-btn
          color="#64318A"
          :href="item.url"
          target="_blank"
          class="white--text"
          :disabled="!item.url"
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
import BulletList from "@/components/first_level/BulletList.vue";
import DisplayData from "@/components/first_level/DisplayData.vue";
import HorizontalList from "@/components/first_level/HorizontalList.vue";

export default {
  components: {
    Panel,
    Background,
    MultipleFilters,
    BulletList,
    DisplayData,
    HorizontalList,
  },
  data: () => ({
    search: {
      term: "",
      patents: undefined,
    },

    selected_subareas: [],
    filters: undefined,
    filtered: undefined,
    groups: [
      {
        label: "Status",
        items: ["Concedida", "Dead", "Em análise"],
      },
    ],
    rawTabs: [
      { name: "Necessidades Humanas", code: "A" },
      { name: "Operações de Processamento; Transporte", code: "B" },
      { name: "Química; Metalurgia", code: "C" },
      { name: "Têxteis; Papel", code: "D" },
      { name: "Construções Fixas", code: "E" },
      {
        name: "Engenharia Mecânica; Iluminação; Aquecimento; Armas; Explosão",
        code: "F",
      },
      { name: "Física", code: "G" },
    ],
  }),
  computed: {
    ...mapGetters({
      dataStatus: "patentes/dataStatus",
      patents: "patentes/patents",
      searchKeys: "patentes/searchKeys",
    }),
    searchTerm() {
      return this.search.term;
    },
    tabs() {
      return this.rawTabs.map((tab) => {
        const subareas = this.patents.reduce((acc, pat) => {
          if (pat.classification.primary.cip.substr(0, 1) == tab.code) {
            acc.add(pat.classification.primary.subarea);
          }

          if (pat.classification.secondary.cip.substr(0, 1) == tab.code) {
            acc.add(pat.classification.secondary.subarea);
          }

          return acc;
        }, new Set());

        return {
          ...tab,
          subareas: Array.from(subareas),
        };
      });
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.patents;
    },
    displayItems() {
      return this.search.patents !== undefined
        ? this.search.patents
        : this.baseItems;
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
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID,
    };

    if (this.dataStatus == "ok" && this.patents.length == 0) {
      this.fetchSpreadsheets(env);
    }
  },
  methods: {
    ...mapActions({
      fetchSpreadsheets: "patentes/fetchSpreadsheets",
    }),
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        return;
      }

      let results = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.searchKeys, 0.0)
      );

      if (results.length === 0) {
        results = await this.$search(
          this.search.term.trim(),
          this.baseItems,
          genFuzzyOptions(this.searchKeys)
        );
      }

      this.search.patents = results;
    },
    primaryAreaNameToCode(name) {
      return this.tabs.find((t) => t.name == name).code;
    },
    filterFun(patent, filterStatus) {
      return patent.matchesFilter(filterStatus, this.primaryAreaNameToCode);
    },
    filterData(context) {
      this.filtered = this.patents.filter((patent) =>
        this.filterFun(patent, context)
      );
    },
    async pipeline() {
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
  },
};
</script>
