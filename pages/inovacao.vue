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

      <!-- Seleção e Filtro -->

      <div>
        <v-item-group mandatory>
          <v-row justify="center" class="ma-0">
            <v-col v-for="(tab,i) in tabs" :key="tab.name" cols="9" sm="3">
              <v-item>
                <v-card
                  :color="current_tab === i ? '#ECEFF1' : ''"
                  @click="current_tab = i; item_index = -1"
                  :raised="current_tab === i"
                  class="d-flex flex-column justify-space-around align-center"
                  height="100%"
                >
                  <p class="title text-center font-weight-light my-5">{{tab.name}}</p>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>

        <v-container>
          <v-row justify="center" class="ma-0">
            <v-col cols="6" sm="5" md="3">
              <Select :items="campi_list" label="Campus" @select="selected_campus = $event" />
            </v-col>

            <v-col cols="6" sm="5" md="3">
              <Select :items="unity_list" label="Unidade" @select="selected_unity = $event" />
            </v-col>

            <v-col cols="6" sm="5" md="3">
              <Select :items="known_list" label="Conhecimento" @select="selected_known = $event" />
            </v-col>

            <v-col v-show="$vuetify.breakpoint.smAndDown" cols="6" sm="5"></v-col>
          </v-row>
        </v-container>
      </div>
    </div>

    <!-- Lista e Card de Exibição -->

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <v-row justify="center" class="ma-0">
        <v-col cols="5">
          <v-card height="35rem" :loading="loading_data">
            <div v-if="filtered_entries.length > 0" class="fill-height">
              <v-list rounded style="max-height: 100%; overflow-y: auto;">
                <v-list-item-group>
                  <v-list-item
                    v-for="(item,i) in filtered_entries"
                    :key="item.title"
                    @click="item_index = i"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{item.key_words}}</v-list-item-subtitle>
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
                <p class="body-2 font-italic my-2">{{current_item.knownledge.toString()}}</p>
                <p class="body-2">{{current_item.campus}} - {{current_item.unity}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-2">{{current_item.description.long}}</p>
              </v-container>

              <v-card-actions>
                <v-spacer />
                <v-btn depressed dark color="rgb(255, 167, 38)" :href="current_item.url">Saiba mais</v-btn>
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
                :items="filtered_entries.map((item,i) => ({text: item.title, value: i}))"
                no-data-text="Não encontramos nada"
                :label="loading_data ? 'Carregando itens' : 'Escolha uma disciplina'"
              ></v-select>
            </v-container>

            <div v-if="item_index >= 0">
              <v-container px-6>
                <p class="title">{{current_item.name}}</p>
                <p class="body-2 font-italic my-2">{{current_item.category}}</p>
                <p class="body-2">{{current_item.campus}} - {{current_item.unity}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-2">{{current_item.description.long}}</p>
              </v-container>

              <v-card-actions>
                <v-spacer />
                <v-btn depressed dark color="rgb(255, 167, 38)" :href="current_item.url">Saiba mais</v-btn>
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
import Panel from "@/components/Panel.vue";
import Select from "@/components/Select.vue";
import Background from "@/components/Background.vue";

export default {
  components: {
    Panel,
    Select,
    Background
  },
  data: () => ({
    search: "",
    unity_list: [],
    loading_data: true,
    loading_search: false,

    current_tab: 0,
    item_index: -1,

    selected_campus: [],
    selected_unity: [],
    selected_known: [],

    campi_list: [],
    unity_list: [],
    known_list: [],

    sheet_name: "D&I",
    sheet_id: "1VZR_UAGJGD-hkc_ukuKLEsxaNpP2rNQ-OpnN59zwsIY",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    entries: [],
    search_entries: [],
    loading_search: false,
    tabs: [
      // {
      //   name: "Centrais multiusuários",
      //   description: "",
      //   entries: []
      // },
      {
        name: "CEPIDS",
        description:
          "Centros de Pesquisa, Inovação e Difusão (CEPIDs), apoiados pela FAPESP, que atuam com o desenvolvimento de pesquisa básica ou aplicada, com impacto comercial e social relevante.",
        entries: []
      },
      {
        name: "EMBRAPII",
        description:
          "A Associação Brasileira de Pesquisa e Inovação Industrial é uma organização que apoia instituições de pesquisa tecnológica, em selecionadas áreas de competência, para que executem projetos de desenvolvimento de pesquisa tecnológica para inovação, em cooperação com empresas do setor industrial.",
        entries: []
      },
      {
        name: "INCTs",
        description:
          "Os Institutos Nacionais de Ciência e Tecnologia são laboratórios orientados a estimular o desenvolvimento de pesquisa científica e tecnológica para promover a inovação e o espírito empreendedor.",
        entries: []
      }
      // {
      //   name: "Outros",
      //   description: "",
      //   entries: []
      // }
    ]
  }),
  methods: {
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
            console.log(row);
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

      console.log(this.entries);
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
    }, 500),
    selected_campus: function() {
      this.item_index = -1;
    },
    selected_unity: function() {
      this.item_index = -1;
    }
  },
  computed: {
    current_item: function() {
      if (this.item_index < 0) return null;
      return this.filtered_entries[this.item_index];
    },
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
.absolute {
  position: absolute;
}
</style>