<template>
  <v-app>
    <v-container>
      <h1>{{propsCategory}}</h1>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procura uma palavra-chave ou entre as iniciativas cadastradas"
        hide-details
        outlined
        clearable
      ></v-text-field>
    </v-container>

    <v-data-iterator :items="sheet" :search="search" :items-per-page="128" hide-default-footer>
      <template v-slot:default="props">
        <masonry :cols="columns">
          <div v-for="item in props.items" :key="item.name">
            <Card :propsColor="propsColor" :propsItem="item" :propsFont="true"/>
          </div>
        </masonry>
      </template>
    </v-data-iterator>
  </v-app>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  components: {
    Card
  },
  props: ["propsCategory", "propsColor"],
  data: () => ({
    sheet: [],
    search: "",
    columns: 1
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1mT1w-DhAADDE-2khFau3J8wJgp41nDeVn4e_Sr5dvW8/ou9zsos/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let iniciative = {
          name: row.gsx$nome.$t,
          description: row.gsx$descriçãocurta.$t,
          url: row.gsx$site.$t,
          campus: row.gsx$campusdeatuação.$t,
          unity: row.gsx$localizaçãounidade.$t,
          category: row.gsx$categoria.$t
        };
        if (iniciative.category == this.propsCategory)
          this.sheet.push(iniciative);
      });
    },
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
    }
  },
  beforeMount() {
    this.sheetQuery();
  },
  mounted() {
    this.columns = this.setCols();
  }
};
</script>
