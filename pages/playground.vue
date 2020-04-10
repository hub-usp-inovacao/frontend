<template>
  <v-app>
    <v-card class="mx-auto" max-width="300" tile>
      <v-list shaped>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";

export default {
  components: {
    Panel
  },
  data: () => ({
    item: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" }
    ],
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
