<template>
  <div>
    <div class="background">
      <Panel
        v-model="search.term"
        title="P&amp;D&amp;I"
        description="Na seção de Pesquisa &amp; Desenvolvimento &amp; Inovação, você encontra laboratórios, organizações e programas que atuam com desenvolvimento e inovação no âmbito da USP. Aqui, você pode consultar informações e contatos de CEPIDs, EMBRAPIIs, INCTs e NAPs, de acordo com as áreas de competência e serviços realizados."
        url="http://uspmulti.prp.usp.br/"
        forms-call="Confira centrais multiusuários"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ active: '#308C89', base: '#005C59' }"
      @select="filters = $event"
    />

    <DisplayData :items="displayItems" group-name="P&D&I">
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <p class="body-2 font-italic">{{ item.category }}</p>
        <p class="body-2">{{ item.unity }}</p>
        <p class="body-2">{{ item.campus }}</p>
      </template>
      <template #content="{ item }">
        {{ item.description.long }}
        <p
          v-if="item.category == 'NAP'"
          class="font-italic"
        >Os dados do NAP foram obtidos do sistema Atena-USP</p>
      </template>
      <template #actions="{ item }">
        <v-btn class="white--text" target="_blank" :href="item.url" color="#005C59">Saiba Mais</v-btn>
      </template>
    </DisplayData>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    search: {
      term: "",
      pdis: undefined,
    },

    tabs: [
      {
        name: "CEPID",
        description:
          "São Centros de Pesquisa, Inovação e Difusão, apoiados pela FAPESP que atuam com o desenvolvimento de pesquisa básica ou aplicada, com impacto comercial e social relevante. ",
      },
      {
        name: "EMBRAPII",
        description:
          "A Associação Brasileira de Pesquisa e Inovação Industrial apoia instituições de pesquisa técnológica para que execultem projetos de desenvolvimento e inovação em cooperação com empresas do setor industrial.",
      },
      {
        name: "INCT",
        description:
          "Os Institutos Nacionais de Ciência e Técnologia são laboratórios orientados a estimular o desenvolvimento de pesquisa científica e tecnológica para promover a inovação e o espírito empreendedor.",
      },
      {
        name: "NAP",
        description:
          "São os Núcleos de Apoio à Pesquisa, órgãos de integração da USP que promovem a reunião entre especialistas de uma ou mais Unidades USP em torno de programas de pesquisas de caráter interdisciplinar e/ou de apoio instrumental à pesquisa.",
      },
      {
        name: "Serviços Tecnológicos",
        description: "",
      },
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
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.pdis = undefined;
        return;
      }

      this.search.pdis = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.searchKeys)
      );
    },
    filterData(context) {
      if (context.primary.length > 0) {
        this.filtered = this.pdis.filter((pdi) => pdi.matchesFilter(context));
      } else {
        this.filtered = undefined;
      }
    },
    async pipeline() {
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
  },
};
</script>

<style scoped></style>
