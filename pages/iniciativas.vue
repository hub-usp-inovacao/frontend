<template>
  <div>
    <div class="background">
      <Panel
        title="Iniciativas"
        description="A USP mantém diversas iniciativas e programas para facilitar e estimular a inovação e o empreendedorismo, fazendo a ponte entre o ambiente acadêmico, as organizações e a sociedade. Clique nos links para conhecer os tipos de inicativas e acessar as formas de contatar cada uma delas."
        @input="search = $event"
      />

      <CardButton :tabs="tabs" color="#222c63" active="#111633" @tab="updateTab($event)" />
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="filtered_entries">
        <template #content="{ item }">
          <p class="body-2">{{ item.unity }}</p>
          <p class="body-2 mb-4">{{ item.local }}</p>
          <p>{{ item.description.long }}</p>
        </template>
        <template #buttons="{ item }">
          <v-btn :href="item.url" color="#222c63" class="white--text" target="_blank">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="filtered_entries" />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Background from "../components/Background.vue";
import CardButton from "../components/CardButton.vue";
import ListAndDetails from "../components/ListAndDetails.vue";
import SelectAndCard from "../components/SelectAndCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Panel,
    Background,
    CardButton,
    ListAndDetails,
    SelectAndCard
  },
  data: () => ({
    search: "",
    loading_search: false,

    current_tab: 0,

    searched_iniciatives: undefined,
    tabs: [
      {
        name: "Agentes Institucionais",
        description:
          "Órgãos institucionais da USP que atuam no fomento e estímulo ao empreendedorismo."
      },
      {
        name: "Entidades Estudantis",
        description:
          "Organizações estudantis que estimulam o empreendedorismo na comunidade de alunos e também que propiciam experiências empreendedoras."
      },
      {
        name: "Espaços de Coworking",
        description:
          "Espaços da USP que recebem e interagem com projetos de inovação e empreendedorismo."
      },
      {
        name: "Ideação e Viabilidade",
        description:
          "Programas que atuam nas fases iniciais do desenvolvimento de projetos e de startups."
      },
      {
        name: "Incubadoras e Parques Tecnológicos",
        description:
          "Os chamados “Habitats” de inovação da Universidade, espaços que abrigam empresas nascentes de bases técnológicas oriundas ou não da USP."
      }
    ]
  }),
  computed: {
    ...mapGetters({
      iniciatives: "iniciativas/iniciatives",
      dataStatus: "iniciativas/dataStatus"
    }),
    filtered_entries() {
      const currentCategory = this.tabs[this.current_tab].name;

      const base =
        this.searched_iniciatives !== undefined
          ? this.searched_iniciatives
          : this.iniciatives;

      return base.filter(ini => ini.category == currentCategory);
    }
  },
  methods: {
    ...mapActions({
      fetchSpreadsheets: "iniciativas/fetchSpreadsheets"
    }),
    updateTab(t) {
      this.current_tab = t;
    },
    async fuzzySearch() {
      if (!this.search.trim()) {
        this.searched_iniciatives = undefined;
        return;
      }
      this.loading_search = true;

      var options = {
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          "name",
          "category",
          "description.long",
          "keywords",
          "services",
          "local",
          "unity"
        ]
      };

      this.$search(this.search.trim(), this.iniciatives, options)
        .then(results => {
          this.searched_iniciatives = results.length > 0 ? results : undefined;
        })
        .finally((this.loading_search = false));
    }
  },
  watch: {
    search: debounce(async function() {
      await this.fuzzySearch();
    }, 500),
    current_tab: debounce(async function() {
      await this.fuzzySearch();
    }, 500)
  },
  beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.iniciatives.length == 0) {
      this.fetchSpreadsheets(env);
    }
  }
};
</script>

