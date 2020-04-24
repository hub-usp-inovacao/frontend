<template>
  <div style="min-height: 100vh;">
    <div class="background">
      <Panel
        title="Competências"
        description="Nesta seção, você pode consultar quais as competências dos pesquisadores da USP, quem são e como contatá-los. O Portal Solus utiliza como parâmetro de divisão de competências a Tabela das Áreas do Conhecimento apresentada pelo CNPq, e divide-as em dois níveis principais correspondentes, respectivamente, à área do conhecimento (ex.: Ciências Exatas e da Terra) e sua sub-área (ex.: Matemática)."
        url="https://forms.gle/dDooKL5G2sApfjqb6"
        :loading="loading_search"
        @input="search = $event"
      />

      <!-- Seleção de Área -->

      <CardButton :tabs="tabs" color="#6b1c28" active="#6a0515" @tab="updateTab($event)">
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

    <!-- Seleção de Subárea e Filtro -->
    <div>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-card>
              <v-card-title class="title font-weight-bold mb-0">Subáreas: </v-card-title>
              <v-list>
                <v-list-item v-for="(subarea,i) in tabs[current_tab].subareas" :key="i">
                  <v-checkbox v-model="selected_subareas" :label="subarea.name" :value="subarea.name"></v-checkbox>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <!-- Filtro -->
          <v-col cols="3">
            <v-card>
              <v-card-title class="title font-weight-bold mb-0">Subáreas: </v-card-title>
              <v-select
                rounded
                v-model="selected_filter"
                :items="filters">
              </v-select>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Select from "../components/Select.vue";
import Background from "../components/Background.vue";
import CardButton from "../components/CardButton.vue";

export default {
  components: {
    Panel,
    Select,
    Background,
    CardButton
  },
  data: () => ({
    search: "",
    unity_list: [],
    loading_data: true,
    loading_search: false,

    item_index: -1,
    current_tab: 0,
    selected_subareas: [],
    filters: [
      {
        text: "Docentes",
        value: 0,
      },
      {
        text: "Outro",
        value: 1,
      },
    ],
    selected_filter: 0,

    selected_campus: [],
    selected_unity: [],
    selected_association: [],
    selected_known: [],

    campi_list: [],
    unity_list: [],
    association_list: [],
    known_list: [],

    sheet_name: "RESPOSTAS",
    sheet_id: "18l8qAjZuJU6jMqoY8ohYc4FsaIoNqg_GjCa5htYPBm8",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    entries: [],
    search_entries: [],
    loading_search: false,
    tabs: [
      {
        name: "Ciências Exatas e da Terra",
        description: "",
        subareas: [
          {
            name: "Matemática",
          },
          {
            name: "Probabilidade e Estatística",
          },
          {
            name: "Ciência da Computação",
          },
        ]
      },
      {
        name: "Ciências Biológicas",
        description: "",
        subareas: []
      },
      {
        name: "Engenharias",
        description: "",
        subareas: []
      },
      {
        name: "Ciências da Saúde",
        description: "",
        subareas: []
      },
      {
        name: "Ciências Agrárias",
        description: "",
        subareas: []
      },
      {
        name: "Ciências Sociais Aplicadas",
        description: "",
        subareas: []
      },
      {
        name: "Ciências Humanas",
        description: "",
        subareas: []
      },
      {
        name: "Linguística, Letras e Artes",
        description: "",
        subareas: []
      },
      {
        name: "Outros",
        description: "",
        subareas: []
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
      let association = new Set();
      let known = new Set();

      let regex_url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/'${this.sheet_name}'?key=${this.api_key}`
      )
        .then(request => request.json())
        .then(data => {
          data.values.slice(1).forEach(row => {
            let di = {
              association: row[1],
              name: row[2],
              email: row[3],
              unity: row[5],
              campus: row[6],
              role: row[7],
              category: row[8],
              group_name: row[9],
              group_initials: row[10],
              description: row[11],
              url: row[12].match(regex_url),
              skills: row[13],
              services: row[14].split(/[\s\n]*[;][\s\n]*/),
              equipment: row[15].split(/[\s\n]*[;][\s\n]*/),
              knownledge: row[16].split(/,/),
              key_words: row[17].split(/[\s\n]*[;][\s\n]*/)
            };
            if (di.campus) campi.add(di.campus);
            if (di.unity) unity.add(di.unity);
            if (di.association) association.add(di.association);
            di.knownledge.forEach(item => known.add(item));
            this.entries.push(di);
          });
        })
        .finally(() => (this.loading_data = false));

      this.campi_list = Array.from(campi).sort(this.compare_string);
      this.unity_list = Array.from(unity).sort(this.compare_string);
      this.association_list = Array.from(association).sort(this.compare_string);
      this.known_list = Array.from(known).sort(this.compare_string);
      this.search_entries = this.entries;
    },
    async fuzzySearch() {
      if (!this.search.trim()) {
        this.search_entries = this.entries;
        return;
      }
      this.loading_search = true;
      this.item_index = -1;

      var options = {
        tokenize: true,
        shouldSort: false,
        matchAllTokens: true,
        threshold: 0.2,
        location: 0,
        distance: 200,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          "description",
          "knownledge",
          "skills",
          "group_name",
          "unity",
          "campus",
          "key_words",
          "equipment",
          "services"
        ]
      };

      await this.$search(this.search.trim(), this.entries, options)
        .then(results => {
          this.search_entries = results;
        })
        .finally((this.loading_search = false));
    },
    filter_data(item) {
      if (
        (!this.selected_campus.length ||
          this.selected_campus.includes(item.campus)) &&
        (!this.selected_unity.length ||
          this.selected_unity.includes(item.unity)) &&
        (!this.selected_association.length ||
          this.selected_association.includes(item.association)) &&
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
    selected_campus: function() {
      this.item_index = -1;
    },
    selected_unity: function() {
      this.item_index = -1;
    },
    selected_association: function() {
      this.item_index = -1;
    },
    selected_known: function() {
      this.item_index = -1;
    }
  },
  computed: {
    current_item: function() {
      if (this.item_index < 0) return null;
      return this.filtered_entries[this.item_index];
    },
    filtered_entries() {
      if (
        !this.selected_campus.length &&
        !this.selected_unity.length &&
        !this.selected_association.length &&
        !this.selected_known.length
      )
        return this.search_entries;

      let filtered = this.search_entries.filter(item => this.filter_data(item));

      return filtered;
    }
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>

<style scoped>
.absolute {
  position: absolute;
}
.left-border {
  border-radius: 5px 0 0 5px;
}
.right-border {
  border-radius: 0 5px 5px 0;
}
</style>
