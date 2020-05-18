<template>
  <div>
    <div class="background">
      <Panel
        title="Iniciativas"
        description="A USP mantém diversas iniciativas e programas para facilitar e estimular a inovação e o empreendedorismo, fazendo a ponte entre o ambiente acadêmico, as organizações e a sociedade. Clique nos links para conhecer os tipos de inicativas e acessar as formas de contatar cada uma delas."
      />

      <CardButton :tabs="tabs" color="#222c63" active="#111633" @tab="updateTab($event)" />
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
    loading_search: false,

    current_tab: -1,

    sheet_name: "INICIATIVAS",
    sheet_id: process.env.sheetID,
    api_key: process.env.sheetsAPIKey,

    entries: [],
    search_entries: [],
    tabs: [
      {
        name: "Agentes Institucionais",
        description:
          "Órgãos institucionais da USP que atuam no fomento e estímulo ao empreendedorismo.",
        entries: []
      },
      {
        name: "Entidades Estudantis",
        description:
          "Organizações estudantis que estimulam o empreendedorismo na comunidade de alunos e também que propiciam experiências empreendedoras.",
        entries: []
      },
      {
        name: "Espaços de Coworking",
        description:
          "Espaços da USP que recebem e interagem com projetos de inovação e empreendedorismo.",
        entries: []
      },
      {
        name: "Ideação e Viabilidade",
        description:
          "Programas que atuam nas fases iniciais do desenvolvimento de projetos e de startups.",
        entries: []
      },
      {
        name: "Incubadoras e Parques Técnológicos",
        description:
          "Os chamados “Habitats” de inovação da Universidade, espaços que abrigam empresas nascentes de bases técnológicas oriundas ou não da USP.",
        entries: []
      }
    ]
  }),
  methods: {
    updateTab(t) {
      this.current_tab = t;
    },
    async sheetQuery() {
      this.loading_data = true;
      let campi = new Set();
      let unity = new Set();
      let known = new Set();

      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/'${this.sheet_name}'?key=${this.api_key}`
      )
        .then(request => request.json())
        .then(data => {
          data.values.slice(1).forEach(row => {
            // console.log(row);
            let di = {
              category: row[0],
              name: row[1],
              campus: row[2],
              unity: row[3],
              url: row[5],
              description: {
                short: row[9],
                long: row[8]
              },
              knownledge: row[11].split(/,/),
              key_words: row[13]
            };

            let tab = this.tabs.find(
              tab => tab.name.localeCompare(di.category) == 0
            );

            if (tab) {
              campi.add(di.campus);
              unity.add(di.unity);
              di.knownledge.forEach(item => {
                if (item) known.add(item);
              });
              tab.entries.push(di);
            }
          });
        })
        .finally(() => (this.loading_data = false));

      this.campi_list = Array.from(campi).sort(this.compare_string);
      this.unity_list = Array.from(unity).sort(this.compare_string);
      this.known_list = Array.from(known).sort(this.compare_string);
      this.entries = this.tabs[0].entries;

      // console.log(this.entries);
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
        keys: ["name", "campus", "description.long", "unity"]
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
    filter_data(item) {
      if (
        (!this.selected_campus.length ||
          this.selected_campus.includes(item.campus)) &&
        (!this.selected_unity.length ||
          this.selected_unity.includes(item.unity)) &&
        (!this.selected_known.length ||
          this.selected_known.filter(known => item.knownledge.includes(known))
            .length)
      )
        return true;
      return false;
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
  beforeMount() {}
};
</script>

