<template>
  <div>
    <div class="panel_bg"></div>
    <Panel
      propsTitle="Educação"
      propsDescription="Cursos e disciplinas para ensino de inovação e empreendedorismo na USP."
      propsUrl="https://forms.gle/uFRgcqZ4SdbHUqe39"
      :propsLoad="loading_search"
      @input="search = $event"
    />

    <!-- Seleção e Filtro -->

    <div class="hidden-sm-and-down">
      <v-item-group mandatory>
        <v-row justify="space-around" class="ma-0">
          <v-col v-for="(tab,i) in tabs" :key="tab.name" cols="3">
            <v-item>
              <v-card
                :color="current_tab === i ? '#ECEFF1' : ''"
                @click="current_tab = i; current_item = -1"
                :raised="current_tab === i"
                class="d-flex flex-column justify-space-around align-center"
                height="100%"
              >
                <v-container>
                  <p class="subtitle-1 font-weight-light my-0">Disciplinas de</p>
                  <p class="display-1 font-weight-medium my-0">{{tab.name}}</p>
                </v-container>
              </v-card>
            </v-item>
          </v-col>

          <v-col cols="3">
            <v-card height="100%" class="d-flex flex-column justify-space-around align-center">
              <v-container>
                <v-select
                  flat
                  dense
                  rounded
                  filled
                  hide-details
                  multiple
                  chips
                  v-model="selected_campus"
                  menu-props="auto"
                  color="#37474F"
                  :items="campi_list"
                  no-data-text="Não encontramos nada"
                  label="Campus"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="grey--text caption"
                    >(+{{ selected_campus.length - 1 }})</span>
                  </template>
                </v-select>
              </v-container>

              <v-container>
                <v-select
                  flat
                  dense
                  rounded
                  filled
                  hide-details
                  multiple
                  chips
                  v-model="selected_unity"
                  menu-props="auto"
                  color="#37474F"
                  :items="unity_list"
                  no-data-text="Não encontramos nada"
                  label="Unidade"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="grey--text caption"
                    >(+{{ selected_unity.length - 1 }})</span>
                  </template>
                </v-select>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-item-group>
    </div>

    <div class="hidden-md-and-up">
      <v-item-group mandatory>
        <v-row justify="center" class="ma-0">
          <v-col
            v-for="(tab,i) in tabs"
            :key="tab.name"
            cols="5"
            sm="4"
            class="pa-0"
            style="border: 5px solid #039BE5;"
            :class="i === 0 ? 'left-border' : 'right-border'"
          >
            <v-item>
              <v-card
                :color="current_tab === i ? '#039BE5' : '#ffa726'"
                class="d-flex flex-column justify-space-around align-center"
                elevation="0"
                tile
                height="100%"
                @click="current_tab = i; current_item = -1"
              >
                <v-container>
                  <p class="caption font-weight-light white--text my-0">Disciplinas de</p>
                  <p class="subtitle-1 font-weight-medium white--text my-0">{{tab.name}}</p>
                </v-container>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row justify="center" class="ma-0">
          <v-col cols="5" sm="4">
            <v-select
              flat
              solo
              rounded
              hide-details
              multiple
              v-model="selected_campus"
              menu-props="auto"
              color="white"
              :items="campi_list"
              no-data-text="Não encontramos nada"
              label="Campus"
            >
              <template v-slot:selection="{ item, index }">
                <span v-if="index === 0" class="text-truncate">{{ item }}</span>
                <span
                  v-if="index === 1"
                  class="grey--text caption"
                >(+{{ selected_campus.length - 1 }})</span>
              </template>
            </v-select>
          </v-col>

          <v-col cols="5" sm="4">
            <v-select
              flat
              solo
              rounded
              hide-details
              multiple
              v-model="selected_unity"
              menu-props="auto"
              color="white"
              :items="unity_list"
              no-data-text="Não encontramos nada"
              label="Unidade"
            >
              <template v-slot:selection="{ item, index }">
                <span v-if="index === 0" class="text-truncate">{{ item }}</span>
                <span
                  v-if="index === 1"
                  class="grey--text caption"
                >(+{{ selected_campus.length - 1 }})</span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-item-group>
    </div>

    <!-- Lista e Card de Exibição -->

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
                    @click="current_item = i"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>

            <div v-else class="fill-height">
              <v-row class="fill-height ma-0" justify="center" align="center">
                <p v-if="loading_data" class="title font-weight-light text-center">Indexando itens</p>
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
            <div v-if="current_item >= 0" class="fill-height" style="overflow-y: auto;">
              <v-container px-6>
                <p class="title">{{filtered_entries[current_item].title}}</p>
                <p class="body-2 font-italic my-2">{{filtered_entries[current_item].category}}</p>
                <p
                  class="body-2"
                >{{filtered_entries[current_item].campus}} - {{filtered_entries[current_item].unity}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1">{{filtered_entries[current_item].description.long}}</p>
              </v-container>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  depressed
                  dark
                  color="rgb(255, 167, 38)"
                  :href="filtered_entries[current_item].url"
                >Saiba mais</v-btn>
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
          <v-card>
            <v-container>
              <v-select
                flat
                rounded
                filled
                hide-details
                v-model="current_item"
                menu-props="auto"
                color="#37474F"
                :items="filtered_entries.map((item,i) => ({text: item.title, value: i}))"
                no-data-text="Não encontramos nada"
                label="Escolha uma disciplina"
              ></v-select>
            </v-container>

            <div v-if="current_item >= 0">
              <v-container px-6>
                <p class="title">{{filtered_entries[current_item].title}}</p>
                <p class="body-2 font-italic my-2">{{filtered_entries[current_item].category}}</p>
                <p
                  class="body-2"
                >{{filtered_entries[current_item].campus}} - {{filtered_entries[current_item].unity}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1">{{filtered_entries[current_item].description.long}}</p>
              </v-container>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  depressed
                  dark
                  color="rgb(255, 167, 38)"
                  :href="filtered_entries[current_item].url"
                >Saiba mais</v-btn>
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

export default {
  components: {
    Panel
  },
  data: () => ({
    search: "",
    current_tab: 0,
    current_item: -1,

    loading_data: true,
    loading_search: false,

    selected_campus: [],
    selected_unity: [],
    campi_list: [],
    unity_list: [],

    sheet_name: "DISCIPLINAS",
    sheet_id: "1VZR_UAGJGD-hkc_ukuKLEsxaNpP2rNQ-OpnN59zwsIY",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    entries: [],
    tabs: [
      {
        name: "Graduação",
        entries: []
      },
      {
        name: "Pós-Graduação",
        entries: []
      }
    ]
  }),
  methods: {
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
              title: row[0],
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
            campi.add(di.campus);
            unity.add(di.unity);
            if (row[1].localeCompare("Graduação") === 0)
              this.tabs[0].entries.push(di);
            else this.tabs[1].entries.push(di);
          });
        })
        .finally(() => (this.loading_data = false));

      this.campi_list = Array.from(campi);
      this.unity_list = Array.from(unity);
      this.entries = this.tabs[0].entries;
    },
    async fuzzySearch() {
      if (!this.search) {
        this.entries = this.tabs[this.current_tab].entries;
        return;
      }
      this.loading_search = true;
      this.current_item = -1;

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
      this.current_item = -1;
    },
    selected_unity: function() {
      this.current_item = -1;
    }
  },
  computed: {
    filtered_entries: function() {
      if (!this.selected_campus.length && !this.selected_unity.length)
        return this.entries;

      let filtered = [];
      this.entries.forEach(item => {
        if (
          (this.selected_campus.includes(item.campus) ||
            !this.selected_campus.length) &&
          (this.selected_unity.includes(item.unity) ||
            !this.selected_unity.length)
        )
          filtered.push(item);
      });

      return filtered;
    }
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>

<style scoped>
.panel_bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40rem;
  /* background: rgb(216, 216, 216); */
  background: #ffa726;
  transform: skewY(-5deg);
  transform-origin: top left;
}
.left-border {
  border-radius: 5px 0 0 5px;
}
.right-border {
  border-radius: 0 5px 5px 0;
}
</style>
