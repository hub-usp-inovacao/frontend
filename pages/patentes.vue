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
              <p class="white--text subtitle-1 font-weight-medium text-center mb-0">{{item.name}}</p>
            </v-row>
          </v-container>
        </template>
      </CardButton>
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="filtered_entries">
        <template #content="{ item }">
          <p>{{ item.classification.primary.cip }}</p>
          <p>{{ item.classification.primary.subareas }}</p>
          <p v-if="item.ipcs.length > 0 && item.ipcs[0] != ''">
            <span class="font-weight-bold">IPCs:</span>
            {{ item.ipcs.join(', ') }}
          </p>
          <p>
            <span class="font-weight-bold">Titulares:</span>
            {{ item.owners.join(', ') }}
          </p>
          <p>
            <span class="font-weight-bold">Inventores:</span>
            {{ item.inventors.join('; ') }}
          </p>
          <p>
            <span class="font-weight-bold">Países com proteção:</span>
            {{ item.countriesWithProtection.join(', ') }}
          </p>
          <p>{{ item.sumary }}</p>
        </template>

        <template #buttons="{ item }">
          <v-btn color="#64318A" :href="item.url" class="white--text">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
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
    ...mapActions({
      fetchSpreadsheets: "patentes/fetchSpreadsheets"
    }),
    updateTab(t) {
      this.current_tab = t;
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
    ...mapGetters({
      dataStatus: "patentes/dataStatus",
      patents: "patentes/patents"
    }),
    filtered_entries: function() {
      return this.patents;
    }
  },
  beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.patents.length == 0)
      this.fetchSpreadsheets(env);
  }
};
</script>