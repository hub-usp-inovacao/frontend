<template>
  <div>
    <div class="background">
      <Panel
        title="P&amp;D&amp;I"
        description="Na seção de Pesquisa &amp; Desenvolvimento &amp; Inovação, você encontra laboratórios, organizações e programas que atuam com desenvolvimento e inovação no âmbito da USP. Aqui, você pode consultar informações e contatos de CEPIDs, EMBRAPIIs, INCTs e NAPs, de acordo com as áreas de competência e serviços realizados."
        url="https://forms.gle/3z4Vn3ewgP6UKJey6"
        :loading="loading_search"
        @input="search = $event"
      />

      <CardButton :tabs="tabs" color="#005C59" active="#003836" @tab="updateTab($event)" />
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndCard :items="entries">
        <template #item="{item}">
          <v-card-title px-6>
            <p class="title">{{item.name}}</p>
          </v-card-title>

          <v-card-text px-6>
            <p class="body-2 font-italic mb-0">{{item.knownledge.toString()}}</p>

            <p class="body-2 mb-10">{{item.campus}} - {{item.unity}}</p>

            <p class="body-2">{{item.description.long}}</p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn depressed dark color="tertiary" :href="item.url">Saiba mais</v-btn>
          </v-card-actions>
        </template>
      </ListAndCard>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="entries" />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "@/components/Panel.vue";
import Select from "@/components/Select.vue";
import Background from "@/components/Background.vue";
import CardButton from "@/components/CardButton.vue";
import ListAndCard from "@/components/ListAndCard.vue";
import SelectAndCard from "@/components/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Select,
    Background,
    CardButton,
    ListAndCard,
    SelectAndCard
  },
  data: () => ({
    search: "",
    unity_list: [],
    loading_data: true,
    loading_search: false,

    current_tab: 0,

    sheet_name: "D&I",
    sheet_id: process.env.sheetID,
    api_key: process.env.sheetsAPIKey,

    entries: [],
    tabs: [
      {
        name: "CEPIDS",
        description:
          "São Centros de Pesquisa, Inovação e Difusão, apoiados pela FAPESP que atuam com o desenvolvimento de pesquisa básica ou aplicada, com impacto comercial e social relevante. ",
        entries: []
      },
      {
        name: "EMBRAPII",
        description:
          "A Associação Brasileira de Pesquisa e Inovação Industrial apoia instituições de pesquisa técnológica para que execultem projetos de desenvolvimento e inovação em cooperação com empresas do setor industrial.",
        entries: []
      },
      {
        name: "INCTs",
        description:
          "Os Institutos Nacionais de Ciência e Técnologia são laboratórios orientados a estimular o desenvolvimento de pesquisa científica e tecnológica para promover a inovação e o espírito empreendedor.",
        entries: []
      },
      {
        name: "NAP",
        description:
          "São os Núcleos de Apoio à Pesquisa, órgãos de integração da USP que promovem a reunião entre especialistas de uma ou mais Unidades USP em torno de programas de pesquisas de caráter interdisciplinar e/ou de apoio instrumental à pesquisa.",
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

            if (tab) tab.entries.push(di);
          });
        })
        .finally(() => (this.loading_data = false));

      this.entries = this.tabs[0].entries;
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
      return (
        (this.selected_campus.length == 0 ||
          this.selected_campus.includes(item.campus)) &&
        (this.selected_unity.length == 0 ||
          this.selected_unity.includes(item.unity)) &&
        (this.selected_known.length == 0 ||
          this.selected_known.filter(known => item.knownledge.includes(known))
            .length)
      );
    },
    compare_string(a, b) {
      return a.localeCompare(b);
    }
  },
  watch: {
    search: debounce(async function() {
      await this.fuzzySearch();
    }, 500),
    current_tab: async function() {
      await this.fuzzySearch();
    }
  },
  computed: {
    filtered_entries: function() {
      if (
        !this.selected_campus.length &&
        !this.selected_unity.length &&
        !this.selected_known.length
      )
        return this.entries;

      let filtered = this.entries.filter(item => this.filter_data(item));

      return filtered;
    }
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>

<style scoped>
</style>