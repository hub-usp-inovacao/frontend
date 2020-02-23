<template>
  <div>
    <Panel
      propsTitle="Educação"
      propsDescription="Cursos e disciplinas para ensino de inovação e empreendedorismo na USP."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLScetP0_LFQSvijjfaB7YRMZ1el-UbYRCsbigNnW6StdeYbS7g/viewform"
      @input="typed = $event"
    />

    <v-app>
      <v-item-group mandatory v-model="showing">
        <v-container>
          <v-row justify="space-around">
            <v-col v-for="tab in tabs" :key="tab.name" cols="4" md="3">
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'rgb(3, 155, 229)' : ''"
                  class="d-flex flex-column justify-space-around align-center"
                  height="20vh"
                  @click="toggle"
                >
                  <v-container>
                    <p class="subtitle-1 font-weight-light my-0">Disciplinas de</p>
                    <p class="display-1 font-weight-medium my-0">{{tab.name}}</p>
                  </v-container>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

      <v-row justify="center">
        <v-col cols="5">
          <v-card height="80vh">
            <v-list rounded style="max-height: 100%; overflow-y: auto;">
              <v-list-item-group v-model="current_item">
                <v-list-item v-for="item in entries" :key="item.name">{{ item.name }}</v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="5">
          <v-card height="80vh" v-if="current_item != -1">
            <v-container px-6>
              <p class="title">{{entries[current_item].name}}</p>
              <p class="body-2">{{entries[current_item].campi}} - {{entries[current_item].unity}}</p>
            </v-container>
            <v-container px-6>
              <p class="body-1">{{entries[current_item].description}}</p>
            </v-container>

            <v-card-actions>
              <v-spacer />
              <v-btn
                depressed
                dark
                color="rgb(255, 167, 38)"
                :href="entries[current_item].url"
              >Visite o site</v-btn>
              <v-spacer />
            </v-card-actions>

            <v-spacer />
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </div>
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
    typed: "",
    showing: 0,
    current_item: -1,
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
    setCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 3;
        case "xl":
          return 4;
      }
    },
    async sheetQuery() {
      const request = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/'DISCIPLINAS'?key=${this.api_key}`
      );
      const data = await request.json();

      data.values.slice(1).forEach(row => {
        let di = {
          name: row[0],
          description: row[3],
          campi: row[4],
          unity: row[5],
          category: row[6],
          url: row[7],
          long_description: row[8],
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
      if (this.typed === "") {
        this.entries = this.tabs[this.showing].entries;
        return;
      }

      var options = {
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["name", "long_description"]
      };

      await this.$search(
        this.typed,
        this.tabs[this.showing].entries,
        options
      ).then(results => {
        this.entries = results;
      });

      this.current_item = -1;
    }
  },
  watch: {
    typed: debounce(async function() {
      await this.fuzzySearch();
      console.log(this.typed);
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
.image-background {
  background-image: url("http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg");
  background-size: cover;
}
.overflow50 {
  max-height: 50vh;
  overflow-y: auto;
}
</style>
