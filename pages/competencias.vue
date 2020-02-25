<template>
  <div>
    <div class="panel_bg"></div>
    <Panel
      propsTitle="Competências"
      propsDescription="Descubra as competências e áreas de atuação dos pesquisadores da USP."
      propsUrl="https://forms.gle/dDooKL5G2sApfjqb6"
      :propsLoad="loading_search"
      @input="search = $event"
    />

    <div class="hidden-sm-and-down">
      <v-row justify="center" class="ma-0">
        <v-col cols="5">
          <v-card height="35rem" :loading="loading_data">
            <div v-if="search_entries.length > 0" class="fill-height">
              <v-list rounded style="max-height: 100%; overflow-y: auto;">
                <v-list-item-group>
                  <v-list-item
                    v-for="(item,i) in search_entries"
                    :key="item.email"
                    @click="item_index = i"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="font-weight-light">{{ item.name }}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{item.knownledge}}</v-list-item-subtitle>
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
            <div v-if="item_index >= 0" class="fill-height" style="overflow-y: auto;">
              <v-container px-6>
                <p class="title">{{current_item.name}}</p>
                <p class="body-2 font-italic font-weight-light my-2">{{current_item.association}}</p>
                <p class="body-2 my-0">{{current_item.campus}}</p>
                <p class="body-2 font-weight-light my-0">{{current_item.unity}}</p>
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

              <v-card-actions v-if="current_item.url">
                <v-spacer />
                <v-btn
                  depressed
                  dark
                  color="rgb(255, 167, 38)"
                  :href="current_item.url[0]"
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
    unity_list: [],
    loading_data: true,
    loading_search: false,

    item_index: -1,

    selected_campus: [],
    selected_unity: [],
    selected_association: [],
    campi_list: [],
    unity_list: [],
    association_list: [],

    sheet_name: "RESPOSTAS",
    sheet_id: "18l8qAjZuJU6jMqoY8ohYc4FsaIoNqg_GjCa5htYPBm8",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    entries: [],
    search_entries: [],
    loading_search: false,
    tabs: [
      {
        name: "Competências",
        entries: []
      },
      {
        name: "Inovação",
        entries: []
      }
    ]
  }),
  methods: {
    async sheetQuery() {
      this.loading_data = true;

      let campi = new Set();
      let unity = new Set();
      let association = new Set();

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
              services: row[14].split(/[\s\n]*[;,][\s\n]*/),
              equipment: row[15].split(/\s*(;|,)\s*/),
              knownledge: row[16],
              key_words: row[17].split(/\s*(;|,)\s*/)
            };
            campi.add(di.campus);
            unity.add(di.unity);
            association.add(di.association);
            this.entries.push(di);
          });
        })
        .finally(() => (this.loading_data = false));

      this.campi_list = Array.from(campi);
      this.unity_list = Array.from(unity);
      this.association_list = Array.from(association);
      this.search_entries = this.entries;
    },
    async fuzzySearch() {
      if (!this.search) {
        this.search_entries = this.entries;
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
        keys: ["description", "group_name", "unity", "campus", "key_words"]
      };

      await this.$search(this.search.trim(), this.entries, options)
        .then(results => {
          this.search_entries = results;
        })
        .finally((this.loading_search = false));
    }
  },
  watch: {
    search: debounce(async function() {
      await this.fuzzySearch();
    }, 500)
  },
  computed: {
    current_item() {
      return this.search_entries[this.item_index];
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