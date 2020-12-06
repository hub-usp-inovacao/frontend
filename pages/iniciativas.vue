<template>
  <div>
    <div class="background">
      <Panel
        v-model="search.term"
        title="Iniciativas"
        description="A USP mantém diversas iniciativas e programas para facilitar e estimular a inovação e o empreendedorismo, fazendo a ponte entre o ambiente acadêmico, as organizações e a sociedade. Clique nos links para conhecer os tipos de inicativas e acessar as formas de contatar cada uma delas."
        url="http://www.inovacao.usp.br/editais/"
        forms-call="Confira os Editais"
        second-url="http://www.inovacao.usp.br/programas/"
        second-call="confira os Programas"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ base: '#222c63', active: '#525c93' }"
      :groups="groups"
      @select="filters = $event"
    />

    <DisplayData
      :items="display_entries"
      group-name="Iniciativas"
      :selected="globalSearchSelected"
      :has-image="false"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <p class="body-2">{{ item.unity }}</p>
        <p class="body-2 mb-4">{{ item.local }}</p>
        <v-row>
          <v-col v-if="item.email">
            <p class="body-2 mb-4 mr-8">{{ item.email }}</p>
          </v-col>
          <v-col>
            <p
              v-for="phone in item.contact.info"
              :key="phone"
              class="body-2 mb-4"
            >
              {{ phone }}
            </p>
          </v-col>
        </v-row>
      </template>
      <template #content="{ item }">{{ item.description.long }}</template>
      <template #actions="{ item }">
        <v-btn
          :href="item.url"
          :disabled="!item.url"
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
    tabs: [
      {
        name: "Agente Institucional",
        description:
          "Conjunto de agentes designados na estrutura da USP para atender a comunidade interna e externa em temas relacionados à pesquisa, inovação, empreendedorismo e internacionalização.",
      },
      {
        name: "Empresa Jr.",
        description:
          "Associações formadas pelos alunos da USP, de caráter empreendedor e sem fins lucrativos, que prestam diferentes tipos de serviços visando a capacitação profissional dos estudantes em suas respectivas carreiras.",
      },
      {
        name: "Entidade Associada",
        description: "Entidade Associada",
      },
      {
        name: "Entidade Estudantil",
        description:
          "Organizações formais de estudantes que incentivam a realização de projetos de inovação e empreendedorismo em diversas áreas de P&D&I.",
      },
      {
        name: "Espaço/Coworking",
        description:
          "Ambientes físicos e on-line destinados à troca de experiências relacionadas à inovação, empreendedorismo, desenvolvimento tecnológico e de novos negócios.",
      },
      {
        name: "Grupos e Iniciativas Estudantis",
        description:
          "Iniciativas organizadas por estudantes para incentivar a realização de projetos de inovação e empreendedorismo nas mais diversas áreas de P&D&I.",
      },
      {
        name: "Ideação",
        description:
          "Grupos voltados à discussão e incentivo ao desenvolvimento de negócios e inovações originários de diferentes áreas do conhecimento.",
      },
      {
        name: "Incubadora e Parque Tecnológico",
        description:
          "Habitats de inovação com o propósito de fornecer suporte à transformação do conhecimento em desenvolvimento econômico utilizando inovação tecnológica, social e cultural. Recebem principalmente os empreendedores vindos da USP.",
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
    groups() {
      return [
        {
          label: "Campus",
          items: allCampi.map((c) => c.name),
        },
      ];
    },
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
    const env = { sheetsAPIKey: process.env.sheetsAPIKey };

    if (this.dataStatus == "ok" && this.iniciatives.length == 0) {
      this.fetchSpreadsheets(env);
    }
  },
  methods: {
    ...mapActions({
      fetchSpreadsheets: "iniciativas/fetchSpreadsheets",
      setStrictResults: "global/setStrictResults",
      setFlexibleResults: "global/setFlexibleResults",
    }),
    async fuzzySearch() {
      this.setStrictResults();

      if (!this.search.term.trim()) {
        this.search.iniciatives = undefined;
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

      this.search.iniciatives = results;
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
