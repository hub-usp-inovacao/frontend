<template>
  <div>
    <div class="background">
      <Panel
        v-model="search.term"
        title="P&amp;D&amp;I"
        description="Na seção de Pesquisa &amp; Desenvolvimento &amp; Inovação, você encontra laboratórios, organizações e programas que atuam com desenvolvimento e inovação no âmbito da USP. Aqui, você pode consultar informações e contatos de CEPIDs, EMBRAPIIs, INCTs e NAPs, de acordo com as áreas de competência e serviços realizados."
        url="http://uspmulti.prp.usp.br/"
        forms-call="Confira centrais multiusuários"
        second-url="http://uspmulti.prp.usp.br/pagina_result.php?a=servicos"
        second-call="Confira Serviços Tecnológicos"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ active: '#308C89', base: '#005C59' }"
      :groups="groups"
      @select="filters = $event"
    />

    <DisplayData
      :items="displayItems"
      group-name="P&D&I"
      :selected="globalSearchSelected"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <p class="body-2 font-italic">{{ item.category }}</p>
        <p class="body-2">{{ item.unity }}</p>
        <p class="body-2">{{ item.campus }}</p>
        <p class="body-2" v-if="item.coordinator">{{ item.coordinator }}</p>
        <p class="body-2" v-if="item.phone">{{ item.phone }}</p>
        <p class="body-2" v-if="item.email">{{ item.email }}</p>
      </template>
      <template #content="{ item }">
        {{ item.description.long }}
        <p v-if="item.category == 'NAP'" class="font-italic">
          Os dados do NAP foram obtidos do sistema Atena-USP
        </p>
      </template>
      <template #actions="{ item }">
        <v-btn
          class="white--text"
          target="_blank"
          :disabled="!item.url"
          :href="item.url"
          color="#005C59"
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
import campi from "@/lib/campi.js";

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
      pdis: undefined,
    },

    tabs: [
      {
        name: "CEPID",
        description:
          "Centros de Pesquisa, Inovação e Difusão fomentados pela FAPESP que atuam na USP desenvolvendo investigações para contribuir à inovação por meio das transferências de tecnologia, além de oferecer atividades de extensão para o público em geral.",
        id: "cepid-filter"
      },
      {
        name: "EMBRAPII",
        description:
          "A EMBRAPII (Associação Brasileira de Pesquisa e Inovação Industrial), apoia instituições de pesquisa tecnológica, em determinadas áreas de competência, para executarem projetos de desenvolvimento de pesquisa tecnológica para inovação, em cooperação com empresas do setor industrial.",
        id: "embrapii-filter"
      },
      {
        name: "INCT",
        description:
          "Institutos Nacionais de Ciência e Tecnologia, fomentados pelo CNPq  articulam os  grupos de pesquisa na fronteira da ciência e em áreas estratégicas para o desenvolvimento sustentável do país; além de estimular aplicações para promover a inovação e o espírito empreendedor.",
        id: "inct-filter"
      },
      {
        name: "NAP",
        description:
          "Órgãos de integração que reúnem especialistas de diferentes áreas da universidade para pesquisas de caráter interdisciplinar e transdisciplinar, promovendo maior comunicação e integração entre as Unidades USP e variadas áreas do conhecimento.",
        id: "nap-filter"
      },
      {
        name: "Centro de Pesquisa em Engenharia",
        description: ""
      }
    ],

    filters: undefined,
    filtered: undefined,
  }),
  computed: {
    ...mapGetters({
      dataStatus: "pdi/dataStatus",
      storePDIs: "pdi/pdis",
      searchKeys: "pdi/searchKeys",
    }),
    groups() {
      return [
        {
          label: "Campus",
          items: campi.map((c) => c.name),
        },
      ];
    },
    searchTerm() {
      return this.search.term;
    },
    pdis: function () {
      return this.dataStatus == "ok" ? this.storePDIs : [];
    },
    baseItems: function () {
      return this.filtered !== undefined ? this.filtered : this.pdis;
    },
    displayItems() {
      return this.search.pdis !== undefined ? this.search.pdis : this.baseItems;
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
    const payload = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID,
    };

    if (this.dataStatus == "ok" && this.pdis.length == 0)
      this.$store.dispatch("pdi/fetchSpreadsheets", payload);
  },
  methods: {
    ...mapActions({
      setStrictResults: "global/setStrictResults",
      setFlexibleResults: "global/setFlexibleResults",
    }),
    async fuzzySearch() {
      this.setStrictResults();

      if (!this.search.term.trim()) {
        this.search.pdis = undefined;
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

      this.search.pdis = results;
    },
    filterData(context) {
      this.filtered = this.pdis.filter((pdi) => pdi.matchesFilter(context));
    },
    async pipeline() {
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
  },
};
</script>

<style scoped></style>
