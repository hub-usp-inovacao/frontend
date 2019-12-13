<template>
  <v-app>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procure uma palavra-chave"
        hide-details
        outlined
        clearable
      ></v-text-field>
    </v-container>

    <v-data-iterator
      :items="sheet"
      :search="search"
      :items-per-page="128"
      hide-default-footer
      no-data-text="Indexando Resultados"
    >
      <template v-slot:default="props">
        <masonry :cols="columns">
          <div v-for="item in props.items" :key="item.name">
            <Card :propsItem="item" />
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
  props: ["propsID"],
  data: () => ({
    sheet: [],
    search: "",
    columns: 1
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/" +
          this.propsID +
          "/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let di = {
          name: row.gsx$nomedoinstituto.$t,
          description: row.gsx$descriçãogeral.$t,
          url: row.gsx$site.$t,
          campus: row.gsx$campus.$t,
          unity: row.gsx$unidade.$t
        };
        if (di.name != "Nome do Instituto") this.sheet.push(di);
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
