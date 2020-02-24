<template>
  <v-app>
    <div class="panel_bg"></div>
    <Panel
      propsTitle="Educação"
      propsDescription="Cursos e disciplinas para ensino de inovação e empreendedorismo na USP."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLScetP0_LFQSvijjfaB7YRMZ1el-UbYRCsbigNnW6StdeYbS7g/viewform"
      @input="search = $event"
    />

    <div class="hidden-sm-and-down">
      <v-item-group mandatory>
        <v-row justify="space-around" class="ma-0">
          <v-col v-for="(tab,i) in tabs" :key="tab.name" cols="10" sm="5" md="3">
            <v-item>
              <v-card
                :color="current_tab == i ? '#ECEFF1' : ''"
                class="d-flex flex-column justify-space-around align-center"
                @click="current_tab = i; current_item = -1"
                :raised="current_tab == i"
              >
                <v-container>
                  <p class="subtitle-1 font-weight-light my-0">Disciplinas de</p>
                  <p class="display-1 font-weight-medium my-0">{{tab.name}}</p>
                </v-container>
              </v-card>
            </v-item>
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
            :class="i == 0 ? 'left-border' : 'right-border'"
          >
            <v-item>
              <v-card
                :color="current_tab == i ? '#039BE5' : '#ffa726'"
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
      </v-item-group>
    </div>

    <div class="hidden-sm-and-down">
      <v-row justify="center" class="ma-0">
        <v-col cols="5">
          <v-card height="80vh">
            <div v-if="entries.length > 0" class="fill-height">
              <v-list rounded style="max-height: 100%; overflow-y: auto;">
                <v-list-item-group>
                  <v-list-item
                    v-for="(item,i) in entries"
                    :key="item.title"
                    @click="current_item = i"
                  >{{ item.title }}</v-list-item>
                </v-list-item-group>
              </v-list>
            </div>

            <div v-else class="fill-height">
              <v-row class="fill-height ma-0" justify="center" align="center">
                <p class="title font-weight-light">Não encontramos nada relacionado a sua pesquisa</p>
              </v-row>
            </div>
          </v-card>
        </v-col>

        <v-col cols="5">
          <v-card height="80vh">
            <div v-if="current_item >= 0" class="fill-height" style="overflow-y: auto;">
              <v-container px-6>
                <p class="title">{{entries[current_item].title}}</p>
                <p class="body-2 font-italic my-2">{{entries[current_item].category}}</p>
                <p class="body-2">{{entries[current_item].campi}} - {{entries[current_item].unity}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1">{{entries[current_item].description.long}}</p>
              </v-container>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  depressed
                  dark
                  color="rgb(255, 167, 38)"
                  :href="entries[current_item].url"
                >Saiba mais</v-btn>
                <v-spacer />
              </v-card-actions>
            </div>

            <div v-else class="fill-height">
              <v-row class="fill-height ma-0" justify="center" align="center">
                <p class="title font-weight-light">Selecione um Item na lista ao lado</p>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="hidden-md-and-up">
      <v-row justify="center" class="ma-0">
        <v-col cols="10">
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
                :items="entries.map((item,i) => ({text: item.title, value: i}))"
                no-data-text="Não encontramos nada"
                label="Escolha uma disciplina"
              ></v-select>
            </v-container>

            <div v-if="current_item >= 0">
              <v-container px-6>
                <p class="title">{{entries[current_item].title}}</p>
                <p class="body-2 font-italic my-2">{{entries[current_item].category}}</p>
                <p class="body-2">{{entries[current_item].campi}} - {{entries[current_item].unity}}</p>
              </v-container>

              <v-container px-6>
                <p class="body-1">{{entries[current_item].description.long}}</p>
              </v-container>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  depressed
                  dark
                  color="rgb(255, 167, 38)"
                  :href="entries[current_item].url"
                >Saiba mais</v-btn>
                <v-spacer />
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import { debounce } from "debounce";
import Card from "../components/Card.vue";
import Input from "../components/Input.vue";
import Panel from "../components/Panel2.vue";

export default {
  components: {
    Card,
    Input,
    Panel
  },
  data: () => ({
    search: "",
    current_tab: 0,
    current_item: -1,
    current_item_mobile: "",
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
      const request = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/'DISCIPLINAS'?key=${this.api_key}`
      );
      const data = await request.json();

      data.values.slice(1).forEach(row => {
        let di = {
          title: row[0],
          description: {
            short: row[3],
            long: row[8]
          },
          campi: row[4],
          unity: row[5],
          category: row[6],
          url: row[7],
          area: row[9],
          start_date: row[10]
        };
        if (row[1].localeCompare("Graduação") == 0)
          this.tabs[0].entries.push(di);
        else this.tabs[1].entries.push(di);
      });

      this.entries = this.tabs[0].entries;
    },
    fuzzySearch: async function() {
      if (!this.search) {
        this.entries = this.tabs[this.current_tab].entries;
        return;
      }
      this.current_item = -1;

      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description.long", weight: 0.3 },
          { name: "campi", weight: 0.2 }
        ]
      };

      await this.$search(
        this.search,
        this.tabs[this.current_tab].entries,
        options
      ).then(results => {
        this.entries = results;
      });
    }
  },
  watch: {
    search: debounce(async function() {
      console.log(this.search);
      await this.fuzzySearch();
    }, 500),
    current_tab: debounce(async function() {
      await this.fuzzySearch();
    }, 500)
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>

<style scoped>
.blue-background {
  background-color: #2b80d1;
}
.pink-background {
  background-color: #da1955;
}
.panel_bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30rem;
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
