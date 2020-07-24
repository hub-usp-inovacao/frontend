<template>
  <div>
    <div class="background">
      <Panel
        title="Iniciativas"
        description="A USP mantém diversas iniciativas e programas para facilitar e estimular a inovação e o empreendedorismo, fazendo a ponte entre o ambiente acadêmico, as organizações e a sociedade. Clique nos links para conhecer os tipos de inicativas e acessar as formas de contatar cada uma delas."
        v-model="search.term"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ base: '#222c63', active: '#525c93' }"
      @select="filterData($event)"
    />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="display_entries">
        <template #content="{ item }">
          <p class="body-2">{{ item.unity }}</p>
          <p class="body-2 mb-4">{{ item.local }}</p>
          <p v-for="phone in item.contact.info" :key="phone" class="body-2 mb-4">{{ phone }}</p>
          <p>{{ item.description.long }}</p>
        </template>
        <template #buttons="{ item }">
          <v-btn :href="item.url" color="#222c63" class="white--text" target="_blank">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="display_entries">
        <template #item="{ item }">
          <v-container>
            <p class="title">{{item.name}}</p>
            <p class="body-2">{{ item.unity }}</p>
            <p class="body-2 mb-4">{{ item.local }}</p>
            <p
              v-for="phone in item.contact.info"
              :key="phone"
              class="body-2 mb-4"
            >{{ item.contact.info }}</p>
            <p>{{ item.description.long }}</p>
          </v-container>

          <v-card-actions>
            <v-spacer />
            <v-btn depressed dark color="#222c63" :href="item.url">Saiba Mais</v-btn>
            <v-spacer />
          </v-card-actions>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import { mapActions, mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib";

import Background from "@/components/first_level/Background.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import ListAndDetails from "@/components/first_level/ListAndDetails.vue";
import SelectAndCard from "@/components/first_level/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    ListAndDetails,
    SelectAndCard,
    MultipleFilters,
  },
  data: () => ({
    tabs: [
      {
        name: "Agente Institucional",
        description:
          "Órgãos institucionais da USP que atuam no fomento e estímulo ao empreendedorismo.",
      },
      {
        name: "Entidades Estudantis",
        description:
          "Organizações estudantis que estimulam o empreendedorismo na comunidade de alunos e também que propiciam experiências empreendedoras.",
      },
      {
        name: "Espaços e Coworking",
        description:
          "Espaços da USP que recebem e interagem com projetos de inovação e empreendedorismo.",
      },
      {
        name: "Ideação e Viabilidade",
        description:
          "Programas que atuam nas fases iniciais do desenvolvimento de projetos e de startups.",
      },
      {
        name: "Incubadoras e Parques Tecnológicos",
        description:
          "Os chamados “Habitats” de inovação da Universidade, espaços que abrigam empresas nascentes de bases técnológicas oriundas ou não da USP.",
      },
    ],

    search: {
      term: "",
      iniciatives: undefined,
      keys: [
        "name",
        "description.short",
        "description.long",
        "keywords",
        "services",
      ],
    },

    filtered: undefined,
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "iniciativas/fetchSpreadsheets",
    }),
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.iniciatives = undefined;
        return;
      }

      const results = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.search.keys)
      );
      this.search.iniciatives = results.length > 0 ? results : undefined;
    },
    filterFun(elm, filterStatus) {
      const { primary } = filterStatus;

      if (primary.length == 0) {
        return true;
      }

      return primary.includes(elm.category);
    },
    filterData(context) {
      this.filtered = this.iniciatives.filter((item) =>
        this.filterFun(item, context)
      );
    },
  },
  watch: {
    searchTerm: debounce(async function () {
      await this.fuzzySearch();
    }, 250),
  },
  computed: {
    ...mapGetters({
      iniciatives: "iniciativas/iniciatives",
      dataStatus: "iniciativas/dataStatus",
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
};
</script>

