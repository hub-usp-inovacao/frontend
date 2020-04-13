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

      <!-- Seleção e Filtro -->

      <CardButton :tabs="tabs" color="#6b1c28" active="#6a0515" @tab="updateTab($event)" />
    </div>

    <!-- Lista e Card de Exibição -->

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <v-row justify="center" class="ma-0">
        <v-col cols="5">
          <v-card height="35rem" :loading="loading_data">
            <div v-if="search_entries.length > 0" class="fill-height">
              <v-list rounded style="max-height: 100%; overflow-y: auto;">
                <v-list-item-group>
                  <v-list-item
                    v-for="(item,i) in filtered_entries"
                    :key="item.email"
                    @click="item_index = i"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="font-weight-light">{{ item.name }}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{item.knownledge.toString()}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>

            <div v-else class="fill-height">
              <v-row class="fill-height ma-0" justify="center" align="center">
                <p v-if="loading_data" class="title font-weight-light text-center">Carregando itens</p>
                <p
                  v-else
                  class="title font-weight-light text-center"
                >Não encontramos nada relacionado a sua pesquisa</p>
              </v-row>
            </div>
          </v-card>
        </v-col>

        <v-col cols="5">
          <v-card height="35rem">
            <div v-if="item_index >= 0" class="fill-height" style="overflow-y: auto;">
              <v-container px-6>
                <p class="title">{{current_item.name}}</p>
                <p class="body-2 font-italic font-weight-light my-2">{{current_item.association}}</p>
                <p class="body-2 my-0">{{current_item.campus}}</p>
                <p class="body-2 font-weight-light my-0">{{current_item.unity}}</p>
              </v-container>

              <v-container px-6 py-0>
                <p class="body-2">
                  Contato:&#160;
                  <span class="font-weight-light">{{current_item.email}}</span>
                </p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">
                  {{current_item.role}}
                  <span class="font-weight-regular">em</span>
                  {{current_item.group_initials}}
                </p>
                <p class="body-2">{{current_item.group_name}}</p>
                <p class="body-2 font-weight-light my-0">{{current_item.description}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">Competências:</p>
                <p class="body-2 font-weight-light my-0">{{current_item.skills}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">Serviços:</p>

                <p
                  v-for="item in current_item.services"
                  :key="item"
                  class="body-2 font-weight-light my-0"
                >
                  <span v-if="item">&bull;</span>
                  {{item}}
                </p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">Equipamentos:</p>

                <p
                  v-for="item in current_item.equipment"
                  :key="item"
                  class="body-2 font-weight-light my-0"
                >
                  <span v-if="item">&bull;</span>
                  {{item}}
                </p>
              </v-container>

              <v-card-actions v-if="current_item.url">
                <v-spacer />
                <v-btn depressed dark color="primary" :href="current_item.url[0]">Saiba mais</v-btn>
                <v-spacer />
              </v-card-actions>
            </div>

            <div v-else class="fill-height">
              <v-row class="fill-height ma-0" justify="center" align="center">
                <p class="title font-weight-light text-center">Selecione um Item na lista ao lado</p>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="hidden-md-and-up">
      <v-row justify="center" class="ma-0">
        <v-col cols="11" sm="10">
          <v-card :loading="loading_data">
            <v-container>
              <v-select
                flat
                rounded
                filled
                hide-details
                v-model="item_index"
                menu-props="auto"
                color="#37474F"
                :items="filtered_entries.map((item,i) => ({content: item, index: i}))"
                item-value="index"
                no-data-text="Não encontramos nada"
                :label="loading_data? 'Carregando itens': 'Escolha um pesquisador'"
              >
                <template v-slot:selection="{ item }">
                  <span class="text-truncate">{{ item.content.name }}</span>
                </template>
                <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.content.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.content.knownledge.toString()"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-select>
            </v-container>

            <div v-if="item_index >= 0">
              <v-container px-6>
                <p class="title">{{current_item.name}}</p>
                <p class="body-2 font-italic font-weight-light my-2">{{current_item.association}}</p>
                <p class="body-2 my-0">{{current_item.campus}}</p>
                <p class="body-2 font-weight-light my-0">{{current_item.unity}}</p>
              </v-container>

              <v-container px-6 py-0>
                <p class="body-2">
                  Contato:&#160;
                  <span class="font-weight-light">{{current_item.email}}</span>
                </p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">
                  {{current_item.role}}
                  <span class="font-weight-regular">em</span>
                  {{current_item.group_initials}}
                </p>
                <p class="body-2">{{current_item.group_name}}</p>
                <p class="body-2 font-weight-light my-0">{{current_item.description}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">Competências:</p>
                <p class="body-2 font-weight-light my-0">{{current_item.skills}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">Serviços:</p>

                <p
                  v-for="item in current_item.services"
                  :key="item"
                  class="body-2 font-weight-light my-0"
                >
                  <span v-if="item">&bull;</span>
                  {{item}}
                </p>
              </v-container>

              <v-container px-6>
                <p class="body-1 font-weight-medium my-0">Equipamentos:</p>

                <p
                  v-for="item in current_item.equipment"
                  :key="item"
                  class="body-2 font-weight-light my-0"
                >
                  <span v-if="item">&bull;</span>
                  {{item}}
                </p>
              </v-container>

              <v-card-actions v-if="current_item.url">
                <v-spacer />
                <v-btn depressed dark color="primary" :href="current_item.url[0]">Saiba mais</v-btn>
                <v-spacer />
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
    CardButton,
  },
  data: () => ({
    search: "",
    unity_list: [],
    loading_data: true,
    loading_search: false,

    item_index: -1,
    current_tab: -1,

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
      },
      {
        name: "Ciências Biológicas",
        description: "",
      },
      {
        name: "Engenharias",
        description: "",
      },
      {
        name: "Ciências da Saúde",
        description: "",
      },
      {
        name: "Ciências Agrárias",
        description: "",
      },
      {
        name: "Ciências Sociais Aplicadas",
        description: "",
      },
      {
        name: "Ciências Humanas",
        description: "",
      },
      {
        name: "Linguística, Letras e Artes",
        description: "",
      },
      {
        name: "Outros",
        description: "",
      },
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
