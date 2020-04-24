<template>
  <div>
    <div class="background">
      <Panel
        title="Educação"
        description="A USP oferece a seus estudantes diversas disciplinas em nível de graduação e pós-graduação que se relacionam aos temas de Empreendedorismo e Inovação. Ao fazer uma busca, você encontrará as unidades, as condições de oferecimento e códigos e links para acesso às ementas no sistema institucional da Universidade, o Júpiter."
        url="https://forms.gle/tAuVq5oAYiGo52u46"
        @input="search = $event"
      />

      <CardButton :tabs="tabs" color="#db8337" active="#bf6213" @tab="updateTab($event)" />

      <v-container>
        <v-row class="ma-0">
          <v-col>
            <p class="font-weight-medium">Filtros:</p>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col cols="6" sm="4" md="3">
            <Select :items="campi_list" label="Campi" />
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <Select :items="categories" label="Categoria" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndCard :items="entries">
        <template #li="{item}">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <template #item="{item}">
          <v-card-title px-6>
            <p class="title">{{item.name}}</p>
          </v-card-title>

          <v-card-text px-6>
            <p class="body-2 font-italic mb-0">{{item.category}}</p>

            <p class="body-2 mb-10">{{item.campus}} - {{item.unity}}</p>

            <p class="body-1">{{item.description.long}}</p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn depressed dark color="primary" :href="item.url">Saiba mais</v-btn>
          </v-card-actions>
        </template>
      </ListAndCard>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="entries">
        <template #item="{item}">
          <v-container px-6>
            <p class="title">{{item.name}}</p>
            <p class="body-2 font-italic my-2">{{item.category}}</p>
            <p class="body-2">{{item.campus}} - {{item.unity}}</p>
          </v-container>

          <v-container px-6>
            <p class="body-1">{{item.description.long}}</p>
          </v-container>

          <v-card-actions>
            <v-spacer />
            <v-btn depressed dark color="rgb(255, 167, 38)" :href="item.url">Saiba mais</v-btn>
            <v-spacer />
          </v-card-actions>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Background from "../components/Background.vue";
import Select from "../components/Select.vue";
import CardButton from "../components/CardButton.vue";
import ListAndCard from "../components/ListAndCard.vue";
import SelectAndCard from "../components/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    Select,
    CardButton,
    ListAndCard,
    SelectAndCard
  },
  data: () => ({
    search: "",
    current_tab: 0,

    selected_campus: [],
    selected_unity: [],
    campi_list: [],
    unity_list: [],
    categories: ["Graduacão", "Pós-Graduação"],

    sheet_name: "DISCIPLINAS",
    sheet_id: "1VZR_UAGJGD-hkc_ukuKLEsxaNpP2rNQ-OpnN59zwsIY",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    entries: [],
    tabs: [
      {
        name: "Inovação",
        description: "Cursos e disciplinas relacionados à área de Inovação.",
        entries: []
      },
      {
        name: "Empreendedorismo",
        description:
          "Cursos e disciplinas relacionados à área de Empreendedorismo.",
        entries: []
      },
      {
        name: "Propriedade Intelectual",
        description:
          "Cursos e disciplinas relacionados à área de Propriedade Intelectual.",
        entries: []
      },
      {
        name: "Negócios",
        description: "Cursos e disciplinas relacionados à área de Negócios.",
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
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/'${this.sheet_name}'?key=${this.api_key}`
      )
        .then(request => request.json())
        .then(data => {
          data.values.slice(1).forEach(row => {
            let di = {
              name: row[0],
              description: {
                short: row[3],
                long: row[8]
              },
              campus: row[4],
              unity: row[5],
              category: row[6],
              url: row[7],
              area: row[9],
              start_date: row[10]
            };

            let tab = this.tabs.find(
              tab => tab.name.localeCompare(di.category) == 0
            );

            if (tab) {
              campi.add(di.campus);
              unity.add(di.unity);
              tab.entries.push(di);
            }
          });
        })
        .finally(() => (this.loading_data = false));

      this.campi_list = Array.from(campi).sort(this.compare_string);
      this.unity_list = Array.from(unity).sort(this.compare_string);
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
    current_tab: async function() {
      await this.fuzzySearch();
    }
  },
  computed: {
    filtered_entries: function() {
      if (!this.selected_campus.length && !this.selected_unity.length)
        return this.entries;

      let filtered = [];
      this.entries.forEach(item => {
        if (
          (!this.selected_campus.length ||
            this.selected_campus.includes(item.campus)) &&
          (!this.selected_unity.length ||
            this.selected_unity.includes(item.unity))
        )
          filtered.push(item);
      });

      return filtered;
    }
  },
  beforeMount() {
    // this.sheetQuery();
  }
};
</script>

<style scoped>
.left-border {
  border-radius: 5px 0 0 5px;
}
.right-border {
  border-radius: 0 5px 5px 0;
}
</style>
