<template>
  <div>
    <div class="background">
      <Panel
        title="Empresas"
        description="Incubadoras e outras estruturas da Universidade facilitam a criação de empresas e negócios por parte de estudantes e pesquisadores. Estas são as empresas com DNA USP que estão organizadas, no Portal Solus, por áreas de atuação e tecnologias aplicáveis. Com o nosso mecanismo de busca, é possível consultar as empresas por palavras-chave ou CNAEs (Classificação Nacional de Atividades Econômicas)."
        url="https://docs.google.com/forms/d/1q354be1_cPpeSIWVQkU2CXUpjUiyYuC0IU5W1_4W_zA/edit?usp=sharing"
        forms-call="Cadastre sua empresa aqui"
        @search="changeSearchTerm"
      />
      <USPDNA />
    </div>

    <Background />

    <MultipleFilters
      :tabs="tabs"
      :groups="groups"
      :colors="{ base: '#074744', active: '#0A8680' }"
      @select="filters = $event"
    />

    <DisplayData
      :items="displayItems"
      group-name="Empresas"
      :selected="globalSearchSelected"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <v-container>
          <p v-for="phone in item.phones" :key="phone">{{ phone }}</p>
          <p v-for="email in item.emails" :key="email">{{ email }}</p>
        </v-container>
      </template>
      <template #detailsImg="{ item }">
        <v-img v-if="item.logo" eager :src="item.logo"></v-img>
      </template>
      <template #content="{ item }">
        <p v-if="item.incubated">
          <span class="font-weight-bold"
            >Incubadora{{ item.ecosystems.length > 1 ? "(s)" : "" }}</span
          >
          <span v-for="incub of item.ecosystems" :key="incub"
            >{{ incub }};&nbsp;</span
          >
        </p>

        <p v-if="item.companySize != ''">
          <span class="font-weight-bold">Classificação</span>
          {{ item.companySize }}
        </p>

        <p>
          <span class="font-weight-bold">Descrição</span>
          {{ item.description.long }}
        </p>

        <p>
          <span class="font-weight-bold">Produtos e Serviços</span>
          {{ item.services }}
        </p>

        <BulletList
          v-if="item.technologies.length > 0"
          title="Tecnologias"
          :items="item.technologies"
        />
      </template>
      <template #actions="{ item }">
        <v-btn
          class="white--text"
          color="#2bc570"
          :href="item.url"
          :disabled="!item.url"
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

import Background from "@/components/first_level/Background.vue";
import USPDNA from "@/components/first_level/USPDNA.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import DisplayData from "@/components/first_level/DisplayData.vue";
import BulletList from "@/components/first_level/BulletList.vue";

export default {
  components: {
    Panel,
    MultipleFilters,
    Background,
    DisplayData,
    USPDNA,
    BulletList,
  },
  data: () => ({
    filters: undefined,
    filtered: undefined,
    search: {
      term: "",
      companies: undefined,
    },
  }),
  computed: {
    ...mapGetters({
      dataStatus: "empresas/dataStatus",
      companies: "empresas/companies",
      searchKeys: "empresas/searchKeys",
      cities: "empresas/cities",
    }),
    searchTerm() {
      return this.search.term;
    },
    tabs() {
      return Object.keys(this.$cnae).reduce((acc, code) => {
        const { major, minor } = this.$cnae[code];

        const tab = acc.find(({ name }) => name === major);

        if (tab) {
          if (!tab.subareas) tab.subareas = [];

          if (!tab.subareas.includes(minor)) tab.subareas.push(minor);
        } else {
          acc.push({
            name: major,
            subareas: [minor],
          });
        }

        return acc;
      }, []);
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.companies;
    },
    displayItems() {
      return this.search.companies !== undefined
        ? this.search.companies
        : this.baseItems;
    },
    groups() {
      return [
        { label: "Cidade", items: this.cities },
        { label: "Incubadora?", items: this.$Company.incubators },
        { label: "Porte", items: this.$Company.sizes },
      ];
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
    if (this.dataStatus == "ok" && this.companies.length == 0) {
      this.fetchSpreadsheets({
        sheetsAPIKey: process.env.sheetsAPIKey,
        sheetID: process.env.sheetID,
        cnae: this.$cnae,
      });
    }
  },
  methods: {
    ...mapActions({
      fetchSpreadsheets: "empresas/fetchSpreadsheets",
      setStrictResults: "global/setStrictResults",
      setFlexibleResults: "global/setFlexibleResults",
    }),
    async fuzzySearch() {
      this.setStrictResults();

      if (!this.search.term.trim()) {
        this.search.companies = undefined;
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

      this.search.companies = results;
    },
    filterData(context) {
      this.filtered = this.companies.filter((company) =>
        company.matchesFilter(context)
      );
    },
    async pipeline() {
      if (this.search.term.trim())
        this.$ga.event({
          eventCategory: "Empresas",
          eventAction: "Search",
          eventLabel: this.search.term,
        });
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
    changeSearchTerm(searchTerm) {
      this.search.term = searchTerm;
    },
  },
};
</script>
