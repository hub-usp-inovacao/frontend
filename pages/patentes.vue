<template>
  <div>
    <div class="background">
      <Panel
        title="Patentes"
        description="Pesquisadores e unidades da USP desenvolvem patentes e propriedade industrial que estão disponíveis para que empresas e organizações possam licenciar para aplicação e uso. Usando palavras-chave na caixa de busca você terá acesso a breves descrições destas patentes e formas de contato para obter maior detalhamento e informações sobre cada uma delas."
      />

      <CardButton :tabs="tabs" color="#64318A" active="#2C163D" @tab="updateTab($event)">
        <template #card="{item}">
          <v-container fill-height>
            <v-row class="align-center justify-center ma-0">
              <p class="white--text subtitle-1 text-center mb-0">{{item.name}}</p>
            </v-row>
          </v-container>
        </template>
      </CardButton>
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndCard :items="entries" />
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="entries" />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Background from "../components/Background.vue";
import CardButton from "../components/CardButton.vue";
import ListAndCard from "../components/ListAndCard.vue";
import SelectAndCard from "../components/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    CardButton,
    ListAndCard,
    SelectAndCard
  },
  data: () => ({
    search: "",
    current_tab: 0,

    sheet_name: "",
    sheet_id: "",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    entries: [],
    tabs: [
      {
        name: "Agropecuária",
        description: "",
        entries: []
      },
      {
        name: "Alimentos",
        description: "",
        entries: []
      },
      {
        name: "Energia",
        description: "",
        entries: []
      },
      {
        name: "Máquinas e equipamentos",
        description: "",
        entries: []
      },
      {
        name: "Saúde e cuidados pessoais",
        description: "",
        entries: []
      },
      {
        name: "Materiais",
        description: "",
        entries: []
      },
      {
        name: "Tecnologia assistiva",
        description: "",
        entries: []
      },
      {
        name: "Tecnologia da Informação e Comunicação",
        description: "",
        entries: []
      },
      {
        name: "Tecnologias Ambientais e Sustentáveis",
        description: "",
        entries: []
      },
      {
        name: "Outros",
        description: "",
        entries: []
      }
    ]
  }),
  methods: {
    updateTab(t) {
      this.current_tab = t;
    },
    async sheetQuery() {
      return;
    },
    async fuzzySearch() {
      if (!this.search.trim()) {
        this.entries = this.tabs[this.current_tab].entries;
        return;
      }
      this.loading_search = true;
      this.item_index = -1;

      var options = {
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: ["title", "campus", "description.long", "unity"]
      };

      await this.$search(
        this.search.trim(),
        this.tabs[this.current_tab].entries,
        options
      )
        .then(results => {
          this.entries = results;
        })
        .finally((this.loading_search = false));
    },
    compare_string(a, b) {
      return a.localeCompare(b);
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
  computed: {
    filtered_entries: function() {
      return entries;
    }
  },
  beforeMount() {}
};
</script>